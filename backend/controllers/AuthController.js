const { error } = require('console')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const { use } = require('react')

exports.register= async (req,res)=>{
    try{
        console.log("register email")
        const {name,email,password}=req.body
        if(!name||!email||!password){
            return res.status(400).json({error:"Please fill the required fields"})
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }

        const user = await User.create({
            name,
            email,
            password,
            provider:"credentials"
        })
        
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:"30d"})
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:true,
            samesite:"none"
        })
        
        return res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            message:"User registered successfully"
        })
    }catch(error){
res.status(500).json({error:error.message})
    }
}



exports.login=async (req,res)=>{
try{
    const {email,password}=req.body
    
    if(!email||!password){
        return res.status(400).json({error:"Please fill the required fields"})
    }
    
    const user=await User.findOne({email})
    if(!user){
        return res.status(401).json({error:"User not found"})
    }

    console.log(`user:${user}`)
    const isMatch=await user.comparePassword(password)
    console.log(`isMatch:${isMatch}`)
    if(!isMatch){
        return res.status(401).json({error:"Invalid credentials"})
    }
    const token=jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"})
    console.log(`login token:${token}`)
    res.cookie("auth_token",token,{
        httpOnly:true,
        samesite:"none",
        secure:true
    })//Sets a cookie named "auth_token" with the value of the variable token in the HTTP response.
    
res.status(202).json({
    user:{id:user._id,
    email:user.email,
    password:user.password,
    profilePicture:user.profilePicture,
    provider:user.provider
},
 message:"user logged in successfully"
 });




}catch(error){
res.status(500).json({error:error.message})
}
    }

    exports.getCurrentUser=async (req,res)=>{
        try{
            const userById=req.user.id;
            const user=await User.findById(userById).select("-password")
            if(!user){
                return res.status(400).json({error:"User not found"})
            }
            res.status(200).json({user:{
                id:user._id,
                email:user.email,
                profilePicture:user.profilePicture,
                provider:user.provider
            },
        message:"User found successfully"})
        }catch(error){
res.status(500).json({error:error.message})
        }
    }
    exports.googleCallback=async (req,res)=>{
        try{
            const token=jwt.sign({id:req.user.id,email:req.user.email},process.env.JWT_SECRET_KEY,{expiresIn:"30d"})
            res.cookie("auth_token",token,{
                httpOnly:true,
                secure:true,
                samesite:"none"
            })
            res.redirect(`${process.env.FRONTNED_URL}/auth/success-login?token=${token}`);
        }catch(error){
            res.status(500).json({error:error.message})
        }
    }
//200 ok
//201 created
//202 accepted
//400 bad request
//401 unauthorized
//404 not found
//500 internal server error
//501 not implemented
//502 bad gateway