package com.applanga.weathersample.networking.modules.current

import com.google.gson.annotations.SerializedName

data class Coord (

		@SerializedName("lon") val lon : Double,
		@SerializedName("lat") val lat : Double
)