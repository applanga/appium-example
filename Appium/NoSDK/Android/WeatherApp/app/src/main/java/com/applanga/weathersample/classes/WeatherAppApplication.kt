package com.applanga.weathersample.classes

import android.app.Application

class WeatherAppApplication : Application() {

    companion object {
        lateinit var app : WeatherAppApplication
    }

    lateinit var sharedPrefrencesManager: SharedPrefrencesManager

    override fun onCreate() {
        super.onCreate()

        sharedPrefrencesManager = SharedPrefrencesManager(this)

        app = this
    }

}