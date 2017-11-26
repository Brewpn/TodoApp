const express = require('express');
const User = require('../models/user').User;
const jwt = require('jsonwebtoken');
//const config = require('../config/index');

module.exports = function (app, passport) {

    //Rout that fid all users (for debug)
    app.get('/users', function (req, res, done) {
        User.find({}, function (err, users) {
            if (err) return done(err );
            res.json(users);
        })
    });

    //front page and task list activities routs
    app.get('/', require('./routeHendlers/frontpage').get);


    app.all('/folderListOut',
        passport.authenticate('jwt', {session: false}),
        require('./routeHendlers/folderListOut').get);

    app.post('/createFolder',
        passport.authenticate('jwt', {session: false}),
        require('./routeHendlers/createFolder').post);

    app.all('/deleteFolder',
        passport.authenticate('jwt', {session: false}),
        require('./routeHendlers/deleteFolder').delete);

    app.post('/createTodo',
        passport.authenticate('jwt', {session: false}),
        require('./routeHendlers/createTodo').post);


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

                    const token = jwt.sign(payload, 'secret');
                    res.json({user: user.google.name, token: token});

                } else
                    res.json('Login failed')
            })

        }

    );
};