package com.applanga.weathersample.networking.interfaces

import com.applanga.weathersample.networking.modules.current.ApiResponseCurrent

interface NetworkRequestListenerCurrent {
    fun onCompleteNetworkRequestCurrent(apiResponse: ApiResponseCurrent?)
    fun onNetworkRequestError(error: Throwable)
}