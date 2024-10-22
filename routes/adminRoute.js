// Import the middlewares
const authenticateUser = require('../middlewear/authMiddlewear');
const adminOnly = require('../middlewear/adminMiddlewear');
//importing the required modules
const express = require('express');
const router = express.Router();
const { getAllPendingHospitals, getPendingHospitalsById } = require('../controller/Admin');

// Apply the middlewares to the routes
router.get('/pending-requests', authenticateUser, adminOnly, getAllPendingHospitals);
router.post('/pending-requests/:id', authenticateUser, adminOnly, getPendingHospitalsById);

module.exports = router;
