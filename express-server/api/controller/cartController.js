'use strict';

const mongoose = require('mongoose');
const Cart = mongoose.model('Carts');
const util = require('../controller/utils');
import {notificationService} from '../service/notificationService';

exports.createCart = (request, response) => {
    util.authorized(request, response, (request, response) => {
        let newCart = new Cart(request.body);
        newCart.save((error, cart) => {
            if (error) {
                response.send(error);
            }

            response.json(cart);

            notificationService.sendNotification('cart created');
        });
    });
};

exports.updateCart = (request, response) => {
    util.authorized(request, response, (request, response, error, decoded) => {
        let email = decoded.user.email;
        console.log(email);
        Cart.findOneAndUpdate({email: email}, request.body, {new: true}, (error, cart) => {
            if (error) {
                response.send(error);
            }

            response.json(cart);
        });

        notificationService.sendNotification('cart updated');
    });
};

exports.getCart = (request, response) => {
    util.authorized(request, response, (request, response, error, decoded) => {
        let email = decoded.user.email;
        Cart.findOne({email: email}, request.body, {new: true}, (error, cart) => {
            if (error) {
                response.send(error);
            }

            if (cart === null) {
                return response.status(404).json({
                    error: 'Resource does not exist'
                });
            }

            response.json(cart);
        });
    });
};
