# Applanga Demo - Android Weather App

This project includes two sample apps both for iOS and Android that demonstrate Applanga's automatic localization and hiddenId generation, as well as automated screenshot uploads. Using Applanga's command line tools and Appium.You will find this sample apps in appium-example/NoSdk/Android or appium-example/NoSdk/iOS respectively.

# Intro

### What is Applanga?
Applanga is a set of tools used for localising (translating) web and mobile applications. 

With the ApplangaSDK a user can update string values within their application without having to release a new version of the app. The ApplangaSDK can also find and upload all strings within an application and upload them to the Applanga dashboard. Once in the dashboard, Strings can be easily translated and managed. Screenshots of the pages/screens within an app can also be uploaded to the applanga dashboard so that translators can see the context of the strings they are working on.  

More info [here](https://www.applanga.com/)

### What is Appium?

Appium is an automated testing tool for mobile devices. 

With appium, you can write command scripts that remote control an app running on a simulator or a real device. These scripts can be written in multiple different languages.

More info [here](http://appium.io/)


### Using appium and applanga together

Some apps have many screens and menus, and manually going through an app to take screenshots for the applanga dashboard (in multiple languages) is very time consuming and prone to human errors. With appium and the applanga tools contained in this repo, it is possible to automate that process. 

So for example, after the initial scripts are written, you could take 20 screenshots in 20 languages just by running a script and letting it work in the background instead of having to manually do it each time.

It is possible to use these tools whether the app has the ApplangaSDK integrated or not.

### Example apps and scripts

This repo contains example scripts for automatically controlling an Android and iOS simulator app and generating Applanga localisation screenshots using Appium and Webdriver.io.

It also contains tools in the form of a node package to make interacting with Applanga easier. This app uses Applanga CLI to push and pull strings from  the Applanga dashboard, it also shows the developer how to use our invisibleId's option. This option allows for Applanga CLI tools to autogenerate id's for each string The invisible Id consists of zero width invisible unicode characters to not mess up the look of your application. This allows us to enable additional features like for example a live web view of your application. 
	
	This should only be used in your application during the development process not in production settings.

### Running the examples

#### Software Required for running appium tests:

1: [Appium](http://appium.io/docs/en/about-appium/getting-started/)

2: [NodeJS](https://nodejs.org/en/download/)

3: [Webdriver.io](https://webdriver.io/)

4: [Android Studio](https://developer.android.com/studio)

5: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

6: [ApplangaCLI](https://github.com/applanga/applanga-cli)

### Step by Step Guide
Please follow along the next few steps and you should be able to have the demo up and running with relative ease.

#### Node setup

We handle most dependencies with Node.js if you havent used it before or are unfamiliar with it we recommend you visit [NodeJS](https://nodejs.org/en/about/). To find out more about the runtime environment.
Make sure to have installed the Node.js runtime in your machine before running 'npm install'. If you haven't done so before this article in pluralsight should help you getting it installed [GettingStartedNode.js](https://www.pluralsight.com/guides/getting-started-with-nodejs).
You should be able to just run `npm install` in appium-example/NoSdk/Android or appium-example/NoSdk/iOS respectively each project has their own package.json file with its respective dependencies.


#### Applanga CLI

In order to make this demo work you will need to install Applanga CLI tools for your command line interface. Instructions to install and initialize are going to be on its github [page](https://github.com/applanga/applanga-cli). This is applanga's command line interface we use this in the example instead of an usual sdk in order to push our strings to your applanga dashboard and update your translations accordingly.

#### Applanga JSON Configuration 

After initializing Applanga CLI with `applanga init` you should have an .applanga.json object on your root folder,make sure to initiate in AppiumNoSdkExample/Android or AppiumNoSdkExample/iOS  since the scripts automatically read your api key from this file . According to your selections and type of project you should have a configuration on the file similar to this e.g.

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

* **Once you've pulled your source and target should have invisible id's. Since they are zero width characters youll need a plugin to see them in your preferred editor and on iOS. Android Studio shows zero width characters by default on their xml files.**

#### Running screenshot tests

Make sure you have appium instance running with the command `appium` in terminal in order for the tests to work. More info more info on these commands [here](https://github.com/applanga/applanga-cli#push--pull-translation-files).

Make sure to be in the path AppiumnoSdkExample/Android then run `./takeSourceLanguageScreenShots` this will take the source language screenshots with the location of the strings in each screen.

\***Note:** The source language script assumes your source is in english or en-US you can go ahead and change that in the variables for it in the respective function takeAndroidScreenshots/takeIosScreenshots.

Make sure to be in the path AppiumnoSdkExample/Android then run `./takeTargetLanguagesScreenShots` this will navigate through the translations and take screenshots with the location of the strings in each screen.

\***Note:** The target languages script has preloaded locales and langauges which you can go ahead and change in the variables for it in the respective arrays languagesToUse/localesToUse.
