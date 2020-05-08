const Post = require('../models/post');
const User = require('../models/user');



module.exports.home =function(req,res) {
      //to see the cookie
    // console.log(req.cookies);
 
    //to change the value of cookie, we have to do it in res
    // res.cookie('user_id',  '25');

    // Post.find({}, function(err, posts){
        //to render an ejs file
//     return res.render('home', {
//         title: "Codeial | Home",
//         posts: posts
//   });
//    });
    
   //callback func in exec
   //finding all posts and populate the user of each post
   Post.find({})
   .populate('user')
      // nested population
   .populate({
     path: 'comments',
     populate: {
      path: 'user'
     }

   })
    .exec(function(err, posts){

     
       return res.render('home', {
    title: "Codeial | Home",
    posts: posts
});
});

  //directly sending to the browser
    // return res.end('<h1> Express is up for codeial! </h1>');
}

// module.exports.actionName = function(req,res){}