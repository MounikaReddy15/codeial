const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req,res) {
    // find post first
    try {
      let post = await Post.findById(req.body.post);
        // if post is found
        if(post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            });
                // add comment to the post
                // push is mongoDB, this comment is pushed to post

                post.comments.push(comment);
                //  after updating everytime we need to save it
                // before save it is in ram, after save it is stored in db
                post.save();

             return    res.redirect('/');
            }
        }
            catch(err) {
                console.log('error', err);
                return;
        }

    }



 module.exports.destroy = async function(req,res) {
    //  to check comment exists in the db
     try{
      let comment = await Comment.findById(req.params.id);
        //  user.id is string
        // user._id is objectId
        if(comment.user == req.user.id) {
            // save post id to delete comment in comments array of post
            let postId = comment.post;
            // delete the comment
            comment.remove();
            // pull: pulls out the id which is matching
           let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
                return res.redirect('back');
            }
        else {
            return res.redirect('back');
        }

     }catch(err) {
        console.log('error', err);
        return;
}
 }