const Users = require('../models/users');

module.exports.index = function(req,res){
    return res.render('index');
}