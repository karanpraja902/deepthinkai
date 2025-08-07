const ChatModel=require('../models/chatModel')
const ConversationModel=require('../models/conversationModel')

exports.getChats=async(req,res)=>{//generate all the chats by user id
    try{
        const chats=await ChatModel.find({userId:req.user._id}).sort({updatedAt:-1});//sort by updated at
        if(!chats){
            return res.status(400).json({message:"No chats found"})
        }
        return res.status(200).json({chats, success:true})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

exports.createChat=async(req,res)=>{
    try{
        console.log(req.user)
        const userId=req.user._id;
        const {title,description}=req.body;
        const chat=new ChatModel({
            userId:userId,
            title:title||"new chat",
            description:description
        })
        await chat.save();
        return res.status(201).json({chat,message:"chat created successfully",success:true})
    }catch(error){
return res.status(500).json({message:error.message})
    }
}

exports.getChat = async (req, res) => {
    try {
      const id = req.params.id;
      const chat = await ChatModel.findOne({ _id: id, userId: req.user.id });
      if (!chat) {
        return res.status(401).json({ error: "chats not found" });
      }
      const conversation = await ConversationModel.findOne({ chatId: id });
  
      //filter out system message
      const messages = conversation
        ? conversation.messages.filter((msg) => msg.role !== "system")
        : [];
  
      return res.json({
        chat,
        messages,
        message: "Conserstion fetched successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteChat=async (req,res)=>{
    try{
const id=req.params.id;
const chat=await ChatModel.findOne({_id:id,userId:req.user.id})
if(!chat){
    return res.status(401).json({error:"chat not found"})
}
await ChatModel.deleteOne({_id:id})
await ConversationModel.deleteOne({chatId:id})
res.json({message:"Chat deleted successfully",success:true})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
  }