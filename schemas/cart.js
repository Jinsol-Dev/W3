const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    cartId: {type: String},
    user: {type: String, required: true},
    password: {type: String, required: true},
    content: {type: String},
});

module.exports = mongoose.model('Cart', Cart);