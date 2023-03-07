const wdio = require("webdriverio");
var client
const applanga = require("applanga-appium");
const fs = require('fs');
// languages to iterate through you can change this according to your need 
var languagesToUse = ["de", "es"]
//names of the buttons to press in our app this might be different for yours feel free to change it
var buttonsToPress = ["Daily Forecast", "About", "Settings"]
//since we take the home screenshot apart from the others we need the translation of home for it to not cause any errors when called by webdriver 
var homeTranslated = ["Heim","Hogar","Domicile"]
//functions to get your api token and appid
const apiToken = applanga.getAPIToken()
const appId = applanga.getAppID()

//required setup for webdriver.io it varies according to platform wether android or iOS please consult readme for more info and links
function getOptions(language) {

    var iosOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {
            platformName: "iOS",
            "appium:language": language,
            "appium:platformVersion": "16.2",
            "appium:deviceName": "simulator name i.e: iPhone 14",
            "appium:udid":"simulator UDID",
            "appium:app": __dirname + "/WeatherSample/WeatherSample/Debug-iphonesimulator/WeatherSample.app",
            "appium:automationName": "XCUITest"
            
        }
    };
    return iosOptions;
}


//our main function executing our methods
async function main() {

   await takeIosTargetsScreenshots(apiToken, appId)


    await client.pause(4000)


}

//function to go through screens and capture screenshots in our sample app
async function takeIosTargetsScreenshots(apiToken, appId) {
    //iOS Screenshots
    for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const homeTranslation = homeTranslated[i]
        client = await wdio.remote(getOptions(language))
        await applanga.captureScreenshot(client, homeTranslation, "iOS", language, appId, apiToken)
        await client.pause(2000)
        for (let i = 0; i < buttonsToPress.length; i++) {
            const btn = buttonsToPress[i]
            if (btn == buttonsToPress[1]) {
                // wait for longer when in forecast screen because of amount of elements
                await client.pause(100000)
            } else {
                await client.pause(2000)
            }
            await pressButtons(btn)
            await applanga.captureScreenshot(client, btn, "iOS", language, appId, apiToken)
            await client.pause(3000)
        }
    }
 }

//function to navigate through our screens in our sample app
async function pressButtons(btnName) {
    const selector = "~" + btnName;
    const button = await client.$(selector);
    await button.waitForExist({ timeout: 10000 }); // Wait up to 5 seconds for the element to exist
    await button.click();
    await client.pause(2000);
  }


main();
