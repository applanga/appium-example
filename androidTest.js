const wdio = require("webdriverio");
const assert = require("assert");

const SELECTORS = {
    LOGIN_SCREEN: '~Login-screen'
};

const packageAttribute = 'com.applanga.applangaandroidtest:id/';

const applanga = require("applangaappiumutils");


var client

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
  	appLocal: {"language": "de", "country": "de"},
    platformName: "Android",
    platformVersion: "9",
    deviceName: "Pixel_3_API_28",
    app: __dirname + "/TestingApps/AppiumTestAppAndroid/app/build/outputs/apk/debug/app-debug.apk",
    appPackage: "com.example.appiumtestapp",
    appActivity: "com.example.appiumtestapp.MainActivity",
    automationName: "UiAutomator2"
  }
};

async function main () {
	
	client = await wdio.remote(opts)

	await client.pause(1000)

	await applanga.enableDraftModeAndroid(client,"86f8","com.example.appiumtestapp")

	await applanga.takeScreenshotWithTagAndroid(client,"page-1");

	await openSecondView()

	await applanga.takeScreenshotWithTagAndroid(client,"page-2");

	await client.pause(3000)

}

async function openSecondView()
{
	var selector = 'android=new UiSelector().resourceId(\"com.example.appiumtestapp:id/textView\")';
	let label = await client.$(selector);
	label.click()
	await client.pause(1000)
}


main();
