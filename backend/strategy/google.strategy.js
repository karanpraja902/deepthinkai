const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/userModel');

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, cb) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });
        
        if (user) {
            // User exists, update profile picture if needed
            if (!user.profilePicture) {
                user.profilePicture = profile.photos[0].value;
                await user.save();
            }
        } else {
            // Create new user
            const [firstname, ...lastnameParts] = profile.displayName.split(' ');
            const lastname = lastnameParts.join(' ') || '';
            
            user = await User.create({
                firstname: firstname,
                lastname: lastname,
                email: profile.emails[0].value,
                password: Math.random().toString(36).slice(-8), // Generate random password
                confirmpassword: Math.random().toString(36).slice(-8), // Generate random password
                profilePicture: profile.photos[0].value,
                provider: 'google',
                providerId: profile.id
            });
        }
        
        return cb(null, user);
    } catch (error) {
        console.error('Google strategy error:', error);
        return cb(error);
    }
}));
