# Appium Example
This repository contains two different ways to work with Appium together with the Applanga Screenshot upload.

## Mobile app without using the Applanga SDK
In the directory `WithoutApplangaSDK` you find an example for iOS and Android how to do the Applanga screenshot upload without using the ApplangaSDK. This is done by manipulating the string files before via our Applanga CLI starting the tests.

## Mobile app testing with Applanga SDK
If you already use the Applanga SDK in your app you can look at the examples in `ApplangaSDK`.
There you find one example for Android and one for iOS.
Appium is simply sending a screenshot action to the SDK and the SDK does the screenshot itself and uploads it to your Applanga dashboard.
