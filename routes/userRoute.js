const express=require('express');
const router=express.Router();
const {userRegistration, globalLogin,userLogout} =require('../controller/Auth')

//user registration route
router.post('/register',userRegistration);
//user login
router.post('/login',globalLogin);
//logout
router.post('/logout',userLogout);

module.exports=router;
