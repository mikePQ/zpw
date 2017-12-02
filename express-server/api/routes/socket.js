'use strict';

import {notificationService} from '../service/notificationService';

module.exports = (io) => {
    io.on('connection', socket => {
        notificationService.setIO(io);
    });
};