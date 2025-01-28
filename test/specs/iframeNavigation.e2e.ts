
import { expect, browser } from '@wdio/globals'

beforeEach(async () => {
    await browser.url(`https://htho.github.io/wdio-repro-collection/iframeNavigation.html`);
});

for (const goToTop of ["", "go to top after navigation"] as const) {
    describe(`iframeNavigation (${goToTop})`, () => {
        it("should work by using a link with target=_top", async () => {
            await browser.switchFrame("iframeNavigationInner.html");
            await $("a").click();
            if(goToTop !== "") await browser.switchFrame(null);
            await expect($("h1")).toHaveText("Iframe Target");
        });

        it("should work by setting the location", async () => {
            await browser.switchFrame("iframeNavigationInner.html");
            await $("button").click();
            if(goToTop !== "") await browser.switchFrame(null);
            await expect($("h1")).toHaveText("Iframe Target");
        });
    });
}


