const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./model/admin'); // Adjust the path to your Admin model
const connectDb = require('./config/db');

const adminEmail = 'admin@domain.com'; // Admin email
const adminPassword = 'Admin2023Secure!'; // Admin password

const createAdmin = async () => {
    try {
            connectDb();

        // Check if the admin user already exists
        const existingAdmin = await Admin.findOne({ email: adminEmail });
        if (!existingAdmin) {
            // If not, hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);

            // Create the admin user
            const adminUser = new Admin({
                email: adminEmail,
                password: hashedPassword,
                // Add other fields as necessary
            });

            // Save the admin user to the database
            await adminUser.save();
            console.log('Admin user created successfully!');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Run the function to create the admin user
createAdmin();
