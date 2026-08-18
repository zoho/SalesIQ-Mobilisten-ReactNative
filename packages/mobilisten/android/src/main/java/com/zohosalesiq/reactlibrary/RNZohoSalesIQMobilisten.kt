package com.zohosalesiq.reactlibrary

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
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
    override fun initialize(readableMap: ReadableMap, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.initialize(readableMap, promise)
    }

    @ReactMethod
    override fun fetchAttenderImage(
        attenderId: String,
        defaultImage: Boolean,
        imageCallback: Callback,
    ) {
        RNZohoSalesIQ.sharedInstance?.fetchAttenderImage(attenderId, defaultImage, imageCallback)
    }

    @ReactMethod
    override fun getChats(listCallback: Callback) {
        RNZohoSalesIQ.sharedInstance?.getChats(listCallback)
    }

    @ReactMethod
    override fun getChatsList(promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.getChatsList(promise)
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
    override fun fetchDepartments(promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.fetchDepartments(promise)
    }

    @ReactMethod
    override fun getCommunicationMode(promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.getCommunicationMode(promise)
    }

    @ReactMethod
    override fun setAttributes(attributesMap: ReadableMap, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.setAttributes(attributesMap, promise)
    }

    @ReactMethod
    override fun isMultipleOpenChatRestricted(callback: Callback) {
        RNZohoSalesIQ.sharedInstance?.isMultipleOpenChatRestricted(callback)
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
    override fun setChatConversationTitle(onlineTitle: String?, offlineTitle: String?) {
        RNZohoSalesIQ.sharedInstance?.setChatConversationTitle(onlineTitle, offlineTitle)
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
        RNZohoSalesIQ.sharedInstance?.setDepartments(department?.toArrayList()?.filterIsInstance<String>())
    }

    @ReactMethod
    override fun setOperatorEmail(email: String) {
        RNZohoSalesIQ.sharedInstance?.setOperatorEmail(email)
    }

    @ReactMethod
    override fun showOperatorImageInLauncher(show: Boolean) {
        RNZohoSalesIQ.sharedInstance?.showOperatorImageInLauncher(show)
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
    override fun end(chatId: String, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.end(chatId, promise)
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
    override fun setConversationListTitle(title: String) {
        RNZohoSalesIQ.sharedInstance?.setConversationListTitle(title)
    }

    @ReactMethod
    override fun setConversationVisibility(visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setConversationVisibility(visible)
    }


    @ReactMethod
    override fun registerVisitor(uniqueId: String, callback: Callback?) {
        RNZohoSalesIQ.sharedInstance?.registerVisitor(uniqueId, callback)
    }

    @ReactMethod
    override fun unregisterVisitor(callback: Callback?) {
        RNZohoSalesIQ.sharedInstance?.unregisterVisitor(callback)
    }

    @ReactMethod
    override fun setPageTitle(title: String) {
        RNZohoSalesIQ.sharedInstance?.setPageTitle(title)
    }

    @ReactMethod
    override fun enableInAppNotification(enabled: Boolean) {
        RNZohoSalesIQ.sharedInstance?.enableInAppNotification(enabled)
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
        callback: Callback,
    ) {
        RNZohoSalesIQ.sharedInstance?.startNewChat(question, customChatId, departmentName, callback)
    }

    @ReactMethod
    override fun startNewChatWithTrigger(
        customChatId: String?,
        departmentName: String?,
        callback: Callback,
    ) {
        RNZohoSalesIQ.sharedInstance?.startNewChatWithTrigger(
            customChatId, departmentName, callback
        )
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
        callback: Callback,
    ) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseResources(
            type, departmentID, parentCategoryID, page.toInt(), limit.toInt(), searchKey, callback
        )
    }

    @ReactMethod
    override fun getKnowledgeBaseCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        callback: Callback,
    ) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseCategories(
            type, departmentID, parentCategoryID, callback
        )
    }

    @ReactMethod
    override fun updateConfiguration(key: String?, value: ReadableMap?) {
        if (key == null) {
            return
        }
        RNZohoSalesIQ.sharedInstance?.updateConfiguration(key, value)
    }

    @ReactMethod
    override fun refreshData(data: ReadableMap, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.refreshData(data, promise)
    }

    @ReactMethod
    override fun setDataProvider(config: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.setDataProvider(config)
    }

    @ReactMethod
    override fun registerLocalizationFile(fileName: String?) {
        // This method is only for iOS
    }

    @ReactMethod
    override fun reRegisterPush() {

    }

    @ReactMethod
    override fun setHomepageEnabled(enabled: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setHomepageEnabled(enabled)
    }

    @ReactMethod
    override fun setHomepageWidgetVisibility(widget: String, visible: Boolean) {
        RNZohoSalesIQ.sharedInstance?.setHomepageWidgetVisibility(widget, visible)
    }

    @ReactMethod
    override fun presentSDK(screen: ReadableMap, showHomepage: Boolean, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.presentSDK(screen, showHomepage, promise)
    }

    @ReactMethod
    override fun updateProfile(profile: ReadableMap, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.updateProfile(profile, promise)
    }

    @ReactMethod
    override fun helpCenterAsk(question: String?, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.helpCenterAsk(question, promise)
    }


    @ReactMethod
    override fun disablePush(promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.disablePush(promise)
    }

    @ReactMethod
    override fun setUriScheme(scheme: ReadableMap) {
        RNZohoSalesIQ.sharedInstance?.setUriScheme(scheme)
    }

    @ReactMethod
    override fun allowChatInOfflineMode(allow: Boolean) {
        RNZohoSalesIQ.sharedInstance?.allowChatInOfflineMode(allow)
    }

    @ReactMethod
    override fun setChatOfflineMessage(message: String?) {
        RNZohoSalesIQ.sharedInstance?.setChatOfflineMessage(message)
    }

    @ReactMethod
    override fun getBadgeCount(promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.getBadgeCount(promise)
    }

    @ReactMethod
    override fun getKnowledgeBaseSingleResourceWithLanguageFallback(
        type: String,
        id: String,
        shouldFallbackToDefaultLanguage: Boolean,
        promise: Promise,
    ) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseSingleResourceWithLanguageFallback(
            type, id, shouldFallbackToDefaultLanguage, promise
        )
    }

    @ReactMethod
    override fun getKnowledgeBaseResourcesWithChildCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        page: Double,
        limit: Double,
        searchKey: String?,
        includeChildCategoryResources: Boolean,
        promise: Promise,
    ) {
        RNZohoSalesIQ.sharedInstance?.getKnowledgeBaseResourcesWithChildCategories(
            type,
            departmentID,
            parentCategoryID,
            page.toInt(),
            limit.toInt(),
            searchKey,
            includeChildCategoryResources,
            promise
        )
    }

    // These APIs are not needed for now, will handle if it is needed in future.
    // @ReactMethod
    // override fun isLiveChatAvailable(callback: Callback) {
    //     RNZohoSalesIQ.sharedInstance?.isLiveChatAvailable(callback)
    // }

    // @ReactMethod
    // override fun isBrandOnline(callback: Callback) {
    //     RNZohoSalesIQ.sharedInstance?.isBrandOnline(callback)
    // }

    @ReactMethod
    override fun setThemeSource(source: String) {
        RNZohoSalesIQ.sharedInstance?.setThemeSource(source)
    }

    // @ReactMethod
    // override fun getChatDepartments(callback: Callback) {
    //     RNZohoSalesIQ.sharedInstance?.getChatDepartments(callback)
    // }

    @ReactMethod
    override fun visitorPerformCustomAction(actionName: String, promise: Promise) {
        RNZohoSalesIQ.sharedInstance?.visitorPerformCustomAction(actionName, promise)
    }

    @ReactMethod
    override fun setSessionId(id: String) {
        RNZohoSalesIQ.sharedInstance?.setSessionId(id)
    }

    override fun getName(): String {
        return NAME
    }
}
