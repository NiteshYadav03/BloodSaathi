require('dotenv').config();
//importing the cors
const cors = require('cors');
const express = require('express');
const connectDb = require('./config/db');
//getting routes
const UserRoute =require('./routes/userRoute');
const HospitalRoute=require('./routes/hospitalRoutes');
const AdminRoute=require('./routes/adminRoute');
// Creating an app
const app = express();

// Connecting with the database
 connectDb();
// createAdmin(); // Call the function to ensure admin user is created
//using the cors
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

//using the routes\


//calling the routes
//parsing the json data
app.use(express.json());
//route for user login
app.use('/api/user',UserRoute);
//route for hospital
app.use('/api/hospital',HospitalRoute);
//route for admin
app.use('/api/admin',AdminRoute);
// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
// Listening on the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
