import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import routes from './routes.js';
import { authMiddleware } from './middlewares/auth-middleware.js';
import showRatingHelper from './helpers/rating-helper.js';

const app = express();
app.listen(5001, () => console.log('Server is listening on http://localhost:5001...'));

// !db config
try {
    const localUri = 'mongodb://localhost:27017/movie-magic';
    const uri = process.env.DATABASE_URI; // !using the ENVIREMENT VARIABLES
    await mongoose.connect(uri ?? localUri);
    console.log('DB Connected Successfully!');
} catch (err) {
    console.log('Cannot connect to DB!');
    console.console.error(err.message);
}

// !handlebars config
app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
        helpers: {
            showRating: showRatingHelper,
        },
    })
); // what are the extensions of pages and { layouts }; add express helpers for custom logics
app.set('view engine', 'hbs'); // set the default engine of the app
app.set('views', './src/views'); // set-up where to search the template pages

// !express config
app.use('/static', express.static('src/public')); // learn express where to search for the static files(images, css, etc...)
app.use(express.urlencoded({ extended: false })); // learn express to parse form data
app.use(cookieParser());
app.use(authMiddleware);

// !routes setup
app.use(routes);
