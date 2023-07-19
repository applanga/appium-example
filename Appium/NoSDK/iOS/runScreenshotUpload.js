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
const buttonsToPress = ['nav_daily', 'nav_about', 'nav_settings'];

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
  let progressBar = await client.$(
    getSelectorByResourceId('home_progress_bar_spinner')
  );
  await progressBar.waitForExist({ timeout: 5000, reverse: true });
  for (let j = 0; j < buttonsToPress.length + 1; j++) {
    await applanga.captureScreenshot(client, tagName);
    if (j == buttonsToPress.length) break;
    tagName = buttonsToPress[j];
    await pressButtons(client, tagName); // tagName is the button name here
    await client.pause(1000);
  }
}

function getSelectorByResourceId(resourceId) {
  return '~' + resourceId 
}

//function to navigate through our screens in our sample app
async function pressButtons(client, btnName) {
  let button = await client.$(getSelectorByResourceId(btnName));
  await button.waitForExist({ timeout: 5000 }); // Wait up to 5 seconds for the element to exist
  button.click();
}

main();
