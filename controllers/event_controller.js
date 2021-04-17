const EventSchema = require('../models/registeredEvents');
const fs = require('fs');
const path = require('path');

module.exports.createEvent = function(req,res){
    
        
            EventSchema.uploadedPoster(req,res,function(err){
                
                if(err){
                    console.log("error in multer",err);
                }
                EventSchema.create({
                    organizer_name : req.body.organizer_name,
                    event_name : req.body.event_name,
                    about_event : req.body.about_event,
                    fees : req.body.fees,
                    from_time : req.body.from_time,
                    to_time : req.body.to_time,
                    date : req.body.date,
                },function(err,events){
                    if(err){
                        console.log("error in creating the event",err);
                        return;
                    }
                console.log(req.file);
                if(req.file){
                    if(events.poster){
                        fs.unlinkSync(path.join(__dirname,'..',events.poster));
                    }
                    events.poster = EventSchema.posterPath + '/' + req.file.filename;
                }
                events.save();
            })
        
        return res.redirect('back');
    })
}