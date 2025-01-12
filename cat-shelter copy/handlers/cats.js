import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const cats = JSON.parse(fs.readFileSync('./data/cats.json', 'utf-8'));
const breeds = JSON.parse(fs.readFileSync('./data/breeds.json', 'utf-8'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const catHandler = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // showing ADD CAT HTML
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        // TODO ...
    }

    // Showing ADD Breed HTML
    if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let breedData = '';
    } else {
        return true;
    }
};
