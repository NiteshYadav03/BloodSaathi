const { default: mongoose } = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    hospitalName: String,
    address: String,
    country: String,
    state: String,
    district: String,
    pincode: String,
    hospitalEmail: { type: String, unique: true },
    approved: { type: Boolean, default: false }, // Admin approval status
    password: String, // hashed password
});
const hospital=mongoose.model('hospital',hospitalSchema);
module.exports=hospital;
