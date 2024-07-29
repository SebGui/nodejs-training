const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const authController = require('../controllers/authController');
const User = require('../models/user');

// User serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// User deserialization
passport.deserializeUser((id, done) => {
    // Find user based on id
    User.findById({id}).then((user) => {
        // Go to next step with that user reference
        done(null, user);
    });
}); 

passport.use(
    // Google Strategy :
    new GoogleStrategy({
        // Options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
        // Passport callback function
        User.findOne({googleid:profile.id}).then((currentUser) => {
            if (currentUser) {
                // Do nothing
                console.log('User is : ' + currentUser);
                done(null, currentUser);
            } else {
                // Create user
                new User({
                    googleid: profile.id,
                    username: profile.displayName,
                    thumbnail: profile.photos[0].value
                }).save().then((newUser) => {
                    console.log('New user created : ' + newUser);
                    done(null, newUser);
                });
            }
        });

        //done();
    }) // Another Strategy....
);