const { Schema, model } = require('mongoose');  //schema construstor and model function

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now //javascript function
    },
    size: {
        type: String,
        default: 'Large'
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
        },
        id: false
    }
);

// get a total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.length;
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;