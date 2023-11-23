const express = require('express');
const router = new express.Router();


const UserController = require('../controller/user_controller');



router.post("/signUp" , UserController.signUp);

router.post("/signIn" , UserController.signIn);

router.post("/changePassword", UserController.changePassword);

router.post("/resetPassword", UserController.resetPassword);

router.post("/forgotPassword", UserController.forgotPassword);

router.post("/verifyOtp", UserController.verifyOtp);




module.exports = router

