//
//  AppSettings.swift
//  WeatherSample
//

import Foundation

class AppSettings {
    
    enum Keys: String {
        case location = "location"
        case units = "units"
        case language = "language"
        case displayedDays = "displayedDays"
    }
    
    let settings = UserDefaults.standard
    
    init() {
        initSettings()
    }
    
    public func initSettings() {
        let initialLocation = "New York"
        let initialUnits = "Metric"
        let initialLanguage = "English"
        let initialDisplayedDays = 5
        
        if (getLocation() == nil) {
            setLocation(location: initialLocation)
        }
        
        if (getUnits() == nil) {
            setUnits(units: initialUnits)
        }
        
        if (getLanguage() == nil) {
            setLanguage(language: initialLanguage)
        }
        
        if (getDisplayedDays() == nil || getDisplayedDays() == 0) {
            setDisplayedDays(displayedDays: initialDisplayedDays)
        }
        
    }
    
    // Getters
    public func getLocation() -> String? {
        return settings.string(forKey: Keys.location.rawValue)
    }
    
    public func getUnits() -> String? {
        return settings.string(forKey: Keys.units.rawValue)
    }
    
    public func getLanguage() -> String? {
        return settings.string(forKey: Keys.language.rawValue)
    }
    
    public func getDisplayedDays() -> Int? {
        return settings.integer(forKey: Keys.displayedDays.rawValue)
    }
    
    // Setters
    public func setLocation(location: String) {
        settings.set(location, forKey: Keys.location.rawValue)
    }
    
    public func setUnits(units: String) {
        settings.set(units, forKey: Keys.units.rawValue)
    }
    
    public func setLanguage(language: String) {
        settings.set(language, forKey: Keys.language.rawValue)
    }
    
    public func setDisplayedDays(displayedDays: Int) {
        settings.set(displayedDays, forKey: Keys.displayedDays.rawValue)
    }
}
