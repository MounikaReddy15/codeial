const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //  to fetch all the comments of a array
    // include the array of ids of all the comments in this postSchema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
{
   timestamps: true
})

// before exporting we need to tell, its a model in the db
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

