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
    app.get('/', require('./routeHandlers/frontpage').get);


    app.all('/folderListOut',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/folderHandlers/getAllFolders').get);

    //==================================================================
        //
    ////FOLDERS ROUTE LIST
       //

    //get all current user`s folders
    app.get('/folders',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/folderHandlers/getAllFolders').get);


    //get one exact folder of current user
    app.get('/folders/:id',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/folderHandlers/getFolderViaID').get);



    //create new folder
    app.post('/folders',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/folderHandlers/createFolder').post);

    //delete folder and all to do from it via folder ID TODO need to be improved with :id parametr
    app.delete('/folders',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/folderHandlers/deleteFolder').delete);

    //update folder via ID TODO !UNDER MAINTENANCE! think about :id param in URL
    app.put('/folders',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/folderHandlers/updateFolderInfo').put);

//===============================================================================//

       //
    ////TODOs ROUTE LIST
      //

    //get all todos in folder
    app.get('/todo/:id',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/todoHandlers/findAllTodoInFolder').get);

    //get exect todoin folder ?? IS IT REALLY necessary?
    //I`ll do it in case of neсessity

    //create new to do
    app.post('/todo/',
        passport.authenticate('bearer', {session: false}),
        require('./routeHandlers/todoHandlers/createTodo').post);

    //delete one To do via ID
    app.delete('/todo',
        passport.authenticate('bearer', {session : false}),
        require('./routeHandlers/todoHandlers/deleteTodoViaID').delete);
    //update TODO
    app.put('/todo',
        passport.authenticate('bearer', {session : false}),
        require('./routeHandlers/todoHandlers/updateTodo').put);

   //============================================================================//

       //
    ////AUTHORIZATION ROUTE LIST
      //

    //Logout rout
    app.get('/logout', function(req, res) {
        req.logout();
          res.redirect('/');
    });

    // here we have rout that creates new refresh token and new access token
    app.post('/auth/refresh-token',
        require('./routeHandlers/authHandlers/refreshTokenHandler').post);

    //google auth link
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email']}));


    //callback google auth
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/',
            session: false
        }), require('./routeHandlers/authHandlers/generateTokenHandler').get
    );
};