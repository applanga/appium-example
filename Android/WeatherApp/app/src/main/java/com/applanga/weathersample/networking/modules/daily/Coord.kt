package com.applanga.weathersample.networking.modules.daily

import com.google.gson.annotations.SerializedName

data class Coord (

		@SerializedName("lat") val lat : Double,
		@SerializedName("lon") val lon : Double
)