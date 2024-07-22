const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

passport.use(
    new GoogleStrategy({
        // Options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
        // Passport callback function
        console.log('Passport callback function fired');

        console.log(profile);
    })
);