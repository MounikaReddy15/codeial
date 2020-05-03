const passport = require('passport');

//require the passport strategy
const LocalStrategy = require('passport-local').Strategy;

//import the user
const User = require('../models/user');

//we need to tell the passport to use the local strategy we created
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    //done is inbuilt in passport
    //done is callback func retuning to pjs
    //we can name done anything
    function(email, password, done) {
    // find a user and establish the identity
    //first email is schema email
    //second is passed in the func above
    User.findOne({email: email}, function(err, user) {
        if (err) { 
            console.log('error in finding the user --> Passport');
            //done can two args, first is err
            return done(err); 
        }
            if(!user || user.password!=password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            //if user found
            return done(null, user);
    });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    //sets the user id in the cookie
    //encrypts the cookie
    done(null, user.id);

})

//when browser make the req
//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    //find the user if its exists in the db
    User.findById(id, function(err, user){
        if (err) { 
            console.log('error in finding the user --> Passport');
            
            return done(err); 
        }

        return done(null, user);
    });
     
});

module.exports = passport;