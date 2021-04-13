const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sign-IN-UP');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to db"));

db.once('open',function(){
    console.log('Connected to the database');
});

module.exports = db;