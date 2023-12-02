const express = require('express');
const router = new express.Router();
const {multer} = require('../middlewares/multer');


const TaskController=require('../controller/task_controller');


router.post("/insert-task" , multer.single('image') , TaskController.insertTask);

router.get("/get-task" , TaskController.getTask);

router.get("/get-task/:key", TaskController.getTask);

router.put("/update-task" , TaskController.updateTask);

router.delete("/delete-task" , TaskController.deleteTask);

router.put("/check-box" , TaskController.checkBox);

router.get("/search-task/:key" , TaskController.searchTask);

module.exports = router
