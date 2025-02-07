import express, { urlencoded } from 'express';

import routes from './routes.js';

const app = express();

//! Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(routes);

//! Start express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
