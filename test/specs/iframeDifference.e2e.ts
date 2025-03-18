
import { expect, browser } from '@wdio/globals'

describe(`iframeDifference`, () => {
    it.skip("debug-time", async () => {
        await browser.url(`https://htho.github.io/wdio-repro-collection/iframeDifference.html`);

        await browser.debug();
    });
    it("p is added by custom element (fails when contentWindow is logged)", async () => {
        await browser.url(`https://htho.github.io/wdio-repro-collection/iframeDifference.html`);

        await browser.switchFrame("https://htho.github.io/wdio-repro-collection/iframeDifferenceInner.html");
        await expect($("my-element")).toExist();
        await expect($("my-element p")).toExist(); // <-- fails
    });
    it("p is added by custom element", async () => {
        await browser.url(`https://htho.github.io/wdio-repro-collection/iframeDifference.html?noLog`);

        await browser.switchFrame("https://htho.github.io/wdio-repro-collection/iframeDifferenceInner.html");
        await expect($("my-element")).toExist();
        await expect($("my-element p")).toExist();
    });
});


