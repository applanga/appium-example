const wdio = require('webdriverio');
const applanga = require('applanga-appium');

//required setup for webdriver.io it varies according to platform wether android or iOS please consult readme for more info and links
function getOptions(country, language) {
  var androidOptions = {
    port: 4723,
    capabilities: {
      platformName: 'Android',
      'appium:locale': country,
      'appium:language': language,
      'appium:app':
        __dirname + '/WeatherApp/app/build/outputs/apk/debug/app-debug.apk',
      'appium:appPackage': 'com.applanga.weathersample',
      'appium:appActivity': 'com.applanga.weathersample.MainActivity',
      'appium:automationName': 'UiAutomator2',
    },
  };
  return androidOptions;
}

const locales = [
   { country: 'US', language: 'en' },
   { country: 'DE', language: 'de' },
  { country: 'US', language: 'es' },
];
const buttonsToPressAndroid = ['nav_daily', 'nav_about', 'nav_settings'];

const apiToken = applanga.getAPIToken();
const appId = applanga.getAppID();

//our main function executing our methods
async function main() {
  // run for all languages
  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    await navigateAndRunScreenshots(locale.country, locale.language);
  }
}

async function navigateAndRunScreenshots(country, language) {
  var client = await wdio.remote(getOptions(country, language));
  var tagName = 'home';
  let progressBar = await client.$(getSelectorByResourceId('home_progress_bar_spinner'))
  await progressBar.waitForExist({ timeout: 5000, reverse: true }); 
  for (let j = 0; j < buttonsToPressAndroid.length + 1; j++) {
    await applanga.captureScreenshot(
      client,
      tagName,
    );
    if (j == buttonsToPressAndroid.length) break;
    tagName = buttonsToPressAndroid[j];
    await pressButtons(client, tagName); // tagName is the button name here
    await client.pause(1000);
  }
}

function getSelectorByResourceId(resourceId) {
  return  'android=new UiSelector().resourceId("com.applanga.weathersample:id/' +
  resourceId +
  '")';
}

//function to navigate through our screens in our sample app
async function pressButtons(client, btnName) {
  let button = await client.$(getSelectorByResourceId(btnName));
  await button.waitForExist({ timeout: 5000 }); // Wait up to 5 seconds for the element to exist
  button.click();
}

main();
