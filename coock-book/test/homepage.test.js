import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

const homeUrl = 'http://localhost:3000/';
let browser, page;

before(async () => (browser = await chromium.launch()));
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());
after(async () => await browser.close());

//
// Describe all THE TESTS in this section
describe('Home page:', async () => {
    it('Should load home page', async () => {
        await page.goto(homeUrl);

        // define the logic of the test
        const isVisible = await page.isVisible('#home-section'); //check if element with id=home-section is presented
        expect(isVisible).to.be.true;
    });

    it('Should load detail page', async () => {
        await page.goto(homeUrl);

        await page.click('#home-section article:first-of-type'); // click on the first article in home-section element
        await page.waitForLoadState(); // wait the info(with all resourses) from the server to be loaded

        expect(await page.isVisible('div.ingredients')).to.be.true; // check if element from the clicked page is presented
    });
});
