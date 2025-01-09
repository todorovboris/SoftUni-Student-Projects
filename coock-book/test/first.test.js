import { chromium } from 'playwright-chromium';

describe('From demo file', async () => {
    it('Should take a screenshot', async () => {
        const broweser = await chromium.launch(); // create virtual(chromium) browser
        //if we want to debug and track what is going on in the browser, add {headless: false, slowMo: '?miliseconds'} in .launc(...)
        const page = await broweser.newPage(); //create new page in our virtual browser

        await page.goto('http://localhost:3000/'); // go to some page
        await page.screenshot({ path: 'screenshot.png' }); // take screenshot and save it in our folder
        await broweser.close(); // close our virtual browser
    });
});
