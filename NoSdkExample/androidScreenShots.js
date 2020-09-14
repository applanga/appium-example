const wdio = require("webdriverio");
var client
var request = require('request');
var parseString = require('xml2js').parseString;
var fs = require('fs');

const languageToUse = "de"
const localeToUse = "DE"

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    locale: languageToUse,
    language: localeToUse,
    platformName: "Android",
    platformVersion: "9",
    deviceName: "Pixel_3_API_28",
    app: __dirname + "/TestApp/app/build/outputs/apk/debug/app-debug.apk",
    appPackage: "com.simple.nosdktest",
    appActivity: "com.simple.nosdktest.MainActivity",
    automationName: "UiAutomator2"
  }
};

const apiToken = "Bearer 5f5f213bbc978a30dbfb7073!fc1794d1e6a2b5a411c98ff016ba56c6"
const apiUrl = "https://api.applanga.com/v1/api/screenshots?app=5f5f213bbc978a30dbfb7073"

async function main () {
   
	 client = await wdio.remote(opts)
    let xml = await getPage()
    parseString(xml, function (err, result) {
        let allTexts = getTexts(result)
        uploadTextPositions(allTexts)
    });
	await client.pause(3000)
}

async function uploadTextPositions(allTexts)
{
    var positions = []
    for (let i = 0; i < allTexts.length; i++) {
        const text = allTexts[i];
        let position = await getTextLocation(text)
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
            await doUpload("test-tag",screenSize.width,screenSize.height,"android","android","28","com.simple.nosdktest","en",positions,screenshotLocation);
        }
    });
}

async function getTextLocation(textValue)
{
    const selector = 'new UiSelector().text("' + textValue + '")'
    const element = await client.$(`android=${selector}`)
    let elementPosition = await element.getLocation()  
    let elementSize = await element.getSize()
	return {text:textValue,x:elementPosition.x,y:elementPosition.y,width: elementSize.width,height: elementSize.height}
}

function getTexts(object)
{
    var foundTexts = []
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            let value = object[key]

            if(typeof(value) == "object")
            {
                foundTexts = foundTexts.concat(getTexts(value))
            }

            if(key.includes("TextView"))
            {
                let text = value[0]["$"]["text"]
                foundTexts.push(text)
            }
        }
    }
    return foundTexts
}

async function getPage()
{
    let source = await client.getPageSource()
    return source
}

async function doUpload(screenTag,screenWidth,screenHeight,stringPositions,imageLocation)
{
   
        var data = {
            screenTag : screenTag,
            width: screenWidth,
            height : screenHeight,
            deviceModel : opts.capabilities.deviceName,
            platform : opts.capabilities.platformName,
            operatingSystem : opts.capabilities.platformVersion,
            bundleVersion : 1,
            deviceLanguageLong : languageToUse,
            isBlank : false,
            useOCR : false,
            stringPositions : stringPositions
        }
        const form = {
            data: JSON.stringify(data),
            file: fs.createReadStream(imageLocation)
        }
       
        var headers = {Authorization: apiToken}

        request.post({url: apiUrl, formData: form, headers: headers}, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
        });

}

main();
