const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

//middleware for express session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

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

// add mongoose
mongoose
	.connect('mongodb://localhost/test')
	.then(() => console.log('MongoDB is connected'));
// connect to schema

require('./models/TodoList');
const Todo = mongoose.model('todo');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// override method for PUT and DELETE method
app.use(methodOverride('_method'));

// parse application/json
app.use(bodyParser.json());

// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/** response for homepage */
app.get('/', (req, res) =>
	res.render('home', { title: 'homepage' })
);

/** response for about */
app.get('/about', (req, res) => res.send(`<h1>ash</h1>`));

/** response for add page */

app.post('/todo', (req, res) => {
	const error = [];
	if (!req.body.title) {
		error.push({ text: 'missing title' });
	}

	if (!req.body.description) {
		error.push({ text: 'missing description' });
	}

	if (error.length > 0) {
		res.render('/todo/add', {
			title: req.body.title,
			description: req.body.description,
			error: error
		});
	} else {
		const reqTodo = {
			title: req.body.title,
			description: req.body.description
		};
		new Todo(reqTodo).save().then((todo) => {
			req.flash('success_msg', 'todo has been added');
			res.redirect('/todo/list');
		});
	}
});

// handle request for edit page

app.get('/todo/edit/:id', (req, res) => {
	Todo.findOne({ _id: req.params.id }).then((todo) =>
		res.render('edit', { todo: todo })
	);
});

app.put('/todo/update/:id', (req, res) => {
	Todo.findOne({ _id: req.params.id }).then((todo) => {
		todo.title = req.body.title;
		todo.desccription = req.body.description;

		todo.save().then((todo) => {
			req.flash(
				'update_msg',
				'your todo has been updated'
			);
			res.redirect('/todo/list');
		});
	});
});

// handle request for page todo/list

app.get('/todo/list', (req, res) => {
	Todo.find({}).then((todos) =>
		res.render('todolist', { todos: todos })
	);
});

app.delete('/todo/delete/:id', (req, res) => {
	Todo.remove({ _id: req.params.id }).then((todo) => {
		req.flash('delete_msg', 'todo has been deleted');
		res.redirect('/todo/list');
	});
});

app.listen(3000, () =>
	console.log('server is connected...')
);
