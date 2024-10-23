//importing the model
const express=require('express');
const {hospitalRegister,confirmBloodReception,getPendingBloodRequests,handleBloodReception} = require('../controller/Hospital');
const authenticateHospital= require('../middlewear/authHospitalMiddlewear');
//creating router
const router=express.Router();

//hospital Registration
router.post('/register',hospitalRegister);


//getting all pending request
router.get('/pending',authenticateHospital,getPendingBloodRequests);

router.post('/reception',authenticateHospital,handleBloodReception);

module.exports=router;