import url from 'url';
import fs from 'fs';
import path from 'path';

function getContentType(url) {
    if (url.endsWith('css')) {
        return 'text/css';
    } else if (url.endsWith('html')) {
        return 'text/html';
    } else if (url.endsWith('ico')) {
        return 'text/ico';
    }
}

export const staticFiles = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname.startsWith('/content') && req.method === 'GET') {
        fs.readFile(`./${pathname}`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, {
                    'content-type': 'text/plain',
                });
                res.write('Error was found!');
                res.end();
                return;
            }

            console.log(pathname);

            res.writeHead(200, { 'content-type': getContentType(pathname) });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};
