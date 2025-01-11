import http from 'http';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';

import mainCss from './content/styles/site.css.js';

import homePage from './views/home/index.html.js';
import addBreedPage from './views/addBreed.html.js';
import addCatPage from './views/addCat.html.js';

let cats = [];
let breeds = [];

showCatsFromJson();
showBreedsFromJson();

const server = http.createServer((req, res) => {
    // POST Request for Adding Cats
    if (req.method === 'POST' && req.url === '/cats/add-cat') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = new URLSearchParams(body);

            cats.push({
                id: uuid(),
                ...Object.fromEntries(data.entries()),
            });

            addNewCatsToJson();

            res.writeHead(302, {
                location: '/',
            });
            res.end();
        });
        return;
    }

    // POST Request for Adding Breeds
    if (req.method === 'POST' && req.url === '/cats/add-breed') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = new URLSearchParams(body);

            breeds.push({
                id: uuid(),
                ...Object.fromEntries(data.entries()),
            });

            addBreedsToJson();

            res.writeHead(302, {
                location: '/cats/add-breed',
            });
            res.end();
        });
        return;
    }

    // Load assets
    if (req.url === '/styles/site.css') {
        res.writeHead(200, {
            'content-type': 'text/css',
        });

        res.write(mainCss);

        return res.end();
    }

    let responseBody;
    let statusCode = 200;

    // Load pages
    switch (req.url) {
        case '/':
            // res.write(homePage(cats));
            responseBody = homePage(cats);
            break;

        case '/cats/add-breed':
            // res.write(addBreedPage());
            responseBody = addBreedPage();
            break;

        case '/cats/add-cat':
            // res.write(addCatPage());
            responseBody = addCatPage(breeds);
            break;

        default:
            // res.write('Page not Found!');
            responseBody = 'Page not Found!';
            statusCode = 400;
            break;
    }

    res.writeHead(statusCode, {
        'content-type': 'text/html',
    });

    res.write(responseBody);
    res.end();
});

// read cats from JSON file
async function showCatsFromJson() {
    try {
        const catsJson = await fs.readFile('./catsDatabase.json', { encoding: 'utf-8' });
        cats = JSON.parse(catsJson);
    } catch (err) {
        console.log(err.message);
    }
}

// write the new array with cats to the JSON file
async function addNewCatsToJson() {
    try {
        const catsData = JSON.stringify(cats, null, 2);
        await fs.writeFile('./catsDatabase.json', catsData, 'utf-8');
    } catch (err) {
        console.log(err.message);
    }
}

// read breeds from JSON file
async function showBreedsFromJson() {
    try {
        const breedsJson = await fs.readFile('./breedsDatabase.json', { encoding: 'utf-8' });
        breeds = JSON.parse(breedsJson);
    } catch (err) {
        console.log(err.message);
    }
}

// write the new array with breeds to the JSON file
async function addBreedsToJson() {
    try {
        const breedsData = JSON.stringify(breeds, null, 2);
        await fs.writeFile('./breedsDatabase.json', breedsData, 'utf-8');
    } catch (err) {
        console.log(err.message);
    }
}

server.listen(4000);
console.log('Server is listening on http://localhost:4000...');
