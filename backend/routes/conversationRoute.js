const express=require("express")
const router=express.Router()
const authmiddleware=require("../middlewares/authmiddleware")
const {getConversation, sendMessage}=require("../controllers/conversationController")

router.use(authmiddleware)

router.post("/send-message/:chatId",sendMessage);
router.get("/:chatId",getConversation);

module.exports=router;