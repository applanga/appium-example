
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
    platformName: "iOS",
    platformVersion: "13.6",
    deviceName: "iPhone 8",
    app: "/Users/richard/Library/Developer/Xcode/DerivedData/AppiumTestIos-ghgmanachghzhlaavfsenaygacye/Build/Products/Debug-iphonesimulator/AppiumTestIos.app",
    automationName: "XCUITest"
  }
};

var client

async function main () {

	console.log("Start Session");
	
	client = await wdio.remote(opts);

	await client.pause(1000)

	await enableDraftMode()

	//await showScreenshotMenu();
	
	//await selectTag("test");

	await client.pause(10000)


}

async function enableDraftMode() 
{

 	// client.touchAction([
  //       [{action: 'press', x: 100, y: 10}, {action: 'wait',options: {ms: 5000}}, 'release'],
  //       [{action: 'press', x: 300, y: 10}, {action: 'wait',options: {ms: 5000}}, 'release']
  //   ])


	await client.executeScript("mobile: touchAndHold", [{x:100,y:100, duration:5 }]);

	log("should show the dialog now")

	await client.pause(500)

	

	let keyInput = await client.$("~DraftModeKeyInput")

	log("Got Key Input?")

	log(keyInput)


	await client.pause(1000);

    keyInput.addValue("86f8");


	await client.pause(1000);


	let okButton = await client.$("~OK")

	log("Got ok button?")

	log(okButton)

	await client.pause(1000);

	await okButton.click();

	await client.pause(3000);

	reopenApp()

}

async function reopenApp()
{
	await client.activateApp("applanga.AppiumTestIos")
}

async function selectTag(tag)
{
	
	await client.pause(1000)

	let source = await client.getPageSource();

	log(source);

}

async function showScreenshotMenu()
{
	client.touchPerform([
	  { action: 'press', options: { x: 500, y: 500, count: 2 }},
	  { action: 'moveTo', options: { x: 500, y: 200}},
	  { action: 'release' }
	]);
	await client.pause(2000);

}

function logPage()
{
	log(client.getPageSource())
}

function log(msg)
{
	console.log(msg);
}

main();
