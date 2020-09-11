const wdio = require("webdriverio");
const applanga = require("applangaappiumutils");


var client

async function main () {
	
	await connectClient(false)

	await applanga.enableDraftModeIos(client,"ffa0")

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
			app: __dirname + "/TestingApps/AppiumTestAppReactNative/ios/DerivedData/ExampleApp/Build/Products/Debug-iphonesimulator/ExampleApp.app",
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
	logPage()
	let button = await client.$("~Open Page 2")
	button.click()
}

async function logPage()
{
  let source = await client.getPageSource()
	log(source)
}

function log(msg)
{
  console.log(msg)
}
main();
