const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/index');

//need to create user schema for passport js
const User = require("../models/user").User;

module.exports = function(passport) {

    //serialize user from the session
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });

    //deserialize user
    passport.deserializeUser(function (id, done) {
        User.findOne(id, function (err, user) {
            done(err, user)
        })
    });

    //here can be problem with getting config data
    passport.use(new GoogleStrategy({

        clientID: config.get('googleAuth:clientId'),
        clientSecret: config.get('googleAuth:clientSecret'),
        callbackURL: config.get('googleAuth:callbackURL')

    },function (token, refreshToken, profile, done) {
            User.findOne({'googleId': profile.id}, function (err, user) {
                if (err)
                    return done(err);

                if (user){
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName;
                    newUser.google.email = profile.emails[0].value;

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            })
        })
    )
};