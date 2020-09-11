# Automatic screenshot generation with Applanga and Appium

This repo contains 2 examples of automatically controlling an Android and iOS simulator apps and generating Applanga localization screenshots using Appium and Webdriver.io.

It also contains tools in the form of a node package to make interacting with the ApplangaSDK easier.

## Running the examples

### Software Required for running appium tests:

1: [Appium](http://appium.io/docs/en/about-appium/getting-started/)

2: [NodeJS](https://nodejs.org/en/download/)

3: [Webdriver.io](https://webdriver.io/)

4: [Android Studio](https://developer.android.com/studio)

5: [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

### Node setup

You should be able to just run 'npm install' within the repo directory to install all dependancies.

### iOS

#### 1: Build the test app for the simulator

a: Open the directory at TestingApps/AppiumTestAppIos in the command line and run 'pod install'.

b: Open the project workspace in xcode and select a simulator build target.

c: Build the project (Build not run).

#### 2: Run the tests

a: Open the iPhone 8 simulator (or specify the device type you would like to use within the iosTest.js script and open that)

b: Open the repo directory in command line

c: make sure the appium server (standalone or command line ) is running and then run 'node iosTest.js'

### Android

#### 1: Build the test app for the simulator

a: Open the project at TestingApps/AppiumTestAppAndroid in android studio

b: Build the apk (Build not run).

#### 2: Run the tests

a: Open the Android simulator and specify the device name within the androidTest.js script

b: Open the repo directory in command line

c: make sure the appium server (standalone or command line ) is running and then run 'node androidTest.js'

NOTE: the first time you run the android tests, you will have to manually give the test app permission to draw over other apps. Once you do this you can restart the tests and you will not have ot do it again.

## Important things to know before writing your own tests

### iOS

#### - Reopening app after draft mode is enabled
After applanga draft mode has been successfully enabled in iOS, it is important to reopen the app without reseting it's data. please see the functions 'connectClient' and 'reopenApp' within the iosTest.js script. notice how when reopening the app, we set the value 'noReset' to true and when opening the initial session, we have 'noReset' set to 'false'.

Note: This process is handled automatically when writing tests for Android.

### Language switching 

#### iOS

To switch languages and you can provide a language code within the capabilities object when creating your testing session like so 'language: "de"'.

#### Android

The same goes for android, but you must specify both the local and language, like so 

locale: "DE",language: "de"



## React Native and Flutter support
Within this repo you will also find example scripts and testing apps for apps made with react-native and flutter.

The Applanga android and ios tools work for these apps as well. You can refer to the example testing scripts provided to see some simple examples.



