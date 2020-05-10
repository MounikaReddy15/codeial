const Post = require('../models/post');
const User = require('../models/user');


// using async await
module.exports.home = async function(req,res) {
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
    
try {
   //callback func in exec
   //finding all posts and populate the user of each post
   let posts =  await Post.find({})
   .populate('user')
      // nested population
   .populate({
     path: 'comments',
     populate: {
      path: 'user'
     }

   });
    //  exec func is callback of Post
    // .exec(function(err, posts){
     // to know all the users 
     let users = await User.find({}); 
        return res.render('home', {
          title: "Codeial | Home",
          posts: posts,
          all_users: users
      });
      
} catch(err) {
  console.log("error", err);
}

  //directly sending to the browser
    // return res.end('<h1> Express is up for codeial! </h1>');
}

// module.exports.actionName = function(req,res){}

// first way to optimize use async await
// other two

// using then
// Post.find({}).populate('comments').then(function());

// promise like functionality, .exec
// let posts = Post.find({}).populate('comments').exec();
// to execute posts
// posts.then();
// post.then will contain the execution of above query