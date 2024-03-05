# Appium plus App integrated via Applanga CLI Example


## What is Applanga?
Applanga is a set of tools used for localizing (translating) web and mobile applications. 

With the ApplangaSDK a user can update string values within their application without having to release a new version of the app. The ApplangaSDK can also find and upload all strings within an application and upload them to the Applanga dashboard. Once in the dashboard, Strings can be easily translated and managed. Screenshots of the pages/screens within an app can also be uploaded to the Applanga dashboard so that translators can see the context of the strings they are working on. 

More info [here](https://www.applanga.com/)

## What is Appium?

Appium is an automated testing tool for mobile devices. 

With Appium, you can write command scripts that remote control an app running on a simulator or a real device. These scripts can be written in multiple different languages.

More info [here](http://appium.io/)


## Using Appium and Applanga together

Some apps have many screens and menus, and manually going through an app to take screenshots for the Applanga dashboard (in multiple languages) is very time-consuming and prone to human errors. With Appium and the Applanga tools contained in this repo, it is possible to automate that process. You don't even have to have the Applanga SDK integrated into your app! 

So for example, after the initial scripts are written, you could take 20 screenshots in 20 languages just by running a script and letting it work in the background instead of having to manually do it each time.

It is possible to use these tools whether the app has the Applanga SDK integrated or not.
