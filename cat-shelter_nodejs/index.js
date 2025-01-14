import http from 'http';
import hendlers from './handlers/index.js';

const server = http.createServer((req, res) => {
    for (let hendler of hendlers) {
        if (!hendler(req, res)) {
            break;
        }
    }
});

server.listen(4000);
console.log('Server is listening on http://localhost:4000...');
