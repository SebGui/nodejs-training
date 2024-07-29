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

// Redirect from Google route
router.get('/google/redirect',
    passport.authenticate('google', {
        //successRedirect : '/blogs/',//Overwrites the below controller
        failureRedirect : '/login',
        failureFlash: 'Invalid Google credentials.'
    }),
    authController.googleRedirect);

// Auth to Google route
router.get('/google', 
            passport.authenticate('google', {
                scope: ['profile']
            }), 
            authController.googleAuth);

// Auth to Git route
// Auth to LinkedIn route
// Auth to Facebook route
// ...

module.exports = router;