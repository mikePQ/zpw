'use strict';

exports.addRouting = (app) => {
    const discountController = require('../controller/discountController');

    app.route('/discounts')
        .get(discountController.getAllDiscounts)
        .post(discountController.createDiscount);
};