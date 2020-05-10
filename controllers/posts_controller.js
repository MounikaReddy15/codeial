const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res) {
    try {
       await Post.create({
        content: req.body.content,
        user: req.user._id

      });
      return res.redirect('back');
     } catch(err) {
        console.log('error in creating a post',err);
         return;
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
                // func wont return anything becoz comments are deleted
                return res.redirect('back');
            }
            //  if the user didn't match
           else {
            return res.redirect('back');
            }
        }
      catch(err) {
        console.log('error', err);
        return;
}
}