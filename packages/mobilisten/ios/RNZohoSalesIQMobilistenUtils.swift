//
//  RNZohoSalesIQMobilistenUtils.swift
//  RNZohoSalesIQ
//

import Foundation
@preconcurrency import Mobilisten

func parseVisitorProfile(from profileMap: [String: Any]) -> SalesIQVisitorProfile {
    let profile        = SalesIQVisitorProfile()
    profile.salutation = profileMap["salutation"] as? String
    profile.firstName  = profileMap["firstName"]  as? String
    profile.lastName   = profileMap["lastName"]   as? String
    profile.emailID    = profileMap["emailID"]    as? String
    profile.userID     = profileMap["userID"]     as? String

    if let phoneMap = profileMap["phone"] as? [String: Any] {
        let contact    = SIQVisitorContact()
        contact.code   = phoneMap["code"]   as? String
        contact.number = phoneMap["number"] as? String
        profile.phone  = contact
    }

    if let customInfo = profileMap["customInfo"] as? [String: String] {
        profile.customInfo = customInfo
    }

    if let locationMap = profileMap["location"] as? [String: Any] {
        let location         = SIQVisitorLocation()
        location.countryCode = locationMap["countryCode"] as? String
        location.latitude    = locationMap["latitude"]    as? NSNumber
        location.longitude   = locationMap["longitude"]   as? NSNumber
        location.city        = locationMap["city"]        as? String
        location.zipCode     = locationMap["zipCode"]     as? String
        location.state       = locationMap["state"]       as? String
        location.country     = locationMap["country"]     as? String
        profile.location     = location
    }

    return profile
}

// MARK: - presentSDK parsing helpers

func parseSIQConversationList(_ map: [String: Any]?) -> ZSIQConversationList {
    guard let map = map else { return .all() }
    let filter = parseSIQConversationFilter(map["filter"] as? String)
    switch map["type"] as? String {
    case "chat":  return .chat(filter)
    case "call":  return .call(filter)
    case "none":  return .none(filter)
    default:      return .all(filter)
    }
}

func parseSIQConversationFilter(_ str: String?) -> ZSIQConversationFilter {
    switch str {
    case "ongoing": return .ongoing
    case "ended":   return .ended
    default:        return .all
    }
}

func parseSIQSessionType(_ str: String?) -> ZSIQSessionType? {
    switch str {
    case "chat": return .chat
    case "call": return .call
    default:     return nil
    }
}

func parseSIQSessionBehavior(_ map: [String: Any]?) -> ZSIQSessionBehavior {
    guard let map = map else { return .none }
    let sessionType = parseSIQSessionType(map["sessionType"] as? String) ?? .chat
    switch map["type"] as? String {
    case "alwaysNew":     return .alwaysNew(sessionType)
    case "continueOrNew": return .continueOrNew(sessionType)
    default:              return .none
    }
}
