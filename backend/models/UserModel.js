const mongoose=require("mongoose")
const bycrypt=require("bcryptjs")
const { CaseLower } = require("lucide-react")
const { type } = require("os")

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:[true,"Please enter name"]
    },
    lastname:{
        type:String,
        trim:true,
        required:[true,"Please enter name"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:6
    },
    confirmPassword:{
        type:String,
        required:[true,"Please enter confirm password"],
        minlength:6
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        lowercase:true,
        trim:true,
        unique:true
    },
    profilePicture:{
        type:String
    },
    provider:{
type:String,
enum:["credentials", "google"],
default:"credentials"
    },//
    providerId:{
type:String,
    }

},{timestamps:true})

UserSchema.pre('save',async function(next){
    if(!this.isModified('password')||!this.password)return next()
        try{
    const salt=await bycrypt.genSalt(10);
    this.password=await bycrypt.hash(this.password,salt);
    next();
        }catch(error){
            next(error)
        }
    })
    UserSchema.methods.comparePassword=async function(candidatePassword){
if(!this.password) return false;
return bycrypt.compare(candidatePassword,this.password)
    }
    module.exports=mongoose.model('User',UserSchema)
 //The pre('save') hook runs before a user is saved.
// If the password is new/changed, it hashes the password.
// The database only stores the hashed password, never the plain text.
    
