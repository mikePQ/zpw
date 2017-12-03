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
    util.authorized(request, response, (request, response, error, decoded) => {
        if (error) {
            return response.status(401).json({
                title: 'Not Authorized',
                error: error
            });
        }

        let user = decoded.user;
        if (user.roles.includes('admin')) {
            Order.find({}, (error, orders) => {
                if (error) {
                    response.send(error);
                }

                response.send(orders);
            });
        } else {
            Order.find({"purchaser.email": user.email}, (error, orders) => {
                if (error) {
                    response.send(error);
                }

                response.send(orders);
            });
        }
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
            return response.status(500).json({
                error: error
            });
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
    util.withAdminRights(request, response, (request, response) => {
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
    util.withAdminRights(request, response, (request, response) => {
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