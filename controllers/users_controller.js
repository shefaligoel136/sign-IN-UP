const User = require('../models/users');

module.exports.home = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('home',{
                    title : "User Profile",
                    user : user
                });
            }
            return res.redirect('/');
        });
    }else{
        return res.redirect('/');
    }
}

module.exports.signUp = function(req,res){
    return res.render('signUp');
}

module.exports.signIn = function(req,res){
    return res.render('signIn');
}

module.exports.create = function(request,response){

    if(request.body.password != request.body.confirm_password){
        return response.redirect('back');
    }

    User.findOne({
        email : request.body.email
    },function(err,user){
        if(err){
            console.log('Error in finding user in signing up!');
            return;
        }

        if(!user){
            User.create(request.body , function(err,user){
                if(err){
                    console.log('Error in creating user while signing up!');
                    return;
                }
                return response.redirect("/users/signInUser");
            })
        }
        else{
            return response.redirect('back');
        }
    });

};

module.exports.create_session = function(req,res){
    User.findOne({
        email : req.body.email
    },function(err,user){
        if(err){
            console.log("Error",err);
            return;
        }
        // handle user found
        if(user){
            // when password doesn't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }
 
            //handle session cookies
            // console.log(user);
            res.cookie('user_id',user._id);
            // console.log(user_id);
            return res.redirect('/users/home');
        }else{
            // handle user not found
            return res.redirect('back');
        }
    })
}

module.exports.destroy_session = function(req,res){
    res.clearCookie('user_id');
    return res.redirect('/');
}