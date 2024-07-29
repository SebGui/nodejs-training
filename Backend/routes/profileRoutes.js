const router = require('express').Router();
const profileController = require('../controllers/profileController.js');
const authCheck = require('./authCheck');

router.get('/', authCheck.authCheck, profileController.profileRoot);

module.exports = router;