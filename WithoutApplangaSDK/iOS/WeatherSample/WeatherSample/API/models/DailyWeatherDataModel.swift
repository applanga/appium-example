import Foundation

struct DailyWeatherDataModel: Codable {
    var list : [Day]
}

struct Day: Codable, Identifiable {
    var id = UUID()
    var main : TempData
    var weather : [GeneralData]
    var dtTxt: String
    
    enum CodingKeys: String, CodingKey {
        case main, weather
        case dtTxt = "dt_txt"
    }
}

struct GeneralData: Codable {
    var id : Int
    var main : String
    var description: String
    var icon : String
}

struct TempData: Codable {
    var temp : Double
    var feels_like : Double
    var temp_min : Double
    var temp_max : Double
    var pressure : Int
    var humidity : Int
}
