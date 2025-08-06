const express=require("express")
const authMiddleWare=require("../middlewares/Authmiddleware")
const {register,login,googleCallback,getCurrentUser}=require("../controllers/AuthController")
const passport=require("passport")

const router=express.Router();//no router ..case R n r

router.post('/register',register)

router.post('/login',login)

router.get('/me', authMiddleWare,getCurrentUser)//first it will check the token then it will retrieve the current user

router.get('/google', passport.authenticate("goole",{scope:['profile','email']}))

router.get('/googlecallback',passport.authenticate('google',{session:false,failureRedirect:'/sign-in'}),googleCallback)//if fails

router.post('/logout',(req,res)=>{
    res.clearCookie('auth_token',{
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    return res.status(200).json({message:"user logout successfull"})
})

module.exports=router;