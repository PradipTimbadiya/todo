const mongoose=require('mongoose')


mongoose.connect("mongodb+srv://pradip:123@cluster0.d1eepxk.mongodb.net/To_Do").then(()=>{console.log('Connection Successfully')}).catch((e)=>{console.log(e)})