'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Products');
const util = require('./utils');
const discountService = require('../service/discountService');
import {notificationService} from '../service/notificationService';


exports.getAllProducts = (request, response) => {
    Product.find().lean().exec({}, (error, products) => {
        if (error) {
            response.send(error);
        }

        discountService.applyDiscounts(products, (elements) => response.json(elements));
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
    util.withAdminRights(request, response, (request, response) => {
        let newProduct = new Product(request.body);
        newProduct.save((error, product) => {
            if (error) {
                response.send(error);
            }

            response.json(product);
        });

        notificationService.sendNotification('product added');
    });
};

exports.updateProduct = (request, response) => {
    util.withAdminRights(request, response, (request, response) => {
        let productId = request.params.productId;
        Product.findOneAndUpdate({_id: productId}, request.body, {new: true}, (error, product) => {
            if (error) {
                response.send(error);
            }

            response.json(product);

            notificationService.sendNotification('product updated');
        });
    });
};

exports.deleteProduct = (request, response) => {
    util.withAdminRights(request, response, (request, response) => {
        let productId = request.params.productId;
        Product.remove({_id: productId}, (error, product) => {
            if (error) {
                response.send(error);
            }

            response.json({
                message: `Product ${product.id} has been deleted`
            });

            notificationService.sendNotification('product deleted');
        });
    });
};