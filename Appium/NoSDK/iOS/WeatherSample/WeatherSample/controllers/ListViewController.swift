//
//  ListViewController.swift
//  WeatherSample
//

import UIKit

class ListViewController: UIViewController {

    let state = AppState.shared
    var displayedDaysNum: Int = 0
    
    var days = [Day]()
    
    @IBOutlet weak var displayedDays: UILabel!
    @IBOutlet weak var tableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        createObservers()
        tableView.delegate = self
        tableView.dataSource = self
        
        self.navigationItem.title = NSLocalizedString("daily_title", comment: "")
        self.navigationController?.title = NSLocalizedString("daily_title", comment: "")
    }
    
    func createObservers() {
        let updateNavTitleName = Notification.Name(rawValue: Keys.updateNavigationTitle.rawValue)
        NotificationCenter.default.addObserver(self, selector: #selector(AboutViewController.updateNavTitle), name: updateNavTitleName, object: nil)
    }
    
    @objc func updateNavTitle() {
        self.navigationItem.title = NSLocalizedString("daily_title", comment: "")
        self.navigationController?.title = NSLocalizedString("daily_title", comment: "")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.displayedDaysNum = AppSettings().getDisplayedDays()!
        
        self.navigationItem.title = NSLocalizedString("daily_title", comment: "")
        self.navigationController?.title = NSLocalizedString("daily_title", comment: "")
            
      displayedDays.text = "Displaying next 5 days" //NSString.localizedStringWithFormat(NSString(string:(Applanga.localizedString(forKey: "daily_displayed_days", withDefaultValue: "Days display", andArguments: nil, andPluralRule: ALPluralRuleForQuantity(UInt(displayedDaysNum))))), displayedDaysNum) as String
        
        days = getDays()
        tableView.reloadData()
    }
    
    func getDays() -> [Day] {
        let displayedDaysNumber = self.displayedDaysNum * 8
        return Array(state.dailyWeather!.list.prefix(displayedDaysNumber))
    }
}

extension ListViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return days.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let day = days[indexPath.row]
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "DayCell") as! DayCell
        
        cell.configCell(day: day)
        return cell
    }
}
