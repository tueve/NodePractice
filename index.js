const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
// HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/** response for homepage */
app.get('/', (req, res) =>
	res.render('home', {
		title: 'homepage'
	})
);

/** response for about */
app.get('/about', (req, res) => res.send(`<h1>ash</h1>`));

/** response for add page */

app.get('/todo/add', (req,res) => res.render('add'))

app.listen(3000, () =>
	console.log('server is connected...')
);
