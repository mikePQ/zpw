'use strict';

exports.addRouting = (app) => {
    const cartController = require('../controller/cartController');

    app.route('/cart')
        .post(cartController.createCart)
        .get(cartController.getCart)
        .put(cartController.updateCart);
};