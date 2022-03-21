const wdio = require("webdriverio");
var client
const applanga = require("applanganosdkappiumtools");
const { default: driver } = require("appium-uiautomator2-driver/build/lib/driver");

var languagesToUse = ["de","en"]
var localesToUse = ["DE","us"]
var platformsToUse = ["Android","iOS"]

const apiToken = "Bearer 6228ffbc7211482e9c2623db!6254b7e0e2a1fc6285a7e92d7839c7b8"
const appId = "6228ffbc7211482e9c2623db"



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
          deviceName: "Pixel_4_API_28",
          app: __dirname + "/androidTestApp/app/build/intermediates/apk/debug/app-debug.apk",
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
			platformVersion: "15.2",
			deviceName: "iPhone 12",
			app: __dirname + "/iosTestApp/ApplangaNoSdk/ApplangaNoSdk/test/ApplangaNoSdk.ipa",
			automationName: "XCUITest"
		}
	};
      return platform == "Android" ? androidOptions : iosOptions;
}

async function main () {   

    for (let i = 0; i < platformsToUse.length; i++)
    {
        await checkForText(platformsToUse[i]) 
    }	

    await client.pause(4000)


}
async function checkForText(platform)
{
   if (platform == "Android")
   {
       const language = languagesToUse[1]
       const locale = localesToUse[1]
       client = await wdio.remote(getOptions("Android",locale,language))
       let selector = 'android=new UiSelector().resourceId(\"com.simple.nosdktest:id/textView2\")';
       let element = await client.$(selector); 
       let text = await element.getText()
       console.log('Android' + ' ' + text);
       await client.pause(2000)
   } 
   else 
   {
       const language = languagesToUse[1]
       const locale = localesToUse[1]
       client = await wdio.remote(getOptions("iOS",locale,language))
       let element = await client.$("~label")
       let text = await element.getText();    
       console.log('iOS' + ' ' + text);
       await client.pause(2000)
   }
}
main();