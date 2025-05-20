
import { expect, browser, $ } from '@wdio/globals'

beforeEach(async () => {
    await browser.url(`https://htho.github.io/wdio-repro-collection/delayedIframe.html`)
});

describe('switchFrame', () => {
    it(`can take a selector of a delayed iframe (works in 9.14.0)`, async () => {
        await browser.switchFrame($(`#delayedIframe`));
        await expect($(`h1`)).toHaveText("Delayed Inner Iframe");
    });
    it(`can take an url of a delayed iframe (fails in 9.14.0)`, async () => {
        await browser.switchFrame(`https://htho.github.io/wdio-repro-collection/delayedIframeInner.html`);
        await expect($(`h1`)).toHaveText("Delayed Inner Iframe");
    });
    it(`can take a function to identify a delayed iframe (fails in 9.14.0)`, async () => {
        await browser.switchFrame(() => document.URL.includes('delayedIframeInner'));
        await expect($(`h1`)).toHaveText("Delayed Inner Iframe");
    });
});

