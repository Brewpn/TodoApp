const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config/index');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require("../models/user").User;

module.exports = function(passport) {

    //here we have GoogleStrategy that save our user data in DB
    passport.use(new GoogleStrategy({

        clientID: config.get('googleAuth:clientId'),
        clientSecret: config.get('googleAuth:clientSecret'),
        callbackURL: config.get('googleAuth:callbackURL')

    },function (token, refreshToken, profile, done) {
            User.findOne({'google.profileId': profile.id}, function (err, user) {
                console.log('Google Strategy');
                if (err)
                    return done(err);

                if (user){

                    return done(null, user);
                } else {
                    const newUser = new User();

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
    );

    //here is jwt strategy that extract jwt with bearer http strategy
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'});
    jwtOptions.secretOrKey = 'secret';


    passport.use(new JwtStrategy(jwtOptions, function(payload, done) {
        console.log('JWT');
        User.findOne({'google.email' : payload.email}, function(err, user) {
            if (err) {
                return done(err, false);
            }

            if (user) {

                return done(null, user);
            } else {

                return done(null, false);
            }
        });
    }));

    //Bearer http strategy
    passport.use(new BearerStrategy(function (token, done) {
        console.log('Bearer strategy');
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) return done(err);
            var payload = {
                profileId: decoded.user.id
            };

            if (user) {
                return done(null, payload);
            } else {
                return done();
            }
        });
    }));

};