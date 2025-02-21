
before(async () => {
	browser.on("dialog", (dialog) => {

		console.log(dialog.message()); // CHECK OUTPUT
        
        setTimeout(() => {
            dialog.accept();
        }, 3_000);
	});
});

describe('empty', () => {
    before(async () => {
        await browser.url(`about:blank`);
    });
	it("is triggered", async () => {
		await browser.execute(() => alert('my alert'));
        // "my alert" will be logged once
    });
});

describe('iframe', () => {
    before(async () => {
        await browser.url(`https://htho.github.io/wdio-repro-collection/iframeNavigation.html`);
    });
	it("is triggered", async () => {
        await browser.execute(() => alert('my alert'));
        // "my alert" will be logged twice
    });
});

