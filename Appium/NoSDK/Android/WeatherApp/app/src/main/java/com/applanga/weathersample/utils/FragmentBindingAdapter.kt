package com.applanga.weathersample.utils

import android.content.Context
import android.widget.TextView
import androidx.databinding.BindingAdapter
import com.applanga.weathersample.R
import kotlin.math.roundToInt

object FragmentBindingAdapter {
    @JvmStatic
    @BindingAdapter("doubleToInt")
    fun doubleToInt(textView: TextView, temp: Double?) {
        textView.text = doubleToInt(temp)
    }

    @JvmStatic
    fun doubleToInt(temp: Double?): String {
        return temp?.roundToInt().toString() + "° "
    }

    @JvmStatic
    @BindingAdapter("getDescriptionString")
    fun getDescriptionString(textView: TextView, descriptionId: String?) {
        val text = "${getDescriptionString(textView.context, descriptionId)} "
        textView.text = text
    }

    @JvmStatic
    fun getDescriptionString(context: Context, descriptionId: String?): String {
        return when (descriptionId) {
            "01d", "01n" -> context.resources.getString(R.string.description_clear_sky)
            "02d", "02n" -> context.resources.getString(R.string.description_few_clouds)
            "03d", "03n" -> context.resources.getString(R.string.description_scattered_clouds)
            "04d", "04n" -> context.resources.getString(R.string.description_broken_clouds)
            "09d", "09n" -> context.resources.getString(R.string.description_shower_rain)
            "10d", "10n" -> context.resources.getString(R.string.description_rain)
            "11d", "11n" -> context.resources.getString(R.string.description_thunderstorm)
            "13d", "13n" -> context.resources.getString(R.string.description_snow)
            "50d", "50n" -> context.resources.getString(R.string.description_mist)
            else -> context.resources.getString(R.string.not_available)
        }
    }
}