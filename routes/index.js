const express = require('express');
const User = require('../models/user').User;

module.exports = function (app, passport) {

    //Rout that fid all users (for debug)
    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err );
            res.json(users);
        })
    });

    //frontpage and task list activities routs
    app.get('/', require('./frontpage').get);
    app.get('/task_list', isLoggedIn, function(req, res) {
          res.render('task_list.ejs', {
              user : req.user // get the user out of session and pass to template
        });
    });

    //Logut rout
    app.get('/logout', function(req, res) {
        req.logout();
          res.redirect('/');
    });


    //google auth link
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    //callback google auth
    app.get('/auth/google/callback',
          passport.authenticate('google', {
              successRedirect : '/task_list',
            failureRedirect : '/'
        })
    );
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}