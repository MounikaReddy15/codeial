//to create a schema we require mongoose
const mongoose = require('mongoose');

// setting multer individually, coz profile pic is specific to user
const multer = require('multer');

// setting up path where the file will be stored
const path = require('path');

// define which path
// the string is converted to path using path module
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
     password: {
        type: String,
        required: true
    },
     name: {
        type: String,
        required: true,
     }, 
     avatar: {
        type: String,

    }},
     {
        //timestamps are created at, updated at
        timestamps: true
     
});
    // userSchema.set('timestamps', true); 


    
    



// telling mongoose this is a model
const User = mongoose.model('User', userSchema);


module.exports = User;