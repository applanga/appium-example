# Automatic localisation and screenshot generation with Applanga and Appium

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

5: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

#### Node setup

You should be able to just run 'npm install' within the repo directory to install all dependancies.


### iOS

The ios test app is located at TestingApps/AppiumTestAppIos

#### Applanga setup

Before running the tests, you will need to setup your applanga dashboard so that you can see the uploaded screenshots.

* create an account on [https://dashboard.applanga.com](https://dashboard.applanga.com/#!/signup)
* add a new project 
* Open the directory at TestingApps/AppiumTestAppIos in the command line and run 'pod install'.
* Add the language "DE" to your project
* select iOS and then **Download Settings File** 
* open the **AppiumTestAppIos** project in Xcode
* place the downloaded applanga_settings.applanga file anywhere in the AppiumTestAppIos Xcode project. Make sure to tick the targets you will run it on
* Run the app
	* you can either do this with a real device attached to your computer or launch on a virtual device
	* once the App is started wait for 10 seconds and afterwards all the base language strings should be uploaded to the Applanga dashboard
* refresh the applanga dashboard to see if strings have been uploaded into english and german

#### Running the appium test

##### 1: Build the test app for the simulator

* Open the project workspace in Xcode and select a simulator build target.

* Build the project (Build not run).

##### 2: Run the tests

* Find the draft mode key in the project page of your applanga project, and paste it into the draftModeKey const in the iosTest.js script.

* Open the iPhone 8 simulator (or specify the device type you would like to use within the iosTest.js script and open that)

* Open the repo directory in command line

* make sure the appium server (standalone or command line ) is running and then run 'node iosTest.js'

##### 3: View the results

* Go to the applanga dashboard for your project, select either english or german and then on the left, select the tags button. There you should see the screenshots uploaded, clicking on them will show the screenshot and the strings associated with that tag.

#### Android

#### Applanga setup

Before running the tests, you will need to setup your applanga dashboard so that you can see the uploaded screenshots.

* create an account on [https://dashboard.applanga.com](https://dashboard.applanga.com/#!/signup)
* add a new project
* Add the language "DE" to your project
* select Android and then **Download Settings File** 
* place the downloaded applanga_settings.applanga file into the `/AppiumTestAppAndroid/app/src/main/res/raw` folder
* open the ** AppiumTestAppAndroid** project in Android Studio
* click the green bug button to start the app with debugging enabled
	* you can either do this with a real device attached to your computer or launch on a virtual device
	* once the App is started wait for 10 seconds and afterwards all the base language strings should be uploaded to the Applanga dashboard
* refresh the dashboard to see if strings have been uploaded into english

#### Running the appium test

##### 1: Build the test app for the simulator

* Open the project at TestingApps/AppiumTestAppAndroid in android studio

* Build the apk (Build not run).

##### 2: Run the tests

* Find the draft mode key in the project page of your applanga project, and paste it into the draftModeKey const in the androidTest.js script.

* Open the Android simulator and specify the device name within the androidTest.js script

* Open the repo directory in command line

* make sure the appium server (standalone or command line ) is running and then run 'node androidTest.js'

NOTE: the first time you run the android tests, you will have to manually give the test app permission to draw over other apps. Once you do this you can restart the tests and you will not have to do it again.

##### 3: View the results

* Go to the applanga dashboard for your project, select either english or german and then on the left, select the tags button. There you should see the screenshots uploaded, clicking on them will show the screenshot and the strings associated with that tag.

# Automating screenshots with an app that does not have the ApplangaSDK integrated

In the NoSdkExample folder you will find 2 examples of apps that do not have the applanga sdk integrated, and some tools that will allow you to upload screenshots to the applanga dashboard.

Follow these steps to get the example projects working

## Running the examples

The ios test app is located at NoSdkExample/iosTestApp
The Android test app is located at NoSdkExample/androidTestApp

### Applanga setup

Before running the tests, you will need to setup your applanga dashboard so that you can see the uploaded screenshots.

* create an account on [https://dashboard.applanga.com](https://dashboard.applanga.com/#!/signup)
* add a new project 
* Add the language "DE" to your project

### Running the appium test

##### 1: Build the test app for the simulator

##### iOS

* Open the iosTestApp project workspace in Xcode and select a simulator build target.

* Build the project (Build not run).

##### Android

* Open the androidTestApp project workspace in Android Studio.

* Build the apk (Build not run).

##### 2: Run the tests

NOTE: This script runs automated screenshots for android and iOS at the same time. Feel free to comment out the appropriate function call in the main function of takeScreenShots.js if you only wish to use one platform.

* Find the api token and app id in the project settings page of your applanga project, and paste them into the apiToken and appId consts in the takeScreenShots.js script.

* Open the iPhone 8 simulator (or specify the device type you would like to use within the takeScreenShots.js script and open that)

* Open the Pixel_3_API_28 simulator (or specify the device type you would like to use within the takeScreenShots.js script and open that)

* Open the repo directory in command line

* make sure the appium server (standalone or command line ) is running and then run 'node takeScreenShots.js'

##### 3: View the results

* Go to the applanga dashboard for your project, select either english or german and then on the left, select the tags button. There you should see the screenshots uploaded, clicking on them will show the screenshot and the strings associated with that tag.



# Important things to know before writing your own automation

#### iOS

##### - Reopening app after draft mode is enabled
After applanga draft mode has been successfully enabled in iOS, it is important to reopen the app without reseting it's data. please see the functions 'connectClient' and 'reopenApp' within the iosTest.js script. notice how when reopening the app, we set the value 'noReset' to true and when opening the initial session, we have 'noReset' set to 'false'.

Note: This process is handled automatically when writing tests for Android.

#### Language switching 

##### iOS

To switch languages and you can provide a language code within the capabilities object when creating your testing session like so 'language: "de"'.

#### Android

The same goes for android, but you must specify both the local and language, like so 

locale: "DE",language: "de"

In the example scripts i have an array of languages to test and run through them one after the other with a loop, this way you can run tests for all languages in one go!



### React Native and Flutter support
Within this repo you will also find example scripts and testing apps for apps made with react-native and flutter.

The Applanga android and iOS tools work for these apps as well. You can refer to the example testing scripts provided to see some simple examples.



