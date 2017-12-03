'use strict';

exports.addRouting = (app) => {
    const discountController = require('../controller/discountController');

    app.route('/discounts')
        .get(discountController.getAllDiscounts)
        .post(discountController.createDiscount);

    app.route('/discounts/:discountId')
        .delete(discountController.deleteDiscount);
};