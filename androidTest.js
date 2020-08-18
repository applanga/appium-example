const wdio = require("webdriverio");
const assert = require("assert");

const SELECTORS = {
    LOGIN_SCREEN: '~Login-screen'
};

const packageAttribute = 'com.applanga.applangaandroidtest:id/';

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "9",
    deviceName: "Pixel_3_API_28",
    app: "/Users/richard/Documents/appium-example/builds/android.apk",
    appPackage: "com.applanga.applangaandroidtest",
    appActivity: "com.applanga.androidsample.MainActivity",
    automationName: "UiAutomator2"
  }
};

async function main () {
	const client = await wdio.remote(opts);

	await client.pause(1000)


	var selector = 'android=new UiSelector().resourceId(\"com.applanga.applangaandroidtest:id/main_activity_button_show_activity\").className(\"android.widget.Button\")';
	const button = await client.$(selector);

	console.log("Clicked");
	console.log(button);
	button.click();

	await client.pause(2000)


	// const field = await client.$("android.widget.EditText");
	// await field.setValue("Hello World!");
	// const value = await field.getText();
	// assert.equal(value, "Hello World!");


	await client.deleteSession();
}

main();
