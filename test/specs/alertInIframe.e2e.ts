let _dialog: PromiseWithResolvers<WebdriverIO.Dialog> | undefined;
before(async () => {
	browser.on("dialog", (dialog) => {
        if(_dialog === undefined) throw new Error("Received a dialog event but no resolver is set up!");
        _dialog.resolve(dialog);
    });
});

beforeEach(async () => {
    _dialog = Promise.withResolvers<WebdriverIO.Dialog>();
    await browser.switchFrame(null);
    await browser.url(`https://htho.github.io/wdio-repro-collection/alertInIframeParent.html`);
});

describe('dialog', () => {
    it("is triggered and handled in parent (works in chrome & firefox)", async () => {
        if(_dialog === undefined) throw new Error("Dialog resolver must be setup at this point!");

        await $(`#alert`).click();

        await expect(_dialog.promise).resolves.toBeDefined();
        const dialog = await _dialog.promise;

        await expect(dialog.message()).toBe("my alert (parent)");

        console.log("####################################################### A")
        await dialog.accept();
        console.log("####################################################### B")
        await browser.switchFrame(null);
        console.log("####################################################### C")
    });

    it("is triggered and accepted in child (works in chrome but not in firefox)", async () => {
        if(_dialog === undefined) throw new Error("Dialog resolver must be setup at this point!");
        
        await browser.switchFrame($(`iframe`));
        
        await $(`#alert`).click();

        await expect(_dialog.promise).resolves.toBeDefined();
        const dialog = await _dialog.promise;

        await expect(dialog.message()).toBe("my alert (iframe)");

        console.log("####################################################### A")
        await dialog.accept(); // no effect in firefox
        console.log("####################################################### B")
        await browser.switchFrame(null); // fails here - we can not switch the frame while a dialog is open.
        console.log("####################################################### C")
    });

    it("is triggered in child but accepted in top-level (works neither in chrome nor in firefox)", async () => {
        if(_dialog === undefined) throw new Error("Dialog resolver must be setup at this point!");
        
        await browser.switchFrame($(`iframe`));
        
        await $(`#alert`).click();

        await expect(_dialog.promise).resolves.toBeDefined();
        const dialog = await _dialog.promise;

        await expect(dialog.message()).toBe("my alert (iframe)");

        console.log("####################################################### A")
        await browser.switchFrame(null);
        console.log("####################################################### B")
        await dialog.accept();
        console.log("####################################################### C")
    });

    it("is triggered in child but appears when we are in the top-level (works neither in chrome nor in firefox)", async () => {
        if(_dialog === undefined) throw new Error("Dialog resolver must be setup at this point!");
        
        await browser.switchFrame($(`iframe`));
        
        await $(`#delayedAlert`).click();
        await browser.switchFrame(null);

        await expect(_dialog.promise).resolves.toBeDefined();
        const dialog = await _dialog.promise;

        await expect(dialog.message()).toBe("my delayed alert (iframe)");

        console.log("####################################################### A")
        await dialog.accept(); // no effect in chrome and firefox
        console.log("####################################################### B")
        await browser.switchFrame(null); // fails here - we can not switch the frame while a dialog is open.
        console.log("####################################################### C")
    });
});

