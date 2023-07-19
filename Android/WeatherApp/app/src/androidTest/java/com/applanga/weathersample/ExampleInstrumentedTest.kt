package com.applanga.weathersample

import android.content.Intent
import android.os.SystemClock
import androidx.test.core.app.ActivityScenario
import androidx.test.core.app.ApplicationProvider
import androidx.test.core.app.launchActivity
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.ViewAction
import androidx.test.espresso.action.ViewActions.click
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.internal.runner.junit4.AndroidJUnit4ClassRunner
import com.applanga.android.Applanga
import com.applanga.android.ScreenshotCallback
import junit.framework.Assert.fail
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import java.util.*
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4ClassRunner::class)
class ScreenshotRunner {
    val timeout = 6000L;
    lateinit var scenario: ActivityScenario<MainActivity>

    @After
    fun cleanup() {
        Applanga.setShowIdModeEnabled(false)
        scenario.close()
    }

    @Before
    fun init() {
        updateApplangaWithAllLanguages();
    }

    /*
        This test runs with show id mode enabled. This means that all id's are shown instead of
        their actual translations. This is useful to accurately and automatically
        connect string ids to the screenshot - even if they were set at runtime.
     */
    @Test
    fun screenshotsShowIdMode() {
        // enable show id mode
        Applanga.setShowIdModeEnabled(true)
        startMainActivity()
        // do screenshots with all ids
        runScreenshotAutomation()
    }

    @Test
    fun screenshotsEn() {
        Applanga.setLanguage("en");
        startMainActivity()
        runScreenshotAutomation();
    }

    @Test
    fun screenshotsDe() {
        Applanga.setLanguage("de");
        startMainActivity()
        runScreenshotAutomation();
    }

    @Test
    fun screenshotsFr() {
        Applanga.setLanguage("fr");
        startMainActivity()
        runScreenshotAutomation();
    }

    private fun startMainActivity() {
        val intent = Intent(ApplicationProvider.getApplicationContext(), MainActivity::class.java)
        scenario = launchActivity(intent)
        // wait activity to be ready
        onView(withId(R.id.home_progress_bar_spinner)).perform(waitUntilGone(timeout))
    }

    private fun updateApplangaWithAllLanguages() {
        val updateLatch = CountDownLatch(1)
        val groups: MutableList<String> = ArrayList()
        groups.add("main")

        val languages: MutableList<String> = ArrayList()
        languages.add("de")
        languages.add("fr")
        languages.add("en")

        Applanga.update(groups, languages) {
            if (it) {
                updateLatch.countDown()
            } else
                fail()
        }
        // wait for the callback
        updateLatch.await(timeout, TimeUnit.MILLISECONDS);
    }

    private fun captureScreenshot(screenTag: String, ids: List<String>? = null) {
        val latch = CountDownLatch(1)
        Applanga.captureScreenshot(screenTag, ids, ScreenshotCallback {
            if (it)
                latch.countDown()
            else
                fail()
        })
        // wait for the screenshot
        latch.await(timeout, TimeUnit.MILLISECONDS);
    }

    private fun waitUntilGone(timeout: Long): ViewAction {
        return WaitUntilGoneAction(timeout)
    }

    private fun runScreenshotAutomation() {
        // Home
        captureScreenshot("Home")

        // Daily weather page
        onView(withId(R.id.nav_daily)).perform(click())
        captureScreenshot("DailyWeather")

        // About (WebView)
        onView(withId(R.id.nav_about)).perform(click())

        // about is a webview, we don't support automatic screenshot string collection
        // for webviews yet
        val aboutIds = listOf(
            "about_app_header",
            "about_app_text",
            "about_features_header",
            "about_features_text_first",
            "about_features_text_second",
            "about_display_header",
            "about_display_text",
            "about_settings_header",
            "about_settings_text"
        )
        // wait for the webview to load
        onView(withId(R.id.about_progress_bar_spinner)).perform(waitUntilGone(timeout))
        // we need to sleep here as applanga attaches to the webview which takes a moment
        SystemClock.sleep(1000)
        captureScreenshot("About", aboutIds)

        // Settings
        onView(withId(R.id.nav_settings)).perform(click())
        captureScreenshot("Settings")
    }

}