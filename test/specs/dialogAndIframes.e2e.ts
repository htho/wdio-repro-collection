
let dialogCount = 0
before(async () => {
	browser.on("dialog", (dialog) => {

        console.log(
            '---->',
            browser.capabilities.browserName,
            dialog.message(),
        );
        
        dialogCount++;
        
        setTimeout(() => {
            dialog.accept();
        }, 3_000);
	});
});

describe('empty', () => {
    before(async () => {
        await browser.url(`about:blank`);
        dialogCount = 0;
    });
	it("is triggered", async () => {
		await browser.execute(() => alert('my alert'));
        // "my alert" will be logged once
        expect(dialogCount).toBe(1);
    });
});

describe('iframe', () => {
    before(async () => {
        dialogCount = 0;
        await browser.url(`https://htho.github.io/wdio-repro-collection/iframeNavigation.html`);
    });
	it("is triggered", async () => {
        await browser.execute(() => alert('my alert'));
        // "my alert" will be logged twice
        expect(dialogCount).toBe(1);
    });
});

