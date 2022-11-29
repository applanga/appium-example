package com.applanga.weathersample.networking

import com.applanga.weathersample.networking.modules.current.ApiResponseCurrent
import com.applanga.weathersample.networking.modules.daily.ApiResponseDaily
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query

interface WeatherApi {

    @GET("data/2.5/weather")
    fun getCurrent(
            @Query("appid") appId: String,
            @Query("units") units: String,
            @Query("q") city: String
    ): Call<ApiResponseCurrent>

    @GET("data/2.5/forecast")
    fun getDaily(
            @Query("appid") appId: String,
            @Query("units") units: String,
            @Query("q") city: String
    ): Call<ApiResponseDaily>

}