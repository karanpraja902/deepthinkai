const express=require("express")
const router=express.Router()
const authMiddleWare = require("../middlewares/authmiddleware")
const {getChats,createChat,deleteChat,getChat}=require("../controllers/chatController")

router.use(authMiddleWare)

router.get("/",getChats);
router.post("/",createChat);
router.get("/:id",getChat);
router.post("/:id",deleteChat)

module.exports=router;