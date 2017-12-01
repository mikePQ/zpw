'use strict';

exports.addRouting = (app) => {
    const imagesController = require('../controller/imagesController');

    app.route('/images')
        .post(imagesController.addImage);
};