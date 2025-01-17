
import { expect, browser, $ } from '@wdio/globals'

beforeEach(async () => {
    await browser.url(`https://htho.github.io/wdio-repro-collection/delayedIframe.html`)
});
const delayedIframe = () => $(`#delayedIframe`);
const h1 = () => $(`h1`);

describe('switchFrame', () => {
    it(`(almost) waits automatically for delayedIframe`, async () => {
        await expect( () => browser.switchFrame(delayedIframe())).rejects.toThrow();
        
        // this means, that switchFrame waited, but failed anyway.
        await expect(delayedIframe()).toExist({wait:0});
        await expect(h1()).toHaveText("Delayed Iframe"); // still in parent frame
    });
    it(`works if we wait for delayedIframe`, async () => {
        await delayedIframe().waitForExist();
        await browser.switchFrame(delayedIframe());
        await expect(h1()).toHaveText("Delayed Inner Iframe");
    });
    it(`should let us use our custom switchFrame to wait for delayedIframe`, async () => {
        await switchFrame(delayedIframe());
        await expect(h1()).toHaveText("Delayed Inner Iframe");
    });
    async function switchFrame(sel: ChainablePromiseElement) {
        await sel.waitForExist();
        await browser.switchFrame(sel);
    }
});

