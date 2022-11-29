const wdio = require("webdriverio");
var client
const applanga = require("applanga-appium");
const fs = require('fs');
var languagesToUse = ["de", "es"]
var localesToUse = ["DE", "US",]
var buttonsToPressAndroid = ["nav_daily", "nav_about", "nav_settings"]
const apiToken = applanga.getAPIToken()
const appId = applanga.getAppID()



function getOptions(locale, language) {
    var androidOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {
            locale: locale,
            language: language,
            platformName: "Android",
            platformVersion: "11.0",
            deviceName: "Pixel_5_API_30",
            app: __dirname + "/WeatherApp/app/build/outputs/apk/debug/app-debug.apk",
            appPackage: "com.applanga.weathersample",
            appActivity: "com.applanga.weathersample.MainActivity",
            automationName: "UiAutomator2"
        }
    };


    return androidOptions;
}



async function main() {

   

    await takeAndroidTargetsScreenshots(apiToken, appId)

    await client.pause(4000)

}



async function takeAndroidTargetsScreenshots(apiToken, appId) {
    //Android Screens
    for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
        client = await wdio.remote(getOptions(locale, language))
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
}

async function pressButtons(btnName) {

    let selector = 'android=new UiSelector().resourceId(\"com.applanga.weathersample:id/' + btnName + '\")';
    let button = await client.$(selector);
    button.click()
    await client.pause(2000)

}

main();
