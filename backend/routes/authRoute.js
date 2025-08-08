const express = require("express");
const authMiddleWare = require("../middlewares/authmiddleware");
const { register, login, googleCallback, getCurrentUser, logout } = require("../controllers/authController");
const passport = require("passport");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleWare, getCurrentUser);

// Fix the callback route name to match the strategy
router.get('/google', passport.authenticate("google", { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/sign-in' }), googleCallback);

router.post('/logout', logout);

module.exports = router;