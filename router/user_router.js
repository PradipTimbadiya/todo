const express = require('express');
const router = new express.Router();


const UserController = require('../controller/user_controller');


// router.get("/signUp" , (req,res)=>{
//     res.send("Hello")
// })

router.post("/signUp" , UserController.signUp);

router.post("/signIn" , UserController.signIn);

router.post("/changePassword", UserController.changePassword);

router.post("/forgotPassword", UserController.forgotPassword);



module.exports = router

