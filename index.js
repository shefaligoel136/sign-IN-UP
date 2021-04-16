const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const googlePassport = require('./config/passport-google-oauth2-strategy');

const port = 8000;

// var MongoStore = require("connect-mongo")(session);

app.use(express.static('./assets'));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract style and scripts from sub pages into layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// setting up views
app.set('view engine' , 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
        
    //     },
    //     function(err){
    //         console.log(err ||  'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticaticatedUser);

app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error is connecting to server: ${err}`);
    }else{
        console.log(`Server Running on port: ${port}`);
    }
})