//it is an authentication controller
const express=require('express');
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
    const { name, address, country, state, district, pincode, phoneNumber, email, password } = req.body;

    try {
        // Checking if all required fields are given
        if (!(name && address && country && state && district && pincode && phoneNumber && email && password)) {
            return res.status(400).json({ error: "All inputs required" });
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


module.exports={userRegistration,globalLogin};
