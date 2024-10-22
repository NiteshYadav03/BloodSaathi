require('dotenv').config();
const express = require('express');
const connectDb = require('./config/db');
//getting routes
const UserRoute =require('./routes/userRoute');
// Creating an app
const app = express();

// Connecting with the database
connectDb();


//calling the routes
app.use(express.json());
app.use('/api/user',UserRoute);
// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
// Listening on the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
