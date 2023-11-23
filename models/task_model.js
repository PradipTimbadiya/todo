const mongoose=require('mongoose')

const Task=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    userId: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'user',
         required:true
    },
    image:{
        type:String,
        default:null
    }
})

Task.methods.getData =function()
{
    return {
        id:this._id,
        title:this.title,
        description:this.description,
        isCompleted:this.isCompleted,
        image:this.image,
        createdAt:this.createdAt,
        updatedAt:this.updatedAt,
    }
}

const TaskModel=mongoose.model('task',Task);

module.exports=TaskModel;

