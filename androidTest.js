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
    appPackage: "com.example.appiumtestapp",
    appActivity: "com.example.appiumtestapp.MainActivity",
    automationName: "UiAutomator2"
  }
};

async function main () {



console.log("Start Session");

	log("starting Screenshot uploads");
	
	var client = await wdio.remote(opts);

	await client.pause(1000)

	log("Enabling Draft Mode tests");

	await enableDraftMode(client);

	await showScreenshotMenu(client);
	//var selector = 'android=new UiSelector().resourceId(\"com.applanga.applangaandroidtest:id/main_activity_button_show_activity\").className(\"android.widget.Button\")';
	//const button = await client.$(selector);
	//button.click();

	await selectTag(client,"test");

	await client.pause(10000)


}

async function selectTag(client,tag)
{
	
	var list = await getElement(client,"applanga_spinner_screentag_select","android.widget.Spinner");

	log("Got List?");

	log(list);

	list.scrollToExact("test");

}

async function showScreenshotMenu(client)
{
	client.touchPerform([
	  { action: 'press', options: { x: 500, y: 500, count: 2 }},
	  { action: 'moveTo', options: { x: 500, y: 200}},
	  { action: 'release' }
	]);
	await client.pause(1000);

}

async function enableDraftMode(client) 
{
	client.touchPerform([
	  {action: 'press',options: {x: 500,y: 500}},
	  {action: 'wait',options: {ms: 6000}},
	  { action: 'release' }

	]);	

	await client.pause(6000);

	var passwordEditText = await getElement(client,"applanga_password");

	await client.pause(1000);

	log("Enter the draft mode key");

	passwordEditText.addValue("86f8");

	await client.pause(1000);

	log("Click Ok button");

	var okButton = await getElement(client,"applanga_button_ok");

	await okButton.click();

	log("Click Ok button");

	await client.pause(3000);

	log("App Should be restarted by now");


}

async function getElement(client,id)
{
	var selector = 'android=new UiSelector().resourceId(\"com.example.appiumtestapp:id/' + id + '\")';
	log("USING SELECTOR: " + selector);
	return await client.$(selector);
}

function log(msg)
{
	console.log(msg);
}

main();
