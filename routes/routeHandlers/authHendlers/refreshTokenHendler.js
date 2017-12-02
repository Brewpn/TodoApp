const User = require('../../../models/user').User;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.post = function (req, res, done) {
    const oldRefreshToken = req.body.refreshToken;

    jwt.verify(oldRefreshToken, 'secret', function (err, decoded) {
        User.findById(decoded._id)
            .exec()
            .then(user => {
                if (!user)
                    res.status(404);
                else
                    return user;
            })
            .then(user => {

                const payloadRefreshToken = {
                    _id : user._id,
                    Name: user.google.name,
                    email: user.google.email
                };

                user.google.token = jwt.sign(payloadRefreshToken, 'secret', {expiresIn: '30d'});

                return(user);
            })
            .then(user => {
                user.save(function (err) {
                    if (err)
                        throw err;
                });

                return user;
            })
            .then(user => {
                const payloadAccessToken = {
                    Name: user.google.name,
                    email: user.google.email
                };

                const accessToken = jwt.sign(payloadAccessToken, 'secret', {expiresIn: '1d'});

                return(accessToken);
            })
            .then(accessToken => {
                res.json({accessToken: accessToken});
            })
            .catch((err)=>res.error(err));
    });

};