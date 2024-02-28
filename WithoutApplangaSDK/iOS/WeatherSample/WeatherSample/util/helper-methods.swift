//
//  helper-methods.swift
//  WeatherSample
//

import Foundation
import UIKit

func getWeatherIcon(iconCode: String) -> String {
    switch iconCode {
        case "01d": return "sun.max.fill"
        case "01n": return "moon.fill"
        case "02d": return "cloud.sun.fill"
        case "02n": return "cloud.moon.fill"
        case "03d", "03n": return "cloud.fill"
        case "04d", "04n": return "smoke.fill"
        case "09d", "09n": return "cloud.drizzle.fill"
        case "10d", "10n": return "cloud.heavyrain.fill"
        case "11d", "11n": return "cloud.bolt.rain.fill"
        case "13d", "13n": return "cloud.snow.fill"
        case "50d", "50n": return "wind"

        default: return "cloud.sun.fill"
    }
}

func getIconColor(iconCode: String, img: UIImageView) {
        switch(iconCode) {
        case "01d": img.tintColor = .yellow
        case "02d", "02n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n": img.tintColor = .white
        case "01n": img.tintColor = UIColor.systemGray3
        case "03d", "03n", "04d", "04n": img.tintColor = .systemGray2
        case "50d", "50n": img.tintColor = UIColor.systemGray
            default:
                img.tintColor = .white
        }
}

func getWeatherDesc(iconCode: String) -> String {
    
    var stringKey: String
    
    switch iconCode {
        case "01d", "01n": stringKey = "clear_sky"
        case "02d", "02n": stringKey = "few_clouds"
        case "03d", "03n": stringKey = "scattered_clouds"
        case "04d", "04n": stringKey = "broken_clouds"
        case "09d", "09n": stringKey = "shower_rain"
        case "10d", "10n": stringKey = "rain"
        case "11d", "11n": stringKey = "thunderstorm"
        case "13d", "13n": stringKey = "snow"
        case "50d", "50n": stringKey = "mist"

        default: stringKey = "clear_sky"
    }
    
    return NSLocalizedString(stringKey, comment: "")
}

func getTimeFromString(str: String) -> String {
    let start = str.index(str.startIndex, offsetBy: 11)
    let end = str.index(str.endIndex, offsetBy: -3)
    let range = start..<end

    let substring = str[range]
    let timeString = String(substring)
    
    var postfix: String
    let timeInt = Int(timeString[..<timeString.index(timeString.startIndex, offsetBy: 2)])
    if (timeInt! >= 12) {
        postfix = "PM"
    } else {
        postfix = "AM"
    }

    return "\(timeString) \(postfix)"
}

func getFullDateFromString(str: String) -> String {
    let fullDate = "\(getDayFromStr(str: str)), \(getMonthFromString(str: str)) \(getDayNumberFromString(str: str))"
    
    return fullDate
}

func getDayNumberFromString(str: String) -> String {
    
    let start = str.index(str.startIndex, offsetBy: 8)
    let end = str.index(str.endIndex, offsetBy: -9)
    let range = start..<end
    let daySubstring = str[range]
    var day = String(daySubstring)
    let dayIndex = day.index(str.startIndex, offsetBy: 1)
    let firstChar = day[..<dayIndex]
    
    if (firstChar == "0") {
        day = "\(day.dropFirst())"
    }
    
    return day
}

func getMonthFromString(str: String) -> String {
    
    let start = str.index(str.startIndex, offsetBy: 5)
    let end = str.index(str.endIndex, offsetBy: -12)
    let range = start..<end

    let substring = str[range]
    let monthNumber = String(substring)
    
    var month: String

    switch monthNumber {
        case "01": month = "January"
        case "02": month = "February"
        case "03": month = "March"
        case "04": month = "April"
        case "05": month = "May"
        case "06": month = "June"
        case "07": month = "July"
        case "08": month = "August"
        case "09": month = "September"
        case "10": month = "October"
        case "11": month = "November"
        case "12": month = "December"
        default: month = "N/A"
    }
    return NSLocalizedString(month, comment: "")
}

func getDayFromStr(str: String) -> String {
    let index = str.index(str.startIndex, offsetBy: 10)
    let substring = str[..<index]
    let dateString = String(substring)

    let dateFormatter = DateFormatter()
    dateFormatter.locale = Locale(identifier: "en_US_POSIX")
    dateFormatter.dateFormat = "yyyy-MM-dd"
    let date = dateFormatter.date(from:dateString)!
    
    var weekday: String
    dateFormatter.dateFormat = "cccc"
    weekday = dateFormatter.string(from: date)
    
    return NSLocalizedString(weekday, comment: "")
}

func getTodayDate() -> String {
    let today = Date()
    let formatter1 = DateFormatter()
    formatter1.dateStyle = .full
    let fullDate = formatter1.string(from: today)
    
    let stringArray = fullDate.components(separatedBy: ", ")
    let weekday = stringArray[0]
    let month = stringArray[1].components(separatedBy:" ")[0]
    let day = stringArray[1].components(separatedBy:" ")[1]

    return "\(NSLocalizedString(weekday, comment: "")), \(NSLocalizedString(month, comment: "")) \(day)"
}
