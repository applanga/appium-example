package com.applanga.weathersample.networking.modules.daily

import com.google.gson.annotations.SerializedName

data class ApiResponseDaily (
		@SerializedName("cod") val cod : Int,
		@SerializedName("message") val message : Int,
		@SerializedName("cnt") val cnt : Int,
		@SerializedName("list") val list : List<Day>,
		@SerializedName("city") val city : City
)