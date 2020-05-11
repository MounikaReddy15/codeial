const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res) {
    try {
       let post = await Post.create({
        content: req.body.content,
        user: req.user._id

      });

         // receiving the ajax req
          if(req.xhr) {
            // we return with json(status codes,message)
            return res.status(200).json({
              data: {
                post: post
              },
              message: "Post Created!"
            });

           }
      req.flash('success', 'Post published!');
      return res.redirect('back');
     } catch(err) {
         req.flash('error', err);
         // console.log('error in creating a post',err);
         return res.redirect('back');
        }
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

             if(req.xhr) {
               return res.status(200).json({
                data: {
                  post_id: req.params.id
                },
                message: "Post deleted"
               })
               
             }

             req.flash('success', 'Post and associated comments deleted!');
                // func wont return anything becoz comments are deleted
                return res.redirect('back');
            }
            //  if the user didn't match
           else {
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
            }
        }
          catch(err) {
           req.flash('error', err);
           return res.redirect('back');
}
}