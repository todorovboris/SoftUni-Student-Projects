import url from 'url';
import fs from 'fs';
import path from 'path';

import cats from '../data/catsDatabase.json';
import breeds from '../data/breedsDatabase.json';

export default (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('404 Not Found');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else {
        return true;
    }
};
