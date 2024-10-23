//file for hospital controller
const express=require('express');
//using validator to validate email formats
const validator = require('validator');

const Hospital=require('../model/hospital');
const BloodRequest = require('../model/bloodRequest');
const Receiving = require('../model/receviing');
const User = require('../model/user');
const mongoose = require('mongoose');
//hospital registration
const hospitalRegister=async(req,res)=>{
    const { hospitalName, address, email } = req.body;
    
  
    try{
        //checking input values
        if(!(hospitalName && address&& email)){
            res.status(400).json({ error: "All inputs required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }
        //cheking if hospital already exists
        const hospital = await Hospital.findOne({email});
         
        if(hospital){
            return res.status(422).json({error:"Hospital already exists"});
        }
        //creating new hosptial
        const newhospital = new Hospital({
            hospitalName: hospitalName,
            address:address,
            email: email
        });
      
        //saving hospital
        const data=await newhospital.save();
        
        const hosptialResponse = {
            hospitalName: data.hospitalName,
            address: data.address,
            email: data.email
        };
      
        res.status(200).json(hosptialResponse);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }

}

// Confirm Blood Reception
const confirmBloodReception = async (req, res) => {
    const { requestId } = req.body;

    try {
        const bloodRequest = await BloodRequest.findById(requestId);
        if (!bloodRequest) {
            return res.status(404).json({ error: "Blood request not found" });
        }

        if (bloodRequest.status !== "Pending") {
            return res.status(400).json({ error: "Blood request is not pending" });
        }

        // Update the blood request status to 'Completed'
        bloodRequest.status = "Completed";
        await bloodRequest.save();

        // Add the blood reception to the user's receiving history
        const user = await User.findById(bloodRequest.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new receiving entry
        const newReceiving = new Receiving({
            userId: user._id,
            hospitalId: bloodRequest.hospitalId,
            bloodGroup: bloodRequest.bloodGroup,
            quantity: bloodRequest.quantity,
            date: new Date()
        });

        await newReceiving.save();

        // Update the user's receiving history
        user.receivingHistory.push(newReceiving._id);
        await user.save();

        res.status(200).json({ message: "Blood reception confirmed", receiving: newReceiving });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Getting all pending blood requests
const getPendingBloodRequests = async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find({ status: "Pending" });
        res.status(200).json(bloodRequests);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Integrate functions for a cohesive workflow
const handleBloodReception = async (req, res) => {
    // Step 1: Retrieve all pending blood requests
    const pendingRequests = await BloodRequest.find({ status: "Pending" });
    if (pendingRequests.length === 0) {
        return res.status(404).json({ error: "No pending blood requests found" });
    }

    // Step 2: Confirm reception for a specific request
    const { requestId } = req.body; // Get the requestId from the body
    await confirmBloodReception({ body: { requestId } }, res);
};



module.exports={
    hospitalRegister,
    confirmBloodReception,
    getPendingBloodRequests,
    handleBloodReception
};