//
//  DayCell.swift
//  WeatherSample
//

import UIKit

class DayCell: UITableViewCell {


    @IBOutlet weak var month: UILabel!
    @IBOutlet weak var day: UILabel!
    @IBOutlet weak var weatherIcon: UIImageView!
    @IBOutlet weak var time: UILabel!
    @IBOutlet weak var temperature: UILabel!
    
    func configCell(day: Day) {
        month.text = "\(getMonthFromString(str: day.dtTxt)) \(getDayNumberFromString(str: day.dtTxt))"
        
        self.day.text = getDayFromStr(str: day.dtTxt)
        
        weatherIcon.image = UIImage(systemName: getWeatherIcon(iconCode: day.weather[0].icon))
        getIconColor(iconCode: day.weather[0].icon, img: weatherIcon)
        weatherIcon.layer.shadowColor = UIColor.black.cgColor
        weatherIcon.layer.shadowOpacity = 0.5
        weatherIcon.layer.shadowOffset = CGSize.zero
        weatherIcon.layer.shadowRadius = 5
        
        time.text = getTimeFromString(str: day.dtTxt)
        
        temperature.text = "\(Int(round(day.main.temp)))°"
    }
}
