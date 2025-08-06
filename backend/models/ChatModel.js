const mongoose=require("mongoose")

const chatSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.userId,
        require:true,
        ref:'user'
    },
    title:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String
    }
},{timestamps:true});

module.exports=mongoose.model('Chat',chatSchema);