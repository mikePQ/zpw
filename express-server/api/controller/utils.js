'use strict';

const jwt = require('jsonwebtoken');

exports.authenticated = (request, response, callback) => {
    jwt.verify(request.query.token, 'secret', (error, decoded) => {
        if (error) {
            return response.status(401).json({
                title: 'Not Authenticated',
                error: error
            });
        }

        callback(request, response, error, decoded);
    });
};