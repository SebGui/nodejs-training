const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

/*
** Blog routes
*/

// Create page route
router.get('/create', blogController.blogGetCreatePage);

/*
** Blog DB actions
*/

// Get all blogs from DB
router.get('/', blogController.blogGetAll);

// Create blog to DB
router.post('/', blogController.blogCreate);

// Get single blog from id
router.get('/:id', blogController.blogGetOne);

// Delete blog from DB
router.delete('/:id', blogController.blogDelete);

module.exports = router;