const wdio = require("webdriverio");
const applanga = require("applangaappiumutils");


var client
var languagesToUse = ["de","en"]

async function main () {
	
	for (let i = 0; i < languagesToUse.length; i++) {
		const language = languagesToUse[i]
		await connectClient(false,language)

		await applanga.enableDraftModeIos(client,"714b")

		await connectClient(true,language)
		await applanga.takeScreenshotWithTagIos(client,"page-1");
		await loadSecondView()
		await applanga.takeScreenshotWithTagIos(client,"page-2");
	}
}

async function connectClient(noReset,language)
{
	let opts = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
			language: language,
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



async function loadSecondView()
{
	let button = await client.$("~open other view")
	button.click()
}


main();
