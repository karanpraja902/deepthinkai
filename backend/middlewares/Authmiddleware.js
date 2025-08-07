const jwt=require("jsonwebtoken")

const authMiddleWare=(req,res,next)=>{
    console.log("AuthMiddleWare")
    const token=req?.cookie?.auth_token
    console.log(`token:${token}`)
    // token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyNkBleGFtcGxlLmNvbTUiLCJpZCI6IjY4OTQ0MDg3MmMwZjlkMDE2NTYxM2Y5YyIsImlhdCI6MTc1NDU0Njk5OCwiZXhwIjoxNzU3MTM4OTk4fQ.PsPdZHnX5ng7LByl-X_WSml1ZLAIuOC1jLmc4nwxeis
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