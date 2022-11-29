//
//  HomeViewController.swift
//  WeatherSample
//

import UIKit
import Combine

class HomeViewController: UIViewController {
    
    let state = AppState.shared
    
    @IBOutlet weak var location: UILabel!
    @IBOutlet weak var date: UILabel!
    @IBOutlet weak var temperature: UILabel!
    @IBOutlet weak var weatherIcon: UIImageView!
    @IBOutlet weak var descriptionTitle: UILabel!
    @IBOutlet weak var descriptionValue: UILabel!
    @IBOutlet weak var feelsLikeTitle: UILabel!
    @IBOutlet weak var feelsLikeValue: UILabel!
    @IBOutlet weak var humidityTitle: UILabel!
    @IBOutlet weak var humidityValue: UILabel!
    @IBOutlet weak var cloudsTitle: UILabel!
    @IBOutlet weak var cloudsValue: UILabel!
    @IBOutlet weak var windSpeedTitle: UILabel!
    @IBOutlet weak var windSpeedValue: UILabel!
    @IBOutlet weak var pressureTitle: UILabel!
    @IBOutlet weak var pressureValue: UILabel!
    @IBOutlet weak var loadingView: UIView!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        createObservers()
        configBackground()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        
        if (state.currentWeather == nil) {
            configState()
        } else {
            updateUi()
        }
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    func createObservers() {
        let updateUiName = Notification.Name(rawValue: Keys.updateCurrent.rawValue)
        NotificationCenter.default.addObserver(self, selector: #selector(HomeViewController.updateUi), name: updateUiName, object: nil)
        
        let updateNavTitleName = Notification.Name(rawValue: Keys.updateNavigationTitle.rawValue)
        NotificationCenter.default.addObserver(self, selector: #selector(HomeViewController.updateNavTitle), name: updateNavTitleName, object: nil)
    }
    
    @objc func updateNavTitle() {
        self.navigationItem.title = NSLocalizedString("home_title", comment: "")
        self.navigationController?.title = NSLocalizedString("home_title", comment: "")
    }
    
    @objc func updateUi() {
        self.navigationItem.title = NSLocalizedString("home_title", comment: "")
        self.navigationController?.title = NSLocalizedString("home_title", comment: "")
        
        descriptionTitle?.text = NSLocalizedString("home_description", comment: "")
        feelsLikeTitle.text = NSLocalizedString("home_feels_like", comment: "")
        humidityTitle.text = NSLocalizedString("home_humidity", comment: "")
        cloudsTitle.text = NSLocalizedString("home_clouds", comment: "")
        windSpeedTitle.text = NSLocalizedString("home_wind_speed", comment: "")
        pressureTitle.text = NSLocalizedString("home_pressure", comment: "")
        
        // temperature
        temperature.text = ("\(Int(round((state.currentWeather?.main.temp)!)))°")
        // date
        date.text = getTodayDate()
        // location
        location.text = "\((state.currentWeather?.name)!), \(state.currentWeather?.sys.country ?? "")"
        // icon
        let iconId = (state.currentWeather?.weather[0].icon)!
        weatherIcon.image = UIImage(systemName: getWeatherIcon(iconCode: iconId))
        getIconColor(iconCode: iconId, img: weatherIcon)
        weatherIcon.layer.shadowColor = UIColor.black.cgColor
        weatherIcon.layer.shadowOpacity = 0.5
        weatherIcon.layer.shadowOffset = CGSize.zero
        weatherIcon.layer.shadowRadius = 8
        // description
        descriptionValue.text = getWeatherDesc(iconCode: iconId) 
        // feels like
        feelsLikeValue.text = "\(Int(round((state.currentWeather?.main.feelsLike)!)))°"
        // humidity
        humidityValue.text = "\((state.currentWeather?.main.humidity)!)%"
        // clouds
        cloudsValue.text = "\((state.currentWeather?.clouds.all)!)%"
        // wind speed
        windSpeedValue.text = "\((state.currentWeather?.wind.speed)!) km/h"
        // pressure
        pressureValue.text = "\((state.currentWeather?.main.pressure)!) hPa"
        // loading spinner
        loadingView.isHidden = true
    }
    
    func configState() {
        Repository().getCurrentWeather { (response) in
            if (response == nil) {
                // should reload screen or something like that
                return
            }
            self.state.setCurrentWeather(currentWeather: response!)
        }
        Repository().getDailyWeather { (response) in
            self.state.dailyWeather = response
        }
    }
    
    func configBackground() {
        let gradient = CAGradientLayer()
        gradient.frame = self.view.bounds
        gradient.colors = [#colorLiteral(red: 0.2392156869, green: 0.6745098233, blue: 0.9686274529, alpha: 1).cgColor, #colorLiteral(red: 0.1764705926, green: 0.4980392158, blue: 0.7568627596, alpha: 1).cgColor]
        self.view.layer.insertSublayer(gradient, at: 0)
    }
}
