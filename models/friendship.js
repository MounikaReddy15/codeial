const mongoose = require('mongoose');


const friendshipSchema = new mongoose.Schema({
    // the user who sent this req
    // sender
    from_user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // the user who accepted this req, the naming is just to understand, otherwise the wont see a difference
    // receiver
    to_user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;