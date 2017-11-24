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

        User.findOne({'google.profileId': profile.id})
            .exec()
            .then((user) => {
                let newUser = user ? user : new User({
                    google: {
                        profileId : profile.id,
                        token : token,
                        name : profile.displayName,
                        email : profile.emails[0].value
                    }
                });

                return newUser;
            })
            .then((newUser) => {
                newUser.save(function (err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            })
            .catch((err) => {
                return done(err)
            });

        })
    );

    //here is jwt strategy that extract jwt with bearer http strategy
    const jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'});
    jwtOptions.secretOrKey = 'secret';


    passport.use(new JwtStrategy(jwtOptions, (payload, done) => {

        User.findOne({'google.email' : payload.email})
            .exec()
            .then((user) => {
                let User = user ? user : false;
                return done(null, User);
            })
            .catch(err => {
                return done(err);
            });

    }));

    //Bearer http strategy
    passport.use(new BearerStrategy(function (token, done) {

        let verify = new Promise((resolve, reject) => {
            resolve(jwt.verify(token, 'secret'))
        })
            .then(decoded => {
                let payload = {
                    profileId: decoded.user.id
                };
                if (user) {
                    return done(null, payload);
                } else {
                    return done();
                }
            })
            .catch(err => {
                return done(err);
            });

    }));

};