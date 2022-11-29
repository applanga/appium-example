package com.applanga.weathersample.networking.modules.daily

import com.google.gson.annotations.SerializedName

data class WeatherData (
    @SerializedName("id") val id : Int,
    @SerializedName("main") val main : String,
    @SerializedName("description") val description : String,
    @SerializedName("icon") val icon : String
)