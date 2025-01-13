import url from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cats = JSON.parse(fs.readFileSync('./data/cats.json', 'utf-8'));
const breeds = JSON.parse(fs.readFileSync('./data/breeds.json', 'utf-8'));

export const homeHandler = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // showing HOME html
    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

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
    } else {
        return true;
    }
};
