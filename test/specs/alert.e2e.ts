
import { expect, browser } from '@wdio/globals'

beforeEach(async () => {
    await browser.url(`https://htho.github.io/wdio-repro-collection/alert.html`)
});

describe('alert', () => {
    it.skip("can be debugged", async () => {
        await browser.debug();
    });
    it("can be tested", async () => {
        await $("#alert").click();
        // await browser.isAlertOpen(); // chrome only
        expect(browser.getAlertText()).resolves.toBe("foo");
    });
    it("can be paused and tested", async () => {
        await $("#alert").click();
        await browser.pause(2_000);
        await expect(browser.getAlertText()).resolves.toBe("foo");
    });
});
describe('delayedAlert', () => {
    it("can be tested", async () => {
        await $("#delayedAlert").click();
        // await browser.isAlertOpen(); // chrome only
        expect(browser.getAlertText()).resolves.toBe("foo");
    });
    it("can be paused and tested", async () => {
        await $("#delayedAlert").click();
        await browser.pause(2_000);
        await expect(browser.getAlertText()).resolves.toBe("foo");
    });
});

