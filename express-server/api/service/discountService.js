'use strict';

const mongoose = require('mongoose');
const Discount = mongoose.model('Discounts');

exports.applyDiscounts = (products) => {
    let currentTime = Date.now();
    Discount.find({
        startTime: {$lte: currentTime},
        endTime: {$gte: currentTime}
    }, (error, discounts) => {
        if (error || discounts.length < 1) {
            return;
        }

        discounts.forEach(discount => {
            products.forEach(product => {
                if (discount.products.includes(product.name)) {
                    product.price = product.price * (100 - discount.percentage);
                }
            });
        });
    });
};