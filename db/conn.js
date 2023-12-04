const mongoose=require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.ATLAS).then(()=>{console.log('Connection Successfully')}).catch((e)=>{console.log(e)})