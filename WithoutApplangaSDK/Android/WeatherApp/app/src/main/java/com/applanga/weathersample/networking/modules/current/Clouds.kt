package com.applanga.weathersample.networking.modules.current

import com.google.gson.annotations.SerializedName


data class Clouds (

	@SerializedName("all") val all : Int
)