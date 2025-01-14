import url from 'url';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import qs from 'querystring';
import { v4 as uuid } from 'uuid';

const addCatView = new URL('../views/addCat.html', import.meta.url);
const addBreedView = new URL('../views/addBreed.html', import.meta.url);
const editCatView = new URL('../views/editCat.html', import.meta.url);
const catShelterView = new URL('../views/catShelter.html', import.meta.url);

const catsPath = new URL('../data/cats.json', import.meta.url);
const breedsPath = new URL('../data/breeds.json', import.meta.url);

const cats = JSON.parse(await fs.readFile(catsPath, { encoding: 'utf-8' }));
const breeds = JSON.parse(await fs.readFile(breedsPath, { encoding: 'utf-8' }));

export const catHandler = async (req, res) => {
    // Showing ADD CAT Page
    if (req.url === '/cats/add-cat' && req.method === 'GET') {
        try {
            const htmlData = await fs.readFile(addCatView, { encoding: 'utf-8' });

            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = htmlData.toString().replace('{{catBreeds}}', catBreedPlaceholder);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            // res.write(data);
            res.write(modifiedData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Page Not Found');
            res.end();
        }
    }

    // Showing ADD Breed Page
    if (req.url === '/cats/add-breed' && req.method === 'GET') {
        try {
            const htmlData = await fs.readFile(addBreedView, { encoding: 'utf-8' });

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(htmlData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            res.end();
        }
    }

    // ADD NEW CATS to the JSON
    if (req.url === '/cats/add-cat' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            const formData = new URLSearchParams(body);

            try {
                const catsFromJson = await fs.readFile('./data/cats.json', { encoding: 'utf-8' });
                const catsArr = JSON.parse(catsFromJson);

                catsArr.push({
                    id: uuid(),
                    ...Object.fromEntries(formData.entries()),
                });
                const catsData = JSON.stringify(catsArr, null, 2);
                await fs.writeFile('./data/cats.json', catsData, { encoding: 'utf-8' });

                res.writeHead(302, { location: '/' });
                res.end();
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error saving cat data');
                res.end();
            }
        });
    }

    // ADD NEW BREEDS to the JSON
    if (req.url === '/cats/add-breed' && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            let formData = qs.parse(body);

            try {
                const breedsFromJson = await fs.readFile('./data/breeds.json', { encoding: 'utf-8' });
                const breedsArr = JSON.parse(breedsFromJson);

                breedsArr.push(formData.breed);
                const breedsData = JSON.stringify(breedsArr, null, 2);

                await fs.writeFile('./data/breeds.json', breedsData, { encoding: 'utf-8' });

                res.writeHead(302, { location: '/' });
                res.end();
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error saving breed data');
                res.end();
            }
        });
    }

    // Showing EDIT Cat Page
    if (req.url.includes('/cats-edit') && req.method === 'GET') {
        try {
            const htmlData = await fs.readFile(editCatView, { encoding: 'utf-8' });

            const catId = req.url.split('/').pop();
            const currentCat = cats.find((cat) => cat.id === catId);

            let modifiedData = htmlData.toString().replace('{{id}}', catId);
            modifiedData = modifiedData.replaceAll('{{name}}', currentCat.name);
            modifiedData = modifiedData.replaceAll('{{description}}', currentCat.description);
            modifiedData = modifiedData.replaceAll('{{imageUrl}}', currentCat.imageUrl);

            const breedsAsOptions = breeds.map((b) => `<option value="${b}">${b}</option>`);
            modifiedData = modifiedData.replaceAll('{{catBreeds}}', breedsAsOptions.join('/'));

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Page Not Found');
            res.end();
        }
    }

    // Showing Cat SHELTER Page
    if (req.url.includes('/cats-find-new-home') && req.method === 'GET') {
        try {
            const htmlData = await fs.readFile(catShelterView, { encoding: 'utf-8' });

            const catId = req.url.split('/').pop();
            const currentCat = cats.find((cat) => cat.id === catId);

            let modifiedData = htmlData.toString().replace('{{id}}', catId);
            modifiedData = modifiedData.replaceAll('{{name}}', currentCat.name);
            modifiedData = modifiedData.replaceAll('{{description}}', currentCat.description);
            modifiedData = modifiedData.replaceAll('{{imageUrl}}', currentCat.imageUrl);
            modifiedData = modifiedData.replaceAll('{{breed}}', currentCat.breed);

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(modifiedData);
            res.end();
        } catch (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Page Not Found');
            res.end();
        }
    }

    // ADD EDITED CATS to the JSON
    if (req.url.includes('/cats-edit') && req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                // Parse the incoming form data
                const formData = new URLSearchParams(body);

                console.log('Form Data Received:', Object.fromEntries(formData.entries())); // Debugging: log the form data

                // Read the current cats from JSON
                const catsFromJson = await fs.readFile('./data/cats.json', { encoding: 'utf-8' });
                const catsArr = JSON.parse(catsFromJson);

                // Extract the cat ID from the URL
                const catId = req.url.split('/').pop();
                console.log('Cat ID from URL:', catId); // Debugging: log the cat ID

                // Find the cat to edit
                const catIndex = catsArr.findIndex((cat) => cat.id === catId);

                if (catIndex === -1) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Cat not found');
                    res.end();
                    return;
                }

                // Create the updated cat object
                const updatedCat = {
                    id: catId, // Retain the same ID
                    name: formData.get('name') || catsArr[catIndex].name,
                    description: formData.get('description') || catsArr[catIndex].description,
                    breed: formData.get('breed') || catsArr[catIndex].breed,
                    imageUrl: formData.get('imageUrl') || catsArr[catIndex].imageUrl,
                };

                console.log('Updated Cat Object:', updatedCat); // Debugging: log the updated cat object

                // Replace the existing cat in the array
                catsArr[catIndex] = updatedCat;

                // Write the updated cats array back to the JSON file
                const catsData = JSON.stringify(catsArr, null, 2);
                await fs.writeFile('./data/cats.json', catsData, { encoding: 'utf-8' });

                res.writeHead(302, { location: '/' });
                res.end();
            } catch (err) {
                console.error('Error:', err); // Debugging: log the error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error saving cat data');
                res.end();
            }
        });
    }

    return true;
};
