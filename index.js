const express = require('express');
const cookieParser = require('cookie-parser');

// to run express funct
const app= express(); 

const port = 8000;

//require express layout
//for dynamic scripts and styles
const expressLayouts = require('express-ejs-layouts');

//require db
const db= require('./config/mongoose');

//used for session cookie
const session = require('express-session');
//for authentication
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// import all strategies used
// jwt for authentication in api's
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passport-google-oauth2-strategy');

//to store session info into the db
const MongoStore = require('connect-mongo')(session);

// sass
const sassMiddleware = require('node-sass-middleware');

// flash-message
const flash = require('connect-flash');

// require the flash  middleware
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    //debug: to show errors
    debug: true,
    outputStyle: 'extended',
    //where shud server look for css files
    prefix: '/css'


}));

app.use(express.urlencoded());

app.use(cookieParser());


//folder for static files
app.use(express.static('./assets'));

// for using avatars
//  the directory of index joined with uploads which means codeial/uploads is available in uploads
// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//define the layouts before the routes
//we need to tell the server to use them
app.use(expressLayouts);

//extract style and script from the subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//to tell use ejs as view engine
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//add a middleware which takes session cookie and encrypts it
//mongo store is used to store the session in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        //in millisecs
        maxAge: (1000*60*100)
    },
    store: new MongoStore(
        {
        
            mongooseConnection: db,
            autoRemove: 'disabled'
        },

        // callback func if connection is not established
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
        )
}));

// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());

//setup current user usage
app.use(passport.setAuthenticatedUser);

// setup to use flash
// we need to put if after session use coz it uses session cookies
app.use(flash());
// to use flash-middleware
app.use(customMware.setFlash);

//we need to tell the app to use the exported router
app.use('/', require('./routes'));


//to make the app listen
app.listen(port, function(err){
    if(err) {

        //interpolation using bacticks
        //$ indicates evaluation
         console.log(`Error in running the server: ${err}`);
    }
        console.log(`Server is running on port: ${port}`);
});
