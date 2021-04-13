const User = require('../models/users');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField : 'email'
},function(email,password,done){
    User.findOne({
        email : email
    },function(err,user){
        if(err){
            console.log("Error in finding user",err);
            return done(err);
        }
        if(!user || user.password != password){
            console.log('Invalid email or password');
            return done(null,false);
        }
        return done(null,user);
    })
}));


// serialize the user to decide which key is to be kept in cookie

passport.serializeUser(function(user,done){
    done(null,user.id)
});

// deserialize the user from the key in cookie

passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log(err);
            return done(err);
        }
        return done(null,user);
    });
});

// create a middleware to check if the user is authenticated

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signInUser');
};

passport.setAuthenticaticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;