const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
   timestamps: true
})

// before exporting we need to tell, its a model in the db
const Post = mongoose.model('Post', postSchema);

module.exports = Post;

