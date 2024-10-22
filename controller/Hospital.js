//file for hospital controller
const express=require('express');
//using validator to validate email formats
const validator = require('validator');

const Hospital=require('../model/hospital');
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
module.exports=hospitalRegister;