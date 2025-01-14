import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200);
    res.send('Hello from Express!');
});

app.listen(5001, () => console.log('Server is listening on http://localhost:5001...'));
