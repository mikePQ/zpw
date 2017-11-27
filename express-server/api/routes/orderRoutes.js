'use strict';

exports.addRouting = (app) => {
    const ordersController = require('../controller/orderController');

    app.route('/orders')
        .get(ordersController.getAllOrders)
        .post(ordersController.createOrder);

    app.route('/orders/:orderId')
        .get(ordersController.getOrder)
        .put(ordersController.updateOrder)
        .delete(ordersController.deleteOrder);
};