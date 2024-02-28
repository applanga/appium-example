# Appium + Applanga SDK Example

Appium is used for testing mobile apps.
Within a test you can now trigger a screenshot capture and its upload to the Applanga dashboard.
This functionality works with the **Applanga Android SDK Version 4.0.x** and above and **Applanga iOS SDK Version 3.0.x** and above.

# Setup
This directory is divided into the Appium tests in `AppiumTests` and our sample apps imported as a submodule in `Sample-Apps`.

The folder `AppiumTests` contains all the relevant code to make the Applanga screenshot upload work via Appium.

First of all, you have to compile an Android or iOS app, which has the Applanga SDK integrated. In this repository, we use our Sample-Apps to showcase its usage.
Integrate your own `applanga_settingsfile.applanga` to our [Android Sample App](https://github.com/applanga/Sample-Apps/tree/main/Android) and/or our [iOS Sample App](https://github.com/applanga/Sample-Apps/tree/main/iOS/UIKit-Cocoapods).

## Start the Appium Server
There are several ways to start the Appium server.
In this repository we use npm to install all dependencies locally.

Go into `AppiumTests` and run `npm install`.
Then start the Appium server with `npx appium`.

## Run the Appium Android tests

If you don't use our Android Sample App you have to register our `ApplangaBroadcastReceiver`, so the Appium test can trigger a Screenshot from our Applanga SDK.

```
val br: BroadcastReceiver = ApplangaBroadcastReceiver()
val filter = IntentFilter(ApplangaBroadcastReceiver.INTENT_ACTION)
ContextCompat.registerReceiver(this, br, filter, ContextCompat.RECEIVER_EXPORTED);
```


You have to build your Android Application with your Applanga settings file once.
If you don't use our sample app you have to adjust the APK path in `ApplangaSDK/AppiumTests/app/src/test/java/appiumtests/android/AndroidTests.java` in the variable `appPath`.
You also should upload your strings from your app to your Applanga dashboard once.
You can upload your missing strings as described in our [Applanga Android SDK Documentation](https://www.applanga.com/docs/integration-documentation/android#configuration).

Now you can run the tests via your IDE or inside `AppiumTests` with `./gradlew test --tests appiumtests.android.AndroidTests`

After the test has passed successfully, go to your Applanga dashboard and look for the screenshot.
The tag is called `Home-Android` and you should see you linked strings there.

## Run the Appium iOS Tests

You have to build your iOS Application with your Applanga settings file once. 
Then copy your `app_name.app` directory to this directory.
There are several ways to find the app folder, one is [described here](https://stackoverflow.com/a/26201618).
If you use one of our sample apps the directory is called `WeatherSample.app`.
You also should upload your strings from your app to your Applanga dashboard once.
You can upload your missing strings as described in our [Applanga iOS SDK Documentation](https://www.applanga.com/docs/integration-documentation/ios#usage).


Now update the path in `ApplangaSDK/AppiumTests/app/src/test/java/appiumtests/ios/iOSTests.java` in the variable `appPath`. 

You can run the tests in `AppiumTest` with `./gradlew test --tests appiumtests.ios.iOSTests`

## Run Android and iOS together
If you have successfully run the Android and iOS tests separately you can also run them simply together with `./gradlew test`.