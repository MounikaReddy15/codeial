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