const express=require('express');
const router=express.Router();
const {userRegistration, globalLogin} =require('../controller/Auth')

//user registration route
router.post('/register',userRegistration);
//user login
router.post('/login',globalLogin);

module.exports=router;
