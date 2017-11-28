'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Orders');
const Product = mongoose.model('Products');
const util = require('./utils');
import {notificationService} from '../service/notificationService';

function updateProductAvailability(productName, updateCallback, response) {
    let updatedProduct;
    Product.findOne({name: productName}, (error, product) => {
        if (error) {
            response.send(error);
        }

        updatedProduct = updateCallback(product);
        Product.findOneAndUpdate({_id: updatedProduct._id}, updatedProduct, {new: true}, (error, product) => {
            if (error) {
                response.send(error);
            }
        });
    });
}

exports.getAllOrders = (request, response) => {
    Order.find({}, (error, order) => {
        if (error) {
            response.send(error);
        }

        response.send(order);
    });
};

exports.getOrder = (request, response) => {
    let orderId = request.params.orderId;
    Order.findById(orderId, (error, order) => {
        if (error) {
            response.send(error);
        }

        response.json(order);
    });
};

exports.createOrder = (request, response) => {
    let newOrder = new Order(request.body);
    newOrder.save((error, order) => {
        if (error) {
            response.send(error);
        }

        order.orderedItems.forEach(item => {
            updateProductAvailability(item.product.name, product => {
                product.available -= item.quantity;
                return product;
            }, response);
        });

        response.json(order);

        notificationService.sendNotification('order created');
    });
};

exports.updateOrder = (request, response) => {
    util.authenticated(request, response, (request, response) => {
        let orderId = request.params.orderId;
        Order.findOneAndUpdate({_id: orderId}, request.body, {new: true}, (error, order) => {
            if (error) {
                response.send(error);
            }

            response.json(order);
        });

        notificationService.sendNotification('order updated');
    });
};

exports.deleteOrder = (request, response) => {
    util.authenticated(request, response, (request, response) => {
        let orderId = request.params.orderId;
        Order.remove({_id: orderId}, (error, order) => {
            if (error) {
                response.send(error);
            }

            response.json({
                message: `Order ${order._id} has been deleted`
            });

            notificationService.sendNotification('order deleted');
        });
    });
};