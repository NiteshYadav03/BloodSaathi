// Import the middlewares

const adminOnly = require('../middlewear/adminMiddlewear');
//importing the required modules
const express = require('express');
const router = express.Router();
const { getAllPendingHospitals, getPendingHospitalsById } = require('../controller/Admin');
const authenticateAdmin = require('../middlewear/authMiddlewear');

// Apply the middlewares to the routes
router.get('/pending-requests', authenticateAdmin, adminOnly, getAllPendingHospitals);
router.post('/pending-requests/:id', authenticateAdmin, adminOnly, getPendingHospitalsById);

module.exports = router;
