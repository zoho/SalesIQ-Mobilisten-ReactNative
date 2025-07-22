//
//  RNZohoSalesIQMobilistenTest.swift
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 28/02/25.
//

import Foundation
import Mobilisten
import MobilistenCore

@objc(RNZohoSalesIQMobilisten)
class RNZohoSalesIQMobilisten: RCTEventEmitter, ZohoSalesIQDelegate, ZohoSalesIQChatDelegate, ZohoSalesIQFAQDelegate, ZohoSalesIQKnowledgeBaseDelegate {
    
    override class func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    public static let sharedInstance = RNZohoSalesIQMobilisten()
    private var hasSIQEventListener = false
    private var handleURI = true
    private var actionDictionary: [String: SIQActionHandler] = [:]
    
    private func performAdditionalSetup() {
        // Perform additional setup here
    }
    let OPERATORS_OFFLINE = "EVENT_OPERATORS_OFFLINE"
    let OPERATORS_ONLINE = "EVENT_OPERATORS_ONLINE"
    let CHATVIEW_CLOSED = "EVENT_CHATVIEW_CLOSED"
    let CHATVIEW_OPENED = "EVENT_CHATVIEW_OPENED"
    let HOMEVIEW_CLOSED = "HOMEVIEW_CLOSED"
    let HOMEVIEW_OPENED = "HOMEVIEW_OPENED"
    let SUPPORT_OPENED = "EVENT_SUPPORT_OPENED"
    let SUPPORT_CLOSED = "EVENT_SUPPORT_CLOSED"
    let ARTICLE_OPENED = "ARTICLE_OPENED"
    let ARTICLE_CLOSED = "ARTICLE_CLOSED"
    let ARTICLE_LIKED = "ARTICLE_LIKED"
    let ARTICLE_DISLIKED = "ARTICLE_DISLIKED"
    let CHAT_ATTENDED = "EVENT_CHAT_ATTENDED"
    let CHAT_CLOSED = "EVENT_CHAT_CLOSED"
    let FEEDBACK_RECEIVED = "EVENT_FEEDBACK_RECEIVED"
    let CHAT_MISSED = "EVENT_CHAT_MISSED"
    let CHAT_OPENED = "EVENT_CHAT_OPENED"
    let RATING_RECEIVED = "EVENT_RATING_RECEIVED"
    let CHAT_REOPENED = "EVENT_CHAT_REOPENED"
    let CHAT_QUEUE_POSITION_CHANGED = "EVENT_CHAT_QUEUE_POSITION_CHANGED"
    let CHAT_UNREAD_COUNT_CHANGED = "EVENT_CHAT_UNREAD_COUNT_CHANGED"
    let PERFORM_CHATACTION = "EVENT_PERFORM_CHATACTION"
    let VISITOR_IPBLOCKED = "EVENT_VISITOR_IPBLOCKED"
    let CUSTOMTRIGGER = "EVENT_CUSTOMTRIGGER"
    let BOT_TRIGGER = "EVENT_BOT_TRIGGER"
    let TYPE_OPEN = "OPEN"
    let TYPE_TRIGGERED = "TRIGGERED"
    let TYPE_PROACTIVE = "PROACTIVE"
    let TYPE_WAITING = "WAITING"
    let TYPE_CONNECTED = "CONNECTED"
    let TYPE_MISSED = "MISSED"
    let TYPE_CLOSED = "CLOSED"
    let TYPE_ENDED = "ENDED"
    let INFO_LOG = "INFO_LOG"
    let WARNING_LOG = "WARNING_LOG"
    let ERROR_LOG = "ERROR_LOG"
    let TAB_CONVERSATIONS = "TAB_CONVERSATIONS"
    let TAB_FAQ = "TAB_FAQ"
    let TAB_KNOWLEDGE_BASE = "TAB_KNOWLEDGE_BASE"
    let EVENT_HANDLE_URL = "EVENT_HANDLE_URL"
    let EVENT_OPEN_URL = "EVENT_OPEN_URL"
    let EVENT_COMPLETE_CHAT_ACTION = "EVENT_COMPLETE_CHAT_ACTION"
    let RESOURCE_ARTICLES = "RESOURCE_ARTICLES"
    let EVENT_RESOURCE_OPENED = "EVENT_RESOURCE_OPENED"
    let EVENT_RESOURCE_CLOSED = "EVENT_RESOURCE_CLOSED"
    let EVENT_RESOURCE_LIKED = "EVENT_RESOURCE_LIKED"
    let EVENT_RESOURCE_DISLIKED = "EVENT_RESOURCE_DISLIKED"
    let LAUNCHER_VISIBILITY_MODE_ALWAYS = "LAUNCHER_VISIBILITY_MODE_ALWAYS"
    let LAUNCHER_VISIBILITY_MODE_NEVER = "LAUNCHER_VISIBILITY_MODE_NEVER"
    let LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT = "LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT"
    let EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY = "EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY"
    let ACTION_SOURCE_APP = "ACTION_SOURCE_APP"
    let ACTION_SOURCE_SDK = "ACTION_SOURCE_SDK"
    let EVENT_NOTIFICATION_CLICKED = "EVENT_NOTIFICATION_CLICKED"
    let ZSIQ_EVENT_LISTENER = "ZSIQ_EVENT_LISTENER"
    let CHAT_EVENT_LISTENER = "CHAT_EVENT_LISTENER"
    let KNOWLEDGEBASE_EVENT_LISTENER = "KNOWLEDGEBASE_EVENT_LISTENER"
    let NOTIFICATION_EVENT_LISTENER = "NOTIFICATION_EVENT_LISTENER"
    let LAUNCHER_EVENT_LISTENER = "LAUNCHER_EVENT_LISTENER"
    let OPERATOR_IMAGE = "OPERATOR_IMAGE"
    let RATING = "RATING"
    let FEEDBACK = "FEEDBACK"
    let SCREENSHOT = "SCREENSHOT"
    let PRE_CHAT_FORM = "PRE_CHAT_FORM"
    let VISITOR_NAME = "VISITOR_NAME"
    let EMAIL_TRANSCRIPT = "EMAIL_TRANSCRIPT"
    let FILE_SHARE = "FILE_SHARE"
    let MEDIA_CAPTURE = "MEDIA_CAPTURE"
    let END = "END"
    let END_WHEN_IN_QUEUE = "END_WHEN_IN_QUEUE"
    let END_WHEN_BOT_CONNECTED = "END_WHEN_BOT_CONNECTED"
    let END_WHEN_OPERATOR_CONNECTED = "END_WHEN_OPERATOR_CONNECTED"
    let REOPEN = "REOPEN"
    
    // MobilistenFlag
    let NEUTRAL_RATING_DISABLED = "NeutralRatingDisabled"
    let TRACK_STORAGE_SPACE = "TrackStorageSpace"
    let TRACK_APP_INSTALLED_TIME = "TrackAppInstalledTime"
    let TRACK_APP_UPDATED_TIME = "TrackAppUpdatedTime"
    let SHOW_END_SESSION_IN_INAPP_NOTIFICATION = "ShowEndSessionInInAppNotification"
    
    func sendRCTEvent(withName eventName: String, body: Any?) {
        if hasSIQEventListener {
            print("CustomEventsEmitter emitting event: \(eventName)")
            sendEvent(withName: eventName, body: body)
        } else {
            print("CustomEventsEmitter called without listeners: \(eventName)")
        }
    }
    
    override func supportedEvents() -> [String]! {
        return [OPERATORS_OFFLINE,
                OPERATORS_ONLINE,
                CHATVIEW_CLOSED,
                CHATVIEW_OPENED,
                HOMEVIEW_CLOSED,
                HOMEVIEW_OPENED,
                SUPPORT_CLOSED,
                SUPPORT_OPENED,
                ARTICLE_CLOSED,
                ARTICLE_DISLIKED,
                ARTICLE_LIKED,
                ARTICLE_OPENED,
                CHAT_ATTENDED,
                CHAT_CLOSED,
                FEEDBACK_RECEIVED,
                CHAT_MISSED,
                CHAT_OPENED,
                RATING_RECEIVED,
                CHAT_REOPENED,
                VISITOR_IPBLOCKED,
                BOT_TRIGGER,
                PERFORM_CHATACTION,
                CUSTOMTRIGGER,
                CHAT_QUEUE_POSITION_CHANGED,
                CHAT_UNREAD_COUNT_CHANGED,
                INFO_LOG,
                WARNING_LOG,
                ERROR_LOG,
                TAB_CONVERSATIONS,
                TAB_FAQ,
                TAB_KNOWLEDGE_BASE,
                EVENT_HANDLE_URL,
                EVENT_OPEN_URL,
                EVENT_COMPLETE_CHAT_ACTION,
                RESOURCE_ARTICLES,
                EVENT_RESOURCE_OPENED,
                EVENT_RESOURCE_CLOSED,
                EVENT_RESOURCE_LIKED,
                EVENT_RESOURCE_DISLIKED,
                LAUNCHER_VISIBILITY_MODE_ALWAYS,
                LAUNCHER_VISIBILITY_MODE_NEVER,
                LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT,
                EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY,
                ACTION_SOURCE_APP,
                ACTION_SOURCE_SDK,
                EVENT_NOTIFICATION_CLICKED,
                CHAT_EVENT_LISTENER,
                KNOWLEDGEBASE_EVENT_LISTENER,
                LAUNCHER_EVENT_LISTENER,
                ZSIQ_EVENT_LISTENER,
                NOTIFICATION_EVENT_LISTENER];
    }
    
    override func constantsToExport() -> [AnyHashable : Any]! {
        return [
            "OPERATORS_OFFLINE": OPERATORS_OFFLINE,
            "OPERATORS_ONLINE": OPERATORS_ONLINE,
            "CHATVIEW_CLOSED": CHATVIEW_CLOSED,
            "CHATVIEW_OPENED": CHATVIEW_OPENED,
            "HOMEVIEW_CLOSED": HOMEVIEW_CLOSED,
            "HOMEVIEW_OPENED": HOMEVIEW_OPENED,
            "SUPPORT_CLOSED": SUPPORT_CLOSED,
            "SUPPORT_OPENED": SUPPORT_OPENED,
            "ARTICLE_CLOSED": ARTICLE_CLOSED,
            "ARTICLE_DISLIKED": ARTICLE_DISLIKED,
            "ARTICLE_LIKED": ARTICLE_LIKED,
            "ARTICLE_OPENED": ARTICLE_OPENED,
            "CHAT_ATTENDED": CHAT_ATTENDED,
            "CHAT_CLOSED": CHAT_CLOSED,
            "FEEDBACK_RECEIVED": FEEDBACK_RECEIVED,
            "PERFORM_CHATACTION": PERFORM_CHATACTION,
            "CHAT_MISSED": CHAT_MISSED,
            "CHAT_OPENED": CHAT_OPENED,
            "RATING_RECEIVED": RATING_RECEIVED,
            "CHAT_REOPENED": CHAT_REOPENED,
            "CHAT_UNREAD_COUNT_CHANGED": CHAT_UNREAD_COUNT_CHANGED,
            "VISITOR_IPBLOCKED": VISITOR_IPBLOCKED,
            "BOT_TRIGGER": BOT_TRIGGER,
            "TYPE_OPEN": TYPE_OPEN,
            "TYPE_WAITING": TYPE_WAITING,
            "TYPE_MISSED": TYPE_MISSED,
            "TYPE_CLOSED": TYPE_CLOSED,
            "TYPE_CONNECTED": TYPE_CONNECTED,
            "TYPE_ENDED": TYPE_ENDED,
            "TYPE_TRIGGERED": TYPE_TRIGGERED,
            "TYPE_PROACTIVE": TYPE_PROACTIVE,
            "CUSTOMTRIGGER": CUSTOMTRIGGER,
            "CHAT_QUEUE_POSITION_CHANGED": CHAT_QUEUE_POSITION_CHANGED,
            "INFO_LOG": INFO_LOG,
            "WARNING_LOG": WARNING_LOG,
            "ERROR_LOG": ERROR_LOG,
            "TAB_CONVERSATIONS": TAB_CONVERSATIONS,
            "TAB_KNOWLEDGE_BASE": TAB_KNOWLEDGE_BASE,
            "TAB_FAQ": TAB_FAQ,
            "EVENT_HANDLE_URL": EVENT_HANDLE_URL,
            "EVENT_OPEN_URL": EVENT_OPEN_URL,
            "EVENT_COMPLETE_CHAT_ACTION": EVENT_COMPLETE_CHAT_ACTION,
            "RESOURCE_ARTICLES": RESOURCE_ARTICLES,
            "EVENT_RESOURCE_OPENED": EVENT_RESOURCE_OPENED,
            "EVENT_RESOURCE_CLOSED": EVENT_RESOURCE_CLOSED,
            "EVENT_RESOURCE_LIKED": EVENT_RESOURCE_LIKED,
            "EVENT_RESOURCE_DISLIKED": EVENT_RESOURCE_DISLIKED,
            "LAUNCHER_VISIBILITY_MODE_ALWAYS": LAUNCHER_VISIBILITY_MODE_ALWAYS,
            "LAUNCHER_VISIBILITY_MODE_NEVER": LAUNCHER_VISIBILITY_MODE_NEVER,
            "LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT": LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT,
            "EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY": EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY,
            "ACTION_SOURCE_APP": ACTION_SOURCE_APP,
            "ACTION_SOURCE_SDK": ACTION_SOURCE_SDK,
            "EVENT_NOTIFICATION_CLICKED": EVENT_NOTIFICATION_CLICKED,
            "CHAT_EVENT_LISTENER": CHAT_EVENT_LISTENER,
            "KNOWLEDGEBASE_EVENT_LISTENER": KNOWLEDGEBASE_EVENT_LISTENER,
            "NOTIFICATION_EVENT_LISTENER": NOTIFICATION_EVENT_LISTENER,
            "LAUNCHER_EVENT_LISTENER": LAUNCHER_EVENT_LISTENER,
            "ZSIQ_EVENT_LISTENER": ZSIQ_EVENT_LISTENER
        ]
    }
    
    
    static func getEventEmitterObject(_ eventName: String, body: Any?) -> [String: Any?] {
        return [
            "event": eventName,
            "body": body
        ]
    }
    
    override func startObserving() {
        hasSIQEventListener = true
    }
    
    override func stopObserving() {
        hasSIQEventListener = false
    }
    
    func prepareResourceInformation(type: SIQResourceType, resource: SIQKnowledgeBaseResource?) -> [String: Any] {
        var resourceInformation: [String: Any] = [:]
        if let resource {
            let resourceObject = RNZohoSalesIQMobilisten.getResourceObject(resource: resource)
            resourceInformation["resource"] = resourceObject
        }
        if type == .articles {
            resourceInformation["type"] = RESOURCE_ARTICLES
        }
        return resourceInformation
    }
    
    static func getVisitorObject(arguments: SIQVisitor) -> [String: Any] {
        var visitorDict: [String: Any] = [:]
        
        visitorDict["name"] = arguments.name ?? ""
        visitorDict["browser"] = arguments.browser ?? ""
        visitorDict["city"] = arguments.city ?? ""
        visitorDict["countryCode"] = arguments.countryCode ?? ""
        visitorDict["state"] = arguments.state ?? ""
        visitorDict["email"] = arguments.email ?? ""
        visitorDict["ip"] = arguments.ip ?? ""
        visitorDict["os"] = arguments.os ?? "iOS"
        visitorDict["phone"] = arguments.phone ?? ""
        visitorDict["region"] = arguments.region ?? ""
        visitorDict["searchEngine"] = arguments.searchEngine ?? ""
        visitorDict["searchQuery"] = arguments.searchQuery ?? ""
        
        if let lastVisitTime = arguments.lastVisitTime {
            visitorDict["lastVisitTime"] = Int(lastVisitTime.timeIntervalSince1970)
        }
        if let firstVisitTime = arguments.firstVisitTime {
            visitorDict["firstVisitTime"] = Int(firstVisitTime.timeIntervalSince1970)
        }
        if let noOfDaysVisited = arguments.noOfDaysVisited {
            visitorDict["noOfDaysVisited"] = noOfDaysVisited
        }
        if let numberOfChats = arguments.numberOfChats {
            visitorDict["numberOfChats"] = numberOfChats
        }
        if let numberOfVisits = arguments.numberOfVisits {
            visitorDict["numberOfVisits"] = numberOfVisits
        }
        if let totalTimeSpent = arguments.totalTimeSpent {
            visitorDict["totalTimeSpent"] = totalTimeSpent
        }
        
        return visitorDict
    }
    
    static func getChatActionArguments(arguments: SIQChatActionArguments, actionID: String, actionName: String) -> [String: Any] {
        var argumentsDict: [String: Any] = [:]
        argumentsDict["elementID"] = arguments.elementID ?? ""
        argumentsDict["clientActionName"] = actionName
        argumentsDict["name"] = arguments.identifier
        argumentsDict["label"] = arguments.label
        argumentsDict["uuid"] = actionID
        return argumentsDict
    }
    
    static func getFAQCategoryObject(category: SIQFAQCategory) -> [String: Any] {
        var categoryDict: [String: Any] = [:]
        categoryDict["id"] = category.id
        categoryDict["name"] = category.name
        categoryDict["articleCount"] = category.articleCount
        return categoryDict
    }
    
    static func getErrorObject(error: NSError) -> [String: Any] {
        return ["code": error.code, "message": error.localizedDescription]
    }
    
    static func getSIQErrorObject(siqError: SIQError) -> [String: Any] {
        return ["code": siqError.code, "message": siqError.message]
    }
    
    static func getFAQCategoryList(categories: [SIQFAQCategory]) -> [[String: Any]] {
        return categories.compactMap { getFAQCategoryObject(category: $0) }
    }
    
    static func getFAQArticleObject(article: SIQFAQArticle) -> [String: Any] {
        var articleDict: [String: Any] = [:]
        
        articleDict["id"] = article.id
        articleDict["categoryID"] = article.categoryID
        articleDict["categoryName"] = article.categoryName
        articleDict["name"] = article.name
        articleDict["viewCount"] = article.viewCount
        articleDict["likeCount"] = article.likeCount
        articleDict["dislikeCount"] = article.dislikeCount
        
        if let modifiedTime = article.lastModifiedTime {
            articleDict["modifiedTime"] = Int(modifiedTime.timeIntervalSince1970)
        }
        if let createdTime = article.createdTime {
            articleDict["createdTime"] = Int(createdTime.timeIntervalSince1970)
        }
        
        return articleDict
    }
    
    static func getArticlesList(articles: [SIQFAQArticle]) -> [[String: Any]] {
        return articles.map { getFAQArticleObject(article: $0) }
    }
    
    static func getChatObject(chat: SIQVisitorChat) -> [String: Any] {
        var chatDict: [String: Any] = [:]
        
        if let id = chat.referenceID {
            chatDict["id"] = id
            
            if let attenderEmail = chat.attenderEmail {
                chatDict["attenderEmail"] = attenderEmail
            }
            if let attenderID = chat.attenderID {
                chatDict["attenderID"] = attenderID
            }
            if let attenderName = chat.attenderName {
                chatDict["attenderName"] = attenderName
            }
            if let departmentName = chat.departmentName {
                chatDict["departmentName"] = departmentName
            }
            
            chatDict["isBotAttender"] = chat.isBotAttender
            
            if let question = chat.question {
                chatDict["question"] = question
            }
            
            if let feedback = chat.feedback {
                chatDict["feedback"] = feedback
            }
            
            if let rating = chat.rating {
                chatDict["rating"] = rating
            }
            
            switch chat.status {
            case .triggered:
                chatDict["status"] = sharedInstance.TYPE_TRIGGERED
            case .proactive:
                chatDict["status"] = sharedInstance.TYPE_PROACTIVE
            case .connected:
                chatDict["status"] = sharedInstance.TYPE_CONNECTED
            case .waiting:
                chatDict["status"] = sharedInstance.TYPE_WAITING
            case .missed:
                chatDict["status"] = sharedInstance.TYPE_MISSED
            case .closed:
                chatDict["status"] = sharedInstance.TYPE_CLOSED
            default:
                break
            }
            
            let lastMessage = chat.lastMessage
            var recentMessageDict: [String: Any] = [:]
            var fileMessageDict: [String: Any] = [:]
            
            if let file = lastMessage.file {
                fileMessageDict["name"] = file.name
                fileMessageDict["content_type"] = file.contentType
                fileMessageDict["comment"] = file.comment
                fileMessageDict["size"] = file.size
                if let fileComment = file.comment {
                    chatDict["lastMessage"] = file.contentType + ":" + fileComment
                } else {
                    chatDict["lastMessage"] = file.contentType
                }
            } else if let text = lastMessage.text {
                chatDict["lastMessage"] = text
                recentMessageDict["text"] = text
            }
            
            recentMessageDict["file"] = fileMessageDict
            
            if let sender = lastMessage.sender {
                chatDict["lastMessageSender"] = sender
                recentMessageDict["sender"] = sender
            }
            
            if let messageTime = lastMessage.time {
                let time = Int(messageTime.timeIntervalSince1970)
                chatDict["lastMessageTime"] = time
                recentMessageDict["time"] = time
            }
            
            recentMessageDict["is_read"] = lastMessage.isRead
            
            chatDict["recentMessage"] = recentMessageDict
            
            chatDict["unreadCount"] = chat.unreadCount
            
            let queuePosition = chat.queuePosition
            if queuePosition > 0 {
                chatDict["queuePosition"] = queuePosition
            }
        }
        
        return chatDict
    }
    
    static func getResourceObject(resource: SIQKnowledgeBaseResource) -> [String: Any] {
        var resourceDictionary: [String: Any] = [:]
        
        if let articleID = resource.id {
            resourceDictionary["id"] = articleID
            
            if let category = resource.category {
                var resourceCategory: [String: Any] = [:]
                if let categoryID = category.id {
                    resourceCategory["id"] = categoryID
                }
                if let categoryName = category.name {
                    resourceCategory["name"] = categoryName
                }
                resourceDictionary["category"] = resourceCategory
            }
            
            if let title = resource.title {
                resourceDictionary["title"] = title
            }
            
            if let departmentId = resource.departmentId {
                resourceDictionary["departmentId"] = departmentId
            }
            
            if let language = resource.language {
                var resourceLanguage: [String: Any] = [:]
                if let languageID = language.id {
                    resourceLanguage["id"] = languageID
                }
                if let languageCode = language.code {
                    resourceLanguage["code"] = languageCode
                }
                resourceDictionary["language"] = resourceLanguage
            }
            
            if let creator = resource.creator {
                var resourceCreator: [String: Any] = [:]
                if let creatorID = creator.id {
                    resourceCreator["id"] = creatorID
                }
                if let creatorName = creator.name {
                    resourceCreator["name"] = creatorName
                }
                if let creatorEmail = creator.email {
                    resourceCreator["email"] = creatorEmail
                }
                if let creatorDisplayName = creator.displayName {
                    resourceCreator["displayName"] = creatorDisplayName
                }
                if let creatorImageUrl = creator.imageUrl {
                    resourceCreator["imageUrl"] = creatorImageUrl
                }
                resourceDictionary["creator"] = resourceCreator
            }
            
            if let modifier = resource.modifier {
                var resourceModifier: [String: Any] = [:]
                if let modifierID = modifier.id {
                    resourceModifier["id"] = modifierID
                }
                if let modifierName = modifier.name {
                    resourceModifier["name"] = modifierName
                }
                if let modifierEmail = modifier.email {
                    resourceModifier["email"] = modifierEmail
                }
                if let modifierDisplayName = modifier.displayName {
                    resourceModifier["displayName"] = modifierDisplayName
                }
                if let modifierImageUrl = modifier.imageUrl {
                    resourceModifier["imageUrl"] = modifierImageUrl
                }
                resourceDictionary["modifier"] = resourceModifier
            }
            
            if let createdTime = resource.createdTime {
                resourceDictionary["createdTime"] = Int(createdTime.timeIntervalSince1970)
            }
            
            if let modifiedTime = resource.modifiedTime {
                resourceDictionary["modifiedTime"] = Int(modifiedTime.timeIntervalSince1970)
            }
            
            if let publicUrl = resource.publicUrl {
                resourceDictionary["publicUrl"] = publicUrl
            }
            
            if let stats = resource.stats {
                var resourceStats: [String: Any] = [:]
                if let liked = stats.liked {
                    resourceStats["liked"] = liked
                }
                if let disliked = stats.disliked {
                    resourceStats["disliked"] = disliked
                }
                if let used = stats.used {
                    resourceStats["used"] = used
                }
                if let viewed = stats.viewed {
                    resourceStats["viewed"] = viewed
                }
                resourceDictionary["stats"] = resourceStats
            }
            
            if let content = resource.content {
                resourceDictionary["content"] = content
            }
            
            switch resource.ratedType {
            case .liked:
                resourceDictionary["ratedType"] = "liked"
            case .disliked:
                resourceDictionary["ratedType"] = "disliked"
            default:
                break
            }
        }
        
        return resourceDictionary
    }
    
    static func getCategoryObject(category: SIQKnowledgeBaseCategory) -> [String: Any] {
        var categoryDictionary: [String: Any] = [:]
        categoryDictionary["id"] = category.id ?? ""
        categoryDictionary["name"] = category.name ?? ""
        categoryDictionary["departmentId"] = category.departmentId ?? ""
        categoryDictionary["count"] = category.count
        categoryDictionary["childrenCount"] = category.childrenCount
        categoryDictionary["order"] = category.order
        categoryDictionary["parentCategoryId"] = category.parentCategoryId ?? ""
        
        if let modifiedTime = category.resourceModifiedTime {
            categoryDictionary["resourceModifiedTime"] = Int(modifiedTime.timeIntervalSince1970)
        }
        
        return categoryDictionary
    }
    
    static func getResourceList(resources: [SIQKnowledgeBaseResource]) -> [[String: Any]] {
        return resources.map { getResourceObject(resource: $0) }
    }
    
    static func getCategoryList(categories: [SIQKnowledgeBaseCategory]) -> [[String: Any]] {
        return categories.map { getCategoryObject(category: $0) }
    }
    
    static func getDepartmentObject(argument: SIQDepartment) -> [String: Any] {
        return [
            "id": argument.id,
            "name": argument.name,
            "available": argument.available
        ]
    }
    
    static func getDepartmentList(departments: [SIQDepartment]) -> [[String: Any]] {
        return departments.map { getDepartmentObject(argument: $0) }
    }
    
    static func getChatList(chats: [SIQVisitorChat]) -> [[String: Any]] {
        return chats.map { getChatObject(chat: $0) }
    }
    
    static func enablePush(token: String, isTestDevice: Bool, isProductionMode: Bool) {
        let mode: APNSMode = isProductionMode ? .production : .sandbox
        ZohoSalesIQ.enablePush(token, isTestDevice: isTestDevice, mode: mode)
    }
    
    static func processNotificationWithInfo(info: [AnyHashable : Any]) {
        ZohoSalesIQ.processNotificationWithInfo(info)
    }
    
    static func isMobilistenNotification(info: [AnyHashable : Any]) -> Bool {
        return ZohoSalesIQ.isMobilistenNotification(info)
    }
    
    static func handleNotificationAction(info: [AnyHashable : Any], response: String) {
        ZohoSalesIQ.handleNotificationAction(info, response: response)
    }
    
    func openNewChat() {
        ZohoSalesIQ.Chat.show(referenceID: nil, new: true)
    }
    
    private func getNotificationActionPayload(_ payload: Any?) -> [String: Any] {
        var resultMap: [String: Any] = [:]
        
        guard let payload = payload else {
            print("payload object is nil")
            return resultMap
        }
        
        if let chatPayload = payload as? SalesIQChatNotificationPayload {
            resultMap["type"] = "chat"
            resultMap["payload"] = chatPayload.toDictionary()
        } else if let endChatPayload = payload as? SalesIQEndChatNotificationPayload {
            resultMap["type"] = "endChatDetails"
            resultMap["payload"] = endChatPayload.toDictionary()
        } else if let visitorHistoryPayload = payload as? SalesIQVisitorHistoryNotificationPayload {
            resultMap["type"] = "visitorHistory"
            resultMap["payload"] = visitorHistoryPayload.toDictionary()
        }
        
        return resultMap
    }
    
    
    //MARK: Delegate functions
    
    func agentsOffline() {
        if hasSIQEventListener {
            sendRCTEvent(withName:ZSIQ_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(OPERATORS_OFFLINE, body: nil))
            // DEPRECATED
            sendRCTEvent(withName:OPERATORS_OFFLINE, body: nil)
            
        }
    }
    
    func agentsOnline() {
        if hasSIQEventListener {
            sendRCTEvent(withName:ZSIQ_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(OPERATORS_ONLINE, body: nil))
        }
    }
    
    func chatViewClosed(id: String?) {
        if hasSIQEventListener {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHATVIEW_CLOSED, body: ["id": id]))
        }
    }
    
    func chatViewOpened(id: String?) {
        if hasSIQEventListener {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHATVIEW_OPENED, body: ["id": id]))
        }
    }
    
    func homeViewClosed() {
        if hasSIQEventListener {
            sendRCTEvent(withName:HOMEVIEW_CLOSED, body: nil)
        }
    }
    
    func homeViewOpened() {
        if hasSIQEventListener {
            sendRCTEvent(withName:HOMEVIEW_OPENED, body: nil)
        }
    }
    
    func supportClosed() {
        if hasSIQEventListener {
            sendRCTEvent(withName:ZSIQ_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(SUPPORT_CLOSED, body: nil))
        }
    }
    
    func supportOpened() {
        if hasSIQEventListener {
            sendRCTEvent(withName:ZSIQ_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(SUPPORT_OPENED, body: nil))
        }
    }
    
    func articleClosed(id: String?) {
        if hasSIQEventListener {
            sendRCTEvent(withName:ARTICLE_CLOSED, body: id)
        }
    }
    
    func articleDisliked(id: String?) {
        if hasSIQEventListener {
            sendRCTEvent(withName:ARTICLE_DISLIKED, body: id)
        }
    }
    
    func articleLiked(id: String?) {
        if hasSIQEventListener {
            sendRCTEvent(withName:ARTICLE_LIKED, body: id)
        }
    }
    
    func articleOpened(id: String?) {
        if hasSIQEventListener {
            sendRCTEvent(withName:ARTICLE_OPENED, body: id)
        }
    }
    
    func chatAttended(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_ATTENDED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatClosed(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_CLOSED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatFeedbackRecieved(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(FEEDBACK_RECEIVED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatMissed(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_MISSED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatOpened(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_OPENED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatQueuePositionChanged(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_QUEUE_POSITION_CHANGED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatRatingRecieved(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(RATING_RECEIVED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func chatReopened(chat: SIQVisitorChat?) {
        if hasSIQEventListener, let chat {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_REOPENED, body: RNZohoSalesIQMobilisten.getChatObject(chat: chat)))
        }
    }
    
    func unreadCountChanged(_ count: Int) {
        if hasSIQEventListener {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CHAT_UNREAD_COUNT_CHANGED, body: ["count": count]))
        }
    }
    
    func visitorIPBlocked() {
        if hasSIQEventListener {
            sendRCTEvent(withName:ZSIQ_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(VISITOR_IPBLOCKED, body: nil))
        }
    }
    
    func shouldOpenURL(_ url: URL, in chat: SIQVisitorChat?) -> Bool {
        var chatDict = RNZohoSalesIQMobilisten.getChatObject(chat: chat!)
        chatDict["url"] = url.absoluteString
        sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_HANDLE_URL, body: ["chat": chatDict, "url": url.absoluteString]))
        return handleURI
    }
    
    func handleTrigger(name: String, visitorInformation: SIQVisitor) {
        if hasSIQEventListener {
            let triggerInformation: [String: Any] = ["triggerName": name, "visitorInformation": RNZohoSalesIQMobilisten.getVisitorObject(arguments: visitorInformation)]
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(CUSTOMTRIGGER, body: triggerInformation))
        }
    }
    
    func handleBotTrigger() {
        if hasSIQEventListener {
            sendRCTEvent(withName:CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(BOT_TRIGGER, body: NSNull()))
        }
    }
    
    func handleResourceOpened(_ type: SIQResourceType, resource: SIQKnowledgeBaseResource?) {
        if hasSIQEventListener {
            let resourceInformation = prepareResourceInformation(type: type, resource: resource)
            sendRCTEvent(withName:KNOWLEDGEBASE_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_RESOURCE_OPENED, body: resourceInformation))
        }
    }
    
    func handleResourceClosed(_ type: SIQResourceType, resource: SIQKnowledgeBaseResource?) {
        if hasSIQEventListener {
            let resourceInformation = prepareResourceInformation(type: type, resource: resource)
            sendRCTEvent(withName:KNOWLEDGEBASE_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_RESOURCE_CLOSED, body: resourceInformation))
        }
    }
    
    func handleResourceLiked(_ type: SIQResourceType, resource: SIQKnowledgeBaseResource?) {
        if hasSIQEventListener {
            let resourceInformation = prepareResourceInformation(type: type, resource: resource)
            sendRCTEvent(withName:KNOWLEDGEBASE_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_RESOURCE_LIKED, body: resourceInformation))
        }
    }
    
    func handleResourceDisliked(_ type: SIQResourceType, resource: SIQKnowledgeBaseResource?) {
        if hasSIQEventListener {
            let resourceInformation = prepareResourceInformation(type: type, resource: resource)
            sendRCTEvent(withName:KNOWLEDGEBASE_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_RESOURCE_DISLIKED, body: resourceInformation))
        }
    }
    
    func handleCustomLauncherVisibility(_ visible: Bool) {
        if hasSIQEventListener {
            sendRCTEvent(withName:LAUNCHER_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY, body: ["visible": visible]))
        }
    }
    
    func handleNotificationAction(_ payload: SalesIQNotificationPayload?) {
        if hasSIQEventListener {
            let resultMap = getNotificationActionPayload(payload)
            sendRCTEvent(withName:NOTIFICATION_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(EVENT_NOTIFICATION_CLICKED, body: resultMap))
        }
    }
    
    //MARK: Delegate functions ends here
    
    
    class func mainThread(_ block: @escaping ()->Void){
        if Thread.isMainThread{
            block()
        }else {
            DispatchQueue.main.async(execute: block)
        }
    }
    
    //MARK: RCT APIs starts here
    
    @objc(init:accessKey:)
    func `init`(_ appKey: String, accessKey: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.setPlatform(platform: "ReactNative")
            ZohoSalesIQ.initWithAppKey(appKey, accessKey: accessKey, authProvider: nil)
            ZohoSalesIQ.delegate = self
            ZohoSalesIQ.Chat.delegate = self
            ZohoSalesIQ.FAQ.delegate = self
            ZohoSalesIQ.KnowledgeBase.delegate = self
            self.performAdditionalSetup()
        }
    }
    
    @objc(initWithCallback:accessKey:initCallback:)
    func initWithCallback(_ appKey: String, accessKey: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.setPlatform(platform: "ReactNative")
            ZohoSalesIQ.initWithAppKey(appKey, accessKey: accessKey, authProvider: nil) { error in
                let success = error == nil
                callback([success])
            }
            ZohoSalesIQ.delegate = self
            ZohoSalesIQ.Chat.delegate = self
            ZohoSalesIQ.FAQ.delegate = self
            ZohoSalesIQ.KnowledgeBase.delegate = self
            self.performAdditionalSetup()
        }
    }
    
    @objc(categorizeKnowledgeBase:shouldCategorize:)
    func categorizeKnowledgeBase(_ type: String, shouldCategorize: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.categorize(.articles, enable: shouldCategorize)
            }
        }
    }
    
    @objc(clearLogsForiOS)
    func clearLogsForiOS() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Logger.clear()
        }
    }
    
    @objc(combineKnowledgeBaseDepartments:merge:)
    func combineKnowledgeBaseDepartments(_ type: String, merge: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.combineDepartments(.articles, enable: merge)
            }
        }
    }
    
    @objc(completeChatAction:)
    func completeChatAction(_ uuid: String) {
        RNZohoSalesIQMobilisten.mainThread {
            if let handler = self.actionDictionary[uuid] {
                handler.success(message: nil)
                self.actionDictionary.removeValue(forKey: uuid)
            }
        }
    }
    
    @objc(completeChatActionWithMessage:success:message:)
    func completeChatActionWithMessage(_ uuid: String, complete: Bool, message: String) {
        RNZohoSalesIQMobilisten.mainThread {
            if let handler = self.actionDictionary[uuid] {
                complete ? handler.success(message: message) : handler.faliure(message: message)
                self.actionDictionary.removeValue(forKey: uuid)
            }
        }
    }
    
    @objc(disableInAppNotification)
    func disableInAppNotification() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.inAppNotifications, visible: false)
        }
    }
    
    @objc(disablePreChatForms)
    func disablePreChatForms() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.preChatForm, visible: false)
        }
    }
    
    @objc(disableScreenshotOption)
    func disableScreenshotOption() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.screenshotOption, visible: false)
        }
    }
    
    @objc(dismissUI)
    func dismissUI() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.dismissUI()
        }
    }
    
    @objc(enableDragToDismiss:)
    func enableDragToDismiss(_ enable: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Launcher.enableDragToDismiss(enable)
        }
    }
    
    @objc(enableInAppNotification)
    func enableInAppNotification() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.inAppNotifications, visible: true)
        }
    }
    
    @objc(enablePreChatForms)
    func enablePreChatForms() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.preChatForm, visible: true)
        }
    }
    
    @objc(enableScreenshotOption)
    func enableScreenshotOption() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.screenshotOption, visible: true)
        }
    }
    
    @objc(endChat:)
    func endChat(_ refID: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.endSession(referenceID: refID)
        }
    }
    
    @objc(fetchAttenderImage:defaultImage:imageCallback:)
    func fetchAttenderImage(_ id: String, fetchDefault: Bool, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let chat = SIQVisitorChat()
            chat.attenderID = id
            ZohoSalesIQ.Chat.fetchAttenderImage(chat: chat, fetchDefaultImage: fetchDefault) { error, image in
                if let error = error {
                    callback([RNZohoSalesIQMobilisten.getErrorObject(error: error), ""])
                } else if let base64String = image?.pngData()?.base64EncodedString() {
                    callback([NSNull(), base64String])
                }
            }
        }
    }
    
    
    @objc(getArticles:)
    func getArticles(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.FAQ.getArticles(categoryID: nil) { error, articles in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary, ""])
                } else {
                    if let articles {
                        callback([NSNull(), RNZohoSalesIQMobilisten.getArticlesList(articles: articles)])
                    }
                }
            }
        }
    }
    
    @objc(getArticlesWithCategoryID:articlesCallback:)
    func getArticlesWithCategoryID(_ catid: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.FAQ.getArticles(categoryID: catid) { error, articles in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary, ""])
                } else {
                    if let articles {
                        callback([NSNull(), RNZohoSalesIQMobilisten.getArticlesList(articles: articles)])
                    }
                }
            }
        }
    }
    
    @objc(getCategories:)
    func getCategories(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.FAQ.getCategories(departmentIDS: nil) { error, categories in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary, ""])
                } else {
                    if let categories {
                        callback([NSNull(), RNZohoSalesIQMobilisten.getFAQCategoryList(categories: categories)])
                    }
                }
            }
        }
    }
    
    @objc(getChat:callback:)
    func getChat(_ chatId: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.get(chatID: chatId) { error, chat in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                    callback([errorDictionary, NSNull()])
                } else if let chat = chat {
                    let chatDict = RNZohoSalesIQMobilisten.getChatObject(chat: chat)
                    callback([NSNull(), chatDict])
                }
            }
        }
    }
    
    @objc(getChatUnreadCount:)
    func getChatUnreadCount(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let unreadCount = ZohoSalesIQ.Chat.getUnreadMessageCount()
            callback([unreadCount])
        }
    }
    
    @objc(getChats:)
    func getChats(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.getList(filter: .all) { error, chats in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary, ""])
                } else {
                    if let chats {
                        let chatsArray = RNZohoSalesIQMobilisten.getChatList(chats: chats)
                        callback([NSNull(), chatsArray])
                    }
                }
            }
        }
    }
    
    @objc(getChatsWithFilter:listCallback:)
    func getChatsWithFilter(_ status: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            var chatStatus: ChatStatus = .all
            switch status {
            case self.TYPE_OPEN: chatStatus = .open
            case self.TYPE_CONNECTED: chatStatus = .connected
            case self.TYPE_WAITING: chatStatus = .waiting
            case self.TYPE_MISSED: chatStatus = .missed
            case self.TYPE_CLOSED: chatStatus = .closed
            case self.TYPE_ENDED: chatStatus = .ended
            case self.TYPE_TRIGGERED: chatStatus = .triggered
            case self.TYPE_PROACTIVE: chatStatus = .proactive
            default:
                let errorDictionary: [String: Any] = ["code": 604, "message": "invalid filter type"]
                callback([errorDictionary, ""])
                return
            }
            ZohoSalesIQ.Chat.getList(filter: chatStatus) { error, chats in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary, ""])
                } else {
                    if let chats {
                        let chatsArray = RNZohoSalesIQMobilisten.getChatList(chats: chats)
                        callback([NSNull(), chatsArray])
                    }
                }
            }
        }
    }
    
    @objc(getDepartments:)
    func getDepartments(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.getDepartments { error, departments in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary, ""])
                } else {
                    if let departments {
                        let departmentsArray = RNZohoSalesIQMobilisten.getDepartmentList(departments: departments)
                        callback([NSNull(), departmentsArray])
                    }
                }
            }
        }
    }
    
    @objc(getKnowledgeBaseCategories:departmentID:parentCategoryID:callback:)
    func getKnowledgeBaseCategories(_ type: String, departmentId: String?, parentCategoryId: String?, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.getCategories(.articles, departmentId: departmentId, parentCategoryId: parentCategoryId) { success, error, categories in
                    if let error = error {
                        let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                        callback([errorDictionary, NSNull()])
                    } else {
                        if let categories {
                            let categoryArray = RNZohoSalesIQMobilisten.getCategoryList(categories: categories)
                            callback([NSNull(), categoryArray])
                        }
                    }
                }
            }
        }
    }
    
    @objc(getKnowledgeBaseResourceDepartments:)
    func getKnowledgeBaseResourceDepartments(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.KnowledgeBase.getResourceDepartments { error, departments in
                if let departments = departments {
                    let departmentsArray = departments.map {
                        ["id": $0.id, "name": $0.name]
                    }
                    callback([NSNull(), departmentsArray])
                } else {
                    if let error {
                        let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                        callback([errorDictionary, NSNull()])
                    }
                }
            }
        }
    }
    
    @objc(getKnowledgeBaseResources:departmentID:parentCategoryID:page:limit:searchKey:callback:)
    func getKnowledgeBaseResources(_ type: String, departmentId: String?, parentCategoryId: String?, page: Double, limit: Double, searchKey: String?, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.getResources(.articles, departmentId: departmentId, parentCategoryId: parentCategoryId, searchKey: searchKey, page: Int(page), limit: Int(limit)) { success, error, resources, moreDataAvailable in
                    let available = NSNumber(value: moreDataAvailable)
                    if let error = error {
                        let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                        callback([errorDictionary, NSNull(), available])
                    } else {
                        if let resources {
                            let resourceArray = RNZohoSalesIQMobilisten.getResourceList(resources: resources)
                            callback([NSNull(), resourceArray, available])
                        }
                    }
                }
            }
        }
    }
    
    @objc(getKnowledgeBaseSingleResource:id:callback:)
    func getKnowledgeBaseSingleResource(_ type: String, articleID: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.getSingleResource(.articles, id: articleID) { success, error, resource in
                    if let error = error {
                        let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                        callback([errorDictionary, NSNull()])
                    } else if let resource = resource {
                        let resourceObject = RNZohoSalesIQMobilisten.getResourceObject(resource: resource)
                        callback([NSNull(), resourceObject])
                    }
                }
            }
        }
    }
    
    @objc(getNotificationPayload:callback:)
    func getNotificationPayload(_ payload: [String: Any], callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Notification.getPayload(payload) { completionObject in
                var resultMap: [String: Any] = [:]
                if let chatPayload = completionObject as? SalesIQChatNotificationPayload {
                    resultMap["type"] = "chat"
                    resultMap["payload"] = chatPayload.toDictionary()
                } else if let endChatPayload = completionObject as? SalesIQEndChatNotificationPayload {
                    resultMap["type"] = "endChatDetails"
                    resultMap["payload"] = endChatPayload.toDictionary()
                } else if let visitorHistoryPayload = completionObject as? SalesIQVisitorHistoryNotificationPayload {
                    resultMap["type"] = "visitorHistory"
                    resultMap["payload"] = visitorHistoryPayload.toDictionary()
                }
                callback([resultMap])
            }
        }
    }
    
    @objc(hideQueueTime:)
    func hideQueueTime(_ show: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.hideQueueTime(show)
        }
    }
    
    @objc(isChatEnabled:)
    func isChatEnabled(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let chatEnabled = ZohoSalesIQ.Chat.isEnabled
            callback([chatEnabled])
        }
    }
    
    @objc(isKnowledgeBaseEnabled:callback:)
    func isKnowledgeBaseEnabled(_ type: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                let enabled = ZohoSalesIQ.KnowledgeBase.isEnabled(.articles)
                callback([enabled])
            }
        }
    }
    
    @objc(isLoggerEnabled:)
    func isLoggerEnabled(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let logEnabled = ZohoSalesIQ.Logger.isEnabled
            callback([logEnabled])
        }
    }
    
    @objc(isMultipleOpenChatRestricted:)
    func isMultipleOpenChatRestricted(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let restricted = ZohoSalesIQ.Chat.multipleOpenRestricted
            callback([restricted])
        }
    }
    
    @objc(isSDKMessage:callback:)
    func isSDKMessage(_ payload: [String: Any], callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let isSDKMessage = RNZohoSalesIQMobilisten.isMobilistenNotification(info: payload)
            callback([NSNumber(value: isSDKMessage)])
        }
    }
    
    @objc(openArticle:articlesCallback:)
    func openArticle(_ id: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.FAQ.openArticle(articleID: id) { error in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getErrorObject(error: error)
                    callback([errorDictionary])
                } else {
                    callback([NSNull()])
                }
            }
        }
    }
    
    @objc(openChat)
    func openChat() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.show(referenceID: nil, new: false)
        }
    }
    
    @objc(openChatWithID:)
    func openChatWithID(_ id: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.show(referenceID: id, new: false)
        }
    }
    
    @objc(openKnowledgeBase:id:callback:)
    func openKnowledgeBase(_ type: String, articleID: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.open(.articles, id: articleID) { success, error in
                    let succeeded = NSNumber(value: success)
                    if let error = error {
                        let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                        callback([errorDictionary, succeeded])
                    } else {
                        callback([NSNull(), succeeded])
                    }
                }
            }
        }
    }
    
    @objc(performCustomAction:shouldOpenChatWindow:)
    func performCustomAction(_ actionName: String, shouldOpenChatWindow: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Visitor.performCustomAction(actionName, shouldOpenChatWindow: shouldOpenChatWindow)
        }
    }
    
    @objc(present:id:callback:)
    func present(tab: String?, referenceId: String?, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            var tabNumber: NSNumber?
            
            if tab == self.TAB_CONVERSATIONS {
                tabNumber = NSNumber(value: 0)
            } else if tab == self.TAB_FAQ || tab == self.TAB_KNOWLEDGE_BASE {
                tabNumber = NSNumber(value: 1)
            }
            
            ZohoSalesIQ.present(tabBarItem: tabNumber, referenceID: referenceId, shouldShowListView: true) { error, success in
                let complete = NSNumber(value: success)
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                    callback([errorDictionary, [complete]])
                } else {
                    callback([NSNull(), [complete]])
                }
            }
        }
    }
    
    
    @objc(printDebugLogsForAndroid:)
    func printDebugLogsForAndroid(_ value: Bool) {}
    
    @objc(processNotificationMessage:)
    func processNotificationMessage(_ extras: [String: Any]) {}
    
    @objc(refreshLauncher)
    func refreshLauncher() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.refreshLauncher()
        }
    }
    
    @objc(refreshLauncherPropertiesForAndroid)
    func refreshLauncherPropertiesForAndroid() {}
    
    @objc(registerChatAction:)
    func registerChatAction(_ actionName: String) {
        RNZohoSalesIQMobilisten.mainThread {
            let chatAction = SIQChatAction(name: actionName) { arguments, handler in
                let uuid = UUID().uuidString
                self.actionDictionary[uuid] = handler
                let eventResponse = RNZohoSalesIQMobilisten.getChatActionArguments(arguments: arguments, actionID: uuid, actionName: actionName)
                self.sendRCTEvent(withName:self.CHAT_EVENT_LISTENER, body: RNZohoSalesIQMobilisten.getEventEmitterObject(self.PERFORM_CHATACTION, body: eventResponse))
                self.sendRCTEvent(withName:self.PERFORM_CHATACTION, body: eventResponse)
            }
            ZohoSalesIQ.ChatActions.register(action: chatAction)
        }
    }
    
    @objc(registerPush:isTestDevice:)
    func registerPush(_ deviceToken: String, isTestDevice: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            RNZohoSalesIQMobilisten.enablePush(token: deviceToken, isTestDevice: isTestDevice, isProductionMode: !isTestDevice)
        }
    }
    
    @objc(registerVisitor:callback:)
    func registerVisitor(_ uniqueID: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.registerVisitor(uniqueID) { success in
                callback([NSNull(), success])
            }
        }
    }
    
    @objc(sendEvent:objects:)
    func sendEvent(_ eventName: String, values: [Any]) {
        RNZohoSalesIQMobilisten.mainThread {
            if eventName == self.EVENT_OPEN_URL {
                if !self.handleURI {
                    for value in values {
                        if let currentObject = value as? String, let url = URL(string: currentObject) {
                            ZohoSalesIQ.openURL(url)
                            break
                        }
                    }
                }
            } else if eventName == self.EVENT_COMPLETE_CHAT_ACTION {
                var uuid: String?
                var complete: Bool = false
                var message: String?
                
                for (index, value) in values.enumerated() {
                    switch index {
                    case 0:
                        uuid = value as? String
                    case 1:
                        complete = (value as? Bool) ?? false
                    case 2:
                        message = value as? String
                    default:
                        break
                    }
                }
                
                if let uuid = uuid, let handler = self.actionDictionary[uuid] {
                    if let message = message {
                        complete ? handler.success(message: message) : handler.faliure(message: message)
                    } else {
                        handler.success()
                    }
                    self.actionDictionary.removeValue(forKey: uuid)
                }
            }
        }
    }
    
    @objc(setChatActionTimeout:)
    func setChatActionTimeout(_ timeout: NSNumber) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.ChatActions.setTimeout(timeout.doubleValue)
        }
    }
    
    @objc(setChatComponentVisibility:visibility:)
    func setChatComponentVisibility(_ chatComponent: String, visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            let component: ChatComponent?
            switch chatComponent {
            case self.OPERATOR_IMAGE: component = .attenderImageInChat
            case self.RATING: component = .rating
            case self.FEEDBACK: component = .feedback
            case self.SCREENSHOT: component = .screenshotOption
            case self.PRE_CHAT_FORM: component = .preChatForm
            case self.VISITOR_NAME: component = .visitorName
            case self.EMAIL_TRANSCRIPT: component = .emailTranscript
            case self.FILE_SHARE: component = .fileSharing
            case self.MEDIA_CAPTURE: component = .mediaCapture
            case self.END: component = .end
            case self.END_WHEN_IN_QUEUE: component = .endWhenInQueue
            case self.END_WHEN_BOT_CONNECTED: component = .endWhenBotConnected
            case self.END_WHEN_OPERATOR_CONNECTED: component = .endWhenOperatorConnected
            case self.REOPEN: component = .reopen
            default: component = nil
            }
            
            if let validComponent = component {
                ZohoSalesIQ.Chat.setVisibility(validComponent, visible: visibility)
            } else {
                print("Invalid component type: \(chatComponent)")
            }
        }
    }
    
    @objc(setChatTitle:)
    func setChatTitle(_ chatTitle: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setTitle(chatTitle)
        }
    }
    
    @objc(setChatWaitingTime:)
    func setChatWaitingTime(_ seconds: Double) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setWaitingTime(upTo: Int(seconds))
        }
    }
    
    @objc(setConversationListTitle:)
    func setConversationListTitle(_ title: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Conversation.setTitle(title)
        }
    }
    
    @objc(setConversationVisibility:)
    func setConversationVisibility(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Conversation.setVisibility(visibility)
        }
    }
    
    @objc(setCustomAction:)
    func setCustomAction(_ actionName: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Tracking.setCustomAction(actionName, shouldOpenChatWindow: false)
        }
    }
    
    @objc(setCustomFont:)
    func setCustomFont(_ map: [String: Any]) {}
    
    @objc(setDepartment:)
    func setDepartment(_ department: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setDepartment(department)
        }
    }
    
    @objc(setDepartments:)
    func setDepartments(_ department: [String]) {}
    
    @objc(setFAQVisibility:)
    func setFAQVisibility(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.FAQ.setVisibility(visibility)
        }
    }
    
    @objc(setFeedbackVisibility:)
    func setFeedbackVisibility(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.feedback, visible: visibility)
        }
    }
    
    @objc(setKnowledgeBaseRecentlyViewedCount:)
    func setKnowledgeBaseRecentlyViewedCount(_ limit: Double) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.KnowledgeBase.setRecentShowLimit(Int(limit))
        }
    }
    
    @objc(setKnowledgeBaseVisibility:shouldShow:)
    func setKnowledgeBaseVisibility(_ type: String, enable: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            if type == self.RESOURCE_ARTICLES {
                ZohoSalesIQ.KnowledgeBase.setVisibility(.articles, enable: enable)
            }
        }
    }
    
    @objc(setLanguage:)
    func setLanguage(_ languageCode: String) {
        RNZohoSalesIQMobilisten.mainThread {
            let languageMap: [String: Language] = [
                "en": .english, "fr": .french, "de": .german, "es": .spanish, "nl": .dutch,
                "no": .norwegian, "tr": .turkish, "ru": .russian, "it": .italian, "pt": .portuguese,
                "ko": .korean, "ja": .japanese, "da": .danish, "pl": .polish, "ar": .arabic,
                "hu": .hungarian, "zh": .chinese, "he": .hebrew, "ga": .irish, "ro": .romanian,
                "th": .thai, "sv": .swedish, "el": .greek, "cs": .czech, "sk": .slovak,
                "sl": .slovenian, "hr": .croatian, "br": .bulgarian, "vi": .vietnamese,
                "fil": .filipino, "fi": .finnish, "zh_TW": .chineseTraditional, "in": .indonesian,
                "ka": .georgian, "hy": .armenian, "fa": .persian, "ta": .tamil, "kn": .kannada,
                "bn": .bengali, "hi": .hindi, "gu": .gujarati, "mr": .marathi, "te": .telugu,
                "pa": .punjabi, "or": .oriya, "ml": .malayalam, "ca": .catalan
            ]
            ZohoSalesIQ.Chat.setLanguage(languageMap[languageCode] ?? .english)
        }
    }
    
    @objc(setLauncherPropertiesForAndroid:)
    func setLauncherPropertiesForAndroid(_ launcherPropertiesMap: [String: Any]) {}
    
    @objc(setLauncherVisibility:)
    func setLauncherVisibility(_ show: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.showLauncher(show)
        }
    }
    
    @objc(setLoggerEnabled:)
    func setLoggerEnabled(_ enable: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Logger.setEnabled(enable)
        }
    }
    
    @objc(setLoggerPathForiOS:)
    func setLoggerPathForiOS(_ url: URL) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Logger.setPath(url)
        }
    }
    
    @objc(setMinimumPressDuration:)
    func setMinimumPressDuration(_ duration: Double) {
        RNZohoSalesIQMobilisten.mainThread {
            guard duration >= 0 else { return }
            let seconds = CGFloat(duration) / 1000.0
            ZohoSalesIQ.Launcher.minimumPressDuration(seconds)
        }
    }
    
    @objc(setNotificationActionSource:)
    func setNotificationActionSource(_ action: String) {
        RNZohoSalesIQMobilisten.mainThread {
            let actionSource: ZohoSalesIQ.ActionSource = (action == self.ACTION_SOURCE_APP) ? .app : .sdk
            ZohoSalesIQ.Notification.setAction(with: actionSource)
        }
    }
    
    @objc(setNotificationIconForAndroid:)
    func setNotificationIconForAndroid(_ drawableName: String) {}
    
    @objc(setOperatorEmail:)
    func setOperatorEmail(_ email: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setAgentEmail(email)
        }
    }
    
    @objc(setPageTitle:)
    func setPageTitle(_ pageTitle: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Tracking.setPageTitle(pageTitle)
        }
    }
    
    @objc(setQuestion:)
    func setQuestion(_ question: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Visitor.setQuestion(question)
        }
    }
    
    @objc(setRatingVisibility:)
    func setRatingVisibility(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.rating, visible: visibility)
        }
    }
    
    @objc(setTabOrder:)
    func setTabOrder(_ orders: [String]) {
        RNZohoSalesIQMobilisten.mainThread {
            var sendOrders: [NSNumber] = []
            for currentObject in orders {
                if currentObject == self.TAB_CONVERSATIONS {
                    sendOrders.append(0)
                } else if currentObject == self.TAB_FAQ || currentObject == self.TAB_KNOWLEDGE_BASE {
                    sendOrders.append(1)
                }
            }
            ZohoSalesIQ.setTabOrder(sendOrders)
        }
    }
    
    @objc(setThemeColor:)
    func setThemeColor(_ colors: [String: Any]) {
        RNZohoSalesIQMobilisten.mainThread {
            let theme = SIQTheme(colors: colors)
            ZohoSalesIQ.Theme.setTheme(theme: theme)
        }
    }
    
    @objc(setThemeColorforiOS:)
    func setThemeColorforiOS(_ colorCode: String) {
        RNZohoSalesIQMobilisten.mainThread {
            let hexString = String(colorCode.dropFirst()) // Remove leading #
            let scanner = Scanner(string: hexString)
            var rgbValue: UInt64 = 0
            scanner.scanHexInt64(&rgbValue)
            
            let themeColor = UIColor(
                red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
                green: CGFloat((rgbValue & 0xFF00) >> 8) / 255.0,
                blue: CGFloat(rgbValue & 0xFF) / 255.0,
                alpha: 1.0
            )
            let theme = SIQTheme()
            theme.themeColor = themeColor
            ZohoSalesIQ.Theme.setTheme(theme: theme)
        }
    }
    
    @objc(setThemeForAndroid:)
    func setThemeForAndroid(_ name: String) {}
    
    @objc(setVisibilityModeToCustomLauncher:)
    func setVisibilityModeToCustomLauncher(_ mode: String) {
        RNZohoSalesIQMobilisten.mainThread {
            let visibilityMode: VisibilityMode
            switch mode {
            case self.LAUNCHER_VISIBILITY_MODE_ALWAYS:
                visibilityMode = .always
            case self.LAUNCHER_VISIBILITY_MODE_NEVER:
                visibilityMode = .never
            case self.LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT:
                visibilityMode = .whenActiveChat
            default:
                return
            }
            ZohoSalesIQ.Launcher.setVisibilityModeToCustomLauncher(visibilityMode)
        }
    }
    
    @objc(setVisitorAddInfo:value:)
    func setVisitorAddInfo(_ key: String, value: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Visitor.addInfo(key, value: value)
        }
    }
    
    @objc(setVisitorContactNumber:)
    func setVisitorContactNumber(_ number: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Visitor.setContactNumber(number)
        }
    }
    
    @objc(setVisitorEmail:)
    func setVisitorEmail(_ email: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Visitor.setEmail(email)
        }
    }
    
    @objc(setVisitorLocation:)
    func setVisitorLocation(_ location: [String: Any]) {
        RNZohoSalesIQMobilisten.mainThread {
            guard !location.isEmpty else { return }
            let visitorLocation = SIQVisitorLocation()
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            
            if let latitudeValue = location["latitude"] {
                if let latitude = latitudeValue as? NSNumber {
                    visitorLocation.latitude = latitude
                } else if let latitudeString = latitudeValue as? String, let latitude = formatter.number(from: latitudeString) {
                    visitorLocation.latitude = latitude
                }
            }
            
            if let longitudeValue = location["longitude"] {
                if let longitude = longitudeValue as? NSNumber {
                    visitorLocation.longitude = longitude
                } else if let longitudeString = longitudeValue as? String, let longitude = formatter.number(from: longitudeString) {
                    visitorLocation.longitude = longitude
                }
            }
            
            if let zipCode = location["zipCode"] as? String {
                visitorLocation.zipCode = zipCode
            }
            
            if let city = location["city"] as? String {
                visitorLocation.city = city
            }
            
            if let state = location["state"] as? String {
                visitorLocation.state = state
            }
            
            if let country = location["country"] as? String {
                visitorLocation.country = country
            }
            
            if let countryCode = location["countryCode"] as? String {
                visitorLocation.countryCode = countryCode
            }
            
            ZohoSalesIQ.Visitor.setLocation(visitorLocation)
        }
    }
    
    @objc(setVisitorName:)
    func setVisitorName(_ name: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Visitor.setName(name)
        }
    }
    
    @objc(setVisitorNameVisibility:)
    func setVisitorNameVisibility(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.visitorName, visible: visibility)
        }
    }
    
    @objc(shouldOpenUrl:)
    func shouldOpenUrl(_ shouldOpen: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            self.handleURI = shouldOpen
        }
    }
    
    @objc(showFeedbackAfterSkip:)
    func showFeedbackAfterSkip(_ enable: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.showFeedbackAfterSkip(enable)
        }
    }
    
    @objc(showFeedbackUpToDuration:)
    func showFeedbackUpToDuration(_ limit: Double) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.showFeedback(uptoDuration: limit)
        }
    }
    
    @objc(showLauncher:)
    func showLauncher(_ mode: String) {
        RNZohoSalesIQMobilisten.mainThread {
            let visibilityMode: VisibilityMode
            switch mode {
            case self.LAUNCHER_VISIBILITY_MODE_ALWAYS:
                visibilityMode = .always
            case self.LAUNCHER_VISIBILITY_MODE_NEVER:
                visibilityMode = .never
            case self.LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT:
                visibilityMode = .whenActiveChat
            default:
                return
            }
            ZohoSalesIQ.Launcher.show(visibilityMode)
        }
    }
    
    @objc(showOfflineMessage:)
    func showOfflineMessage(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.showOfflineMessage(visibility)
        }
    }
    
    @objc(showOperatorImageInChat:)
    func showOperatorImageInChat(_ visibility: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.attenderImageInChat, visible: visibility)
        }
    }
    
    @objc(showOperatorImageInLauncher:)
    func showOperatorImageInLauncher(_ show: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.setVisibility(.attenderImageOnLauncher, visible: show)
        }
    }
    
    @objc(showPayloadChat:)
    func showPayloadChat(_ result: [String: Any]) {
        RNZohoSalesIQMobilisten.mainThread {
            if let type = result["type"] as? String, let payloadData = result["payload"] as? [String: Any] {
                if type == "chat" {
                    let chatObject = SalesIQChatNotificationPayload(dictionary: payloadData)
                    ZohoSalesIQ.Chat.open(with: chatObject)
                } else if type == "endChatDetails" {
                    let endChatObject = SalesIQEndChatNotificationPayload(dictionary: payloadData)
                    ZohoSalesIQ.Chat.open(with: endChatObject)
                }
            }
        }
    }
    
    @objc(startChat:)
    func startChat(_ message: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.startChat(question: message)
        }
    }
    
    @objc(startNewChat:customChatId:departmentName:callback:)
    func startNewChat(_ question: String, chatId: String?, department: String?, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.start(question: question, chatID: chatId, department: department) { error, chat in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                    callback([errorDictionary, NSNull()])
                } else if let chat = chat {
                    let chatDict = RNZohoSalesIQMobilisten.getChatObject(chat: chat)
                    callback([NSNull(), chatDict])
                }
            }
        }
    }
    
    
    @objc(startNewChatWithTrigger:departmentName:callback:)
    func startNewChatWithTrigger(_ chatId: String?, department: String?, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.Chat.startWithTrigger(chatID: chatId, department: department) { error, chat in
                if let error = error {
                    let errorDictionary = RNZohoSalesIQMobilisten.getSIQErrorObject(siqError: error)
                    callback([errorDictionary, NSNull()])
                } else if let chat = chat {
                    let chatDict = RNZohoSalesIQMobilisten.getChatObject(chat: chat)
                    callback([NSNull(), chatDict])
                }
            }
        }
    }
    
    @objc(syncThemeWithOsForAndroid:)
    func syncThemeWithOsForAndroid(_ sync: Bool) {}
    
    @objc(unregisterAllChatActions)
    func unregisterAllChatActions() {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.ChatActions.unregisterAll()
        }
    }
    
    @objc(unregisterChatAction:)
    func unregisterChatAction(_ actionName: String) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.ChatActions.unregisterWithName(name: actionName)
        }
    }
    
    @objc(unregisterVisitor:)
    func unregisterVisitor(callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            ZohoSalesIQ.unregisterVisitor { success in
                callback([NSNull(), success])
            }
        }
    }
    
    @objc(updateListener:)
    func updateListener(_ eventName: String) {
        RNZohoSalesIQMobilisten.mainThread {
            if eventName == self.EVENT_NOTIFICATION_CLICKED {
                ZohoSalesIQ.registerNotificationListener(true)
            }
        }
    }
    
    @objc(writeLogForiOS:logLevel:callback:)
    func writeLogForiOS(_ log: String, level: String, callback: @escaping RCTResponseSenderBlock) {
        RNZohoSalesIQMobilisten.mainThread {
            let debugLogLevel: SIQDebugLogLevel
            switch level {
            case self.INFO_LOG: debugLogLevel = .info
            case self.WARNING_LOG: debugLogLevel = .warning
            case self.ERROR_LOG: debugLogLevel = .error
            default: debugLogLevel = .info
            }
            
            ZohoSalesIQ.Logger.write(log, logLevel: debugLogLevel, file: nil, line: nil, function: nil, fileID: nil, filePath: nil, column: nil) { success in
                callback([success])
            }
        }
    }
    
    @objc(registerLocalizationFile:)
    func registerLocalizationFile(_ name: String) {
        ZohoSalesIQ.registerLocalizationFile(with: name)
    }
    
    @objc(updateConfiguration:value:)
    func updateConfiguration(_ key: String, value: Bool) {
        RNZohoSalesIQMobilisten.mainThread {
            
            var flag: MobilistenFlag?
            
            switch key {
            case self.NEUTRAL_RATING_DISABLED:
                flag = .neutralRatingDisabled
            case self.TRACK_STORAGE_SPACE:
                flag = .trackStorageSpace
            case self.TRACK_APP_UPDATED_TIME:
                flag = .trackAppUpdatedTime
            case self.TRACK_APP_INSTALLED_TIME:
                flag = .trackAppInstalledTime
            case self.SHOW_END_SESSION_IN_INAPP_NOTIFICATION:
                flag = .showEndSessionInAppNotification
            default:
                flag = nil
            }
            
            if let validFlag = flag {
                ZohoSalesIQ.updateConfigurationFlag(validFlag, value: value)
            } else {
                print("Invalid Flag type: \(key)")
            }
        }
    }
}
