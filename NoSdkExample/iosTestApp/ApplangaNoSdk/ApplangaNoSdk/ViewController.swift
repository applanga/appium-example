//
//  ViewController.swift
//  ApplangaNoSdk
//
//  Created by Richard Elms on 15.09.20.
//  Copyright © 2020 Richard Elms. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var OpenPage2Button: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        OpenPage2Button.accessibilityIdentifier = "button"
        
    }


}

