const express=require('express');
const router=express.Router();
const {userRegistration, globalLogin,userLogout,getUserProfile} =require('../controller/Auth');
const authenticateUser = require('../middlewear/userMiddlewear');

//user registration route
router.post('/register',userRegistration);
//user login
router.post('/login',globalLogin);
//logout
router.post('/logout',userLogout);

//user profile
router.post('/profile',authenticateUser,getUserProfile);

module.exports=router;
