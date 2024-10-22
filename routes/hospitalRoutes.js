//importing the model
const express=require('express');
const Hospital=require('../model/hospital');
const hospitalRegister = require('../controller/Hospital');
const router=express.Router();

//hospital Registration
router.post('/register',hospitalRegister);

module.exports=router;