//
//  Repository.swift
//  WeatherSample
//

import Foundation

struct Repository {
    
    private var apiKey = "aebbd2fcfb9380df055be33fa8989c94"
    private var baseUrl = "https://api.openweathermap.org/"
    private var currentWeatherUrl = "data/2.5/weather"
    private var dailyWeatherUrl = "data/2.5/forecast"

    // GET current weather
    public func getCurrentWeather(completion: @escaping (CurrentWeatherDataModel?) -> ()) {
        
        var location: String
        var units: String
        
        location = AppSettings().getLocation()!
        units = AppSettings().getUnits()!
        
        location = location.replacingOccurrences(of: " ", with: "%20")

        let urlString =
            "\(baseUrl)\(currentWeatherUrl)?q=\(location)&units=\(units)&appid=\(apiKey)"
        
        let url = URL(string: urlString)!

        let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
            
            let decoder = JSONDecoder()
            
            do {
                let currentWeather = try decoder.decode(CurrentWeatherDataModel.self, from: data!)
                
                DispatchQueue.main.async {
                    completion(currentWeather)
                }
            } catch {
                DispatchQueue.main.async {
                    completion(nil)
                }
            }

        }

        task.resume()
    }
    
    // GET daily weather
    public func getDailyWeather(completion: @escaping (DailyWeatherDataModel?) -> ()) {
        
        var location: String
        var units: String
        
        location = AppSettings().getLocation()!
        units = AppSettings().getUnits()!
        
        location = location.replacingOccurrences(of: " ", with: "%20")
        
        let urlString =
            "\(baseUrl)\(dailyWeatherUrl)?q=\(location)&units=\(units)&appid=\(apiKey)"
        
        let url = URL(string: urlString)!
        
        let task = URLSession.shared.dataTask(with: url) {(data, response, error) in
            
            let decoder = JSONDecoder()
                
            do {
                let dailyWeather = try decoder.decode(DailyWeatherDataModel.self, from: data!)

                DispatchQueue.main.async {
                    completion(dailyWeather)
                }
            } catch {
                DispatchQueue.main.async {
                    completion(nil)
                }
            }
        }
        
        task.resume()
    }

}

// Current Weather example https://api.openweathermap.org/data/2.5/weather?q=berlin&units=metric&appid=aebbd2fcfb9380df055be33fa8989c94

// Daily Weather example https://api.openweathermap.org/data/2.5/forecast?q=berlin&units=metric&appid=aebbd2fcfb9380df055be33fa8989c94
