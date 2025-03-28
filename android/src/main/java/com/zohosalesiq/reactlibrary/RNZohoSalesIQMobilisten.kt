package com.zohosalesiq.reactlibrary

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class RNZohoSalesIQMobilisten(private val reactContext: ReactApplicationContext) :
    ZohoSalesIQMobilistenSpec(reactContext) {
    companion object {
        const val NAME = "RNZohoSalesIQMobilisten"
    }

    override fun initialize() {
        super.initialize()
        RNZohoSalesIQ.setInstance(reactContext)
    }

    @ReactMethod
    override fun fetchAttenderImage(
        attenderId: String,
        defaultImage: Boolean,
        imageCallback: Callback
    ) {
        RNZohoSalesIQ.sharedInstance?.fetchAttenderImage(attenderId, defaultImage, imageCallback)
    }

    @ReactMethod
    override fun getChats(listCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getChats(listCallback)
    }

    @ReactMethod
    override fun getChatsWithFilter(filter: String, listCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getChatsWithFilter(filter, listCallback)
    }

    @ReactMethod
    override fun getDepartments(departmentCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getDepartments(departmentCallback)
    }

    @ReactMethod
    override fun isMultipleOpenChatRestricted(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.isMultipleOpenChatRestricted(callback)
    }

    @ReactMethod
    override fun getArticles(articlesCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getArticles(articlesCallback)
    }

    @ReactMethod
    override fun getArticlesWithCategoryID(categoryId: String, articlesCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getArticlesWithCategoryID(categoryId, articlesCallback)
    }

    @ReactMethod
    override fun getCategories(categoryCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getCategories(categoryCallback)
    }

    @ReactMethod
    override fun openArticle(id: String, articlesCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.openArticle(id, articlesCallback)
    }

    @ReactMethod
    override fun init(appKey: String, accessKey: String) {
        RNZohoSalesIQ.sharedInstance?.init(appKey, accessKey)
    }

    @ReactMethod
    override fun initWithCallback(appKey: String, accessKey: String, initCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.initWithCallback(appKey, accessKey, initCallback)
    }

    @ReactMethod
    override fun showLauncher(mode: String) {
        RNZohoSalesIQ.sharedInstance?.showLauncher(mode)
    }

    @ReactMethod
    override fun updateListener(listener: String) {
        RNZohoSalesIQ.sharedInstance?.updateListener(listener)
    }

    @ReactMethod
    override fun setVisibilityModeToCustomLauncher(mode: String) {
        RNZohoSalesIQ.sharedInstance?.setVisibilityModeToCustomLauncher(mode)
    }

    @ReactMethod
    override fun enableDragToDismiss(enabled: Boolean) {
        RNZohoSalesIQ.sharedInstance?.enableDragToDismiss(enabled)
    }

    @ReactMethod
    override fun setMinimumPressDuration(duration: Double) {
    RNZohoSalesIQ.sharedInstance?.setMinimumPressDuration(duration.toInt())
    }

    @ReactMethod
    override fun setChatTitle(title: String) {
        RNZohoSalesIQ.sharedInstance?.setChatTitle(title)
    }

    @ReactMethod
    override fun hideQueueTime(hide: Boolean) {
        RNZohoSalesIQ.sharedInstance?.hideQueueTime(hide)
    }

    @ReactMethod
    override fun setLanguage(code: String) {
        RNZohoSalesIQ.sharedInstance?.setLanguage(code)
    }

    @ReactMethod
    override fun setDepartment(department: String) {
        RNZohoSalesIQ.sharedInstance?.setDepartment(department)
    }

    @ReactMethod
    override fun setDepartments(department: ReadableArray?) {
        RNZohoSalesIQ.sharedInstance?.setDepartments(department?.toArrayList() as? ArrayList<String>)
    }

    @ReactMethod
    override fun setOperatorEmail(email: String) {
        RNZohoSalesIQ.sharedInstance?.setOperatorEmail(email)
    }

    @ReactMethod
    override fun showOperatorImageInChat(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.showOperatorImageInChat(visible)
    }

    @ReactMethod
    override fun setFeedbackVisibility(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setFeedbackVisibility(visible)
    }

    @ReactMethod
    override fun setRatingVisibility(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setRatingVisibility(visible)
    }

    @ReactMethod
    override fun showOperatorImageInLauncher(show: Boolean) {
        RNZohoSalesIQ.sharedInstance?.showOperatorImageInLauncher(show)
    }

    @ReactMethod
    override fun openChat() {
        RNZohoSalesIQ.sharedInstance?.openChat()
    }

    @ReactMethod
    override fun openChatWithID(chatId: String) {
        RNZohoSalesIQ.sharedInstance?.openChatWithID(chatId)
    }

    @ReactMethod
    override fun showPayloadChat(result: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.showPayloadChat(result)
    }

    @ReactMethod
    override fun showOfflineMessage(show: Boolean) {
        RNZohoSalesIQ.sharedInstance?.showOfflineMessage(show)
    }

    @ReactMethod
    override fun endChat(chatId: String) {
        RNZohoSalesIQ.sharedInstance?.endChat(chatId)
    }

    @ReactMethod
    override fun setLauncherVisibility(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setLauncherVisibility(visible)
    }

    @ReactMethod
    override fun setVisitorName(name: String) {
        RNZohoSalesIQ.sharedInstance?.setVisitorName(name)
    }

    @ReactMethod
    override fun setVisitorEmail(email: String) {
        RNZohoSalesIQ.sharedInstance?.setVisitorEmail(email)
    }

    @ReactMethod
    override fun setVisitorContactNumber(number: String) {
        RNZohoSalesIQ.sharedInstance?.setVisitorContactNumber(number)
    }

    @ReactMethod
    override fun setVisitorAddInfo(key: String, value: String) {
        RNZohoSalesIQ.sharedInstance?.setVisitorAddInfo(key, value)
    }

    @ReactMethod
    override fun setQuestion(question: String) {
        RNZohoSalesIQ.sharedInstance?.setQuestion(question)
    }

    @ReactMethod
    override fun startChat(question: String) {
        RNZohoSalesIQ.sharedInstance?.startChat(question)
    }

    @ReactMethod
    override fun setConversationVisibility(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setConversationVisibility(visible)
    }

    @ReactMethod
    override fun dismissUI() {
        RNZohoSalesIQ.sharedInstance?.dismissUI()
    }

    @ReactMethod
    override fun showFeedbackAfterSkip(enable: Boolean) {
        RNZohoSalesIQ.sharedInstance?.showFeedbackAfterSkip(enable)
    }

    @ReactMethod
    override fun showFeedbackUpToDuration(duration: Double) {
        RNZohoSalesIQ.sharedInstance?.showFeedbackUpToDuration(duration.toInt())
    }

    @ReactMethod
    override fun setChatWaitingTime(seconds: Double) {
        RNZohoSalesIQ.sharedInstance?.setChatWaitingTime(seconds.toInt())
    }

    @ReactMethod
    override fun processNotificationMessage(extras: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.processNotificationMessage(extras)
    }

    @ReactMethod
    override fun isSDKMessage(map: ReadableMap, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.isSDKMessage(map, callback)
    }

    @ReactMethod
    override fun registerPush(fcmToken: String, isTestDevice: Boolean) {
        RNZohoSalesIQ.sharedInstance?.registerPush(fcmToken, isTestDevice)
    }

    @ReactMethod
    override fun getNotificationPayload(readableMap: ReadableMap, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getNotificationPayload(readableMap, callback)
    }

    @ReactMethod
    override fun setNotificationActionSource(actionSource: String) {
        RNZohoSalesIQ.sharedInstance?.setNotificationActionSource(actionSource)
    }

    @ReactMethod
    override fun present(tabString: String?, id: String?, callback: Callback?) {
        RNZohoSalesIQ.sharedInstance?.present(tabString, id, callback)
    }

    @ReactMethod
    override fun setConversationListTitle(title: String) {
        RNZohoSalesIQ.sharedInstance?.setConversationListTitle(title)
    }

    @ReactMethod
    override fun setFAQVisibility(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setFAQVisibility(visible)
    }

    @ReactMethod
    override fun registerVisitor(uniqueId: String, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.registerVisitor(uniqueId, callback)
    }

    @ReactMethod
    override fun unregisterVisitor(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.unregisterVisitor(callback)
    }

    @ReactMethod
    override fun setPageTitle(title: String) {
        RNZohoSalesIQ.sharedInstance?.setPageTitle(title)
    }

    @ReactMethod
    override fun setCustomAction(actionName: String) {
        RNZohoSalesIQ.sharedInstance?.setCustomAction(actionName)
    }

    @ReactMethod
    override fun performCustomAction(actionName: String, shouldOpenChatWindow: Boolean) {
        RNZohoSalesIQ.sharedInstance?.performCustomAction(actionName, shouldOpenChatWindow)
    }

    @ReactMethod
    override fun enableInAppNotification() {
        RNZohoSalesIQ.sharedInstance?.enableInAppNotification()
    }

    @ReactMethod
    override fun disableInAppNotification() {
        RNZohoSalesIQ.sharedInstance?.disableInAppNotification()
    }

    @ReactMethod
    override fun setThemeColorforiOS(colorCode: String) {
        RNZohoSalesIQ.sharedInstance?.setThemeColorforiOS(colorCode)
    }

    @ReactMethod
    override fun setThemeColor(theme: ReadableMap?) {
        RNZohoSalesIQ.sharedInstance?.setThemeColor(theme)
    }

    @ReactMethod
    override fun setChatComponentVisibility(chatComponentName: String, visibility: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setChatComponentVisibility(chatComponentName, visibility)
    }

    @ReactMethod
    override fun setVisitorNameVisibility(visibility: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setVisitorNameVisibility(visibility)
    }

    @ReactMethod
    override fun enablePreChatForms() {
        RNZohoSalesIQ.sharedInstance?.enablePreChatForms()
    }

    @ReactMethod
    override fun disablePreChatForms() {
        RNZohoSalesIQ.sharedInstance?.disablePreChatForms()
    }

    @ReactMethod
    override fun enableScreenshotOption() {
        RNZohoSalesIQ.sharedInstance?.enableScreenshotOption()
    }

    @ReactMethod
    override fun disableScreenshotOption() {
        RNZohoSalesIQ.sharedInstance?.disableScreenshotOption()
    }

    @ReactMethod
    override fun registerChatAction(actionName: String) {
        RNZohoSalesIQ.sharedInstance?.registerChatAction(actionName)
    }

    @ReactMethod
    override fun unregisterChatAction(actionName: String) {
        RNZohoSalesIQ.sharedInstance?.unregisterChatAction(actionName)
    }

    @ReactMethod
    override fun unregisterAllChatActions() {
        RNZohoSalesIQ.sharedInstance?.unregisterAllChatActions()
    }

    @ReactMethod
    override fun setChatActionTimeout(timeout: Double) {
        RNZohoSalesIQ.sharedInstance?.setChatActionTimeout(timeout)
    }

    @ReactMethod
    override fun completeChatAction(uuid: String) {
        RNZohoSalesIQ.sharedInstance?.completeChatAction(uuid)
    }

    @ReactMethod
    override fun completeChatActionWithMessage(uuid: String, success: Boolean, message: String) {
        RNZohoSalesIQ.sharedInstance?.completeChatActionWithMessage(uuid, success, message)
    }

    @ReactMethod
    override fun setVisitorLocation(visitorLocation: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.setVisitorLocation(visitorLocation)
    }

    @ReactMethod
    override fun syncThemeWithOsForAndroid(sync: Boolean) {
        RNZohoSalesIQ.sharedInstance?.syncThemeWithOsForAndroid(sync)
    }

    @ReactMethod
    override fun isChatEnabled(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.isChatEnabled(callback)
    }

    @ReactMethod
    override fun getChatUnreadCount(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getChatUnreadCount(callback)
    }

    @ReactMethod
    override fun setLauncherPropertiesForAndroid(launcherPropertiesMap: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.setLauncherPropertiesForAndroid(launcherPropertiesMap)
    }

    @ReactMethod
    override fun refreshLauncherPropertiesForAndroid() {
        RNZohoSalesIQ.sharedInstance?.refreshLauncherPropertiesForAndroid()
    }

    @ReactMethod
    override fun refreshLauncher() {
        RNZohoSalesIQ.sharedInstance?.refreshLauncher()
    }

    @ReactMethod
    override fun addListener(eventName: String) {
        RNZohoSalesIQ.sharedInstance?.addListener(eventName)
    }

    @ReactMethod
    override fun removeListeners(count: Double) {
        RNZohoSalesIQ.sharedInstance?.removeListeners(count.toInt())
    }

    @ReactMethod
    override fun setCustomFont(map: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.setCustomFont(map)
    }

    @ReactMethod
    override fun sendEvent(event: String, objects: ReadableArray) {
        RNZohoSalesIQ.sharedInstance?.sendEvent(event, objects)
    }

    @ReactMethod
    override fun shouldOpenUrl(value: Boolean) {
        RNZohoSalesIQ.sharedInstance?.shouldOpenUrl(value)
    }

    @ReactMethod
    override fun setTabOrder(tabNames: ReadableArray) {
        RNZohoSalesIQ.sharedInstance?.setTabOrder(tabNames)
    }

    @ReactMethod
    override fun printDebugLogsForAndroid(value: Boolean) {
        RNZohoSalesIQ.sharedInstance?.printDebugLogsForAndroid(value)
    }

    @ReactMethod
    override fun setNotificationIconForAndroid(drawableName: String) {
        RNZohoSalesIQ.sharedInstance?.setNotificationIconForAndroid(drawableName)
    }

    @ReactMethod
    override fun setThemeForAndroid(name: String) {
        RNZohoSalesIQ.sharedInstance?.setThemeForAndroid(name)
    }

    @ReactMethod
    override fun setLoggerEnabled(value: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setLoggerEnabled(value)
    }

    @ReactMethod
    override fun isLoggerEnabled(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.isLoggerEnabled(callback)
    }

    @ReactMethod
    override fun clearLogsForiOS() {
        RNZohoSalesIQ.sharedInstance?.clearLogsForiOS()
    }

    @ReactMethod
    override fun setLoggerPathForiOS(value: String) {
        RNZohoSalesIQ.sharedInstance?.setLoggerPathForiOS(value)
    }

    @ReactMethod
    override fun writeLogForiOS(message: String?, logLevel: String?, callback: Callback?) {
        
    }

    @ReactMethod
    override fun startNewChat(
        question: String,
        customChatId: String?,
        departmentName: String?,
        callback: Callback
    ) {
        RNZohoSalesIQ.sharedInstance?.startNewChat(question, customChatId, departmentName, callback)
    }

    @ReactMethod
    override fun startNewChatWithTrigger(
        customChatId: String?,
        departmentName: String?,
        callback: Callback
    ) {
        RNZohoSalesIQ.sharedInstance?.startNewChatWithTrigger(customChatId, departmentName, callback)
    }

    @ReactMethod
    override fun getChat(chatId: String, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getChat(chatId, callback)
    }

    @ReactMethod
    override fun isKnowledgeBaseEnabled(type: String, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.isKnowledgeBaseEnabled(type, callback)
    }

    @ReactMethod
    override fun setKnowledgeBaseRecentlyViewedCount(limit: Double) {
        RNZohoSalesIQ.sharedInstance?.setKnowledgeBaseRecentlyViewedCount(limit.toInt())
    }

    @ReactMethod
    override fun setKnowledgeBaseVisibility(type: String, shouldShow: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setKnowledgeBaseVisibility(type, shouldShow)
    }

    @ReactMethod
    override fun categorizeKnowledgeBase(type: String, shouldCategorize: Boolean) {
        RNZohoSalesIQ.sharedInstance?.categorizeKnowledgeBase(type, shouldCategorize)
    }

    @ReactMethod
    override fun combineKnowledgeBaseDepartments(type: String, merge: Boolean) {
        RNZohoSalesIQ.sharedInstance?.combineKnowledgeBaseDepartments(type, merge)
    }

    @ReactMethod
    override fun getKnowledgeBaseResourceDepartments(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseResourceDepartments(callback)
    }

    @ReactMethod
    override fun openKnowledgeBase(type: String, id: String, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.openKnowledgeBase(type, id, callback)
    }

    @ReactMethod
    override fun getKnowledgeBaseSingleResource(type: String, id: String, callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseSingleResource(type, id, callback)
    }

    @ReactMethod
    override fun getKnowledgeBaseResources(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        page: Double,
        limit: Double,
        searchKey: String?,
        callback: Callback
    ) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseResources(type, departmentID, parentCategoryID, page.toInt(), limit.toInt(), searchKey, callback)
    }

    @ReactMethod
    override fun getKnowledgeBaseCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        callback: Callback
    ) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseCategories(
            type,
            departmentID,
            parentCategoryID,
            callback
        )
    }

    @ReactMethod
    override fun updateConfiguration(key: String, value: Boolean) {
       RNZohoSalesIQ.sharedInstance?.updateConfiguration(key, value)
    }

    @ReactMethod
    override fun registerLocalizationFile(fileName: String?) {
        // This method is only for iOS
    }

    override fun getName(): String {
        return NAME
    }
}
