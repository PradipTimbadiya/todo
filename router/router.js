const { Router } = require("express");
const authRouter = require("./user_router")
const taskRouter = require("./task_router")

const router = Router();

router.use(authRouter);
router.use(taskRouter);

module.exports = router