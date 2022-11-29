package com.applanga.weathersample

import android.os.Bundle
import android.view.MotionEvent
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.lifecycle.MediatorLiveData
import com.applanga.weathersample.classes.SharedPrefrencesManager.Keys
import com.applanga.weathersample.classes.WeatherAppApplication
import com.applanga.weathersample.databinding.ActivityMainBinding
import com.applanga.weathersample.fragments.AboutFragment
import com.applanga.weathersample.fragments.DailyFragment
import com.applanga.weathersample.fragments.HomeFragment
import com.applanga.weathersample.fragments.SettingsFragment
import com.applanga.weathersample.networking.Repository
import com.applanga.weathersample.networking.interfaces.NetworkRequestListenerCurrent
import com.applanga.weathersample.networking.interfaces.NetworkRequestListenerDaily
import com.applanga.weathersample.networking.modules.current.ApiResponseCurrent
import com.applanga.weathersample.networking.modules.daily.ApiResponseDaily


class MainActivity : AppCompatActivity() ,
    NetworkRequestListenerCurrent,
    NetworkRequestListenerDaily {

    private val repository = Repository()

    var currentWeather : MediatorLiveData<ApiResponseCurrent> = MediatorLiveData()
    var dailyWeather : MediatorLiveData<ApiResponseDaily> = MediatorLiveData()

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
    }

    override fun onResume() {
        super.onResume()
        initApp()
    }

    private fun initApp() {
        setInitialSettings()
        initNavigation()
        getApiData()
    }

    private fun initNavigation() {
        val homeFragment = HomeFragment()
        val dailyFragment = DailyFragment()
        val aboutFragment = AboutFragment()
        val settingsFragment = SettingsFragment()

        setFragmentView(homeFragment)

        binding.bottomNav?.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.nav_home -> setFragmentView(homeFragment)
                R.id.nav_daily -> setFragmentView(dailyFragment)
                R.id.nav_about -> setFragmentView(aboutFragment)
                R.id.nav_settings -> setFragmentView(settingsFragment)
                else -> setFragmentView(homeFragment)
            }
            true
        }
    }

    private fun setFragmentView(fragment: Fragment) {
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.fragment_wrapper, fragment)
            commit()
        }
    }

    private fun getApiData() {
        val settings = WeatherAppApplication.app.sharedPrefrencesManager
        val city = settings.getString(Keys.CITY_KEY.toString(), "New York")
        val unit = settings.getString(Keys.UNITS_KEY.toString(), "metric")

        if (city != null && unit != null) {
            repository.fetchCurrentWeather(this, this, city, unit)
            repository.fetchDailyWeather(this, city, unit)
        }
    }

    override fun onCompleteNetworkRequestCurrent(apiResponse: ApiResponseCurrent?) {
        if (apiResponse != null) {
            currentWeather.apply {
                value = apiResponse
            }
        }
    }

    override fun onCompleteNetworkRequestDaily(apiResponse: ApiResponseDaily?) {
        if (apiResponse != null) {
            dailyWeather.apply {
                value = apiResponse
            }
        }
    }

    override fun onNetworkRequestError(error: Throwable) {
        Toast.makeText(this, error.message, Toast.LENGTH_LONG).show()
    }

    private fun setInitialSettings() {
        val settings = WeatherAppApplication.app.sharedPrefrencesManager

        if (settings.getBoolean(Keys.FIRST_RUN_KEY.toString(), true)) {
            settings.let {
                it.putString(Keys.CITY_KEY.toString(), "New York")
                it.putString(Keys.UNITS_KEY.toString(), "metric")
                it.putString(Keys.LANGUAGE_KEY.toString(), "en")
                it.putInt(Keys.DAYS_NUMBER_KEY.toString(), 5)
                it.putBoolean(Keys.FIRST_RUN_KEY.toString(), false)
            }
        }
    }

    //     --- Allow Applanga's draft mode --- //
    override fun dispatchTouchEvent(ev: MotionEvent?): Boolean {
//        Applanga.dispatchTouchEvent(ev, this)
        return super.dispatchTouchEvent(ev)
    }

}