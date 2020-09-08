
var androidPackage;

async function enableDraftModeIos(client, draftKey) 
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
    keyInput.addValue(draftKey);

	await client.pause(500);

	let okButton = await client.$("~OK")
	await okButton.click()

	await client.pause(2000)

}

async function takeScreenshotWithTagIos(client,tag)
{
	await toggleScreenshotMenuIos(client)
	
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
	
	await client.pause(3000);
	
	await toggleScreenshotMenuIos(client)
	
	await client.pause(1000);
}

async function toggleScreenshotMenuIos(client)
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
	await client.pause(1000);
}

async function enableDraftModeAndroid(client,draftKey,package) 
{
	
	androidPackage = package

	await client.touchPerform([
	  {action: 'press',options: {x: 10,y: 100}},
	  {action: 'wait',options: {ms: 6000}},
	  { action: 'release' }

	]);	

	await client.pause(1000);

	var passwordEditText = await getElement(client,"applanga_password");

	await client.pause(500);

	passwordEditText.addValue(draftKey);

	await client.pause(500);

	var okButton = await getElement(client,"applanga_button_ok");

	await okButton.click();

	await client.pause(3000);

}

async function takeScreenshotWithTagAndroid(client, tag)
{
	await showScreenshotMenuAndroid(client)

	await client.pause(500)

	let tagSelect = await getElement(client,"applanga_spinner_screentag_select")

	tagSelect.click()

	await client.pause(500)

	const tagItem = await client.$('android=new UiSelector().text(\"' + tag +'\")')
	tagItem.click()

	await client.pause(500)

	let captureScreenbutton = await getElement(client,"applanga_button_capture_screen")

	await captureScreenbutton.click()

	await client.pause(500)

	await hideScreenshotMenuAndroid(client)
}

async function showScreenshotMenuAndroid(client)
{
	await client.pause(1000);
	client.touchPerform([
	  { action: 'press', options: { x: 0, y: 500 }},
	  { action: 'moveTo', options: { x: 0, y: 200}},
	  { action: 'release' }
	]);
	await client.pause(1000);

}

async function hideScreenshotMenuAndroid(client)
{
	await client.pause(1000);
	client.touchPerform([
	  { action: 'press', options: { x: 0, y: 500 }},
	  { action: 'moveTo', options: { x: 0, y: -200}},
	  { action: 'release' }
	]);
	await client.pause(1000);

}

async function getElement(client,id)
{
	var selector = 'android=new UiSelector().resourceId(\"' + androidPackage + ':id/' + id + '\")';
	return await client.$(selector);
}

module.exports = {enableDraftModeIos,takeScreenshotWithTagIos,enableDraftModeAndroid,takeScreenshotWithTagAndroid};
