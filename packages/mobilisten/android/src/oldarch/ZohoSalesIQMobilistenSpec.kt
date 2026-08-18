package com.zohosalesiq.reactlibrary

import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

abstract class ZohoSalesIQMobilistenSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {
    override fun getConstants(): MutableMap<String, Any>? {
        return RNZohoSalesIQ.sharedInstance?.constants
    }

    abstract fun initialize(readableMap: ReadableMap, promise: Promise)
    abstract fun fetchAttenderImage(
        attenderId: String, defaultImage: Boolean, imageCallback: Callback,
    )

    abstract fun getChats(listCallback: Callback)
    abstract fun getChatsWithFilter(filter: String, listCallback: Callback)
    abstract fun getChatsList(promise: Promise)
    abstract fun getDepartments(departmentCallback: Callback)
    abstract fun fetchDepartments(promise: Promise)
    abstract fun isMultipleOpenChatRestricted(callback: Callback)
    abstract fun init(appKey: String, accessKey: String)
    abstract fun initWithCallback(appKey: String, accessKey: String, initCallback: Callback)
    abstract fun showLauncher(mode: String)
    abstract fun updateListener(listener: String)
    abstract fun setVisibilityModeToCustomLauncher(mode: String)
    abstract fun enableDragToDismiss(enabled: Boolean)
    abstract fun setMinimumPressDuration(duration: Double)
    abstract fun setChatConversationTitle(onlineTitle: String?, offlineTitle: String?)
    abstract fun hideQueueTime(hide: Boolean)
    abstract fun setLanguage(code: String)
    abstract fun setDepartment(department: String)
    abstract fun setDepartments(department: ReadableArray?)
    abstract fun setOperatorEmail(email: String)
    abstract fun showOperatorImageInLauncher(show: Boolean)
    abstract fun showPayloadChat(result: ReadableMap)
    abstract fun showOfflineMessage(show: Boolean)
    abstract fun end(chatId: String, promise: Promise)
    abstract fun setVisitorName(name: String)
    abstract fun setVisitorEmail(email: String)
    abstract fun setVisitorContactNumber(number: String)
    abstract fun setVisitorAddInfo(key: String, value: String)
    abstract fun setQuestion(question: String)
    abstract fun setConversationListTitle(title: String)
    abstract fun setConversationVisibility(visible: Boolean)
    abstract fun registerVisitor(uniqueId: String, callback: Callback?)
    abstract fun unregisterVisitor(callback: Callback?)
    abstract fun setPageTitle(title: String)
    abstract fun enableInAppNotification(enabled: Boolean)
    abstract fun setThemeColorforiOS(colorCode: String)
    abstract fun setThemeColor(theme: ReadableMap?)
    abstract fun setChatComponentVisibility(chatComponentName: String, visibility: Boolean)
    abstract fun registerChatAction(actionName: String)
    abstract fun unregisterChatAction(actionName: String)
    abstract fun unregisterAllChatActions()
    abstract fun setChatActionTimeout(timeout: Double)
    abstract fun setVisitorLocation(visitorLocation: ReadableMap)
    abstract fun syncThemeWithOsForAndroid(sync: Boolean)
    abstract fun isChatEnabled(callback: Callback)
    abstract fun getChatUnreadCount(callback: Callback)
    abstract fun setLauncherPropertiesForAndroid(launcherPropertiesMap: ReadableMap)
    abstract fun refreshLauncherPropertiesForAndroid()
    abstract fun refreshLauncher()
    abstract fun addListener(eventName: String)
    abstract fun removeListeners(count: Double)
    abstract fun processNotificationMessage(extras: ReadableMap)
    abstract fun isSDKMessage(map: ReadableMap, callback: Callback)
    abstract fun registerPush(fcmToken: String, isTestDevice: Boolean)
    abstract fun getNotificationPayload(readableMap: ReadableMap, callback: Callback)
    abstract fun setNotificationActionSource(actionSource: String)
    // [sync] present(tab, id) removed — the Tab-based present was retired; use presentSDK instead.
    abstract fun setCustomFont(map: ReadableMap)
    abstract fun sendEvent(event: String, objects: ReadableArray)
    abstract fun shouldOpenUrl(value: Boolean)
    abstract fun setThemeForAndroid(name: String)
    abstract fun setLoggerEnabled(value: Boolean)
    abstract fun isLoggerEnabled(callback: Callback)
    abstract fun clearLogsForiOS()
    abstract fun setLoggerPathForiOS(value: String)
    abstract fun writeLogForiOS(message: String?, logLevel: String?, callback: Callback?)
    abstract fun dismissUI()
    abstract fun showFeedbackAfterSkip(enable: Boolean)
    abstract fun showFeedbackUpToDuration(duration: Double)
    abstract fun startNewChat(
        question: String, customChatId: String?, departmentName: String?, callback: Callback,
    )

    abstract fun startNewChatWithTrigger(
        customChatId: String?, departmentName: String?, callback: Callback,
    )

    abstract fun getChat(chatId: String, callback: Callback)
    abstract fun setChatWaitingTime(seconds: Double)
    abstract fun isKnowledgeBaseEnabled(type: String, callback: Callback)
    abstract fun setKnowledgeBaseRecentlyViewedCount(limit: Double)
    abstract fun setKnowledgeBaseVisibility(type: String, shouldShow: Boolean)
    abstract fun categorizeKnowledgeBase(type: String, shouldCategorize: Boolean)
    abstract fun combineKnowledgeBaseDepartments(type: String, merge: Boolean)
    abstract fun getKnowledgeBaseResourceDepartments(callback: Callback)
    abstract fun openKnowledgeBase(type: String, id: String, callback: Callback)
    abstract fun getKnowledgeBaseSingleResource(type: String, id: String, callback: Callback)
    abstract fun getKnowledgeBaseResources(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        page: Double,
        limit: Double,
        searchKey: String?,
        callback: Callback,
    )

    abstract fun getKnowledgeBaseCategories(
        type: String, departmentID: String?, parentCategoryID: String?, callback: Callback,
    )

    abstract fun updateConfiguration(key: String?, value: ReadableMap?)
    abstract fun refreshData(data: ReadableMap, promise: Promise)
    abstract fun setDataProvider(config: ReadableMap)
    abstract fun registerLocalizationFile(fileName: String?)
    abstract fun setAttributes(attributesMap: ReadableMap, promise: Promise)
    abstract fun getCommunicationMode(promise: Promise)
    abstract fun reRegisterPush()
    abstract fun setHomepageEnabled(enabled: Boolean)
    abstract fun setHomepageWidgetVisibility(widget: String, visible: Boolean)
    abstract fun presentSDK(screen: ReadableMap, showHomepage: Boolean, promise: Promise)
    abstract fun updateProfile(profile: ReadableMap, promise: Promise)
    abstract fun helpCenterAsk(question: String?, promise: Promise)
    abstract fun disablePush(promise: Promise)
    abstract fun setUriScheme(scheme: ReadableMap)
    abstract fun allowChatInOfflineMode(allow: Boolean)
    abstract fun setChatOfflineMessage(message: String?)
    abstract fun getBadgeCount(promise: Promise)
    abstract fun getKnowledgeBaseSingleResourceWithLanguageFallback(
        type: String, id: String, shouldFallbackToDefaultLanguage: Boolean, promise: Promise,
    )

    abstract fun getKnowledgeBaseResourcesWithChildCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        page: Double,
        limit: Double,
        searchKey: String?,
        includeChildCategoryResources: Boolean,
        promise: Promise,
    )

    // These APIs are not needed for now, will handle if it is needed in future.
    // abstract fun isLiveChatAvailable(callback: Callback)
    // abstract fun isBrandOnline(callback: Callback)
    abstract fun setThemeSource(source: String)
    // abstract fun getChatDepartments(callback: Callback)
    abstract fun visitorPerformCustomAction(actionName: String, promise: Promise)
    abstract fun setSessionId(id: String)
}
