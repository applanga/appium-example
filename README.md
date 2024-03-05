# Appium Example for Integrated Screenshot Automation
This repository contains two examples of different integration approaches to automate the screenshot upload to Applanga for in-context translation review using Appium.

## Mobile app with Applanga SDK
For native mobile apps, you can use the Applanga SDK integration in your app to automate the string localization processes like uploading strings to Applanga automatically or sending translation updates to your app via over-the-air updates. The SDK integration also adds instrumentation to a mobile app that allows uploading screenshots to Applanga. For the Appium integration, we have Appium leverage these SDK features and the SDK itself does the screenshotting, string-to-screen association, and upload to your Applanga project. 

In the `ApplangaSDK` folder, you find one Android and one iOS example application, integrated with Applanga SDKs and the Appium script to automate the screenshot and upload process to Applanga.

## App without Applanga SDK Integration 
In cases where the Applana Mobile SDKs are not an option or you prefer not to use them, we can provide an Appium integration approach that instead leverages unintrusively manipulated string files. The Applanga CLI is used to synchronize string files between the example apps and Applanga. This integration method via Applanga CLI is not limited to mobile apps but can be used for any application that uses a [supported file format](https://www.applanga.com/docs/formats) as its string file format. In this integration scenario, the Appium integration itself does the screenshotting, string-to-screen association, and upload to your configured Applanga project.  

In the directory `WithoutApplangaSDK` you can find an example of an iOS and Android app each, an example Applanga CLI configuration, and the Appium script to automate the screenshot and upload process to Applanga.


## What is Applanga?
Applanga is a localization and translation management platform that provides integration options for developers, a web dashboard to manage the translation process, an in-context translation editor, and a scalable delivery network to deploy your desired translation setup and workflow at any scale. Furthermore, Applanga is a GlobalLink technology and part of TransPerfect which allows any Applanga client to access any translation service required, including highly specialized services for eCOA or medical devices.  

More info [here](https://www.applanga.com/)

## What is Appium?

Appium is an automated testing tool for mobile devices. 

With Appium, you can write command scripts that remote control an app running on a simulator or a real device. These scripts can be written in different programming languages for different types of applications and target platforms.

More info [here](http://appium.io/)


## Why use Appium and Applanga together?

Apps may have many screens and menus, and manually going through an app to take screenshots takes a lot of time. This is multiplied by the number of languages you want to cover. If, in turn, you want to leverage these screenshots for translation review, you also need an environment to efficiently review the screenshots, track the review process, and implement any needed changes. This process might need to be repeated over multiple review rounds to resolve all linguistic and functional issues.  

With Appium and Applanga combined, as shown in the examples stored in this repo, it is possible to automate this process completely. For example, after the initial scripts are written, you could take 20 screenshots in 20 languages simply by running a script and letting it work in the background on a timer whenever you detect changes on Applanga (e.g. via webhook). 


# Applanga Appium Integration
If you want to integrate Applanga into an existing or new Appium setup please check out the [applanga-appium](https://github.com/applanga/applanga-appium) repository
