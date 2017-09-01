const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user , done) => {
    done(null , user.id)
});
passport.deserializeUser((id , done) => {
    User.findById(id , (err , user) => {
        done(err , user)
    })
});

passport.use(
    new googleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret ,
        callbackURL: '/auth/google/callback',
        proxy : true
    }, async (accessToken , refreshToken , profile , done) => {
        const existUser = await User.findOne({googleID : profile.id})
        if(existUser){
            return done(null , existUser)
        }
        const user = await new User({googleID : profile.id}).save()
        done(null , user)   
    })
);
