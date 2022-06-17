const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema({
    // set custom id to avoid confusion with parent comment _id
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        trim: true,
        required: true
    },
    writtenBy: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
        trim: true,
        required: true
    },
    commentBody: {
        type: String,
        trim: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
});

//getting total reply count
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

//create the Comment model
const Comment = model('Comment', CommentSchema);

//export the Comment model
module.exports = Comment;