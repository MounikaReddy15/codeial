const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res) {
    try {
       await Post.create({
        content: req.body.content,
        user: req.user._id

      });
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