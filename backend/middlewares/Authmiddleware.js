const jwt=require("jsonwebtoken")

const authMiddleWare=(req,res,next)=>{
    console.log("AuthMiddleWare")
    let token=null;
    if (req.cookies && req.cookies.auth_token) {
        token = req.cookies.auth_token;
    }
    // If no cookie, try Authorization header (Bearer token)
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.substring(7);
    }
    
    console.log(`token: ${token}`);


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