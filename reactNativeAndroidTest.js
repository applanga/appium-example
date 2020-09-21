const wdio = require("webdriverio");
const applanga = require("applangaappiumutils");

var client
var languagesToUse = ["de","en"]
var localesToUse = ["DE","us"]

async function connectClient(noReset,language,locale)
{
	let opts = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
			locale: locale,
			language: language,
			platformName: "Android",
			platformVersion: "7",
			deviceName: "Nexus_5X_API_24",
			app: __dirname + "/TestingApps/AppiumTestAppReactNative/android/app/build/outputs/apk/debug/app-debug.apk",
			appPackage: "com.exampleapp",
			automationName: "UiAutomator2",
			noReset: noReset
		}
	};
	client = await wdio.remote(opts);
}

async function main () {
	
	for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
		await connectClient(false,language,locale)
		await client.pause(1000)
		await logPage()
		await applanga.enableDraftModeAndroid(client,"ffa0","com.exampleapp")
		await connectClient(true,language,locale)
		await applanga.takeScreenshotWithTagAndroid(client,"page-1");
		await openSecondView()
		await applanga.takeScreenshotWithTagAndroid(client,"page-2");
	}

	await client.pause(3000)

}

async function openSecondView()
{
  const selector = 'new UiSelector().text("OPEN PAGE 2")'
  const button = await client.$(`android=${selector}`)
  log(button)
  let buttonPosition = await button.getLocation()
	
	await client.touchAction({
	  action: 'tap',
	  x: buttonPosition.x + 5,
	  y: buttonPosition.y + 5
  })
  
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
