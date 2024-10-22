const express = require('express');
const Admin = require('../model/admin');
const Hospital = require('../model/hospital');
const passwordGenerator = require('generate-password');
const bcrypt = require('bcryptjs');
const approveHospital = require('../mailService/approvalMail');
const denyHospital = require('../mailService/DenialMail');




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

module.exports = { getAllPendingHospitals, getPendingHospitalsById };
