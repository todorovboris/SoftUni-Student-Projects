import fs from 'fs/promises';

const homeView = new URL('../views/home/index.html', import.meta.url);

export const homeHandler = async (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        try {
            const htmlData = await fs.readFile(homeView, { encoding: 'utf-8' });

            const catsPath = new URL('../data/cats.json', import.meta.url);
            const cats = JSON.parse(await fs.readFile(catsPath, { encoding: 'utf-8' }));

            const catsTemplate = cats
                .map(
                    (cat) => `<li>
                        <img src="${cat.imageUrl}" alt="${cat.name}" />
                        <h3>${cat.name}</h3>
                        <p><span>Breed: </span>${cat.breed}</p>
                        <p><span>Description: </span>${cat.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                            <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                        </ul>
                    </li>`
                )
                .join('');

            const modifiedHomePageHtml = htmlData.replace('{{cats}}', catsTemplate);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedHomePageHtml);
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
