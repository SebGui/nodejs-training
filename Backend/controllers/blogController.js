const Blog = require('../models/blog');

/*
** blogGetAll, blogGetOne, blogCreate, blogDelete, blogGetCreatePage
*/

const blogGetAll = (req, res) => {
    Blog.find().sort({createdAt:-1})
        .then((result) => {
            // Return result for frontend update
            res.render('blogs/index', {title:'All blogs', blogs: result});

            // For json : res.send(result);
        }).catch((err) => {
            // Return error for frontend update
            console.log("Error : ", err);
        });
}

const blogGetOne = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            // Return result for frontend update
            res.render('blogs/detail', {title:'Detail page', blog: result});

            // For json : res.send(result);
        }).catch((err) => {
            // Return error for frontend update
            res.status(404).render('404', {title: 'Blog not found'})
        });
}

const blogCreate = (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    });

    blog.save()
        .then((result) => {
            // Return result for frontend update
            res.redirect('/blogs');
        }).catch((err) => {
            // Return error for frontend update
            console.log("Error : ", err);
        });
}

const blogDelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            // Return result for frontend update
            res.json({redirect: '/blogs'});
        }).catch((err) => {
            // Return error for frontend update
            console.log("Error : ", err);
        });
}

const blogGetCreatePage = (req, res) => {
    res.render('blogs/create', {title:'Create'});
}



module.exports = {
    blogGetAll, blogGetOne, blogCreate, blogDelete, blogGetCreatePage
}