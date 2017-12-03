'use strict';

const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email: String,
    products: []
});

module.exports = mongoose.model('Carts', CartSchema);