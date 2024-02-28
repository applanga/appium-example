package com.applanga.weathersample.classes

import android.content.Context

class SharedPrefrencesManager(application: WeatherAppApplication) {

    enum class Keys {
        SHARED_PREFRENCES_FILE,
        FIRST_RUN_KEY,
        CITY_KEY,
        UNITS_KEY,
        LANGUAGE_KEY,
        DAYS_NUMBER_KEY
    }

    private val sharedPref = application.getSharedPreferences(Keys.SHARED_PREFRENCES_FILE.toString() ,Context.MODE_PRIVATE)

    fun getString(key: String, defValue : String?): String? {
        return sharedPref.getString(key, defValue)
    }

    fun putString(key: String, value: String) {
        sharedPref.edit().putString(key, value).apply()
    }

    fun getInt(key: String, defValue : Int): Int {
        return sharedPref.getInt(key, defValue)
    }

    fun putInt(key: String, value: Int) {
        sharedPref.edit().putInt(key, value).apply()
    }

    fun getBoolean(key: String, defValue : Boolean): Boolean {
        return sharedPref.getBoolean(key, defValue)
    }

    fun putBoolean(key: String, value: Boolean) {
        sharedPref.edit().putBoolean(key, value).apply()
    }

}