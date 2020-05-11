const User =  require('../models/user');

// reqd for deleting
const fs = require('fs');
const path = require('path');

// not using async coz no nesting level, only one callback
module.exports.profile = function(req,res) {
    User.findById(req.params.id, function(err,user) {
        return res.render('profile', {
            title: "User Profile",
            profile_user: user
      });
       
    });

//   res.end('<h1> User Profile </h1>');
}

module.exports.update = async function(req,res) {
    // check the user
 //     if(req.user.id == req.params.id) {
 //         User.findByIdAndUpdate(req.params.id, req.body, function(err,user) {
    //         req.flash('success', 'Updated!');
 //             return res.redirect('back');
 //         });
 //     } else {
 //         // if user didn't match send code unauthorized
    //       req.flash('error', 'Unauthorized');
 //         return res.status(401).send('Unauthorized');
 //     }
 // }
   if(req.user.id == req.params.id) {
  try{
    let user = await User.findById(req.params.id);
    User.uploadedAvatar(req,res,function(err){
        if(err) {console.log('******Multer Error:', err)}

        // console.log(req.file);
        // without multer cant read req part coz form is multipart
        user.name = req.body.name;
        user.email = req.body.email;

        // not everyone is going to upload image,check for file
        if(req.file) {

            if(user.avatar) {
                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
            }



            // this is saving the path of the uploaded file into the avatar field in the user
            user.avatar = User.avatarPath + '/' + req.file.filename;
        }
            user.save();
            return res.redirect('back');
    });
  }
  catch {
        req.flash('error',err);
        return res.redirect('back');
  }
 }else {
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
  }
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
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

// whenever signin happens flash message is sent into the session cookie
// whenever refresh happens flash msg is erased

module.exports.destroySession = function(req,res){
    // passport gives this to req
    req.logout()
    // this is in req, to pass it to res(ejs) we can use middlewares
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}