import http from 'http';
import hendlers from './handlers/index.js';

const server = http.createServer((req, res) => {
    for (let hendler of hendlers) {
        if (!hendler(req, res)) {
            break;
        }
    }

    // res.writeHead(200, {
    //     'content-type': 'text/plain',
    // });

    // res.write('Hello WORLD!');
    // res.end();
});

server.listen(4000);
console.log('Server is listening on http://localhost:4000...');
