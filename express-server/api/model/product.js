'use strict';

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    rating: Number,
    available: Number
});

module.exports = mongoose.model('Products', ProductSchema);