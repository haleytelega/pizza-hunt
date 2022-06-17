const { Schema, model } = require('mongoose');  //schema construstor and model function
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: true,
        trim: true //removes white space
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now, //javascript function
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large',
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        required: true
    },
    toppings: [], //specifying array as the data type
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get a total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;