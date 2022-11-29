const wdio = require("webdriverio");
var client
const applanga = require("applanga-appium");
const fs = require('fs');
const apiToken = applanga.getAPIToken()
const appId = applanga.getAppID()

var buttonsToPressAndroid = ["nav_daily", "nav_about", "nav_settings"]


function getOptions(language, locale) {
    var androidOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {      
            locale: locale,
            language: language,   
            platformName: "Android",
            platformVersion: "11",
            deviceName: "Pixel_5_pro_API_30",
            app: __dirname + "/WeatherApp/app/build/outputs/apk/debug/app-debug.apk",
            appPackage: "com.applanga.weathersample",
            appActivity: "com.applanga.weathersample.MainActivity",
            automationName: "UiAutomator2"
        }
    };


    return androidOptions;
}



async function main() {


    await takeAndroidScreenshots(apiToken, appId)

    await client.pause(4000)


}



async function takeAndroidScreenshots(apiToken, appId) {
    //Android Screenshots
    var locale = "US"
    var language = "en"
    client = await wdio.remote(getOptions(language,locale))
    await applanga.captureScreenshot(client, "Home", "Android", language, appId, apiToken)
    await client.pause(2000)
    for (let i = 0; i < buttonsToPressAndroid.length; i++) {
        const btn = buttonsToPressAndroid[i]
        await client.pause(5000)
        await pressButtons(btn)
        await applanga.captureScreenshot(client, btn, "Android", language, appId, apiToken)
        await client.pause(2000)
    }


}

async function pressButtons(btnName) {

    let selector = 'android=new UiSelector().resourceId(\"com.applanga.weathersample:id/' + btnName + '\")';
    let button = await client.$(selector);
    button.click()
    await client.pause(2000)

}

main();
