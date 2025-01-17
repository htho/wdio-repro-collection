
import { expect, browser } from '@wdio/globals'

describe('browser.url', () => {
    for (const [name, value] of Object.entries({nothing: "", query: "?foo=bar", hash: "#reloadCounter"})) {
        it(`reloads with ${name}`, async () => {
            const url = `https://htho.github.io/wdio-repro-collection/reloadCounter.html${value}`;
            
            await browser.url(url);
            
            await $("#reset").click();
            await expect($("#counter")).toHaveValue("0");
            
            await browser.url(url);
    
            await expect($("#counter")).toHaveValue("0");

            await browser.url(url);
    
            await expect($("#counter")).toHaveValue("1");
        });
    }
});

