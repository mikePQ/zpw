const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const Order = require('./api/model/order');
const Product = require('./api/model/product');
const User = require('./api/model/user');
const Discount = require('./api/model/discount');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sport-shop');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const apiRoutes = require('./api/routes/api');
apiRoutes(app);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);
server.listen(port, () => console.log(`API running on localhost:${port}`));

const socketsHandlers = require('./api/routes/socket');
socketsHandlers(io);