//
//  RNZSIQCallsNotificationService.swift
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/08/25.
//

import Foundation

@objc
public class RNZSIQCallsNotificationService: NSObject {
     @objc
    public static func enableVoIP(_ token: String, isTestDevice: Bool, isProductionMode: Bool) {
        RNZohoSalesIQMobilistenCalls.sharedInstance.enableVoIP(token, isTestDevice: isTestDevice, isProductionMode: isProductionMode)
    }
    
    @objc
    public static func handleVoIPNotificationAction(_ info: [AnyHashable : Any], completion: @escaping () -> Void) {
        RNZohoSalesIQMobilistenCalls.sharedInstance.handleVoIPNotificationAction(info, completion: completion)
    }
}
