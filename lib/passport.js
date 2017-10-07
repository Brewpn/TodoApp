const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/index');

//need to create user schema for passport js
const User = require("../models/user").User;

module.exports = function(passport) {

    //serialize user from the session
    passport.serializeUser(function (user, done) {
        done(null, user.google.profileId)
    });

    //deserialize user
    passport.deserializeUser(function (profileId, done) {
        User.findOne({'google.profileId': profileId}, function (err, user) {
            err
                ? done(err)
                : done(null, user);
        })
    });

    //here we have GoogleStrategy that save our user data in DB
    passport.use(new GoogleStrategy({

        clientID: config.get('googleAuth:clientId'),
        clientSecret: config.get('googleAuth:clientSecret'),
        callbackURL: config.get('googleAuth:callbackURL')

    },function (token, refreshToken, profile, done) {
            User.findOne({'google.profileId': profile.id}, function (err, user) {
                if (err)
                    return done(err);

                if (user){
                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.google.profileId = profile.id;
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