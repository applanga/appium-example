//
//  AboutViewController.swift
//  WeatherSample
//

import UIKit
import WebKit

class AboutViewController: UIViewController {

//    @IBOutlet weak var webView: WKWebView!
    @IBOutlet weak var appheader: UITextField!
    @IBOutlet weak var apptext: UITextField!
    @IBOutlet weak var featuresheader: UITextField!
    @IBOutlet weak var featurestextfirst: UITextField!
    @IBOutlet weak var featurestextsecond: UITextField!
    @IBOutlet weak var displayheader: UITextField!
    @IBOutlet weak var displaytext: UITextField!
    @IBOutlet weak var customizeheader: UITextField!
    @IBOutlet weak var customizetext: UITextField!
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        createObservers()
        updateUI()
        
        self.navigationItem.title = NSLocalizedString("daily_title", comment: "")
        self.navigationController?.title = NSLocalizedString("daily_title", comment: "")
        self.navigationItem.isAccessibilityElement = true
        self.navigationController?.isAccessibilityElement = true
    }
    
    func createObservers() {
        let updateNavTitleName = Notification.Name(rawValue: Keys.updateNavigationTitle.rawValue)
        NotificationCenter.default.addObserver(self, selector: #selector(AboutViewController.updateNavTitle), name: updateNavTitleName, object: nil)
    }
    
    @objc func updateNavTitle() {
        self.navigationItem.title = NSLocalizedString("about_title", comment: "")
        self.navigationController?.title = NSLocalizedString("about_title", comment: "")
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.navigationItem.title = NSLocalizedString("about_title", comment: "")
        self.navigationController?.title = NSLocalizedString("about_title", comment: "")
        // loading local html file
        let url = Bundle.main.url(forResource: "about-page", withExtension: "html")
//        webView.load(URLRequest(url: url!))
    }
    
    func updateUI () {
        self.appheader.text = NSLocalizedString("about_app_header", comment: "")
        self.apptext.text = NSLocalizedString("about_app_text", comment: "")
        self.featuresheader.text = NSLocalizedString("about_features_header", comment: "")
        self.featurestextfirst.text = NSLocalizedString("about_features_text_first", comment: "")
        self.featurestextsecond.text = NSLocalizedString("about_features_text_second", comment: "")
        self.displayheader.text = NSLocalizedString("about_display_header", comment: "")
        self.displaytext.text = NSLocalizedString("about_display_text", comment: "")
        self.customizeheader.text = NSLocalizedString("about_customize_header", comment: "")
        self.customizetext.text = NSLocalizedString("about_customize_text", comment: "")
    }
}
