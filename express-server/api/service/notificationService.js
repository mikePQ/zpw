'use strict';

class NotificationService {
    constructor() {
        this.io = null;
    }

    sendNotification(notificationMessage) {
        if (this.io === null) {
            return;
        }

        this.io.sockets.emit('notification', notificationMessage);
    }

    setIO(io) {
        this.io = io;
    }
}

export const notificationService = new NotificationService();