package com.applanga.weathersample.networking.modules.current

import com.google.gson.annotations.SerializedName

data class Rain (

		@SerializedName("1h") val oneHour : Double
)