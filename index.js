const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const app = express();

//add public folder path
app.use(express.static(path.join(__dirname, 'public')));
//config db mongo
const db = require('./config/database');

// config mongoose
mongoose
		.connect(db.mongoURI)
		.then(() => console.log('MongoDB is connected'));

require('./models/User');

const User = mongoose.model('user');

//middleware for express session
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

//middleware for passport

app.use(passport.initialize());
app.use(passport.session());

// config for passport strategy
require('./config/passport')(passport);
require('./config/googleauth')(passport);

//configure middleware for flash
app.use(flash());
app.use((req, res, next) => {
		res.locals.success_msg = req.flash('success_msg');
		res.locals.delete_msg = req.flash('delete_msg');
		res.locals.update_msg = req.flash('update_msg');
		res.locals.error_msg = req.flash('error_msg');
		res.locals.error = req.flash('error');
		res.locals.usernameAuth = req.user || null;
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
const auth = require('./routes/auth');

/** response for homepage */
app.get('/', (req, res) => res.render('home', {title: 'homepage'}));

app.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/todo/list',
		failureFlash: true,
		successFlash: 'Welcome!'
}));

app.post('/logout', (req, res) => {
		req.logout();
		req.flash('success_msg', 'you have logged out');
		res.redirect('/');
});

// use Route

app.use('/todo', todo);
app.use('/user', user);
app.use('/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is connected...'));
