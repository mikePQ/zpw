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

            let now = Date.now();
            let toStart = newDiscount.startTime - now / 1000;
            let toEnd = newDiscount.endTime - now / 1000;

            if (toStart > 0) {
                setTimeout(() => notificationService.sendNotification('discount started'), toStart * 1000);
            }

            if (toEnd > 0) {
                setTimeout(() => notificationService.sendNotification('discount finished'), toEnd * 1000);
            }
        });
    });
};

exports.deleteDiscount = (request, response) => {
    util.withAdminRights(request, response, (request, response) => {
        let discountId = request.params.discountId;
        Discount.remove({_id: discountId}, (error, discount) => {
            if (error) {
                response.send(error);
            }

            response.json({
                message: `Discount with id: ${discountId} has been deleted`
            });

            notificationService.sendNotification('discount deleted');
        });
    });
};