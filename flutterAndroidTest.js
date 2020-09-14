const wdio = require("webdriverio");
const applanga = require("applangaappiumutils");

var client

async function connectClient(noReset)
{
	let opts = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
      platformName: "Android",
      platformVersion: "9",
      deviceName: "Pixel_3_API_28",
      app: __dirname + "/TestingApps/AppiumTestAppFlutter/build/app/outputs/apk/release/app-release.apk",
      appPackage: "com.applanga.applanga_flutter_test_app",
      automationName: "UiAutomator2",
      noReset: noReset
		}
	};
	client = await wdio.remote(opts);
}

async function main () {
	
	await connectClient(false)

	await client.pause(1000)

  await logPage()
  
  await applanga.enableDraftModeAndroid(client,"714b","com.applanga.applanga_flutter_test_app")

  await reopenApp()

	await applanga.takeScreenshotWithTagAndroid(client,"page-1");

  await openSecondView()

	await applanga.takeScreenshotWithTagAndroid(client,"page-2");

	await client.pause(3000)

}

async function reopenApp()
{
	await connectClient(true)
}

async function openSecondView()
{
  const selector = 'new UiSelector().text("open other view").className("android.widget.Button")'
  const button = await client.$(`android=${selector}`)
  button.click()
	await client.pause(1000)
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