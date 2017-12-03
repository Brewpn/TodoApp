const User = require('../../../models/user').User;
const HttpError = require('../../../error/index').HttpError;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.post = function (req, res, done) {
    const oldRefreshToken = req.body.refreshToken;

    try {
        jwt.verify(oldRefreshToken, 'secret', function (err, decoded) {
            if (err)
                throw new HttpError(401);

            User.findById(decoded._id)
                .exec()
                .then(user => {
                    return new Promise((resolve, reject) => {
                        if (oldRefreshToken === user.google.token)
                            resolve(user);
                        else
                            reject(new HttpError(401));
                    });
                })
                .then(user => {

                    let payloadRefreshToken = {
                        _id: user._id,
                    };

                    user.google.token = jwt.sign(payloadRefreshToken, 'secret', {expiresIn: '30d'});

                    return (user);
                })
                .then(user => {
                    user.save(function (err) {
                        if (err)
                            throw err;
                    });

                    return user;
                })
                .then(user => {
                    let payloadAccessToken = {
                        Name: user.google.name,
                        email: user.google.email
                    };

                    let accessToken = jwt.sign(payloadAccessToken, 'secret', {expiresIn: '1d'});
                    let tokens = {
                        accessToken: accessToken,
                        refreshToken: user.google.token,
                        expiresInMinutes: 24 * 60
                    };

                    return (tokens);
                })
                .then(tokens => {
                    res.json(tokens);
                })
                .catch((err) => {
                    res
                        .status(err.status)
                        .send(err.message)
                });
        });
    } catch (err) {
        res
            .status(err.status)
            .send(err.message)
    }
};