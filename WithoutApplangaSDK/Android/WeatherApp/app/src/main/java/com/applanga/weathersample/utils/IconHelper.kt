package com.applanga.weathersample.utils

import com.applanga.weathersample.R

object IconHelper {
    fun getWeatherIcon(resId: String): Int {
        return when (resId) {
            "01d" -> R.drawable.ic__01d
            "01n" -> R.drawable.ic__01n
            "02d" -> R.drawable.ic__02d
            "02n" -> R.drawable.ic__02n
            "03d" -> R.drawable.ic__03d
            "03n" -> R.drawable.ic__03n
            "04d" -> R.drawable.ic__04d
            "04n" -> R.drawable.ic__04n
            "09d" -> R.drawable.ic__09d
            "09n" -> R.drawable.ic__09n
            "10d" -> R.drawable.ic__10d
            "10n" -> R.drawable.ic__10n
            "11d" -> R.drawable.ic__11d
            "11n" -> R.drawable.ic__11n
            "13d" -> R.drawable.ic__13d
            "13n" -> R.drawable.ic__13n
            "50d" -> R.drawable.ic__50d
            "50n" -> R.drawable.ic__50n
            else -> R.drawable.ic__01d
        }
    }
}