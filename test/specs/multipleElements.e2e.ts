
import { expect, browser, $$ } from '@wdio/globals'

describe('$$', () => {
    it(`counts (fails when a custom element is used and defined)`, async () => {
        await browser.url(`https://htho.github.io/wdio-repro-collection/multipleElements.html`)
        console.log(await $$("p").map(e=> e.elementId));
        await expect($$("p")).toBeElementsArrayOfSize(2);
    });
    it(`counts (ok if a used custom element stays not defined)`, async () => {
        await browser.url(`https://htho.github.io/wdio-repro-collection/multipleElements.html?noCustom`)
        await expect($$("p")).toBeElementsArrayOfSize(2);
    });
});

