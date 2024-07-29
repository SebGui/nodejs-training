const User = require('../models/user');
const passport = require('passport');

/*
** loginPage, logout, googleAuth
*/

const loginPage = (req, res) => {
    res.render('auth/login', {title: 'Login', user:req.session.user});
}

const logout = (req, res) => {
    // I) Passport.js logout
    req.logout();

    // II) Express-session logout
    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null
    req.session.save(function (err) {
      if (err) next(err)

      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function (err) {
        if (err) next(err)
        res.redirect('/')
      })
    });
}

const googleAuth = (req, res) => {
    // Callback after passport shows google OAuth page
}
const googleRedirect = (req, res) => {
    // Login with express-session
    req.session.regenerate(function (err) {
        if (err) next(err)
    
        // store user information in session, typically a user id
        req.session.user = req.user
    
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/profile/')
        })
      });
}

module.exports = {
    loginPage, logout, googleAuth, googleRedirect
}