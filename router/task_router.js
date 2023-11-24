const express = require('express');
const router = new express.Router();
const {multer} = require('../middlewares/multer');


const TaskController=require('../controller/task_controller');

router.post("/insertTask" , multer.single('image') , TaskController.insertTask);

router.get("/getTask" , TaskController.getTask);

router.put("/updateTask" , TaskController.updateTask);

router.delete("/deleteTask" , TaskController.deleteTask);

router.put("/checkBox" , TaskController.checkBox);


module.exports = router
