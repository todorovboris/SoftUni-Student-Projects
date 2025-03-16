import express, { urlencoded } from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import routes from './routes.js';
import { authMiddleware } from './middlewares/auth-middleware.js';

const app = express();

//! DB setup
try {
    const uri = 'mongodb://localhost:27017/power-of-nature';
    await mongoose.connect(uri);

    console.log('Connected to DB Successfull!');
} catch (err) {
    console.log('Cannot connect to DB!');
    console.error(err.message);
}

//! Handlebars setup
app.engine('hbs', handlebars.engine({ extname: 'hbs', runtimeOptions: { allowProtoPropertiesByDefault: true } }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

//! Express setup
app.use(express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(routes);

//! Start express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
