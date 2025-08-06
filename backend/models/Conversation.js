const mongoose=require("mongoose")
const { title } = require("process")

const MessageSchema= new mongoose.Schema({
    role:{
        type:String,
    required:true,
        enum:['user','assistant', 'system']
    },
    content:{
type:String,
required:true
},
comment:{
type:String
}

},{_id:false})

const ConversationSchema=new mongoose.Schema({
chatId:{
    type:mongoose.Schema.Types.userId,
    require:true,
    ref:'Chat'
},
message:[MessageSchema]
},{timestamps:true})
module.exports=mongoose.model("Conversation",ConversationSchema)