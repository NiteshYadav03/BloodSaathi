require('dotenv').config(); // Load environment variables
// authMiddleware.js

const jwt = require('jsonwebtoken');
const Admin = require('../model/admin'); // Import admin model
const express = require('express');

// Authentication middleware (JWT-based for example)
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
      
        // Check if the user is in the database (can add additional checks here if needed)
        const admin = await Admin.findById(req.user.user_id);
       
        if (!admin) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authenticateUser;
