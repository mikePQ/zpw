'use strict';

module.exports = (io) => {
    io.on('connection', socket => {
        console.log('Socket connected');
        socket.emit('message', 'Connected');

        socket.on('message', message => {
            console.log("Message Received: " + message);
            io.emit('message', {type: 'new-message', text: message});
        });
    });
};