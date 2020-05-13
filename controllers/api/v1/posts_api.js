const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

// index as in action name
module.exports.index = async function(req,res) {
    let posts =  await Post.find({})
   // for sorting posts
   .sort('-createdAt')  
   .populate('user')
      // nested population
   .populate({
     path: 'comments',
     populate: {
      path: 'user'
     }

   });


    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req,res) {
    // find post if it exits or not to delete
    try {
          let post = await Post.findById(req.params.id); 
           // .id means converting the object id into String
         //   if your comparing two obj id they both need to be string format
           if(post.user == req.user.id){
            post.remove();

            // also delete comments
             await Comment.deleteMany({post: req.params.id});

             
                // func wont return anything becoz comments are deleted
                return res.json(200, {
                    message: "Post and associated comments deleted!"
                  });
              }
               //  if the user didn't match
           else {
                return res.json(401, {
                  message: "You cannot delete this post!"
                });
            }
        }
          catch(err) {
              console.log('*******', err);
              return res.json(500, {
               message: "Internal Server Error"
          });
}
}