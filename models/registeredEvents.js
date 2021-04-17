const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const POSTER_PATH = path.join('/uploads/events/posters');

const eventSchema = new mongoose.Schema({
    organizer_name:{
        type: String,
        // required: true
    },
    event_name:{
        type: String,
        // required: true
    },
    about_event:{ 
        type: String,
        // required: true,
    },
    fees:{
        type: String,
        // required: true
    },
    from_time:{
        type: String,
        // required: true
    },
    to_time:{
        type: String,
        // required: true
    },
    date:{
        type: Date,
        // required: true
    },
    poster:{
        type: String
    }
},{
    timestamps : true
});


let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',POSTER_PATH));
    },

    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now())
    }
})


eventSchema.statics.uploadedPoster = multer({
    storage : storage
}).single('poster');

eventSchema.statics.posterPath = POSTER_PATH;

const EventSchema = mongoose.model('EventSchema',eventSchema);
module.exports = EventSchema;