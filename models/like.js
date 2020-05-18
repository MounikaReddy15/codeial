// schema for likes
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
      //this defines the obj id of the liked obj  
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        // path to some other field
        // type of obj
        refPath: 'onModel'
    }, 
        // this field is used for defining the type of liked obj since this is a dynamic reference
     onModel: {
        type: String,
        required: true,
        // like can be on post or comment
        enum: ['Post', 'Comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
