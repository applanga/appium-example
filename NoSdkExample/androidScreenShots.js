const wdio = require("webdriverio");
var client
var parseString = require('xml2js').parseString;
const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: "Android",
    platformVersion: "9",
    deviceName: "Pixel_3_API_28",
    app: __dirname + "/TestApp/app/build/outputs/apk/debug/app-debug.apk",
    appPackage: "com.simple.nosdktest",
    appActivity: "com.simple.nosdktest.MainActivity",
    automationName: "UiAutomator2"
  }
};

async function main () {
	
	client = await wdio.remote(opts)

    let xml = await getPage()

   
    parseString(xml, function (err, result) {
       // console.dir(result);
       // log(JSON.stringify(result))

        let allTexts = getTexts(result)

        let positions = createTextPositions(allTexts)
      
    });

   

	await client.pause(3000)

}

async function createTextPositions(allTexts)
{
    for (let i = 0; i < allTexts.length; i++) {
        const text = allTexts[i];
        let position = await getTextLocation(text)
        log(position)
    }
}

async function getTextLocation(textValue)
{
    const selector = 'new UiSelector().text("' + textValue + '")'
    const element = await client.$(`android=${selector}`)
    log(element)
    let elementPosition = await element.getLocation()  
    let elementSize = await element.getSize()
	return {x:elementPosition.x,y:elementPosition.y,width: elementSize.width,height: elementSize.height}
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

function log(msg)
{
  console.log(msg)
}

main();
