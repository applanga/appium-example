const wdio = require("webdriverio");
var client
const applanga = require("applanga-appium");

var languagesToUse = ["de","en"]
var localesToUse = ["DE","us"]

const apiToken = applanga.getAPIToken
const appId = applanga.validateAndfindAppId

function getOptions(platform,locale,language)
{
    var androidOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {
          locale: locale,
          language: language,
          platformName: "Android",
          platformVersion: "11",
          deviceName: "Pixel_5_pro_API_30",
          app: __dirname + "/androidTestApp/app/build/outputs/apk/debug/app-debug.apk",
          appPackage: "com.simple.nosdktest",
          appActivity: "com.simple.nosdktest.MainActivity",
          automationName: "UiAutomator2"
        }
      };

      var iosOptions = {
		path: '/wd/hub',
		port: 4723,
		capabilities: {
			language: language,
			platformName: "iOS",
			platformVersion: "15.5",
			deviceName: "iPhone 13",
            udid:"45B66355-2207-409F-AE05-39F0FFE9B6CF",
			app: __dirname + "/iosTestApp/ApplangaNoSdk/ApplangaNoSdk/test/ApplangaNoSdk.app",
			automationName: "XCUITest"
		}
	};
      return platform == "Android" ? androidOptions : iosOptions;
}



async function main () {
   
   
    await takeIosScreenshots()

    await takeAndroidScreenshots()   
	
    await client.pause(4000)


}

async function takeIosScreenshots()
{
	 //iOS Screenshots
    for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
        client = await wdio.remote(getOptions("iOS",locale,language))
        await applanga.captureScreenshot(client,"page-1","iOS",language,appId,apiToken)
        await client.pause(2000)
        openPage2("iOS")
        await applanga.captureScreenshot(client,"page-2","iOS",language,appId,apiToken)
    }
}

async function takeAndroidScreenshots()
{
	 //Android Screenshots
   for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
        client = await wdio.remote(getOptions("Android",locale,language))
        await applanga.captureScreenshot(client,"page-1","Android",language,appId,apiToken)
        await client.pause(2000)
        openPage2("Android")
        await client.pause(2000)
        await applanga.captureScreenshot(client,"page-2","Android",language,appId,apiToken)
   }
}

async function openPage2(platform)
{
    if(platform == "Android")
    {
        let selector = 'android=new UiSelector().resourceId(\"com.simple.nosdktest:id/button\")';
        let button = await client.$(selector);
        button.click()
        await client.pause(2000)
    }
    else
    {
        let button = await client.$("~button")
        button.click()
        await client.pause(2000)
    }
}

main();
