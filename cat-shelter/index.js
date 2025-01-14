import express from 'express';

const app = express();
app.listen(5001, () => console.log('Server is listening on http://localhost:5001...'));

app.get('/', homePageHandler);
app.get('/search', searchPageHandler);
app.get('/user/:userId', userIdPage);
app.get('*', notfound); // всичко, което НЕ влиза в горните пътища

function homePageHandler(req, res) {
    res.send('<h3>Home Page</h3>');
}

function searchPageHandler(req, res) {
    res.send('<h3>Search Page</h3>');
}

function userIdPage(req, res) {
    const paramsObj = req.params;
    res.send(paramsObj); // връща обект с ключ името на параметъра и стойност = рикуестнатата
}

function notfound(req, res) {
    res.send('<h1>404 Page Not Found!</h1>');
}
