
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
        await expect(browser.getAlertText()).resolves.toBe("my alert");
    });
    it("fails with wrong value", async () => {
        await $("#alert").click();
        await expect(() =>
            expect(browser.getAlertText()).resolves.toBe("bar")
        ).rejects.toThrowError(/my alert/g);
    });
    it("should be pausable and then tested (but it isn't)", async () => {
        await $("#alert").click();
        await browser.pause(2_000);
        await expect(browser.getAlertText()).resolves.toBe("my alert");
    });
});
describe('delayedAlert', () => {
    it("can be tested", async () => {
        await $("#delayedAlert").click();
        await expect(browser.getAlertText()).resolves.toBe("my alert");
    });
    it("fails with wrong value", async () => {
        await $("#delayedAlert").click();
        await expect(() =>
            expect(browser.getAlertText()).resolves.toBe("bar")
        ).rejects.toThrowError(/my alert/g);
    });
    it("should be pausable and tested (but it isn't)", async () => {
        await $("#delayedAlert").click();
        await browser.pause(2_000);
        await expect(browser.getAlertText()).resolves.toBe("my alert");
    });
});

