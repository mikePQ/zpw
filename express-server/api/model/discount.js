'use strict';

const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    startTime: Number,
    endTime: Number,
    percentage: Number,
    products: []
});

module.exports = mongoose.model('Discounts', DiscountSchema);