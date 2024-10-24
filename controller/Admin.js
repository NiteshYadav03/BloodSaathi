const express = require('express');
const Admin = require('../model/admin');
const Hospital = require('../model/hospital');
const User = require('../model/user');
const userRegistration = require('../controller/Auth');
const passwordGenerator = require('generate-password');
const bcrypt = require('bcryptjs');
const approveHospital = require('../mailService/approvalMail');
const denyHospital = require('../mailService/DenialMail');
const jwt = require('jsonwebtoken');
const validator = require('validator');




// Fetch all pending hospitals
const getAllPendingHospitals = async (req, res) => {  
   
    try {
        const pendingHospitals = await Hospital.find({ approvalStatus: 'Pending' });
        
        if (!pendingHospitals.length) {
            return res.status(404).json({ message: "No pending hospital requests." });
        }

        res.status(200).json(pendingHospitals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Handle approval or denial of hospital by ID
const getPendingHospitalsById = async (req, res) => {
    const { id } = req.params;
    const { decision, denialReason } = req.body; // Including optional denialReason

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        if (hospital.approvalStatus !== "Pending") {
            return res.status(400).json({ message: "This hospital request has already been processed." });
        }

        // Handle approval decision
        if (decision === "Approve") {
            console.log("Approving hospital...");
            // Generate a random password for the hospital
            const generatedPassword = passwordGenerator.generate({
                length: 10,
                numbers: true,
                uppercase: true,
                lowercase: true,
                symbols: true
            });
            console.log("Generated password: ", generatedPassword); // Log the generated password
            // Update the hospital's status and password
            hospital.approvalStatus = "Approved";
            hospital.isApproved = true;
            hospital.password = await bcrypt.hash(generatedPassword, 10); // Hash the password
            await hospital.save();

            // Send approval email with the generated password
            await approveHospital(hospital.email, generatedPassword);

            return res.status(200).json({ message: "Hospital approved and credentials sent via email." });

        // Handle denial decision
        } else if (decision === "Deny") {
            hospital.approvalStatus = "Rejected";
            hospital.isApproved = false;

            await hospital.save();

            // Send denial email with the reason
            await denyHospital(hospital.email, denialReason || "Your request was denied.");

            // Optionally delete the hospital from the database after denying
            await Hospital.findByIdAndDelete(id);

            return res.status(200).json({ message: "Hospital denied and deleted." });
        }

        return res.status(400).json({ error: "Invalid decision provided." });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



//delete hospital by id
const deleteHospital = async (req, res) => {
    const { id } = req.params;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({ message: "Hospital deleted." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//delete user by id
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
//get all hospitals
const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        if (!hospitals.length) {
            return res.status(404).json({ message: "No hospitals found." });
        }

        res.status(200).json(hospitals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//creating a new user
const createUser=async(req,res)=>{
    const { name, address, country, state, district, pincode, phoneNumber, email, password,dob,gender,bloodGroup} = req.body;

    try {
        // Checking if all required fields are given
        if (!(name && address &&dob && bloodGroup && gender&& country && state && district && pincode && phoneNumber && email && password)) {
            return res.status(400).json({ error: "All inputs required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        // Checking if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ error: "User already exists" });
        }

        // Hash the password
        const hashPassword = async (password) => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        };

        // Creating a new user
        const newUser = new User({
            name,
            address,
            country,
            state,
            district,
            pincode,
            phoneNumber,
            email,
            dob,
            bloodGroup,
            gender,
            password: await hashPassword(password)
        });

        // Saving newUser into the database
        const newUserCreated = await newUser.save();

        // Generate token
        const expiresInDays = 30 * 24;
        const token = jwt.sign({ user_id: newUserCreated._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        newUserCreated.token = token;

        // Prepare response excluding password
        const userResponse = {
            name: newUserCreated.name,
            address: newUserCreated.address,
            country: newUserCreated.country,
            state: newUserCreated.state,
            district: newUserCreated.district,
            pincode: newUserCreated.pincode,
            phoneNumber: newUserCreated.phoneNumber,
            email: newUserCreated.email,
            dob: newUserCreated.dob,
            bloodGroup: newUserCreated.bloodGroup,
            gender: newUser.gender,
            token: newUserCreated.token,
        };

        res.status(200).json(userResponse);
    } catch (err) {
        console.error("Registration Error: ", err);
        res.status(500).json({ error: "Internal server error" });
    }

    };
//creating a new hospital

module.exports = { 
    getAllPendingHospitals, getPendingHospitalsById
    ,deleteHospital, deleteUser, getAllUsers, getAllHospitals, createUser};
