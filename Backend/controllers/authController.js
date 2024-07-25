const User = require('../models/user');
const passport = require('passport');

/*
** loginPage, logout, googleAuth
*/

const loginPage = (req, res) => {
    res.render('auth/login', {title: 'Login'});
}

const logout = (req, res) => {
    // Handle with Passport.js

    res.send('Logging out');
}

const googleAuth = (req, res) => {
    // Callback after passport shows google OAuth page
}
const googleRedirect = (req, res) => {
    // Handle with Passport.js
    //res.send('Rection from google');
    console.log("is logged in");
    //res.send('Logged');

    res.redirect('../../blogs');
}

module.exports = {
    loginPage, logout, googleAuth, googleRedirect
}