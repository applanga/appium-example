package appiumtests.ios;

import org.json.JSONException;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import io.appium.java_client.ios.IOSDriver;

class iOSTests {
    
    public static IOSDriver driver;
    public static WebDriverWait wait;
    
    By contentBy = By.id("WeatherSample");
    By screenshotDoneAlertBy = By.xpath("//XCUIElementTypeAlert[@name=\"Applanga Screenshot\"]");
    
    By alertBy = By.className("XCUIElementTypeAlert");
    
    public void setupIOS(boolean withShowIdMode) throws MalformedURLException {
        DesiredCapabilities caps = new DesiredCapabilities();
        caps.setCapability("platformName", "iOS");
        JSONObject processArguments = new JSONObject();
        try {
            if (withShowIdMode) {
                processArguments.put("args", Arrays.asList("ApplangaAppiumEnabled", "ApplangaShowIdModeEnabled"));
            } else {
                processArguments.put("args", Arrays.asList("ApplangaAppiumEnabled"));
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        caps.setCapability("processArguments", processArguments);
        // caps.setCapability("autoAcceptAlerts", "true");
        caps.setCapability("locale", "US");
        caps.setCapability("language", "en");
        String appPath = "/Users/alec/projects/applanga/appium-example/ApplangaSDK/AppiumTests/trash/WeatherSample.app";
        caps.setCapability("app", appPath);
        caps.setCapability("automationName", "XCUITest");
        driver = new IOSDriver(new URL("http://127.0.0.1:4723"), caps);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    @Test
    public void basicTest() throws MalformedURLException {
        setupIOS(true);
        wait.until(ExpectedConditions.visibilityOfElementLocated(contentBy));
        applangaCaptureScreenshot("Home-iOS");
        driver.quit();
        setupIOS(false);
        applangaCaptureScreenshot("Home-iOS");
    }
    
    public void applangaCaptureScreenshot(String tagName) {
        final List<WebElement> textElements = driver.findElements(By.className("XCUIElementTypeStaticText"));
        JSONObject json = new JSONObject();
        try {
            JSONObject idsAndPos = new JSONObject();
            for (int i = 0; i < textElements.size(); i++) {
                WebElement textElement = textElements.get(i);
                try {
                    idsAndPos.put(textElement.getText(), String.format("{{%d,%d},{%d,%d}}", textElement.getRect().getX(), textElement.getRect().getWidth(), textElement.getRect().getY(), textElement.getRect().getHeight()));
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
            
            json.put("idsAndPos", idsAndPos);
            json.put("tag", tagName);
            json.put("uuid", UUID.randomUUID());
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
        
        String jsonStr = "applanga:" + json;
        driver.setClipboardText(jsonStr);
        
        String link = "xcrun simctl notify_post booted com.applanga:screenshot_start";
        ProcessBuilder processBuilder = new ProcessBuilder();
        processBuilder.command("sh", "-c", link);
        try {
            processBuilder.start();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        wait.until(ExpectedConditions.visibilityOfElementLocated(alertBy));
        driver.switchTo().alert().accept();
        wait.until(ExpectedConditions.visibilityOfElementLocated(screenshotDoneAlertBy));
        driver.switchTo().alert().accept();
        
        
    }
    
    
    @AfterEach
    public void teardown() {
        driver.quit();
    }
}
