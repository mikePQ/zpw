'use strict';

exports.addRouting = (app) => {
    const productsController = require('../controller/productController');

    app.route('/products')
        .get(productsController.getAllProducts)
        .post(productsController.addProduct);

    app.route('/products/:productId')
        .get(productsController.getProduct)
        .put(productsController.updateProduct)
        .delete(productsController.deleteProduct);
};