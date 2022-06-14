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
    toppings: [] //specifying array as the data type
});

//create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model
module.exports = Pizza;