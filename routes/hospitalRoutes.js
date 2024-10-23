//importing the model
const express=require('express');
const {hospitalRegister,confirmBloodReception,getPendingBloodRequests,handleBloodReception,getHospitalDetails,updateHospitalDetails} = require('../controller/Hospital');
const authenticateHospital= require('../middlewear/authHospitalMiddlewear');
//creating router
const router=express.Router();

//hospital Registration
router.post('/register',hospitalRegister);

//getting info of hospital
router.get('/profile',authenticateHospital,getHospitalDetails);

//updating hospital details
router.put('/update',authenticateHospital,updateHospitalDetails);

//getting all pending request
router.get('/pending',authenticateHospital,getPendingBloodRequests);

router.post('/reception',authenticateHospital,handleBloodReception);

module.exports=router;