import url from 'url';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import qs from 'querystring';
import { v4 as uuid } from 'uuid';

const viewsPath = new URL('../views/home/index.html', import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catsPath = path.resolve(__dirname, '../data/cats.json');
const breedsPath = path.resolve(__dirname, '../data/breeds.json');

const cats = JSON.parse(await fs.readFile(catsPath, 'utf-8'));
const breeds = JSON.parse(await fs.readFile(breedsPath, 'utf-8'));

export const catHandler = async (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // Showing ADD CAT HTML
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        try {
            const filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
            const addCatHtmlData = await fs.readFile(filePath);

            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = addCatHtmlData.toString().replace('{{catBreeds}}', catBreedPlaceholder);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write(data);
            res.write(modifiedData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Page Not Found');
            res.end();
        }
    }

    // Showing ADD Breed HTML
    if (pathname === '/cats/add-breed' && req.method === 'GET') {
        try {
            const filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
            const addBreedHtmlData = await fs.readFile(filePath);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(addBreedHtmlData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    }

    // ADD NEW CATS to the JSON
    if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const formData = new URLSearchParams(body);

            try {
                const catsFromJson = await fs.readFile('./data/cats.json', { encoding: 'utf-8' });
                const catsArr = JSON.parse(catsFromJson);

                catsArr.push({
                    id: uuid(),
                    ...Object.fromEntries(formData.entries()),
                });
                const catsData = JSON.stringify(catsArr, null, 2);
                await fs.writeFile('./data/cats.json', catsData, { encoding: 'utf-8' });

                res.writeHead(302, { location: '/' });
                res.end();
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error saving cat data');
                res.end();
            }
        });
    }

    // ADD NEW BREEDS to the JSON
    if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            let formData = qs.parse(body);

            try {
                const breedsFromJson = await fs.readFile('./data/breeds.json', { encoding: 'utf-8' });
                const breedsArr = JSON.parse(breedsFromJson);

                breedsArr.push(formData.breed);
                const breedsData = JSON.stringify(breedsArr, null, 2);

                await fs.writeFile('./data/breeds.json', breedsData, { encoding: 'utf-8' });

                res.writeHead(302, { location: '/' });
                res.end();
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error saving breed data');
                res.end();
            }
        });
    } else {
        return true;
    }
};
