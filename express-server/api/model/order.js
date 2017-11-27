'use strict';

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    purchaser: {
        name: String,
        email: String,
        phone: String,
        city: String,
        street: String,
        homeNumber: String,
        postalCode: String
    },
    orderedItems: [{
        product: {
            name: String,
            description: String,
            price: Number,
            category: String,
            image: String,
            rating: Number
        },
        quantity: Number
    }]
});

module.exports = mongoose.model('Orders', OrderSchema);