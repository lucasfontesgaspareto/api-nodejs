'use strict';

const passport = require('passport');
const jwtStrategy = require('passport-jwt');

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const strategy = new jwtStrategy.Strategy({
        jwtFromRequest: jwtStrategy.ExtractJwt.fromAuthHeader(),
        secretOrKey: cfg.jwtSecret
    }, (payload, done) => {
        Users.findById(payload.id)
            .then(user => {
               if(user) {
                   return done(null, {
                       id: user.id,
                       email: user.email
                   });
               }
               return done(null, false);
            })
            .catch(error => done(error, null));
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            return passport.authenticate('jwt', cfg.jwtSession);
        }
    };
};