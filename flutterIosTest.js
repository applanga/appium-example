const wdio = require("webdriverio");
const applanga = require("applangaappiumutils");


var client

async function main () {
	
	await connectClient(false)

	await applanga.enableDraftModeIos(client,"714b")

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
			language: "en",
			platformName: "iOS",
			platformVersion: "13.6",
			deviceName: "iPhone 8",
			app: __dirname + "/TestingApps/AppiumTestAppFlutter/ios/DerivedData/Runner/Build/Products/Debug-iphonesimulator/Runner.app",
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
	let button = await client.$("~open other view")
	button.click()
}


main();