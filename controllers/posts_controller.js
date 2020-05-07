const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res) {
    Post.create({
        content: req.body.content,
        user: req.user._id

    }, function(err,post) {
        if(err) { console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res) {
    // find post if it exits or not to delete
    Post.findById(req.params.id, function(err,post) {
   // .id means converting the object id into String
   //   if your comparing two obj id they both need to be string format
        if(post.user == req.user.id){
            post.remove();

            // also delete comments
            Comment.deleteMany({post: req.params.id}, function(err){
                // func wont return anything becoz comments are deleted
                return res.redirect('back');
            });
            //  if the user didn't match
        }    else {
            return res.redirect('back');
        }
    });
}