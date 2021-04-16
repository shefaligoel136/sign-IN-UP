const EventSchema = require('../models/registeredEvents');

module.exports.createEvent = function(req,res){
    EventSchema.create(req.body,function(err,events){
        if(err){
            console.log("error in creating the event",err);
            return;
        }
        return res.redirect('back');
    })
}