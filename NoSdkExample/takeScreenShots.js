const wdio = require("webdriverio");
var client
const applanga = require("applanganosdkappiumtools");

var languagesToUse = ["de","en"]
var localesToUse = ["DE","us"]

function getOptions(platform,locale,language)
{
    var androidOptions = {
        path: '/wd/hub',
        port: 4723,
        capabilities: {
          locale: locale,
          language: language,
          platformName: "Android",
          platformVersion: "9",
          deviceName: "Pixel_3_API_28",
          app: __dirname + "/TestApp/app/build/outputs/apk/debug/app-debug.apk",
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
			platformVersion: "13.6",
			deviceName: "iPhone 8",
			app: __dirname + "/iosTestApp/ApplangaNoSdk/DerivedData/ApplangaNoSdk/Build/Products/Debug-iphonesimulator/ApplangaNoSdk.app",
			automationName: "XCUITest"
		}
	};
      return platform == "Android" ? androidOptions : iosOptions;
}

const apiToken = "Bearer 5f5f213bbc978a30dbfb7073!fc1794d1e6a2b5a411c98ff016ba56c6"
const appId = "5f5f213bbc978a30dbfb7073"

async function main () {
   
    //iOS Screenshots
    // for (let i = 0; i < languagesToUse.length; i++) {
    //     const language = languagesToUse[i]
    //     const locale = localesToUse[i]
    //     client = await wdio.remote(getOptions("iOS",locale,language))
    //     await applanga.captureScreenshot(client,"page-1","iOS",language,appId,apiToken)
    //     await client.pause(2000)
    //     openPage2("iOS")
    //     await applanga.captureScreenshot(client,"page-2","iOS",language,appId,apiToken)
    // }
    
    //Android Screenshots
    for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
        client = await wdio.remote(getOptions("Android",locale,language))
        await applanga.captureScreenshot(client,"page-1","Android",language,appId,apiToken)
        await client.pause(2000)
        openPage2("Android")
        await applanga.captureScreenshot(client,"page-2","Android",language,appId,apiToken)
    }

   
	
    await client.pause(4000)


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
