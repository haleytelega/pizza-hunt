const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    },
    CommentBody: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//create the Comment model
const Comment = model('Comment', CommentSchema);

//export the Comment model
module.exports = Comment;