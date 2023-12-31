const { uploads, destroy } = require('../middlewares/cloudinary');
const TaskModel = require('../models/task_model');
const UserModel = require('../models/user_model');
const { verifyToken } = require('../utils/genarateToken');

const TaskController = {
    insertTask: async function (req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userTokenData = verifyToken(token);
            if (userTokenData === undefined) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            if (!userTokenData.id) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userId = userTokenData.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }

            const data = req.body;
            let image = null;
            let publicUrl = null;
            const path = req.file?.path;
            if (path) {
                const result = await uploads(path, "tasks");
                publicUrl = result.public_id;
                image = result.secure_url;
            }

            const task = new TaskModel({ ...data, userId, image, publicUrl });
            await task.save();

            const taskdata = task.getData();

            const response = {
                success: true,
                data: taskdata,
                message: "New Task Inserted",

            };
            return res.status(201).json(response);
        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response)
        }
    },
    getTask: async function (req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userTokenData = verifyToken(token);
            if (userTokenData === undefined) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            if (!userTokenData.id) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userId = userTokenData.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            let data;
            if(req.params.key !== undefined)
            {
                data={
                    userId:userId,
                    "$or":[
                        {
                            "title":{$regex:req.params.key,$options: 'i'}
                        },
                        {
                           "description":{$regex:req.params.key,$options: 'i'}
                        }
                    ]
             }
            }
            else{
                data = { userId }
            }

            let tasks = await TaskModel.find(data).sort({ "date": -1 });
            tasks = tasks.map((e) => e.getData());
            const response = {
                success: true,
                data: tasks
            };
            return res.status(200).json(response);

        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response)
        }
    },
    updateTask: async function (req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userTokenData = verifyToken(token);
            if (userTokenData === undefined) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            if (!userTokenData.id) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userId = userTokenData.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }

            const data = req.body;
            const tasks = await TaskModel.findByIdAndUpdate(data.id, { $set: { ...data, updatedAt: Date.now() } }, { new: true });
            const taskdata = tasks.getData();
            const response = {
                success: true,
                data: taskdata,
                message: "Task Updated Successfully"
            };
            return res.status(200).json(response);

        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response)
        }
    },
    deleteTask: async function (req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userTokenData = verifyToken(token);
            if (userTokenData === undefined) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            if (!userTokenData.id) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userId = userTokenData.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }

            const data = req.body;
            const tasks = await TaskModel.findByIdAndDelete(data.id);
            if(tasks !== null) {
                if(tasks.publicUrl !== null) {
                    const r = await destroy(tasks.publicUrl)
                }
            }
            if(!tasks)
            {
                const response = {
                    success: false,
                    message: "Task Not Found"
                };
                return res.json(response);
            }
            const response = {
                success: true,
                data: tasks.getData(),
                message: "Task Deleted Successfully"
            };
            return res.json(response);

        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response)
        }
    },
    checkBox: async function (req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userTokenData = verifyToken(token);
            if (userTokenData === undefined) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            if (!userTokenData.id) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userId = userTokenData.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }

            let task = await TaskModel.findOne({ userId, _id: req.body.id });
            if (task) {
                task.isCompleted = req.body.isCompleted;
                await task.save()
                const response = {
                    success: true,
                    data: task.getData(),
                    message: "Task Completed"
                };
                return res.json(response);
            }
            else {
                return res.status(401).json({ success: false, message: "Todo Not Exist" });
            }

        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response)
        }
    }
}

module.exports = TaskController;