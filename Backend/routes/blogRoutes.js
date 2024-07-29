const express = require('express');
const blogController = require('../controllers/blogController');
const authCheck = require('./authCheck');
const router = express.Router();

/*
** Blog routes
*/

// Create page route
router.get('/create', authCheck.authCheck, blogController.blogGetCreatePage);

/*
** Blog DB actions
*/

// Get all blogs from DB
router.get('/', authCheck.authCheck, blogController.blogGetAll);

// Create blog to DB
router.post('/', authCheck.authCheck, blogController.blogCreate);

// Get single blog from id
router.get('/:id', authCheck.authCheck, blogController.blogGetOne);

// Delete blog from DB
router.delete('/:id', authCheck.authCheck, blogController.blogDelete);

module.exports = router;