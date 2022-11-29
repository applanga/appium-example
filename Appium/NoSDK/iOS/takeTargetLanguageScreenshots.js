const wdio = require("webdriverio");
var client
const applanga = require("applanga-appium");
const fs = require('fs');

var languagesToUse = ["de", "es"]
var localesToUse = ["DE", "US"]
var buttonsToPress = ["Daily Forecast", "About", "Settings"]
const apiToken = applanga.getAPIToken()
const appId = applanga.getAppID()


function getOptions(language) {

    var iosOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {
            language: language,
            platformName: "iOS",
            platformVersion: "15.5",
            deviceName: "iPhone 13",
            udid:"YOUR_SIMULATOR_UDID",
            app: __dirname + "/WeatherSample/WeatherSample/Debug-iphonesimulator/WeatherSample.app",
            automationName: "XCUITest"
        }
    };
    return iosOptions;
}



async function main() {

   

    await takeIosTargetsScreenshots(apiToken, appId)


    await client.pause(4000)


}


async function takeIosTargetsScreenshots(apiToken, appId) {
    //iOS Screens
    for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
        client = await wdio.remote(getOptions(language))
        await applanga.captureScreenshot(client, "Home", "iOS", language, appId, apiToken)
        await client.pause(2000)
        for (let i = 0; i < buttonsToPress.length; i++) {
            const btn = buttonsToPress[i]
            if (btn == "About") {
                await client.pause(55000)
    
            } else {
                await client.pause(2000)
    
            }
            await pressButtons(btn)
            await applanga.captureScreenshot(client, btn, "iOS", language, appId, apiToken)
            await client.pause(3000)
        }
    }
}



async function pressButtons(btnName) {

    let button = await client.$("~" + btnName);
    await button.click()
    await client.pause(2000)

}

main();
