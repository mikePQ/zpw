'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Products');
const util = require('./utils');
const discountService = require('../service/discountService');

exports.getAllProducts = (request, response) => {
    Product.find({}, (error, products) => {
        if (error) {
            response.send(error);
        }

        discountService.applyDiscounts(products, () => response.send(products));
    });
};

exports.getProduct = (request, response) => {
    let productId = request.params.productId;
    Product.findById(productId, (error, product) => {
        if (error) {
            response.send(error);
        }

        response.json(product);
    });
};


exports.addProduct = (request, response) => {
    util.authenticated(request, response, (request, response) => {
        let newProduct = new Product(request.body);
        newProduct.save((error, product) => {
            if (error) {
                response.send(error);
            }

            response.json(product);
        });
    });
};

exports.updateProduct = (request, response) => {
    util.authenticated(request, response, (request, response) => {
        let productId = request.params.productId;
        Product.findOneAndUpdate({_id: productId}, request.body, {new: true}, (error, product) => {
            if (error) {
                response.send(error);
            }

            response.json(product);
        });
    });
};

exports.deleteProduct = (request, response) => {
    util.authenticated(request, response, (request, response) => {
        let productId = request.params.productId;
        Product.remove({_id: productId}, (error, product) => {
            if (error) {
                response.send(error);
            }

            response.json({
                message: `Product ${product.id} has been deleted`
            });
        });
    });
};