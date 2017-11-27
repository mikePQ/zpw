const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = mongoose.model('Users');

exports.createUser = (request, response) => {
    let user = new User({
        username: request.body.username,
        password: bcrypt.hashSync(request.body.password, 10)
    });

    user.save((error, result) => {
        if (error) {
            return result.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        response.status(201).json({
            message: 'User created',
            obj: result
        });
    });
};

exports.signIn = (request, response) => {
    User.findOne({username: request.body.username}, (error, user) => {
        if (error) {
            return response.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        if (!user) {
            return response.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        let token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        response.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
};