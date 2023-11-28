require('dotenv').config()
const express =require('express');
const swaggerDocs=require('./swagger')
const app=express();
swaggerDocs(app);
const port = process.env.PORT | 8000;
const cors =require('cors');
const router = require('./router/router');

require('./db/conn');

app.get("/" , (req,res)=>{
    res.send('Hello')
})


app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.use('/api/v1',router)

app.listen(port ,()=>{
    console.log(`Run at ${port}`);
})