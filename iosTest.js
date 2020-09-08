const wdio = require("webdriverio");
const applanga = require("applangaappiumutils");


var client

async function main () {
	
	await connectClient(false)

	await applanga.enableDraftModeIos(client,"86f8")

	await reopenApp()
	
	await applanga.takeScreenshotWithTagIos(client,"page-1");

	await loadSecondView()

	await applanga.takeScreenshotWithTagIos(client,"page-2");

}

async function connectClient(noReset)
{
	let opts = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
			platformName: "iOS",
			platformVersion: "13.6",
			deviceName: "iPhone 8",
			app: __dirname + "/TestingApps/AppiumTestAppIos/DerivedData/AppiumTestIos/Build/Products/Debug-iphonesimulator/AppiumTestIos.app",
			automationName: "XCUITest",
			noReset: noReset
		}
	};
	client = await wdio.remote(opts);
}

async function reopenApp()
{
	await connectClient(true)
}

async function loadSecondView()
{
	let button = await client.$("~Open Next View")
	button.click()
}


main();
