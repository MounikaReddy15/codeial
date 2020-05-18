const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req,res) {
// using async await

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
    // Change :: populate the likes of each post and comment
   let posts =  await Post.find({})
   // for sorting posts
   .sort('-createdAt')  
   .populate('user')
      // nested population
   .populate({
     path: 'comments',
     populate: {
      path: 'user'
     },
     populate: {
        // comment likes
       path: 'likes'
     }
   }).populate('likes');
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


// ta soln
// module.exports.home = async function(req,res) {
// let posts = await Post.find({})
//         .sort('-createdAt')
//         .populate('user')
//         .populate('likes')
//         .populate({
            //For both user and likes, path is comments
            //If you call populate() multiple times with the same path, only the last one will take effect.
            // path: 'comments',
            // populate: {
            //     path: 'likes',
                //If you call populate() multiple times with the same path, only the last one will take effect,here user,likes is not populated for comment schema
            //     path: 'user'
               
            // }, 
            //If you call populate() multiple times with the same path, only the last one will take effect, if we uncomment it likes will populate but not user
            // populate: {
            //     path: 'likes'
            // }
        // })
        //This is the way to populate multiple schema on same path, here path is comments
      //   .populate({
      //       path:'comments',
      //       populate:{
      //           path:'likes'
      //       }
      //   });
      // }