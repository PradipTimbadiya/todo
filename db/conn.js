const mongoose=require('mongoose')


mongoose.connect("mongodb://0.0.0.0:27017/To_Do").then(()=>{console.log('Connection Successfully')}).catch((e)=>{console.log(e)})