const express = require('express');
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
const config = require('../config/index');

module.exports = function (app, passport) {

    //Rout that fid all users (for debug)
    app.get('/users', function (req, res, done) {
        User.find({}, function (err, users) {
            if (err) return done(err );
            res.json(users);
        })
    });

    //front page and task list activities routs
    app.get('/', require('./controllers/frontpage').get);


    app.post('/task_list', passport.authenticate('jwt', {session: false}), function (req, res) {
        res.json({status: res.user});
    });

    app.get('/task_list', function (req, res) {
        res.json({status: res.user});
    });

    //Logout rout
    app.get('/logout', function(req, res) {
        req.logout();
          res.redirect('/');
    });


    //google auth link
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']}));


    //callback google auth
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/',
            session: false
        }), function (req, res, done) {
            User.findOne(req.user, function (err, user) {
                if (err) done(err);

                if (user) {
                    const payload = {
                        id: user.google.profileId,
                        Name: user.google.name,
                        email: user.google.email
                    };
                    console.log(payload);
                    const token = jwt.sign(payload, 'secret');
                    res.json({user: user.google.name, token: token});

                } else
                    res.json('Login failed')
            })

        }

    );
};