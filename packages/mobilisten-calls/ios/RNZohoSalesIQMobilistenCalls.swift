//
//  RNZohoSalesIQMobilistenCalls.swift
//  RNZohoSalesIQ
//
//  Created by venkat-12517 on 28/02/25.
//

import Foundation
import MobilistenCalls
import MobilistenCore
import MobilistenCallsCore

@objc(RNZohoSalesIQMobilistenCalls)
class RNZohoSalesIQMobilistenCalls: RCTEventEmitter {
    
    public static let sharedInstance = RNZohoSalesIQMobilistenCalls()
    
    
    private var hasSIQEventListener = false
    private let ZSIQ_CALLS_EVENT_LISTENER = "ZSIQ_CALLS_EVENT_LISTENER"
    private let CALL_STATE_CHANGED = "EVENT_STATE_CHANGED"
    private let QUEUE_POSITION_CHANGED = "EVENT_QUEUE_POSITION_CHANGED"
    
    let onMain: (@escaping () -> Void) -> Void = { block in
        Thread.isMainThread ? block() : DispatchQueue.main.async(execute: block)
    }
    
    override func startObserving() {
        hasSIQEventListener = true
    }
    
    override func stopObserving() {
        hasSIQEventListener = false
    }

    // override init() {
    //     super.init()
    //     Task { @MainActor in
    //         ZohoSalesIQCalls.initialise()
    //         ZohoSalesIQCalls.delegate = self
    //     }
    // }
    
    // // MARK: - initialize
    // @MainActor @objc
    // func initialize() {
    //     ZohoSalesIQCalls.initialise()
    //     ZohoSalesIQCalls.delegate = self
    // }

    // MARK: - isEnabled
    @MainActor @objc
    func initialiseForiOS() {
        ZohoSalesIQCalls.initialise()
        ZohoSalesIQCalls.delegate = self
    }
    
    override func supportedEvents() -> [String]! {
        return [ZSIQ_CALLS_EVENT_LISTENER, CALL_STATE_CHANGED, QUEUE_POSITION_CHANGED]
    }
    
    override func constantsToExport() -> [AnyHashable : Any]! {
        return ["ZSIQ_CALLS_EVENT_LISTENER": ZSIQ_CALLS_EVENT_LISTENER]
    }

    
    // MARK: - isEnabled
    @MainActor @objc
    func isEnabled(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        resolve(ZohoSalesIQCalls.isEnabled)
    }
    
    // MARK: - currentCallId
    @MainActor @objc
    func getCurrentCallId(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        resolve(ZohoSalesIQCalls.currentCallID)
    }
    
    // MARK: - enterFullScreenMode
    @MainActor @objc
    func enterFullScreenMode() {
        onMain {
            ZohoSalesIQCalls.switchToFullScreen()
        }
    }
    
    // MARK: - enterFloatingViewMode
    @MainActor @objc
    func enterFloatingViewMode() {
        onMain {
            ZohoSalesIQCalls.switchToFloatingScreen()
        }
    }
    
    // MARK: - currentCallState
    @MainActor @objc
    func getCurrentCallState(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        let currentState = ZohoSalesIQCalls.currentState
        resolve(getCallStatus(currentState))
    }
    
    // MARK: - setTitle
    @MainActor @objc
    func setTitle(_ online: String?, offline: String?) {
        ZohoSalesIQCalls.setTitle(online: online, offline: offline)
    }
    
    // MARK: - setVisibility
    @MainActor @objc
    func setVisibility(_ component: String, visible: Bool) {
        guard let component = getComponents(component) else {
            return
        }
        ZohoSalesIQCalls.setVisibility(component, visible: visible)
    }
    
        // MARK: - end
    @MainActor @objc
    func end(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        onMain {
            ZohoSalesIQCalls.end { [self] error, conversation in
                if let error = error {
                    reject("\(error.code)" ,error.message, nil)
                } else {
                    if let chatConversation = conversation as? SalesIQChat {
                        resolve(getChatConversationDict(chatConversation))
                    } else if let callConversation = conversation as? SalesIQCall {
                        resolve(getCallConversationDict(callConversation))
                    } else {
                        reject("401" ,"No ongoing call present", nil)
                    }
                }
            }
        }
    }
    
    @MainActor @objc
    func getList(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        onMain {
            ZohoSalesIQCalls.getList { [self] error, conversations in
                if let error = error {
                    reject("\(error.code)" ,error.message, nil)
                } else {
                    var conversationDictionaryArray: [[String: Any]] = []
                    conversations.forEach { conversation in
                        if let chatConversation = conversation as? SalesIQChat {
                            conversationDictionaryArray.append(getChatConversationDict(chatConversation))
                        } else if let callConversation = conversation as? SalesIQCall {
                            conversationDictionaryArray.append(getCallConversationDict(callConversation))
                        }
                    }
                    if !conversationDictionaryArray.isEmpty {
                        resolve(conversationDictionaryArray)
                    }
                }
            }
        }
    }

    @MainActor @objc
    func start(_ id: String?, displayActiveCall: Bool = false, attributes: [String: Any]?, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
        onMain {
            var name: String? {
                guard let name = attributes?["name"] as? String else { return nil }
                return name
            }
            
            var additionalInfo: String? {
                guard let additionalInfo = attributes?["additionalInfo"] as? String else { return nil }
                return additionalInfo
            }
            
            var displayImage: String? {
                guard let displayPicture = attributes?["displayPicture"] as? String else { return nil }
                return displayPicture
            }
            
            var departments: [SIQDepartment] {
                if let departments = attributes?["departments"] as? [[String: Any]] {
                    var departmentsList: [SIQDepartment] = []
                    departments.forEach { department in
                        let id = department["id"] as? String
                        let name = department["name"] as? String
                        if id?.isEmpty == false || name?.isEmpty == false {
                            if let mode = department["communicationMode"] as? String, let communicationMode = self.getCommunicationMode(mode) {
                                departmentsList.append(SIQDepartment(id: id, name: name, mode: communicationMode))
                            }
                        }
                    }
                    return departmentsList
                }
                return []
            }
            
            ZohoSalesIQCalls.start(id: id, name: name, additionalInfo: additionalInfo, displayImage: displayImage, departments: departments, displayActiveCall: displayActiveCall) { [self] error, conversation in
                if let error = error {
                    rejecter("\(error.code)" ,error.message, nil)
                } else {
                    if let chatConversation = conversation as? SalesIQChat {
                        resolver(getChatConversationDict(chatConversation))
                    } else if let callConversation = conversation as? SalesIQCall {
                        resolver(getCallConversationDict(callConversation))
                    }
                }
            }
        }
    }

    @MainActor @objc
    func setCallKitIcon(_ icon: String) {
        ZohoSalesIQCalls.setCallKitIcon(icon: icon)
    }

    @MainActor @objc
    func setAndroidReplyMessages(_ messages: [String]) {
        
    }
    
    
}

extension RNZohoSalesIQMobilistenCalls: ZohoSalesIQCallDelegate {
    
    func sendRCTEvent(withName eventName: String, body: Any?) {
        if hasSIQEventListener {
            print("CustomEventsEmitter emitting event: \(eventName)")
            sendEvent(withName: eventName, body: body)
        } else {
            print("CustomEventsEmitter called without listeners: \(eventName)")
        }
    }
    
    static func getEventEmitterObject(_ eventName: String, body: Any?) -> [String: Any?] {
        return [
            "event": eventName,
            "body": body
        ]
    }
    
    func queuePositionDidChange(for conversationID: String, position: Int) {
        if hasSIQEventListener {
            let positionDict: [String : Any] = ["conversationId": conversationID, "position": position]
            sendRCTEvent(withName: ZSIQ_CALLS_EVENT_LISTENER, body: RNZohoSalesIQMobilistenCalls.getEventEmitterObject(QUEUE_POSITION_CHANGED, body: positionDict))
        }
    }
    
    func callStateDidChange(for state: MobilistenCallsCore.SalesIQCallState) {
        if hasSIQEventListener {
            sendRCTEvent(withName: ZSIQ_CALLS_EVENT_LISTENER, body: RNZohoSalesIQMobilistenCalls.getEventEmitterObject(CALL_STATE_CHANGED, body: getCallStatus(state)))
        }
    }
    
    func callScreenDidAppear() {
        
    }
    
    func callScreenDidDisappear() {
        
    }
    
    func callScreenDidEnterPiPMode() {
        
    }
    
    func callScreenDidEnterFullScreenMode() {
        
    }
    
    
}

extension RNZohoSalesIQMobilistenCalls {

    func getCommunicationMode(_ mode: String) -> SIQCommunicationMode? {
        switch mode {
        case "CHAT_AND_CALL":
            return .chatAndCall
        case "CHAT":
            return .chat
        case "CALL":
            return .call
        default:
            return nil
        }
    }

    func getCallStatus(_ state: SalesIQCallState) -> [String: Any] {
        let isIncomingCall: Bool? = {
            switch state.direction {
            case .none:
                return nil
            case .incoming:
                return true
            case .outgoing:
                return false
            @unknown default:
                return nil
            }
        }()
        
        let stateDict: [String: Any] = [
            "status": state.status.stringValue.uppercased(),
            "isIncomingCall": isIncomingCall ?? nil
        ]
        return stateDict as [String : Any]
    }
    
    func getChatConversationDict(_ conversation: SalesIQChat) -> [String: Any] {
        var chatConversation: [String: Any] = getConversationDict(conversation)
        chatConversation["type"] = "chat"
        chatConversation["isBotAttender"] = conversation.isBotAttender
        chatConversation["status"] = getChatStatus(conversation.status)
        chatConversation["unreadCount"] = conversation.unreadCount
        
        if let lastMessage = conversation.lastMessage {
            var lastMessageDict: [String: Any] = [:]
            lastMessageDict["sender"] = lastMessage.sender?.name
            lastMessageDict["text"] = lastMessage.text
            lastMessageDict["senderId"] = lastMessage.sender?.id
            if let time = lastMessage.time?.timeIntervalSince1970 {
                lastMessageDict["time"] = Int(time)
            }
            lastMessageDict["isRead"] = lastMessage.isRead
            lastMessageDict["sentByVisitor"] = lastMessage.sentByUser
            lastMessageDict["status"] = getMessageStatus(lastMessage.status)
            
            if let file = lastMessage.file {
                var fileDictionary: [String: Any] = [:]
                fileDictionary["comment"] = file.comment
                fileDictionary["name"] = file.name
                fileDictionary["size"] = file.size
                lastMessageDict["file"] = fileDictionary
                
            }
            
            chatConversation["lastSalesIQMessage"] = lastMessageDict
        }
        return chatConversation
    }
    
    func getCallConversationDict(_ conversation: SalesIQCall) -> [String: Any] {
        var callConversation: [String: Any] = getConversationDict(conversation)
        callConversation["type"] = "call"
        if conversation.status != . none {
            callConversation["status"] = conversation.status.stringValue.uppercased()
        }
        return callConversation
    }
    
    func getConversationDict(_ conversation: SalesIQConversation) -> [String: Any] {
        var conversationDict: [String: Any] = [:]
        conversationDict["id"] = conversation.id
        conversationDict["customConversationId"] = conversation.customConversationId
        conversationDict["attenderName"] = conversation.attenderName
        conversationDict["attenderEmail"] = conversation.attenderEmail
        conversationDict["attenderId"] = conversation.attenderId
        conversationDict["departmentName"] = conversation.departmentName
        conversationDict["feedback"] = conversation.feedback
        conversationDict["rating"] = conversation.rating
        conversationDict["queuePosition"] = conversation.queuePosition
        conversationDict["question"] = conversation.question
        
        if let media = conversation.media {
            var mediaDict: [String: Any] = [:]
            mediaDict["id"] = media.id
            mediaDict["endTime"] = media.endTime
            if media.initiatedBy != .none {
                mediaDict["initiatedBy"] = media.initiatedBy == .agent ? "OPERATOR" : "VISITOR"
            }
            if let pickupTime = media.pickupTime {
                mediaDict["pickupTime"] = Int(pickupTime)
            }
            if let connectedTime = media.connectedTime {
                mediaDict["connectedTime"] = Int(connectedTime)
            }
            if media.status != .none {
                mediaDict["status"] = media.status.stringValue.uppercased()
            }
            if media.endedBy != .none {
                mediaDict["endedBy"] = media.endedBy == .agent ? "OPERATOR" : "VISITOR"
            }
            mediaDict["type"] = media.type
            if let createdTime = media.createdTime {
                mediaDict["createdTime"] = Int(createdTime)
            }
            conversationDict["media"] = mediaDict
        }
        return conversationDict
    }
    
    func getMessageStatus(_ status: SalesIQMessageStatus) -> String? {
        switch status {
        case .sending:
            return "SENDING"
        case .uploading:
            return "UPLOADING"
        case .sent:
            return "SENT"
        case .failed:
            return "FAILED"
        @unknown default:
            return nil
        }
    }
    
    func getChatStatus(_ status: ChatStatus) -> String? {
        switch status {
        case .open:
            return "OPEN"
        case .triggered:
            return "TRIGGERED"
        case .proactive:
            return "PROACTIVE"
        case .connected:
            return "CONNECTED"
        case .waiting:
            return "WAITING"
        case .missed:
            return "MISSED"
        case .closed, .ended:
            return "CLOSED"
        case .all:
            return nil
        @unknown default:
            return nil
        }
    }
    
    func getComponents(_ component: String) -> CallComponent? {
        switch component {
        case "OPERATOR_IMAGE": return .operatorImage
        case "QUEUE_POSITION": return .queuePosition
        case "OPERATOR_NAME": return .operatorName
        case "PRE_CHAT_FORM": return .preChatForm
        default: return nil
        }
    }
}

extension RNZohoSalesIQMobilistenCalls {
    func enableVoIP(_ token: String, isTestDevice: Bool, isProductionMode: Bool) {
        Task { @MainActor in
            ZohoSalesIQCalls.enableVoIP(token, isTestDevice: isTestDevice, mode: isProductionMode ? .production : .sandbox)
        }
    }
    
    func handleVoIPNotificationAction(_ info: [AnyHashable : Any], completion: @escaping () -> Void) {
        Task { @MainActor in
            ZohoSalesIQCalls.handleVOIPNotificationAction(info, completion: completion)
        }
    }
}
