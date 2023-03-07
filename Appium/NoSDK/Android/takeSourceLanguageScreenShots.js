const wdio = require("webdriverio");
var client
const applanga = require("applanga-appium");
const fs = require('fs');
//functions to get your api token and appid
const apiToken = applanga.getAPIToken()
const appId = applanga.getAppID()

var buttonsToPressAndroid = ["nav_daily", "nav_about", "nav_settings"]

//required setup for webdriver.io it varies according to platform wether android or iOS please consult readme for more info and links
function getOptions(language,locale) {
    var androidOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {      
            platformName: "Android",
            "appium:locale": locale,
            "appium:language": language,   
            "appium:platformVersion": "11",
            "appium:deviceName": "Pixel_5_pro_API_30",
            "appium:app": __dirname + "/WeatherApp/app/build/outputs/apk/debug/app-debug.apk",
            "appium:appPackage": "com.applanga.weathersample",
            "appium:appActivity": "com.applanga.weathersample.MainActivity",
            "appium:automationName": "UiAutomator2"
        }
    };


    return androidOptions;
}


//our main function executing our methods
async function main() {


    await takeAndroidScreenshots(apiToken, appId)

    await client.pause(4000)


}


//function to go through screens and capture screenshots in our sample app
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
//function to navigate through our screens in our sample app
async function pressButtons(btnName) {
    let selector = 'android=new UiSelector().resourceId(\"com.applanga.weathersample:id/' + btnName + '\")';
    let button = await client.$(selector);
    await button.waitForExist({ timeout: 10000 }); // Wait up to 5 seconds for the element to exist
    button.click()
    await client.pause(2000)

}

main();
