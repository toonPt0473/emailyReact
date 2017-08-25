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
        callbackURL: (process.env.NODE_ENV === 'production') ? 'https://toonpt.herokuapp.com/auth/google' : '/auth/google'
    }, (accessToken , refreshToken , profile , done) => {
        User.findOne({googleID : profile.id})
            .then(existUser => {
                if(existUser){
                    done(null , existUser);
                } else {
                    new User({googleID : profile.id})
                        .save()
                        .then(user => done(null , user))
                }
            })        
    })
);
