const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//add public folder path
app.use(express.static(path.join(__dirname, 'public')))

// config mongoose
mongoose
		.connect('mongodb://localhost/test')
		.then(() => console.log('MongoDB is connected'));

//middleware for express session
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

//configure middleware for flash
app.use(flash());
app.use((req, res, next) => {
		res.locals.success_msg = req.flash('success_msg');
		res.locals.delete_msg = req.flash('delete_msg');
		res.locals.update_msg = req.flash('update_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// override method for PUT and DELETE method
app.use(methodOverride('_method'));

// parse application/json
app.use(bodyParser.json());

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// add Route

const todo = require('./routes/todo');
const user = require('./routes/user');

/** response for homepage */
app.get('/', (req, res) => res.render('home', {title: 'homepage'}));

/** response for about */
app.get('/about', (req, res) => res.send(`<h1>ash</h1>`));

// use Route

app.use('/todo', todo);
app.use('/user', user);

app.listen(3000, () => console.log('server is connected...'));
