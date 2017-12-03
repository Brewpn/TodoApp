const User = require('../../../models/user').User;
const HttpError = require('../../../error/index').HttpError;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.get = function (req, res, done) {

    User.findOne(req.user)
        .exec()
        .then(user => {
            let payloadRefreshToken = {
                _id : user._id
            };
            user.google.token = jwt.sign(payloadRefreshToken, 'secret', {expiresIn: '30d'});

            return user;
        })
        .then(user => {
            user.save();

            return user;
        })
        .then(user => {
            let payloadAccessToken = {
                Name: user.google.name,
                email: user.google.email
            };
            let accessToken = jwt.sign(payloadAccessToken, 'secret', {expiresIn: '1d'});

            res.json({
                user: user.google.name,
                accessToken: accessToken,
                refreshToken: user.google.token,
                expiresInMinutes: 24*60
            })
        })
        .catch(err => {
            res
                .status(err.status)
                .send(err.message)
        })


    // User.findOne(req.user, function (err, user) {
    //     if (err) done(err);
    //
    //     if (user) {
    //         const payloadAccessToken = {
    //             Name: user.google.name,
    //             email: user.google.email
    //         };
    //
    //         const payloadRefreshToken = {
    //             _id : user._id
    //         };
    //
    //         const accessToken = jwt.sign(payloadAccessToken, 'secret', {expiresIn: '1d'});
    //         const refreshToken = jwt.sign(payloadRefreshToken, 'secret', {expiresIn: '30d'});
    //
    //         user.google.token = refreshToken;
    //
    //         user.save(function (err) {
    //             if (err)
    //                 throw err;
    //
    //             res.json({
    //                 user: user.google.name,
    //                 accessToken: accessToken,
    //                 refreshToken: refreshToken,
    //                 expiresInMinutes: 24*60
    //             });
    //
    //         });
    //
    //
    //
    //     } else
    //         res.json('Login failed')
    // })
};
