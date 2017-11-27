'use strict';

module.exports = (app) => {
    const ordersRoutes = require('./orderRoutes');
    ordersRoutes.addRouting(app);

    const productRoutes = require('./productRoutes');
    productRoutes.addRouting(app);

    const userRoutes = require('./userRoutes');
    userRoutes.addRouting(app);

    app.use((request, response) => {
        response.status(404).send({url: request.originalUrl + ' not found'});
    });
};


