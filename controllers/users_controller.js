const User =  require('../models/user');


module.exports.profile = function(req,res) {



    return res.render('profile', {
        title: "User Profile"
  });
   
//   res.end('<h1> User Profile </h1>');
}

module.exports.images = function(req,res) {
    res.end('<h1> images </h1>');
}

// render the sign up page
module.exports.signUp =  function(req,res) {
    if(req.isAuthenticated()) {
       return res.redirect('./profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn =  function(req,res) {
    if(req.isAuthenticated()) {
        return res.redirect('./profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res) {
    if(req.body.password!= req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({
        email : req.body.email
    }, function(err, user) {
        if(err) {
            console.log('error in finding user signing up');
            return;
        }
          if(!user) {
             User.create(req.body, function(err, user) {
                if(err) {
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/sign-in');
             })
          }else  {
            return res.redirect('back');
          }
    })
    };


//sign in and create a seesion for the user
//after authenticating 
module.exports.createSession = function(req,res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    // passport gives this to req
    req.logout()
    return res.redirect('/');
}