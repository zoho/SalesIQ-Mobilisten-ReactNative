//
//  RNZSIQNotificationService.swift
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 04/03/25.
//

import Foundation

@objc
public class RNZSIQNotificationService: NSObject {
    @objc
    public static func enablePush(_ token: String, isTestDevice: Bool, isProductionMode: Bool) {
        RNZohoSalesIQMobilisten.enablePush(token: token, isTestDevice: isTestDevice, isProductionMode: isProductionMode)
    }
    
    @objc
    public static func processNotificationWithInfo(_ info: [AnyHashable : Any]) {
        RNZohoSalesIQMobilisten.processNotificationWithInfo(info: info)
    }
    
    @objc
    public static func isMobilistenNotification(_ info: [AnyHashable : Any]) -> Bool {
        return RNZohoSalesIQMobilisten.isMobilistenNotification(info: info)
    }
    
    @objc
    public static func handleNotificationAction(_ info: [AnyHashable : Any], response: String) {
        RNZohoSalesIQMobilisten.handleNotificationAction(info: info, response: response)
    }
}
