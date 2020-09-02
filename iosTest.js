
const wdio = require("webdriverio");
const assert = require("assert");

const SELECTORS = {
    LOGIN_SCREEN: '~Login-screen'
};

const packageAttribute = 'com.applanga.applangaandroidtest:id/';


var client

async function main () {

	console.log("Start Session");
	
	await connectClient(false)

	await client.pause(1000)

	await logStatus()

	await enableDraftMode()

	await showScreenshotMenu();
	
	//await selectTag("test");

	await client.pause(10000)


}

async function connectClient(noReset)
{
	let opts = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
			platformName: "iOS",
			platformVersion: "13.6",
			deviceName: "iPhone 8",
			app: "/Users/richard/Library/Developer/Xcode/DerivedData/AppiumTestIos-ghgmanachghzhlaavfsenaygacye/Build/Products/Debug-iphonesimulator/AppiumTestIos.app",
			automationName: "XCUITest",
			noReset: noReset
		}
	};
	client = await wdio.remote(opts);
}

async function enableDraftMode() 
{

	//await client.executeScript("mobile: touchAndHold", [{x:100,y:100, duration:5 }]);

await client.performActions([{
    "type": "pointer",
    "id": "finger1",
    "parameters": {"pointerType": "touch"},
    "actions": [
        {"type": "pointerMove", "duration": 0, "x": 100, "y": 300},
        {"type": "pointerDown", "button": 0},
        {"type": "pause", "duration": 5000},
        {"type": "pointerUp", "button": 0}
    ]
}, {
    "type": "pointer",
    "id": "finger2",
    "parameters": {"pointerType": "touch"},
    "actions": [
        {"type": "pointerMove", "duration": 0, "x": 300, "y": 300},
        {"type": "pointerDown", "button": 0},
        {"type": "pause", "duration": 5000},
        {"type": "pointerUp", "button": 0}
    ]
}]);

	await client.pause(500)

	let keyInput = await client.$("~DraftModeKeyInput")

	await client.pause(500);

    keyInput.addValue("86f8");

	await client.pause(500);

	let okButton = await client.$("~OK")

	await okButton.click();

	await client.pause(2000);

	await reopenApp()

}

async function reopenApp()
{
	//await client.activateApp("applanga.AppiumTestIos")
	await connectClient(true)
	await client.pause(2000)

	await logStatus()
}

async function logStatus()
{
	let status = await client.status()
	log(status)
}

async function showScreenshotMenu()
{
 	await client.performActions([{
    "type": "pointer",
    "id": "finger1",
    "parameters": {"pointerType": "touch"},
    "actions": [
        {"type": "pointerMove", "duration": 0, "x": 100, "y": 100},
        {"type": "pointerDown", "button": 0},
        {"type": "pause", "duration": 500},
        {"type": "pointerMove", "duration": 500,"origin": "pointer", "x": 0, "y": -200},
        {"type": "pointerUp", "button": 0}
    ]
}, {
    "type": "pointer",
    "id": "finger2",
    "parameters": {"pointerType": "touch"},
    "actions": [
        {"type": "pointerMove", "duration": 0, "x": 300, "y": 100},
        {"type": "pointerDown", "button": 0},
        {"type": "pause", "duration": 500},
        {"type": "pointerMove", "duration": 500, "origin": "pointer", "x": 0, "y": -200},
        {"type": "pointerUp", "button": 0}
    ]
}]);
 	
	await client.pause(3000);
	//await client.releaseActions();
	logPage()
}

async function selectTag(tag)
{
	
	await client.pause(1000)

	let source = await client.getPageSource();

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
