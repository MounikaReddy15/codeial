const express = require('express');
const cookieParser = require('cookie-parser');

// to run express funct
const app= express();

const port = 8000;

//require express layout
const expressLayouts = require('express-ejs-layouts');

//require db
const db= require('./config/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());


//folder for static files
app.use(express.static('./assets'));

//define the layouts before the routes
//we need to tell the server to use them
app.use(expressLayouts);

//extract style and script from the subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//we need to tell the app to use the exported router
app.use('/', require('./routes'));


//to tell use ejs as view engine
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//to make the app listen
app.listen(port, function(err){
    if(err) {

        //interpolation using bacticks
        //$ indicates evaluation
         console.log(`Error in running the server: ${err}`);
    }
        console.log(`Server is running on port: ${port}`);
});
