const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
//
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
/** response for homepage */
app.get('/', (req, res) => res.render('home'));

/** response for about */
app.get('/about', (req, res) => res.send(`<h1>ash</h1>`));

app.listen(3000, () =>
	console.log('server is connected...')
);
