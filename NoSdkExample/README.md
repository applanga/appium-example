# Automatic localisation and screenshot generation with Applanga and Appium

# Intro
This is an example of using applanga appium tools with no sdk on the project , while using appium automation to get texts from our apps and even create screenshots.

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

# Automating screenshots with an app that has the ApplangaSDK integrated

## Getting started

### Example apps and scripts

This repo contains example scripts for automatically controlling an Android and iOS simulator app and generating Applanga localisation screenshots using Appium and Webdriver.io.

It also contains tools in the form of a node package to make interacting with the ApplangaSDK easier.

### Running the examples

#### Software Required for running appium tests:

1: [Appium](http://appium.io/docs/en/about-appium/getting-started/)

2: [NodeJS](https://nodejs.org/en/download/)

3: [Webdriver.io](https://webdriver.io/)

4: [Android Studio](https://developer.android.com/studio)

5: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12) Note: The example supports up to Xcode 13.4. A known issue exists with webdriveragent and Xcode 14.

#### Node setup

You should be able to just run 'npm install' within the repo directory to install all dependencies.


### iOS

The ios test app is located at NoSDKExample/iOSTestApp

#### Applanga setup

Before running the tests, you will need to setup your applanga dashboard so that you can see the uploaded screenshots.

* create an account on [https://dashboard.applanga.com](https://dashboard.applanga.com/#!/signup)
* add a new project 
* Add the language "DE" to your project
* select prepare release and then **Download Settings File** 
* place the downloaded applanga_settings.applanga file in the root of the project appium-example/NoSdkExample. 
* go ahead and build your apk/.app for Android or iOS and place on your preferred folder you can change the path on the getOptions call on the scripts fetchtexts.js and takeScreenshots.js.
	* use .app for iOS simulator or ipa for real device
	* you can either do this with a real device attached to your computer or launch on a virtual device
	* refresh the applanga dashboard to see if strings have been uploaded into english and german

#### Running the appium test

##### 1: Build the test app for the simulator

* Open the project in Xcode and select a simulator build target.

* Build the project (Build not run).

##### 2: Run the tests

* Open the iPhone 13 simulator (or specify the device type you would like to use within the fetchTexts.js/takeScreenshots.js scripts and open that)

* Open the repo directory in command line

* make sure the appium server (standalone or command line ) is running and then run 'node fetchTexts.js/takeScreenshots.js '

##### 3: View the results

* Go to the applanga dashboard for your project, select either english or german and then on the left, select the tags button. There you should see the screenshots uploaded, clicking on them will show the screenshot and the strings associated with that tag. The command line should say upload succesful.

#### Android

#### Running the appium test

##### 1: Build the test app for the simulator

* Open the project at NoSdkExample/androidTestApp in android studio

* Build the apk (Build not run).

##### 2: Run the tests

* Open the Android simulator and specify the device name within the fetchTexts.js/takeScreenshots.js  scripts.

* Open the repo directory in command line

* make sure the appium server (standalone or command line ) is running and then run 'node fetchTexts.js/takeScreenshots.js '

##### 3: View the results

* Go to the applanga dashboard for your project, select either english or german and then on the left, select the tags button. There you should see the screenshots uploaded, clicking on them will show the screenshot and the strings associated with that tag.

# Important things to know before writing your own automation

#### Language switching 

##### iOS

To switch languages and you can provide a language code within the capabilities object when creating your testing session like so 'language: "de"'.

#### Android

The same goes for android, but you must specify both the local and language, like so 

locale: "DE",language: "de"

In the example scripts i have an array of languages to test and run through them one after the other with a loop, this way you can run tests for all languages in one go!




