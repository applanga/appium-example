var parseString = require('xml2js').parseString;
var fs = require('fs');
var request = require('request');

const apiUrl = "https://api.applanga.com/v1/api/screenshots?app="

var client
var language 
var platform
var tag
var appId
var apiToken

async function captureScreenshot(theClient, theTag, thePlatform, theLanguage, theAppId, theApiToken)
{
    client = theClient
    tag = theTag
    platform = thePlatform
    language = theLanguage
    appId = theAppId
    apiToken = theApiToken
    await doScreenshot()
}

async function doScreenshot()
{
    let xml = await client.getPageSource()
    parseString(xml,async function (err, result) {
        console.log(JSON.stringify(result))
        let allTexts = getAllTextOnScreen(result)
        await uploadTextPositions(allTexts)
    });
    await client.pause(4000)
}

function getAllTextOnScreen(object)
{
    var foundTexts = []
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            let value = object[key]
            if(typeof(value) == "object")
            {
                foundTexts = foundTexts.concat(getAllTextOnScreen(value))
            }
            if(key.includes("TextView"))
            {
                for (let i = 0; i < value.length; i++) {
                    const text = value[i]["$"]["text"]
                    if(text != null)
                    {
                        foundTexts.push(text)
                    }
                }
            }
            if(key.includes("XCUIElementTypeStaticText"))
            {
                for (let i = 0; i < value.length; i++) {
                    const text = value[i]["$"]["value"]
                    if(text != null)
                    {
                        foundTexts.push(text)
                    }
                }
            }

        }
    }
    return foundTexts
}

async function uploadTextPositions(allTexts)
{
    var positions = []
    for (let i = 0; i < allTexts.length; i++) {
        const text = allTexts[i];
        var position
        if(platform == "Android")
        {
            position = await getAndroidStringPosition(text)
        }
        else
        {
            position = await getIosStringPosition(text)
        }
        
        positions.push(position)
    }
    let screenshot = await client.takeScreenshot();
    let screenshotLocation = __dirname + "/test.png"
    fs.writeFile(screenshotLocation, screenshot, 'base64',async function(error) {
        if(error!=null)
        {
            console.log('Error occured while saving screenshot' + error);
        }else
        {
            let screenSize = await client.getWindowRect();
            await doUpload(screenSize.width,screenSize.height,positions,screenshotLocation);
        }
    });
}

async function getAndroidStringPosition(textValue)
{
    const selector = 'new UiSelector().text("' + textValue + '")'
    const element = await client.$(`android=${selector}`)
    let elementPosition = await element.getLocation()  
    let elementSize = await element.getSize()
	return {text:textValue,x:elementPosition.x,y:elementPosition.y,width: elementSize.width,height: elementSize.height}
}

async function getIosStringPosition(textValue)
{
    const element = await client.$('~' + textValue)
    let elementPosition = await element.getLocation()  
    let elementSize = await element.getSize()
	return {text:textValue,x:elementPosition.x,y:elementPosition.y,width: elementSize.width,height: elementSize.height}
}

async function doUpload(screenWidth,screenHeight,stringPositions,imageLocation)
{
        let opts = platform == "Android" ? client.capabilities.desired : client.capabilities
        var data = {
            screenTag : tag,
            width: screenWidth,
            height : screenHeight,
            deviceModel : opts.deviceName,
            platform : opts.platformName,
            operatingSystem : opts.platformVersion,
            bundleVersion : 1,
            deviceLanguageLong : language,
            isBlank : false,
            useOCR : false,
            stringPositions : stringPositions
        }
        const form = {
            data: JSON.stringify(data),
            file: fs.createReadStream(imageLocation)
        }
       
        var headers = {Authorization: apiToken}

        request.post({url: apiUrl + appId, formData: form, headers: headers}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('Applanga Screenshot upload failed:', err);
            }
            console.log('Applanga Screenshot Upload successful!');
        });

}

module.exports = {captureScreenshot};
