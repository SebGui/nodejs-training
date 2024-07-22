const express = require('express');
const authController = require('../controllers/authController')

const router = express.Router();
const passport = require('passport');

/*
** Blog routes
*/

// Login page route
router.get('/login', authController.loginPage);

// Logout route
router.get('/logout', authController.logout);

// Auth to Google route
router.get('/google', 
            passport.authenticate('google', {
                scope: ['profile']
            }), 
            authController.googleAuth);
// Redirect from Google route
router.get('/google/redirect',
    passport.authenticate('google'),
    authController.googleRedirect);

// Auth to Git route
// Auth to LinkedIn route
// Auth to Facebook route
// ...

module.exports = router;