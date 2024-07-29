// Function to check is user is logged in, otherwise redirect
const authCheck = (req, res, next) => {
    if (req.session.user) next()// Go to callback
    else res.redirect('/auth/login')
};

module.exports = {authCheck};