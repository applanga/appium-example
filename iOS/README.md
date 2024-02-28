# Appium + Applanga CLI Screenshot Demo

The project demonstrates the usage of the Applanga Command Line Interface [ApplangaCLI](https://github.com/applanga/applanga-cli) in combination with Appium [Appium 2](https://appium.github.io/appium/docs/en/2.0/) to automatically generate and upload screenshots to Applanga without the need to integrate any Applanga SDK to provide context to translators so they can produce better translations as well as for review and testing purposes. 

This script opens 4 different screens in a simple app in 3 different languages and takes a screenshot from each screen.
On your Applanga Dashboard, not only can you view these screenshots, but you can also easily identify the corresponding translations and their linkage to their respective translation IDs.

### Prerequisites 

1. [Install Applanga CLI](https://www.applanga.com/docs/integration-documentation/cli#installation) (version 1.0.86 or above)

2. [Install Nodejs](https://nodejs.org)  (tested with node v16.13.2)

### Usage

1. Create (or use an existing) Applanga Project from the Applanga Dashboard. Add the following languages to make full use of this example: `en` as base language, `de` and `es-US`. 
2. Add your API Token to the existing `.applanga.json` file. Use the field called `access_token`. If you want to learn more about the `.applanga.json` file format and it's configurations go to the [Applanga CLI Documentation](https://www.applanga.com/docs/integration-documentation/cli). Pay attention to the `includeInvisibleId` config which is enabled for this project.
3. Push your localizations to your empty Applanga project with `applanga push`. 
4. Pull your localizations with `includeInvisibleId` enabled (see step 2) with `applanga pull`. In XCode it wouldn't be visible, but if you copy a string to some other editor like VSCode, you should see that every translation has a prefix of unicode characters. We need them to identify the strings on the screen properly.
5. Build your app and copy the `WeatherSample.app` directory to this directory. There are several ways to find the app folder, one is [described here](https://stackoverflow.com/a/26201618). 
6. Run `npm install`
7. Start Appium with `npx appium` in a separate terminal tab
8. Run the upload screenshot script with `node runScreenshotUpload.js`
9. Go into your Applanga dashboard and you will see screenshots connected with their corresponding string ids