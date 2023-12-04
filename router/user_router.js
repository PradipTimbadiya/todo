const express = require('express');
const router = express.Router();
const passport = require('passport');
const {multer} = require('../middlewares/multer');


const UserController = require('../controller/user_controller');

router.post("/sign-up" , UserController.signUp);

router.post("/sign-in" , UserController.signIn);

router.post("/change-password", UserController.changePassword);

router.post("/reset-password", UserController.resetPassword);

router.post("/forgot-password", UserController.forgotPassword);

router.post("/verify-otp", UserController.verifyOtp);

router.delete("/delete-user", UserController.deleteUser);

router.post("/google-login", UserController.googleUser);

router.get("/user-data", UserController.userData);

router.post("/change-profile",multer.single('image'), UserController.changeProfile);

router.delete("/delete-profile", UserController.deleteProfile);


module.exports = router

