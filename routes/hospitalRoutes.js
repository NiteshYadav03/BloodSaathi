//importing the model
const express=require('express');
const Hospital=require('../model/hospital');
const {hospitalRegister,confirmBloodReception,getPendingRequests} = require('../controller/Hospital');
const {authenticateHospital} = require('../middlewear/hospitalMiddlewear');
//creating router
const router=express.Router();

//hospital Registration
router.post('/register',hospitalRegister);
//confirm blood reception
router.post('/confirm',authenticateHospital,confirmBloodReception);

//getting all pending request
router.get('/pending',authenticateHospital,getPendingRequests);
module.exports=router;