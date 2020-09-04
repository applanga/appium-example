const wdio = require("webdriverio");
const assert = require("assert");

const SELECTORS = {
    LOGIN_SCREEN: '~Login-screen'
};

const packageAttribute = 'com.applanga.applangaandroidtest:id/';
var client

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
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



console.log("Start Session");
	
	client = await wdio.remote(opts)

	await client.pause(1000)

	await enableDraftMode()

	await showScreenshotMenu()
	
	await takeScreenshotWithTag("page-1");

	await hideScreenshotMenu()

	await openSecondView()

	await showScreenshotMenu()

	await takeScreenshotWithTag("page-2");

	await hideScreenshotMenu()

	await client.pause(10000)


}

async function openSecondView()
{
	logPage();
	let label = await getElement("textView")

	label.click()

	await client.pause(1000)
}

async function takeScreenshotWithTag(tag)
{
	
	await client.pause(500)

	let tagSelect = await getElement("applanga_spinner_screentag_select")

	tagSelect.click()

	await client.pause(500)

	const tagItem = await client.$('android=new UiSelector().text(\"' + tag +'\")')
	tagItem.click()

	await client.pause(500)

	let captureScreenbutton = await getElement("applanga_button_capture_screen")

	await captureScreenbutton.click()

	await client.pause(500)


}

async function showScreenshotMenu()
{
	await client.pause(500);
	client.touchPerform([
	  { action: 'press', options: { x: 0, y: 500 }},
	  { action: 'moveTo', options: { x: 0, y: 200}},
	  { action: 'release' }
	]);
	await client.pause(500);

}

async function hideScreenshotMenu()
{
	await client.pause(500);
	client.touchPerform([
	  { action: 'press', options: { x: 0, y: 500 }},
	  { action: 'moveTo', options: { x: 0, y: -200}},
	  { action: 'release' }
	]);
	await client.pause(500);

}

async function enableDraftMode() 
{
	await client.touchPerform([
	  {action: 'press',options: {x: 10,y: 100}},
	  {action: 'wait',options: {ms: 6000}},
	  { action: 'release' }

	]);	

	await client.pause(1000);

	var passwordEditText = await getElement("applanga_password");

	await client.pause(500);

	passwordEditText.addValue("86f8");

	await client.pause(500);

	var okButton = await getElement("applanga_button_ok");

	await okButton.click();

	await client.pause(3000);


}

async function getElement(id)
{
	var selector = 'android=new UiSelector().resourceId(\"com.example.appiumtestapp:id/' + id + '\")';
	log("USING SELECTOR: " + selector);
	return await client.$(selector);
}

function log(msg)
{
	console.log(msg);
}

function logPage()
{
	log(client.getPageSource())
}

main();
