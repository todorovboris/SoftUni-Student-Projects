import http from 'http';
import { v4 as uuid } from 'uuid';
import fs from 'fs/promises';

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/plain',
    });

    res.write('Hello WORLD!');
    res.end();
});

server.listen(4000);
console.log('Server is listening on http://localhost:4000...');
