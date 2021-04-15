const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    oraganizer_name:{
        type: String,
        required: true
    },
    event_name:{
        type: String,
        required: true
    },
    about_event:{ 
        type: String,
        required: true,
    },
    fees:{
        type: String,
        required: true
    },
    timings:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    duration:{
        type: String,
        required: true
    }   
},{
    timestamps : true
});

const EventSchema = mongoose.model('EventSchema',eventSchema);
module.exports = EventSchema;