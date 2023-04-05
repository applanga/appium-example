# Applanga Demo - Android Weather App



# Intro
The projects in this repo demonstrate how to use the Applanga Command Line Interface [ApplangaCLI](https://github.com/applanga/applanga-cli) in combination with Appium [Appium 2](https://appium.github.io/appium/docs/en/2.0/) to automatically generate and upload screenshots to Applanga without the need to integrate any Applanga SDK to provide context to translators so they can produce better translations as well as for review and testing purposes. 

This project includes two sample apps both for iOS and Android that demonstrate Applanga's automatic localization and hiddenId generation, as well as automated screenshot uploads. You will find Android app in `appium-example/NoSdk/Android` or iOS sample app at `appium-example/NoSdk/iOS` respectively.We have a [Step by Step](#steps) guide section which can help getting your project's running.


### Using Appium and Applanga together

Some apps have many screens and menus, and manually going through an app to take screenshots for the Applanga dashboard (in multiple languages) is very time consuming and prone to human errors. With Appium and the Applanga tools contained in this repo, it is possible to automate that process. 

So for example, after the initial scripts are written, you could take 20 screenshots in 20 languages just by running a script and letting it work in the background instead of having to manually do it each time.

It is possible to use these tools whether the app has the ApplangaSDK integrated or not.

### Example apps and scripts

This repo contains example scripts for automatically controlling an Android and iOS simulator app and generating Applanga localisation screenshots using Appium and Webdriver.io without using Applanga SDK.

It also contains tools in the form of a node package to make interacting with Applanga easier. This app uses Applanga CLI to push and pull strings from  the Applanga dashboard, it also shows the developer how to use our invisibleId's option. This option allows for Applanga CLI tools to autogenerate id's for each string The invisible Id consists of zero width invisible unicode characters to not mess up the look of your application. This allows us to enable additional features e.g. it makes it possible to link your strings to a screenshot. 
	
	This should only be used in your application during the development process not in production settings.

### Running the examples

#### Software Required for running Appium tests:

1: [Appium 2](https://appium.github.io/appium/docs/en/2.0/quickstart/)

2: [NodeJS](https://nodejs.org/en/download/)

3: [Webdriver.io](https://webdriver.io/)

4: [Android Studio](https://developer.android.com/studio)

5: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

6: [ApplangaCLI](https://github.com/applanga/applanga-cli)



#### Node setup

We handle most dependencies with Node.js if you havent used it before or are unfamiliar with it we recommend you visit [NodeJS](https://nodejs.org/en/about/). To find out more about the runtime environment.
Make sure to have installed the Node.js runtime in your machine before running 'npm install'. If you haven't done so before this article in pluralsight should help you getting it installed [GettingStartedNode.js](https://www.pluralsight.com/guides/getting-started-with-nodejs).
You should be able to just run `npm install` in `appium-example/Appium/NoSdk/Android` to install the project dependencies in the package.json file.


#### Applanga CLI

In order to make this demo work you will need to install Applanga CLI tools for your command line interface. Instructions to install and initialize are going to be on its github [page](https://github.com/applanga/applanga-cli). This is Applanga's command line interface we use this in the example instead of an usual sdk in order to push our strings to your Applanga dashboard and update your translations accordingly.



### Applanga JSON Configuration
<div id="ApplangaJSON"></div>

Initialise Applanga with `applanga init` in `appium-example/Appium/NoSdk/Android`. You should have an .applanga.json object on this folder, make sure to initiate on these paths since the scripts automatically reads your api key from this file. According to your selections and type of project you should have a configuration on the file similar to this e.g.

```json
{
	"app": {
		"access_token": "5b1f..!..2ab",
		"base_language": "en", 
		"pull": {
			"target": [
				{
					"exclude_languages": ["en"],
					"file_format": "gettext_po", 
					"path": "./<language>.po"
				}
			]
		}, 
		"push": {
			"source": [
				{
					"language": "en",
					"file_format": "gettext_po", 
					"path": "./en.po"
				}
			]
		}
	}
}
```

Make sure to also change the "<Applanga_API_Token>" in each respective .json file with the one you get from Applanga dashboard on project settings-> Show Api Token button. 

Now lets go ahead and add our invisible id property to our .applanga.json file as shown in the following example:

```json
{
	"app": {
		"access_token": "<Applanga_API_Token>",
		"base_language": "en", 
		"includeInvisibleId": true,
		"pull": {
			"target": [
				{
					"exclude_languages": ["en"],
					"file_format": "gettext_po", 
					"path": "./<language>.po"
				}
			]
		}, 
		"push": {
			"source": [
				{
					"language": "en",
					"file_format": "gettext_po", 
					"path": "./en.po"
				}
			]
		}
	}
}
```
Now lets push our source strings to our Applanga dashboard you can do this with either `applanga push` or `applanga pushtarget` more info on these commands [here](https://github.com/applanga/applanga-cli#push--pull-translation-files).

Once you've added your translations in the Applanga dashboard you can go ahead and pull those translations with `applanga pull` more info on this command [here](https://github.com/applanga/applanga-cli#push--pull-translation-files).

***Once you've pulled your source and target should have invisible id's. Since they are zero width characters youll need a plugin to see them in your preferred editor and on iOS. Android Studio shows zero width characters by default on their xml files.*** 


### Running Scripts with Appium 2
<div id="scripts"></div>

In order to install Appium 2 you must first use the command `npm i -g appium@next` this will install Appium server globally in your machine.

Since Appium 2 is still in its beta phase you must install the drivers in order for the scripts to work you can see available drivers with the command `appium driver list`.

In our case we will be installing uiautomator2 for Android you can go ahead and do this by using the command `appium driver install uiautomator2`.

Make sure you have Appium instance running with the command `appium` in terminal in order for the tests to work. More info more info on these commands [here](https://appium.github.io/appium/docs/en/2.0/cli/).

Make sure to be in the path `appium-example/Appium/NoSdk/Android` then run `node takeSourceLanguageScreenShots` this will take the source language screenshots with the location of the strings in each screen.

\***Note:** The source language script assumes your source is in english or en-US you can go ahead and change that in the variables for it in the respective function takeAndroidScreenshots/takeIosScreenshots.

Make sure to be in the path `appium-example/Appium/NoSdk/Android` then run `node takeTargetLanguagesScreenShots` this will navigate through the translations and take screenshots with the location of the strings in each screen.

\***Note:** The target languages script has preloaded locales and langauges which you can go ahead and change in the variables for it in the respective arrays languagesToUse/localesToUse.


### Step by Step Guide
<div id="steps"></div>

Please follow along the next few steps and you should be able to have the demo up and running with relative ease.

1. Change to the demo directory in your computer `cd/appium-example/Appium/NoSdk/Android`
2. Now lets install our dependencies if you hadn't done so yet,type `npm install`
3. Now let's initiate Applanga `applanga init` , please refer to the Applanga CLI [Applanga JSON](#ApplangaJSON) of this guide if you have any questions.
4. It will ask you for your access token you can get yours in your Applanga dashboard by going to Project Settings on top of the page and then pressing the Show API Token button.
5. After this the Applanga CLI will ask for a file format according to project for the Android project go ahead and select `1` which is the standard Android xml format.
6. Then Applanga's CLI will ask for the source strings path in this case it would be "./WeatherApp/app/src/main/res/values/strings.xml". Then it will ask for the target path this should be "./WeatherApp/app/src/main/res/values-<language>/strings.xml". Then it will ask for the tag value you can use the default value by hitting the `Enter` key. Then it will ask for the base language path go ahead and use the same as the source strings "./WeatherApp/app/src/main/res/values/strings.xml". You can aways point to wherever your strings are if you changed the project structure.
7. Now modify you .applanga.json file genereated in the project with the hidden id feature for more details go to the [Applanga JSON](#ApplangaJSON) section of this readme.
8. Now we open our the project in Android Studio for `appium-example/Appium/NoSdk/Android/WeatherSample`.
9. Now go ahead and build the project in Android select `Build` menu and then select `Build Bundle(S)/Apk(S)` then select `Build APK(S)`. This should create the APK on this path  `/WeatherApp/app/build/outputs/apk/debug/app-debug.apk` if youd like to  place it on another path make sure to update the `appium:app` fields in the scripts takeSourceLanguageScreenshots.js and takeTargetLanguageScreenshots.js
10. Make sure to have a supported simulator running before running the scripts. We use a default of "Pixel_5_pro_API_30" you can update this in the getOptions function in the `"appium:deviceName":` field with whichever simulator you are currently using.
``` js
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

``` 
11. Before you run the scripts make sure you have pushed your strings to your Applanga dashboard by using `applanga push` or `applanga pushtarget` this will make sure you have your tags for your screenshots. The commands should be run on this path `appium-example/Appium/NoSdk/Android`. For more details go to [Applanga JSON](#ApplangaJSON) section of this readme.
12. Make sure to have an Appium instance running before running the scripts by typing `appium --base-path /wd/hub` on a terminal window.This window will run the server and give you responses back so you will need another command prompt window in order to run your commands.
13. You should now have everything ready to be able to run your scripts you can go ahead and run `node takeSourceLanguageScreenShots` or `node takeTargetLanguagesScreenShots` for more information on how to modify this for additional languages or different simulators please refer to the [Running Scripts](#scripts) section of this readme.
14. You should now see your Android's emulator going through the different scenes in app taking screenshots or changing language and going through scenes while taking screenshots according to which script you ran.


