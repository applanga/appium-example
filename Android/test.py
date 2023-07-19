
import unittest
from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy

capabilities = dict(
    platformName='Android',
    automationName='uiautomator2',
    appPackage='com.applanga.weathersample',
    appActivity='com.applanga.weathersample.MainActivity',
    deviceName='Pixel_3_API_28',
    app='/Users/alec/projects/applanga/appium-example/Appium/NoSDK/Android/WeatherApp/app/build/outputs/apk/debug/app-debug.apk',
    platformVersion='9',
    language='en',
    locale='US'
)

appium_server_url = 'http://localhost:4723/wd/hub'

class TestAppium(unittest.TestCase):
    def setUp(self) -> None:
        self.driver = webdriver.Remote(appium_server_url, capabilities)

    def tearDown(self) -> None:
        if self.driver:
            self.driver.quit()

    def test_getSource(self) -> None:
        el = self.driver.page_source
        print(el)

if __name__ == '__main__':
    unittest.main()
