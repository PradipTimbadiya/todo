const { error } = require('console');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');

const User = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new error("Please Enter Valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:null
    },
    category:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
})


User.methods.getData =function()
{
    return {
        id:this._id,
        name:this.name,
        email:this.email,
        image:this.image,
        category:this.category
    }
}

User.pre('save' , async function(next){
    if(this.isModified('password'))
    {
        const salt=bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password , salt);
       
    }
    next();
})

const UserModel = mongoose.model('user' , User)

module.exports = UserModel;