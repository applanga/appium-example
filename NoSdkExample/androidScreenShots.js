const wdio = require("webdriverio");
var client
const applanga = require("applanganosdkappiumtools");

var languagesToUse = ["de","en"]
var localesToUse = ["DE","us"]

function getOptions(locale,language)
{
    var opts = {
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
      return opts
}

const apiToken = "Bearer 5f5f213bbc978a30dbfb7073!fc1794d1e6a2b5a411c98ff016ba56c6"
const appId = "5f5f213bbc978a30dbfb7073"

async function main () {
   
  
    for (let i = 0; i < languagesToUse.length; i++) {
        const language = languagesToUse[i]
        const locale = localesToUse[i]
        client = await wdio.remote(getOptions(locale,language))
        await applanga.captureScreenshot(client,"test-tag","Android",language,appId,apiToken)
        await client.pause(4000)
    }

	
    await client.pause(4000)


}

main();
