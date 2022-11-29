//
//  AppState.swift
//  WeatherSample
//

import Foundation

class AppState {

    var currentWeather: CurrentWeatherDataModel?
    var dailyWeather: DailyWeatherDataModel?
    
    private init() {}
    
    static let shared = AppState()
    
    func setCurrentWeather(currentWeather: CurrentWeatherDataModel?) {
        self.currentWeather = currentWeather
        let name = Notification.Name(rawValue: Keys.updateCurrent.rawValue)
        NotificationCenter.default.post(name: name, object: nil)
    }
    
    func setDailyWeather(dailyWeather: DailyWeatherDataModel?) {
        self.dailyWeather = dailyWeather
        let name = Notification.Name(rawValue: Keys.updateDaily.rawValue)
        NotificationCenter.default.post(name: name, object: nil)
    }
}

enum Keys: String {
    case updateCurrent = "UPDATE_CURRENT"
    case updateDaily = "UPDATE_DAILY"
    case updateNavigationTitle = "UPDATE_NAVIGATION"
}
