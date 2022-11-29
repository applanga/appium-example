package com.applanga.weathersample.networking.interfaces

import com.applanga.weathersample.networking.modules.daily.ApiResponseDaily

interface NetworkRequestListenerDaily {
    fun onCompleteNetworkRequestDaily(apiResponse: ApiResponseDaily?)
    fun onNetworkRequestError(error: Throwable)
}