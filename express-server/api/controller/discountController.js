'use strict';

const mongoose = require('mongoose');
const Discount = mongoose.model('Discounts');
const util = require('../controller/utils');
import {notificationService} from '../service/notificationService';

exports.getAllDiscounts = (request, response) => {
    util.withAdminRights(request, response, (request, response) => {
        Discount.find({}, (error, discount) => {
            if (error) {
                response.send(error);
            }

            response.send(discount);
        });
    });
};

exports.createDiscount = (request, response) => {
    util.withAdminRights(request, response, (request, response) => {
        let newDiscount = new Discount(request.body);
        newDiscount.save((error, discount) => {
            if (error) {
                response.send(error);
            }

            response.json(discount);

            notificationService.sendNotification('discount created');
        });
    });
};