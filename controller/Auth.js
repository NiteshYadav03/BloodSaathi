//it is an authentication controller
const express=require('express');
//validator to validate email format
const validator=require('validator');
//importing hasing and salting libraries for hashing the password
const bcrypt=require('bcryptjs');
//importing jwt token library for tokenization
const jwt=require('jsonwebtoken');
//importing models
const User=require('../model/user');
const Hospital=require('../model/hospital');
const Admin=require('../model/admin');
const mongoose = require('mongoose');
//to do for this controller
//1.registration
//2.login
//==============user Registration=====================//

const userRegistration = async (req, res) => {
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
const globalLogin = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validate user input
        if (!(email && password && role)) {
            return res.status(400).json({ error: "All input is required" });
        }

        let user;
        // console.log(role);
        // Check based on role
        if (role === "User") {
            user = await User.findOne({ email });
        } else if (role === "Hospital") {
            user = await Hospital.findOne({ email });
        } else if (role === "Admin") {
            user = await Admin.findOne({ email });
        } else {
            return res.status(400).json({ error: "Invalid role" });
        }

        // Check for user credentials
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // Create token
            const token = jwt.sign({ user_id: user._id, email, role }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            user.token = token;
            console.log(user.token);
            // Respond with user
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

//logout function
const userLogout = async (req, res) => {
    const { email, role } = req.body;
    try{
        let user;
        if(role==="User"){
            user=await User.findOne({email});
        }
        else if(role==="Hospital"){
            user=await Hospital.findOne({ email });
        }
        else if(role==="Admin"){
            user=await Admin.findOne({ email});
        }
        else{
            return res.status(400).json({error:"Invalid role"});
        }
        if(user){
            user.token="";
            await user.save();
            return res.status(200).json({message:"Logged out successfully"});
        }
        else{
            return res.status(400).json({error:"Invalid credentials"});
        }
        }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
}


//get user profile
const getUserProfile = async (req, res) => {
    try {
        // Extract the user ID from the decoded token
        const userId = req.user.user_id; // Assuming req.user is populated by your authentication middleware
        console.log(userId);

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with user details
        res.status(200).json({
            name: user.name,
            address: user.address,
            country: user.country,
            state: user.state,
            district: user.district,
            pincode: user.pincode,
            phoneNumber: user.phoneNumber,
            email: user.email,
            gender: user.gender,
            dob: user.dob,
            bloodGroup: user.bloodGroup,
            donationHistory: user.donationHistory,
            receivingHistory: user.receivingHistory
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};


//update user profile
const { body, validationResult } = require('express-validator'); // For validation

const updateUserProfile = async (req, res) => {
    const userId = req.user.user_id; // Extract user ID from the authenticated user
    
    // Validate input data (you can add more validation as needed)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, country, state, district, pincode, phoneNumber, email, dob } = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.address = address || user.address;
        user.country = country || user.country;
        user.state = state || user.state;
        user.district = district || user.district;
        user.pincode = pincode || user.pincode;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.email = email || user.email;
        user.dob = dob || user.dob;

        await user.save(); // Save the updated user

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Request Blood Endpoint
const requestBlood = async (req, res) => {
    const { userId, hospitalId, bloodGroup, quantity } = req.body;

    try {
        const user = await User.findById(userId);
        const hospital = await Hospital.findById(hospitalId);

        if (!user || !hospital) {
            return res.status(404).json({ error: "User or Hospital not found" });
        }

        // Create the blood request (we assume a BloodRequest model)
        const newRequest = new BloodRequest({
            userId: user.user_id,
            hospitalId: hospital._id,
            bloodGroup,
            quantity,
            status: "Pending" // Request starts as pending
        });

        await newRequest.save();

        res.status(201).json({ message: "Blood request submitted", request: newRequest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get Receiving History for User
const getReceivingHistory = async (req, res) => {
    const { userId } = req.user; // Assuming user is authenticated

    try {
        const user = await User.findById(userId).populate('receivingHistory');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ receivingHistory: user.receivingHistory });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// Validate inputs in the route definition
const updateUserValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('phoneNumber').isLength({ min: 10, max: 15 }).withMessage('Invalid phone number'),
    body('dob').isISO8601().withMessage('Invalid date of birth'),
];


module.exports={userRegistration,globalLogin,userLogout,getUserProfile,updateUserProfile,updateUserValidationRules,requestBlood,getReceivingHistory};
