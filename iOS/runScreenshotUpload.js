const wdio = require('webdriverio');
const applanga = require('applanga-appium');

//required setup for webdriver.io it varies according to platform wether android or iOS please consult readme for more info and links
function getOptions(country, language) {
  var options = {
    port: 4723,
    capabilities: {
      platformName: 'iOS',
      'appium:locale': country,
      'appium:language': language,
      'appium:app': __dirname + '/WeatherSample.app',
      'appium:automationName': 'XCUITest',
    },
  };
  return options;
}

const locales = [
  { country: 'US', language: 'en' },
  { country: 'DE', language: 'de' },
  { country: 'US', language: 'es' },
];

const tabsToPress = ['tab_home', 'tab_daily_forecast', 'tab_about', 'tab_settings'];

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

  let tabBar = client.$("XCUIElementTypeTabBar[@name='Tab Bar']");
  await tabBar.waitForExist({ timeout: 5000 });

  let tabIndex = 0;
  tagName = tabsToPress[0];

  do {
    await applanga.captureScreenshot(client, tagName);

    tabIndex += 1;
    if (tabIndex >= tabsToPress.length) { break; }

    tagName = tabsToPress[tabIndex];
    await pressButtons(client, tagName); // tagName is the button name here

    await client.pause(3000);
  } while(true)
}

function getSelectorByResourceId(resourceId) {
  return '//XCUIElementTypeButton[@name="' + resourceId + '"]'; 
}

//function to navigate through our screens in our sample app
async function pressButtons(client, btnName) {
  let button = await client.$(getSelectorByResourceId(btnName));
  await button.waitForExist({ timeout: 5000 }); // Wait up to 5 seconds for the element to exist
  await button.click();
}

main();
