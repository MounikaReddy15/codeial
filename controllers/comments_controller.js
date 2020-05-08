const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = function(req,res) {
    // find post first
    Post.findById(req.body.post, function(err, post) {
        // if post is found
        if(err)
        {
            console.log("Error in finding the post",err);
            return;
        }
        console.log("post found ",post);
        if(post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id

            }, function(err, comment){
                if(err) {
                    console.log('error in creating comment');
                }
                // add comment to the post
                // push is mongoDB, this comment is pushed to post

                post.comments.push(comment);
                //  after updating everytime we need to save it
                // before save it is in ram, after save it is stored in db
                post.save();

             return    res.redirect('/');
            });
        }

    }); 

}

 module.exports.destroy = function(req,res) {
    //  to check comment exists in the db
     Comment.findById(req.params.id, function(err, comment) {
        //  user.id is string
        // user._id is objectId
        if(comment.user == req.user.id) {
            // save post id to delete comment in comments array of post
            let postId = comment.post;
            // delete the comment
            comment.remove();
            // pull: pulls out the id which is matching
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            });
        }else {
            return res.redirect('back');
        }

     });
 }