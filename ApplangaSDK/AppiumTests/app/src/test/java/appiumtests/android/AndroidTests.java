package appiumtests.android;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.google.common.collect.ImmutableMap;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.android.AndroidDriver;

class AndroidTests {
   
   public static AppiumDriver driver;
   public static WebDriverWait wait;
   
   final String packageName = "com.applanga.weathersample";
   
   By contentBy = By.id("android:id/content");
   
   @BeforeEach
   public void setup() throws MalformedURLException {
      DesiredCapabilities caps = new DesiredCapabilities();
      caps.setCapability("platformName", "Android");
      caps.setCapability("skipUnlock", "true");
      caps.setCapability("appPackage", packageName);
      // /Users/alec/projects/applanga/appium-example/ApplangaSDK/AppiumTests/app
      String currentDir = System.getProperty("user.dir");
      String appPath = currentDir + "/../../Sample-Apps/Android/WeatherApp/app/build/intermediates/apk/debug/app-debug.apk";
      caps.setCapability("app", appPath);
      caps.setCapability("appActivity", packageName + ".MainActivity");
      caps.setCapability("automationName", "UiAutomator2");
      caps.setCapability("noReset", "false");
      caps.setCapability("optionalIntentArguments", "--ez applangaappium true");
      driver = new AndroidDriver(new URL("http://127.0.0.1:4723"), caps);
      wait = new WebDriverWait(driver, Duration.ofSeconds(10));
   }
   
   @Test
   public void basicTest() {
      wait.until(ExpectedConditions.visibilityOfElementLocated(contentBy));
      applangaCaptureScreenshot("splash");
   }
   
   public void applangaCaptureScreenshot(String tagName) {
      driver.executeScript("mobile: broadcast", ImmutableMap.of("action", "com.applanga.android.screenshot", "extras", new String[][]{new String[]{"s", "tag", tagName}}));
      WebDriverWait waitForToast = new WebDriverWait(driver, Duration.ofSeconds(10));
      waitForToast.until(ExpectedConditions.presenceOfElementLocated(By.xpath("/hierarchy/android.widget.Toast")));
      String toastMessage = driver.findElement((By.xpath("/hierarchy/android.widget.Toast"))).getText();
      assertEquals(toastMessage, "Screenshot captured");
   }
   
   @AfterEach
   public void teardown() {
      driver.quit();
   }
}
