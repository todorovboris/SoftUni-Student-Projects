import url from 'url';
import fs from 'fs/promises'; // Използваме fs.promises за асинхронни операции
import path from 'path';
import { fileURLToPath } from 'url';
import qs from 'querystring';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const catHandler = async (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // showing ADD CAT HTML
    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        try {
            const filePath = path.normalize(path.join(__dirname, '../views/addCat.html'));
            const data = await fs.readFile(filePath);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        // TODO...
    }

    // Showing ADD Breed HTML
    if (pathname === '/cats/add-breed' && req.method === 'GET') {
        try {
            const filePath = path.normalize(path.join(__dirname, '../views/addBreed.html'));
            const data = await fs.readFile(filePath);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (chunk) => {
            formData += chunk;
        });

        req.on('end', async () => {
            let body = qs.parse(formData);

            try {
                const breedsFromJson = await fs.readFile('./data/breeds.json', { encoding: 'utf-8' });
                const breeds = JSON.parse(breedsFromJson);

                breeds.push(body.breed);
                const jsonData = JSON.stringify(breeds);

                await fs.writeFile('./data/breeds.json', jsonData);

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
