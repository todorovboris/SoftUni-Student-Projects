import express from 'express';
import handlebars from 'express-handlebars';

import routes from './routes.js';

const app = express();
app.engine('hbs', handlebars.engine({ extname: 'hbs' })); // what are the extensions of pages and { layouts }

app.set('view engine', 'hbs'); // set the default engine of the app
app.set('views', './src/views'); // set-up where to search the template pages

app.use('/static', express.static('src/public')); // learn express where to search for the static files(images, css, etc...)
app.use(express.urlencoded({ extended: false })); // learn express to parse form data

app.use(routes);
app.listen(5001, () => console.log('Server is listening on http://localhost:5001...'));
