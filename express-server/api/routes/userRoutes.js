'use strict';

exports.addRouting = (app) => {
    const userController = require('../controller/userController');

    app.route('/users')
        .post(userController.createUser);

    app.route('/users/signin')
        .post(userController.signIn);
};