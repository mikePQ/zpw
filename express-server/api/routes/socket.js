'use strict';

import {notificationService} from '../service/notificationService';

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('Socket connected : ' + socket);
        notificationService.setIO(io);
    });
};