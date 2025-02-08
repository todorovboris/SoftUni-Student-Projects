import express, { urlencoded } from 'express';
import handlebars from 'express-handlebars';

import routes from './routes.js';

const app = express();

//! Handlebars setup
app.engine('hbs', handlebars.engine({ extname: 'hbs', runtimeOptions: { allowProtoPropertiesByDefault: true } }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//! Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

//! Start express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
