import url from 'url';
import fs from 'fs';
import path from 'path';

import cats from '../data/catsDatabase.json';
import breeds from '../data/breedsDatabase.json';

export default (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
    } else {
        return true;
    }
};
