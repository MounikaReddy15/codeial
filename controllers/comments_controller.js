const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker =  require('../workers/comment_email_worker');

// module.exports.create = async function(req,res) {
//     find post first
//     try {
//       let post = await Post.findById(req.body.post);
//         if post is found
//         if(post) {
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id

//             });
//                 add comment to the post
//                 push is mongoDB, this comment is pushed to post

//                 post.comments.push(comment);
//                  after updating everytime we need to save it
//                 before save it is in ram, after save it is stored in db
//                 post.save();

//              return    res.redirect('/');
//             }
//         }
//             catch(err) {
//                 console.log('error', err);
//                 return;
//         }

//     }
  
module.exports.create = async function(req,res) {
    try {
              let post = await Post.findById(req.body.post);
               
                if(post) {
                    let comment = await Comment.create({
                        content: req.body.content,
                        post: req.body.post,
                        user: req.user._id
        
                     });
                     post.comments.push(comment);
                     post.save();

                     // lets populate the user everytime for mailer
                     
                     comment = await comment.populate('user', 'name email').execPopulate();
                     //   commentsMailer.newComment(comment);

                     //if no Q, Q will be created
                     //if Q, new job will be pushed 
                     //save, takes the callback & err  
                      let job = queue.create('emails', comment).save(function(err) {
                          if(err) {console.log('error in sending to the queue'); return;} 

                         // whenever something is enqueued id be available here   
                          console.log('job enqueued',job.id);
                      });

                     if(req.xhr) {
                        // similar for comments to fetch the users id
                        // comment = await comment.populate('user', 'name').execPopulate();
                        return res.status(200).json({
                                             data: {
                                                 comment: comment
                                             },
                                             message: "Post Created!"
                                         });
                                     }
                                      req.flash('success', 'Comment Published!');
                            
                                      return res.redirect('back');
                            
                                    }
                                } catch(err) {
                                    req.flash('error', err);
                                    return;
                            
                                }
                 }
                            
            


//   module.exports.destroy = async function(req,res) {
//     try {
//         let comment = await Comment.findById(req.params.id);

//         if(comment.user == req.user.id){
//          let postId = comment.post;
//          comment.remove();

//          let post = await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

//          //  send the comment id which was deleted back to the views
//          if(req.xhr) {
//              return res.status(200).json({
//                  data: {
//                      comment_id: req.params.id
//                  },
//                  message: "Post Deleted"
//              });
//          }
//           req.flash('success', 'Comment Deleted!');

//           return res.redirect('back');

//         }else {
//             req.flash('error', 'Unauthorized');
//              return res.redirect('back');
//         }
//     } catch(err) {
//         req.flash('error', err);
//         return;

//     }
// }

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