const dotenv=require("dotenv")
const User=require('../models/userModel')

dotenv.config()

//init cliendId n clSc from google cloud
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
  },  async (accessToken, refreshToken, profile, cb) =>{
    try{
const user=await User.findOne({email:profile.emails[0].value})
if(!user.profilePicture){
    user.profilePicture=profile.photos[0].value;
    await user.save();
}else{
    user=await user.create({
        name:profile.displayName,
        email:profile.emails[0].value,
        profilePicture:profile.photos[0].value,
        provider:'google',
        providerId:profile.id})}    
return cb(null,user)
}catch(error){
return cb(error)
    }
}
))
