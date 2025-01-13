import url from 'url';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catsPath = path.resolve(__dirname, '../data/cats.json');
const cats = JSON.parse(await fs.readFile(catsPath, 'utf-8'));

export const homeHandler = async (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // showing HOME html
    if (pathname === '/' && req.method === 'GET') {
        try {
            const filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
            const data = await fs.readFile(filePath, { encoding: 'utf-8' });

            const catsTemplate = cats.map(
                (cat) => `<li>
                        <img src="${cat.imageUrl}" alt="${cat.name}" />
                        <h3>${cat.name}</h3>
                        <p><span>Breed: </span>${cat.breed}</p>
                        <p><span>Description: </span>${cat.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="">Change Info</a></li>
                            <li class="btn delete"><a href="">New Home</a></li>
                        </ul>
                    </li>`
            );

            let modifiedData = data.toString().replace('{{cats}}', catsTemplate);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    } else {
        return true;
    }
};
