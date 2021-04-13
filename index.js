const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

const db = require('./config/mongoose');



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//extract style and scripts from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// setting up views
app.set('view engine' , 'ejs');
app.set('views', './views');

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error is connecting to server: ${err}`);
    }else{
        console.log(`Server Running on port: ${port}`);
    }
})