import http from 'http';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';

import mainCss from './content/styles/site.css.js';

import homePage from './views/home/index.html.js';
import addBreedPage from './views/addBreed.html.js';
import addCatPage from './views/addCat.html.js';

let cats = [];

showCatsFromJson();

const server = http.createServer((req, res) => {
    // POST Request
    if (req.method === 'POST') {
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

            console.log(cats);

            res.writeHead(302, {
                location: '/',
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
            responseBody = addCatPage();
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

async function showCatsFromJson() {
    // read cats
    try {
        const catsJson = await fs.readFile('./catsDatabase.json', { encoding: 'utf-8' });
        cats = JSON.parse(catsJson);
    } catch (err) {
        console.log(err.message);
    }
}

server.listen(4000);
console.log('Server is listening on http://localhost:4000...');
