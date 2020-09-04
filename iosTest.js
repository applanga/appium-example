
const wdio = require("webdriverio");
const assert = require("assert");

const packageAttribute = 'com.applanga.applangaandroidtest:id/';


var client

async function main () {
	
	await connectClient(false)

	await enableDraftMode()

	await showScreenshotMenu();
	
	await takeScreenshotWithTag("page-1");

	await loadSecondView()

	await takeScreenshotWithTag("page-2");

}

async function loadSecondView()
{
	let button = await client.$("~Open Next View")
	button.click()
	//await client.pause(1000)
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
			app: __dirname + "/TestingApps/AppiumTestAppIos/DerivedData/AppiumTestIos/Build/Products/Debug-iphonesimulator/AppiumTestIos.app",
			automationName: "XCUITest",
			noReset: noReset
		}
	};
	client = await wdio.remote(opts);
}

async function enableDraftMode() 
{
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

    keyInput.addValue("86f8");

	await client.pause(500);

	let okButton = await client.$("~OK")

	await okButton.click()

	await client.pause(2000)

	await reopenApp()

}

async function reopenApp()
{
	await connectClient(true)
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
 	
	await client.pause(500);
}

async function takeScreenshotWithTag(tag)
{

	let selectTagButton = await client.$("~Applanga.SelectTag")

	let selectTagButtonLocation = await selectTagButton.getLocation()

	await client.touchAction({
	  action: 'tap',
	  x: selectTagButtonLocation.x + 5,
	  y: selectTagButtonLocation.y + 5
	})

	await client.pause(1000);

	let tagListing = await client.$("~cell_" + tag)

	tagListing.click()

	await client.pause(1000);

	let takeScreenshotButton = await client.$("~Applanga.CaptureScreen")

	let takeScreenshotButtonLocation = await takeScreenshotButton.getLocation()

	await client.touchAction({
	  action: 'tap',
	  x: takeScreenshotButtonLocation.x + 5,
	  y: takeScreenshotButtonLocation.y + 5
	})

	await client.pause(1000);

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
