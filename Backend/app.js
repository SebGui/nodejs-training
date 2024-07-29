// Load express
const express = require('express');

// Express app
const app = express();

// Load Morgan (HTTP request logger)
const morgan = require('morgan');

// Import passport
const passport = require('passport');

// Setup passport for OAuth
const passportSetup = require('./config/passport-setup');

// Routes for /auth requests
const authRoutes = require('./routes/authRoutes');
// Routes for /blogs requests
const blogRoutes = require('./routes/blogRoutes');
// Routes for /profile requests
const profileRoutes = require('./routes/profileRoutes');

// Mongoose init
const mongoose = require('mongoose');

// App Keys
const keys = require('./config/keys');

// Cookie session
var session = require('express-session')

let server = null;
// Connect to MongoDB
const dbURI = keys.mongodb.connectLink;
mongoose.connect(dbURI)
    .then((result) => {
        // Listen to requests, save reference of server to a constant for eg websockets management
        server = app.listen(3000);
    })
    .catch((err) => {
        console.log("Error : ", err);
    });

// Register view engine
app.set('view engine', 'ejs');
//app.set('views', 'folderName');//For folder name other than 'views'

// Cookie Session init 
app.use(session({
    secret: keys.session.cookieKey,
    resave: false,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000
}));


// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Middleware & Static Files (styles etc)
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

// 3rd party Middleware
app.use(morgan('dev'));

// Middleware
/*app.use((req, res, next) => {
    console.log('New request made :');
    console.log('host: ', req.hostname);
    console.log('path : ', req.path);
    console.log('method: ', req.method);
    next();
});

app.use((req, res, next) => {
    console.log('In the next middleware');
    next();
});*/


// Request handling

// '/auth' routes
app.use('/auth', authRoutes);

// '/profile' routes
app.use('/profile', profileRoutes);

// '/blogs' routes
app.use('/blogs', blogRoutes);


// @GET for '/'
app.get('/', (req, res) => {
    res.render('home', {title: 'Home', user:req.session.user});
    //res.redirect('/blogs');// Comment for OAuth flow
});

// @GET for '/about'
app.get('/about', (req, res) => {
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title:'About'});
});

// Redirect '/about-us' to '/about'
/*app.get('/about-us', (req, res) => {
    res.redirect('/about');
})*/

// 404 page, use must be last, it will trigger any request up to those lines
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title:'404'});
});
