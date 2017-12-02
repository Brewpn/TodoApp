const User = require('../../../models/user').User;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.get = function (req, res, done) {
    User.findOne(req.user, function (err, user) {
        if (err) done(err);

        if (user) {
            const payloadAccessToken = {
                Name: user.google.name,
                email: user.google.email
            };

            const payloadRefreshToken = {
                _id : user._id,
                Name: user.google.name,
                email: user.google.email
            };

            const accessToken = jwt.sign(payloadAccessToken, 'secret', {expiresIn: '1d'});
            const refreshToken = jwt.sign(payloadRefreshToken, 'secret', {expiresIn: '30d'});

            user.google.token = refreshToken;

            user.save(function (err) {
                if (err)
                    throw err;

                res.json({
                    user: user.google.name,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expiresInMinutes: 24*60
                });

            });



        } else
            res.json('Login failed')
    })
};
