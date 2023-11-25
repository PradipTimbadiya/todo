require('dotenv').config()
const express =require('express');
const app=express();
const port = process.env.PORT | 8000;
const cors =require('cors');

require('./db/conn');
const userrouter = require('./router/user_router')
const taskrouter = require('./router/task_router');
// const UserModel = require('./models/user_model')

app.get("/" , (req,res)=>{
    res.send('Hello')
})


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(userrouter)
app.use(taskrouter)

app.listen(port ,()=>{
    console.log(`Run at ${port}`);
})