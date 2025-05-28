
import { expect, browser, $ } from '@wdio/globals'

beforeEach(async () => {
    await browser.url(`https://htho.github.io/wdio-repro-collection/iframeInShadow.html`)
});

describe('select an element in the shadow dom', () => {
    it(`works using direct piercing as introduced in v9 with "child" (fails in 9.14.0)`, async () => {
        const $el = $("#headlineInShadow");
        await expect($el).toExist(); // FAILS
        await expect($el).toHaveText("Headline in Shadow Root");
    });
    it(`works using direct piercing as introduced in v9 with "parent child" (fails in 9.14.0)`, async () => {
        const $el = $("#wrapper #headlineInShadow");
        await expect($el).toExist(); // FAILS
        await expect($el).toHaveText("Headline in Shadow Root");
    });
    it(`works using classic piercing with ">>>child" (works in 9.14.0)`, async () => {
        const $el = $(">>>#headlineInShadow");
        await expect($el).toExist();
        await expect($el).toHaveText("Headline in Shadow Root");
    });
    it(`works using classic piercing with "parent>>>child" (fails in 9.14.0)`, async () => {
        const $el = $("#wrapper>>>#headlineInShadow");
        
        // FAILS in chrome: WebDriverError: invalid selector: An invalid or illegal selector was specified  (Session info: chrome=135.0.7049.115) when running "element" with method "POST" and args "{"using":"css selector","value":"#wrapper>>>#headlineInShadow"}"
        // FAILS in firefox: WebDriverError: Given css selector expression "#wrapper>>>#headlineInShadow" is invalid: InvalidSelectorError: Document.querySelector: '#wrapper>>>#headlineInShadow' is not a valid selector: "#wrapper>>>#headlineInShadow" when running "element" with method "POST" and args "{"using":"css selector","value":"#wrapper>>>#headlineInShadow"}"
        await expect($el).toExist();

        await expect($el).toHaveText("Headline in Shadow Root");
    });
    it(`works using $("parent").shadow$("child") (works in 9.14.0)`, async () => {
        const $el = $("#wrapper").shadow$("#headlineInShadow");
        await expect($el).toExist();
        await expect($el).toHaveText("Headline in Shadow Root");
    });
});

describe('switchFrame to an iframe in the shadow dom', () => {
    it(`works (fails in 9.14.0)`, async () => {
        const $iframe = $("#wrapper").shadow$("iframe");
        await expect($iframe).toExist();

        // FAILS in chrome: WebDriver Bidi command "script.callFunction" failed with error: invalid argument - Invalid input in "arguments"/0.
        // FAILS in firefox: WebDriver Bidi command "script.callFunction" failed with error: invalid argument - Expected "type" to be a string, got [object Undefined] undefined
        await browser.switchFrame($iframe);
        
        await expect($(`h1`)).toHaveText("Iframe Target");
    });
});

