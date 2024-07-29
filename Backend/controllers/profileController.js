const profileRoot = (req, res) => {
    res.render('profile/index', {title:'Profile page', user: req.session.user});
}



module.exports = {
    profileRoot
}