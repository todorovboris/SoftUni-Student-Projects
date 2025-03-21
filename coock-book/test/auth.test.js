import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

const homeUrl = 'http://localhost:3000/';
let browser, page;

before(async () => (browser = await chromium.launch()));
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());
after(async () => await browser.close());

describe('Authentication', async () => {
    it('Should load default user', async () => {
        await page.goto(homeUrl);
        await page.click('a[href="/login"]');

        await page.fill('input[name=email]', 'peter@abv.bg');
        await page.fill('input[name=password]', '123456');
        await page.click('input[value=Login]');

        await page.waitForSelector('#home-section'); // wait a certain selector to be presented and then define the test
        expect(await page.isVisible('#home-section')).to.be.true;
    });
});
