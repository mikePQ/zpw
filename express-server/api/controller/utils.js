'use strict';

const jwt = require('jsonwebtoken');

exports.authorized = (request, response, callback) => {
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

exports.withAdminRights = (request, response, callback) => {
    jwt.verify(request.query.token, 'secret', (error, decoded) => {
        if (error) {
            return response.status(401).json({
                title: 'Not Authenticated',
                error: error
            });
        }

        if (!decoded.user.roles.includes('admin')) {
            return response.status(401).json({
                title: 'Unauthorized access',
                error: error
            });
        }

        callback(request, response, error, decoded);
    });
};