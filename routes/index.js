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
    app.get('/', require('./routeHandlers/todoHandlers/frontpage').get);


    app.all('/folderListOut',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/folderHandlers/getAllFolders').get);

    //==================================================================
        //
    ////FOLDERS ROUTE LIST
       //

    //get all current user`s folders
    app.get('/folders',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/folderHandlers/getAllFolders').get);


    //get one exact folder of current user
    app.get('/folders/:id',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/folderHandlers/getFolderViaID').get);



    //create new folder
    app.post('/folders',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/folderHandlers/createFolder').post);

    //delete folder and all to do from it via folder ID TODO need to be improved with :id parametr
    app.delete('/folders',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/folderHandlers/deleteFolder').delete);

    //update folder via ID TODO !UNDER MAINTENANCE! think about :id param in URL
    app.put('/folders',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/folderHandlers/updateFolderInfo').put);

//===============================================================================//

       //
    ////TODOs ROUTE LIST
      //

    //get all todos in folder
    app.get('/todo/:id',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/todoHandlers/findAllTodoInFolder').get);

    //get exect todoin folder ?? IS IT REALLY necessary?
    //I`ll do it in case of neсessity

    //create new to do
    app.post('/todo/',
        passport.authenticate('jwt', {session: false}),
        require('./routeHandlers/todoHandlers/createTodo').post);

    //delete one To do via ID
    app.delete('/todo',
        passport.authenticate('jwt', {session : false}),
        require('./routeHandlers/todoHandlers/deleteTodoViaID').delete);
    //update TODO
    app.put('/todo',
        passport.authenticate('jwt', {session : false}),
        require('./routeHandlers/todoHandlers/updateTodo').put);

   //============================================================================//



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