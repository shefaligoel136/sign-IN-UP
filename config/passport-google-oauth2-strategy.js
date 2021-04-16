const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/users');

passport.use(new googleStrategy({
    clientID : '151844966374-3vhk1ufran6hv290n37pc0j2e6aun30u.apps.googleusercontent.com',
    clientSecret : 'qR5jiQRJpL67dW-MkSCvB9UW',
    callbackURL : 'http://localhost:8000/users/auth/google/callback'
}, function(accessToken,refresh,profile,done){
    User.findOne({
        email : profile.emails[0].value
    }).exec(function(err,user){
        if(err){
            console.log(err);
            return;
        }
        console.log(profile);

        if(user){
            return done(null,user);
        }else{
            User.create({
                first_name : profile.name.givenName,
                last_name : profile.name.familyName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log("Error in creating user",err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}


));

module.exports = passport