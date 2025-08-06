const jwt=require("jsonwebtoken")

const authMiddleWare=(req,res,next)=>{
    const token=req?.cookie?.auth_token

    if(!token){
        res.status(400).json({error:"Authorization failed, access denied!"})
    }

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=decode
        next()
    }catch(error){
        res.status(500).json({error:"token is invalid!"})
    }
}
module.exports=authMiddleWare;