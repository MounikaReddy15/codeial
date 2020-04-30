const express = require('express');

// to run express funct
const app= express();

const port = 8000;

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
