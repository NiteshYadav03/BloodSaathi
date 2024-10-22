const mongoose = require('mongoose');

const receivingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
    date: { type: Date, default: Date.now },
    bloodGroup: String,
    amount: Number, // If applicable
    // Add any other relevant fields
});

const Receiving = mongoose.model('Receiving', receivingSchema);