const express = require('express');
const router = new express.Router();


const UserController = require('../controller/user_controller');

router.post("/sign-up" , UserController.signUp);

router.post("/sign-in" , UserController.signIn);

router.post("/change-password", UserController.changePassword);

router.post("/reset-password", UserController.resetPassword);

router.post("/forgot-password", UserController.forgotPassword);

router.post("/verify-otp", UserController.verifyOtp);

router.post("/sso-create", UserController.ssoCreate);

router.delete("/delete-user", UserController.deleteUser);

module.exports = router

