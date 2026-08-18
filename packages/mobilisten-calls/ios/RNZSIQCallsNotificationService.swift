//
//  RNZSIQCallsNotificationService.swift
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/08/25.
//

import Foundation
import MobilistenCalls

@objc
public class RNZSIQCallsNotificationService: NSObject {
    @objc
    @MainActor
    public static func enableVoIP(_ token: String, isTestDevice: Bool, isProductionMode: Bool) {
        let mode = isProductionMode ? "production" : "sandbox"
        RNZohoSalesIQMobilistenCalls.sharedInstance.enableVoIP(token, isTestDevice: isTestDevice, mode: mode)
    }

    @objc
    @MainActor
    public static func handleVoIPNotificationAction(_ info: [AnyHashable : Any], completion: @escaping () -> Void) {
        let stringKeyedInfo = (info as? [String: Any]) ?? [:]
        RNZohoSalesIQMobilistenCalls.sharedInstance.handleVoIPNotificationAction(stringKeyedInfo, completion: completion)
    }
}
