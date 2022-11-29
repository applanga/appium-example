//
//  WeatherSampleUITests.swift
//  WeatherSampleUITests
//

import XCTest
import ApplangaUITest

class AutomatedScreenshotsTest: XCTestCase {

    let app = XCUIApplication()
    var applangaUITest: ApplangaUITest?

    func takeScreenshot(tag: String) {
        wait(for: [applangaUITest!.takeScreenshot(tag: tag)], timeout: 10.0)
    }
    
    func testScreenshots() {
        applangaUITest = ApplangaUITest(app: app)
        app.launch()
        
        changeAppLanguage(lang: "en")
        takeAllScreenshots()
        
        changeAppLanguage(lang: "de")
        takeAllScreenshots()
        
        changeAppLanguage(lang: "fr")
        takeAllScreenshots()
    }
    
    func takeAllScreenshots() {
        
        // Home
        app.tabBars.buttons.element(boundBy: 0).tap();
        sleep(1)
        takeScreenshot(tag: "Home")

        // Daily forecast
        app.tabBars.buttons.element(boundBy: 1).tap();
        sleep(1)
        takeScreenshot(tag: "Daily")

        // About
        app.tabBars.buttons.element(boundBy: 2).tap();
        sleep(1)
        takeScreenshot(tag: "About")

        // Settings
        app.tabBars.buttons.element(boundBy: 3).tap();
        sleep(1)
        takeScreenshot(tag: "Settings")
        
        sleep(1)
    }
    
    func changeAppLanguage(lang: String) {
        // Settings
        app.tabBars.buttons.element(boundBy: 3).tap();
        app.buttons["\(lang)"].tap()
        sleep(2)
        app.buttons["save"].tap()
        sleep(2)
    }
}
