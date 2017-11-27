const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const Order = require('./api/model/order');
const Product = require('./api/model/product');
const User = require('./api/model/user');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sport-shop');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const apiRoutes = require('./api/routes/api');
apiRoutes(app);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
