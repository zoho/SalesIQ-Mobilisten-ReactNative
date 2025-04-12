package com.zohosalesiq.reactlibrary

import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.text.TextUtils
import android.util.Base64
import androidx.appcompat.content.res.AppCompatResources
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableNativeMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.gson.reflect.TypeToken
import com.zoho.commons.ChatComponent
import com.zoho.commons.Fonts
import com.zoho.commons.InitConfig
import com.zoho.commons.LauncherModes
import com.zoho.commons.LauncherProperties
import com.zoho.commons.LauncherProperties.Horizontal
import com.zoho.commons.LauncherProperties.Vertical
import com.zoho.commons.OnInitCompleteListener
import com.zoho.livechat.android.MobilistenActivityLifecycleCallbacks.register
import com.zoho.livechat.android.NotificationListener
import com.zoho.livechat.android.SIQDepartment
import com.zoho.livechat.android.SIQVisitor
import com.zoho.livechat.android.SIQVisitorLocation
import com.zoho.livechat.android.SalesIQCustomAction
import com.zoho.livechat.android.VisitorChat
import com.zoho.livechat.android.ZohoLiveChat
import com.zoho.livechat.android.config.DeviceConfig
import com.zoho.livechat.android.constants.ConversationType
import com.zoho.livechat.android.constants.SalesIQConstants
import com.zoho.livechat.android.exception.InvalidEmailException
import com.zoho.livechat.android.listeners.ConversationListener
import com.zoho.livechat.android.listeners.DepartmentListener
import com.zoho.livechat.android.listeners.FAQCategoryListener
import com.zoho.livechat.android.listeners.FAQListener
import com.zoho.livechat.android.listeners.OperatorImageListener
import com.zoho.livechat.android.listeners.RegisterListener
import com.zoho.livechat.android.listeners.SalesIQActionListener
import com.zoho.livechat.android.listeners.SalesIQChatListener
import com.zoho.livechat.android.listeners.SalesIQCustomActionListener
import com.zoho.livechat.android.listeners.SalesIQListener
import com.zoho.livechat.android.listeners.UnRegisterListener
import com.zoho.livechat.android.models.SalesIQArticle
import com.zoho.livechat.android.models.SalesIQArticleCategory
import com.zoho.livechat.android.modules.common.DataModule.gson
import com.zoho.livechat.android.modules.common.DataModule.sharedPreferences
import com.zoho.livechat.android.modules.common.data.local.MobilistenEncryptedSharedPreferences
import com.zoho.livechat.android.modules.common.domain.repositories.entities.DebugInfoData
import com.zoho.livechat.android.modules.common.ui.LauncherUtil.isAllowedToShow
import com.zoho.livechat.android.modules.common.ui.LauncherUtil.refreshLauncher
import com.zoho.livechat.android.modules.common.ui.LauncherUtil.showChatBubble
import com.zoho.livechat.android.modules.common.ui.LoggerUtil.logDebugInfo
import com.zoho.livechat.android.modules.common.ui.lifecycle.SalesIQActivitiesManager
import com.zoho.livechat.android.modules.common.ui.result.entities.SalesIQError
import com.zoho.livechat.android.modules.common.ui.result.entities.SalesIQResult
import com.zoho.livechat.android.modules.commonpreferences.data.local.entities.CommonPreferencesLocalDataSource
import com.zoho.livechat.android.modules.jwt.domain.entities.SalesIQAuth
import com.zoho.livechat.android.modules.knowledgebase.ui.entities.Resource
import com.zoho.livechat.android.modules.knowledgebase.ui.entities.ResourceCategory
import com.zoho.livechat.android.modules.knowledgebase.ui.entities.ResourceDepartment
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.OpenResourceListener
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourceCategoryListener
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourceDepartmentsListener
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourceListener
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourcesListener
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.SalesIQKnowledgeBaseListener
import com.zoho.livechat.android.modules.notifications.sdk.entities.SalesIQNotificationPayload
import com.zoho.livechat.android.operation.SalesIQApplicationManager
import com.zoho.livechat.android.utils.LiveChatUtil
import com.zoho.salesiqembed.ZohoSalesIQ
import com.zoho.salesiqembed.ZohoSalesIQ.ActionSource
import com.zoho.salesiqembed.ZohoSalesIQ.Launcher.VisibilityMode
import com.zoho.salesiqembed.ktx.fromJsonSafe
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.util.Hashtable
import java.util.UUID
import kotlin.math.min

class RNZohoSalesIQ private constructor(reactContext: ReactApplicationContext) {
    private val currentActivity: Activity?
        get() = reactContext!!.currentActivity

    internal class Font {
        var regular: String? = null
        var medium: String? = null
    }

    internal enum class Tab(val value: String) {
        CONVERSATIONS("TAB_CONVERSATIONS"),
        @Deprecated("")
        FAQ("TAB_FAQ"),
        KNOWLEDGE_BASE("TAB_KNOWLEDGE_BASE")
    }

    val constants: MutableMap<String, Any>
        get() {
            val constants: MutableMap<String, Any> =
                HashMap()
            constants["TYPE_CONNECTED"] = TYPE_CONNECTED // No I18N
            constants["TYPE_OPEN"] = TYPE_OPEN // No I18N
            constants["TYPE_WAITING"] = TYPE_WAITING // No I18N
            constants["TYPE_MISSED"] = TYPE_MISSED // No I18N
            constants["TYPE_ENDED"] = TYPE_ENDED // No I18N
            constants["TYPE_CLOSED"] = TYPE_CLOSED // No I18N

            constants["TAB_CONVERSATIONS"] =
                Tab.CONVERSATIONS.value // No I18N
            constants["TAB_FAQ"] =
                Tab.FAQ.value // No I18N
            constants["TAB_KNOWLEDGE_BASE"] =
                Tab.KNOWLEDGE_BASE.value // No I18N

            constants["SUPPORT_OPENED"] = EVENT_SUPPORT_OPENED // No I18N
            constants["SUPPORT_CLOSED"] = EVENT_SUPPORT_CLOSED // No I18N
            constants["CHATVIEW_OPENED"] = EVENT_CHATVIEW_OPENED // No I18N
            constants["CHATVIEW_CLOSED"] = EVENT_CHATVIEW_CLOSED // No I18N
            constants["OPERATORS_ONLINE"] =
                EVENT_OPERATORS_ONLINE // No I18N
            constants["OPERATORS_OFFLINE"] =
                EVENT_OPERATORS_OFFLINE // No I18N
            constants["VISITOR_IPBLOCKED"] =
                EVENT_VISITOR_IPBLOCKED // No I18N

            constants["CHAT_ATTENDED"] = EVENT_CHAT_ATTENDED // No I18N
            constants["CHAT_MISSED"] = EVENT_CHAT_MISSED // No I18N
            constants["CHAT_OPENED"] = EVENT_CHAT_OPENED // No I18N
            constants["CHAT_CLOSED"] = EVENT_CHAT_CLOSED // No I18N
            constants["CHAT_REOPENED"] = EVENT_CHAT_REOPENED // No I18N
            constants["FEEDBACK_RECEIVED"] =
                EVENT_FEEDBACK_RECEIVED // No I18N
            constants["RATING_RECEIVED"] = EVENT_RATING_RECEIVED // No I18N
            constants["PERFORM_CHATACTION"] =
                EVENT_PERFORM_CHATACTION // No I18N
            constants["CUSTOMTRIGGER"] = EVENT_CUSTOMTRIGGER // No I18N
            constants["BOT_TRIGGER"] = EVENT_BOT_TRIGGER // No I18N
            constants["EVENT_HANDLE_URL"] = EVENT_HANDLE_URL // No I18N
            constants["EVENT_OPEN_URL"] = EVENT_OPEN_URL // No I18N
            constants["EVENT_COMPLETE_CHAT_ACTION"] =
                EVENT_COMPLETE_CHAT_ACTION // No I18N
            constants["CHAT_QUEUE_POSITION_CHANGED"] =
                EVENT_CHAT_QUEUE_POSITION_CHANGED // No I18N
            constants["CHAT_UNREAD_COUNT_CHANGED"] =
                EVENT_CHAT_UNREAD_COUNT_CHANGED // No I18N

            constants["EVENT_RESOURCE_LIKED"] =
                EVENT_RESOURCE_LIKED // No I18N
            constants["EVENT_RESOURCE_DISLIKED"] =
                EVENT_RESOURCE_DISLIKED // No I18N
            constants["EVENT_RESOURCE_OPENED"] =
                EVENT_RESOURCE_OPENED // No I18N
            constants["EVENT_RESOURCE_CLOSED"] =
                EVENT_RESOURCE_CLOSED // No I18N

            constants["EVENT_NOTIFICATION_CLICKED"] =
                EVENT_NOTIFICATION_CLICKED // No I18N

            constants["ACTION_SOURCE_APP"] = ACTION_SOURCE_APP // No I18N
            constants["ACTION_SOURCE_SDK"] = ACTION_SOURCE_SDK // No I18N

            constants["ARTICLE_LIKED"] = EVENT_ARTICLE_LIKED // No I18N
            constants["ARTICLE_DISLIKED"] =
                EVENT_ARTICLE_DISLIKED // No I18N
            constants["ARTICLE_OPENED"] = EVENT_ARTICLE_OPENED // No I18N
            constants["ARTICLE_CLOSED"] = EVENT_ARTICLE_CLOSED

            constants["LAUNCHER_MODE_STATIC"] =
                LAUNCHER_MODE_STATIC // No I18N
            constants["LAUNCHER_MODE_FLOATING"] =
                LAUNCHER_MODE_FLOATING // No I18N
            constants["EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY"] =
                EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY // No I18N
            constants["EVENT_VISITOR_REGISTRATION_FAILURE"] =
                EVENT_VISITOR_REGISTRATION_FAILURE // No I18N
            constants["LAUNCHER_VISIBILITY_MODE_ALWAYS"] =
                LAUNCHER_VISIBILITY_MODE_ALWAYS // No I18N
            constants["LAUNCHER_VISIBILITY_MODE_NEVER"] =
                LAUNCHER_VISIBILITY_MODE_NEVER // No I18N
            constants["LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT"] =
                LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT // No I18N
            constants["LAUNCHER_HORIZONTAL_RIGHT"] =
                LAUNCHER_HORIZONTAL_RIGHT // No I18N
            constants["LAUNCHER_HORIZONTAL_LEFT"] =
                LAUNCHER_HORIZONTAL_LEFT // No I18N
            constants["LAUNCHER_VERTICAL_TOP"] =
                LAUNCHER_VERTICAL_TOP // No I18N
            constants["LAUNCHER_VERTICAL_BOTTOM"] =
                LAUNCHER_VERTICAL_BOTTOM // No I18N

            constants["RESOURCE_ARTICLES"] = RESOURCE_ARTICLES // No I18N

            constants["CHAT_EVENT_LISTENER"] =
                CHAT_EVENT_LISTENER // No I18N
            constants["KNOWLEDGEBASE_EVENT_LISTENER"] =
                KNOWLEDGEBASE_EVENT_LISTENER // No I18N
            constants["NOTIFICATION_EVENT_LISTENER"] =
                NOTIFICATION_EVENT_LISTENER // No I18N
            constants["LAUNCHER_EVENT_LISTENER"] =
                LAUNCHER_EVENT_LISTENER // No I18N
            constants["ZSIQ_EVENT_LISTENER"] =
                ZSIQ_EVENT_LISTENER // No I18N

            return constants
        }

    private fun convertToBitmap(drawable: Drawable): Bitmap {
        if (drawable is BitmapDrawable) {
            if (drawable.bitmap != null) {
                return drawable.bitmap
            }
        }

        val bitmap = if (drawable.intrinsicWidth <= 0 || drawable.intrinsicHeight <= 0) {
            Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888)
        } else {
            Bitmap.createBitmap(
                drawable.intrinsicWidth,
                drawable.intrinsicHeight,
                Bitmap.Config.ARGB_8888
            )
        }

        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }

    @ReactMethod
    fun fetchAttenderImage(
        attenderId: String,
        defaultImage: Boolean,
        imageCallback: Callback
    ) {
        ZohoSalesIQ.Chat.fetchAttenderImage(
            attenderId,
            defaultImage,
            object : OperatorImageListener {
                override fun onSuccess(drawable: Drawable) {
                    val bitmap = convertToBitmap(drawable)

                    val baos = ByteArrayOutputStream()
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos) //bm is the bitmap object
                    val byteArrayImage = baos.toByteArray()

                    var encodedImage = Base64.encodeToString(byteArrayImage, Base64.DEFAULT)

                    encodedImage = encodedImage.replace("\n", "") // No I18N

                    imageCallback.invoke(null, encodedImage)
                }

                override fun onFailure(code: Int, message: String) {
                    val errorMap: WritableMap = WritableNativeMap()
                    errorMap.putInt("code", code) // No I18N
                    errorMap.putString("message", message) // No I18N
                    imageCallback.invoke(errorMap, null)
                }
            })
    }

    @ReactMethod
    fun getChats(listCallback: Callback) {
        HANDLER.post {
            ZohoSalesIQ.Chat.getList(object : ConversationListener {
                override fun onSuccess(arrayList: ArrayList<VisitorChat>) {
                    val array: WritableArray = WritableNativeArray()
                    for (i in arrayList.indices) {
                        val chat = arrayList[i]
                        val visitorMap =
                            getChatMapObject(chat)
                        array.pushMap(visitorMap)
                    }
                    listCallback.invoke(null, array)
                }

                override fun onFailure(code: Int, message: String) {
                    val errorMap: WritableMap = WritableNativeMap()
                    errorMap.putInt("code", code) // No I18N
                    errorMap.putString("message", message) // No I18N
                    listCallback.invoke(errorMap, null)
                }
            })
        }
    }

    @ReactMethod
    fun getChatsWithFilter(
        filter: String,
        listCallback: Callback
    ) {
        HANDLER.post {
            try {
                if (isValidFilterName(filter)) {
                    val filterName = getFilterName(filter)
                    ZohoSalesIQ.Chat.getList(filterName, object : ConversationListener {
                        override fun onSuccess(arrayList: ArrayList<VisitorChat>) {
                            val array: WritableArray = WritableNativeArray()

                            for (i in arrayList.indices) {
                                val chat = arrayList[i]
                                val visitorMap =
                                    getChatMapObject(chat)
                                array.pushMap(visitorMap)
                            }
                            listCallback.invoke(null, array)
                        }

                        override fun onFailure(code: Int, message: String) {
                            val errorMap: WritableMap = WritableNativeMap()
                            errorMap.putInt("code", code) // No I18N
                            errorMap.putString("message", message) // No I18N
                            listCallback.invoke(errorMap, null)
                        }
                    })
                } else {
                    val errorMap: WritableMap = WritableNativeMap()
                    errorMap.putInt("code", INVALID_FILTER_CODE) // No I18N
                    errorMap.putString(
                        "message",
                        INVALID_FILTER_TYPE
                    ) // No I18N
                    listCallback.invoke(errorMap, null)
                }
            } catch (e: Exception) {
                LiveChatUtil.log(e)
            }
        }
    }

    @ReactMethod
    fun getDepartments(departmentCallback: Callback) {
        HANDLER.post {
            ZohoSalesIQ.Chat.getDepartments(object : DepartmentListener {
                override fun onSuccess(departmentList: ArrayList<SIQDepartment>) {
                    val array: WritableArray = WritableNativeArray()
                    for (i in departmentList.indices) {
                        val department = departmentList[i]
                        val departmentMap = getDepartmentMapObject(department)
                        array.pushMap(departmentMap)
                    }
                    departmentCallback.invoke(null, array)
                }

                override fun onFailure(code: Int, message: String) {
                    val errorMap: WritableMap = WritableNativeMap()
                    errorMap.putInt("code", code) // No I18N
                    errorMap.putString("message", message) // No I18N
                    departmentCallback.invoke(errorMap, null)
                }
            })
        }
    }

    @ReactMethod
    fun isMultipleOpenChatRestricted(callback: Callback) {
        callback.invoke(ZohoSalesIQ.Chat.isMultipleOpenRestricted())
    }

    @ReactMethod
    fun getArticles(articlesCallback: Callback) {
        HANDLER.post {
            ZohoLiveChat.FAQ.getArticles(object : FAQListener {
                override fun onSuccess(articlesList: ArrayList<SalesIQArticle>) {
                    val array: WritableArray = WritableNativeArray()
                    for (i in articlesList.indices) {
                        val article = articlesList[i]
                        val articleMap = getArticleMapObject(article)
                        array.pushMap(articleMap)
                    }
                    articlesCallback.invoke(null, array)
                }

                override fun onFailure(code: Int, message: String) {
                    val errorMap: WritableMap = WritableNativeMap()
                    errorMap.putInt("code", code) // No I18N
                    errorMap.putString("message", message) // No I18N
                    articlesCallback.invoke(errorMap, null)
                }
            })
        }
    }

    @ReactMethod
    fun getArticlesWithCategoryID(
        categoryId: String,
        articlesCallback: Callback
    ) {
        HANDLER.post {
            ZohoSalesIQ.KnowledgeBase.getResources(
                ZohoSalesIQ.ResourceType.Articles,
                null,
                categoryId,
                null,
                false,
                object : ResourcesListener {
                    override fun onSuccess(articles: List<Resource>, moreDataAvailable: Boolean) {
                        val array: WritableArray = WritableNativeArray()
                        for (i in articles.indices) {
                            array.pushMap(getArticleMapObject(articles[i]))
                        }
                        articlesCallback.invoke(null, array)
                    }

                    override fun onFailure(code: Int, message: String?) {
                        val errorMap: WritableMap = WritableNativeMap()
                        errorMap.putInt("code", code) // No I18N
                        errorMap.putString("message", message) // No I18N
                        articlesCallback.invoke(errorMap, null)
                    }
                })
        }
    }

    @ReactMethod
    fun getCategories(categoryCallback: Callback) {
        HANDLER.post {
            ZohoLiveChat.FAQ.getCategories(object : FAQCategoryListener {
                override fun onSuccess(categoryList: ArrayList<SalesIQArticleCategory>) {
                    val array: WritableArray = WritableNativeArray()

                    for (i in categoryList.indices) {
                        val category = categoryList[i]

                        val categoryMap: WritableMap = WritableNativeMap()
                        categoryMap.putString("id", category.categoryId) // No I18N
                        categoryMap.putString(
                            "name",  // No I18N
                            category.categoryName
                        )
                        categoryMap.putInt("articleCount", category.count) // No I18N

                        array.pushMap(categoryMap)
                    }
                    categoryCallback.invoke(null, array)
                }

                override fun onFailure(code: Int, message: String) {
                    val errorMap: WritableMap = WritableNativeMap()
                    errorMap.putInt("code", code) // No I18N
                    errorMap.putString("message", message) // No I18N
                    categoryCallback.invoke(errorMap, null)
                }
            })
        }
    }

    @ReactMethod
    fun openArticle(id: String?, articlesCallback: Callback) {
        HANDLER.post {
            ZohoSalesIQ.KnowledgeBase.open(ZohoSalesIQ.ResourceType.Articles, id,
                object : OpenResourceListener {
                    override fun onSuccess() {
                        articlesCallback.invoke("null")
                    }

                    override fun onFailure(code: Int, message: String?) {
                        val errorMap: WritableMap = WritableNativeMap()
                        errorMap.putInt("code", code) // No I18N
                        errorMap.putString("message", message) // No I18N
                        articlesCallback.invoke(errorMap)
                    }
                }
            )
        }
    }

    @ReactMethod
    fun init(appKey: String, accessKey: String) {
        val application = application
        if (application != null) {
            registerCallbacks(application)
            HANDLER.post {
                initSalesIQ(
                    application,
                    currentActivity, appKey, accessKey, null
                )
            }
        }
    }

    @ReactMethod
    fun initWithCallback(
        appKey: String,
        accessKey: String,
        initCallback: Callback?
    ) {
        val application = application
        LiveChatUtil.log("initWithCallback, application: $application")
        if (application != null) {
            registerCallbacks(application)
            HANDLER.post {
                initSalesIQ(
                    application,
                    currentActivity, appKey, accessKey, initCallback
                )
            }
        }
    }

    private val application: Application?
        get() {
            val activity = currentActivity
            return if (activity != null) activity.application else (if (reactContext != null) (if (reactContext!!.applicationContext is Application) reactContext!!.applicationContext as Application else null) else null)
        }

    @ReactMethod
    fun showLauncher(mode: String) {
        ZohoSalesIQ.Launcher.show(getVisibilityMode(mode))
    }

    @ReactMethod
    fun updateListener(listener: String?) {
    }

    @ReactMethod
    fun setVisibilityModeToCustomLauncher(mode: String) {
        ZohoSalesIQ.Launcher.setVisibilityModeToCustomLauncher(getVisibilityMode(mode))
    }

    @ReactMethod
    fun enableDragToDismiss(enabled: Boolean) {
        ZohoSalesIQ.Launcher.enableDragToDismiss(enabled)
    }

    @ReactMethod
    fun setMinimumPressDuration(duration: Int) {
        ZohoSalesIQ.Launcher.setMinimumPressDuration(duration.toLong())
    }

    @ReactMethod
    fun setChatTitle(title: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.setTitle(title) }
    }

    @ReactMethod
    fun hideQueueTime(hide: Boolean) {
        HANDLER.post { ZohoSalesIQ.Chat.hideQueueTime(hide) }
    }

    @ReactMethod
    fun setLanguage(code: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.setLanguage(code) }
    }

    @ReactMethod
    fun setDepartment(department: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.setDepartment(department) }
    }

    @ReactMethod
    fun setDepartments(department: ArrayList<String>?) {
        HANDLER.post { ZohoSalesIQ.Chat.setDepartments(department) }
    }

    @ReactMethod
    fun setOperatorEmail(email: String?) {
        HANDLER.post {
            try {
                ZohoSalesIQ.Chat.setOperatorEmail(email)
            } catch (e: InvalidEmailException) {
                LiveChatUtil.log(e)
            }
        }
    }

    @ReactMethod
    fun showOperatorImageInChat(visible: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.operatorImage,
                visible
            )
        }
    }

    @ReactMethod
    fun setFeedbackVisibility(visible: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.feedback,
                visible
            )
        }
    }

    @ReactMethod
    fun setRatingVisibility(visible: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.rating,
                visible
            )
        }
    }

    @ReactMethod
    fun showOperatorImageInLauncher(show: Boolean) {
        HANDLER.post {
            val activity = currentActivity
            if (activity != null && ZohoSalesIQ.getApplicationManager() != null) {
                ZohoSalesIQ.getApplicationManager()!!.setCurrentActivity(activity)
                ZohoSalesIQ.Chat.showOperatorImageInLauncher(show)
            }
        }
    }

    @ReactMethod
    fun openChat() {
        HANDLER.post { ZohoSalesIQ.Chat.show() }
    }

    @ReactMethod
    fun openChatWithID(chatId: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.open(chatId) }
    }

    @ReactMethod
    fun showPayloadChat(result: ReadableMap) {
        val chatId: String?
        if (result.hasKey("chatId")) {
            chatId = result.getString("chatId")
        } else if (result.hasKey("payload")) {
            val payload = result.getMap("payload") // No I18N
            chatId = if (payload != null && payload.hasKey("chatId")) {
                payload.getString("chatId")
            } else {
                null
            }
        } else {
            chatId = null
        }
        if (chatId != null) {
            LiveChatUtil.log("Opening payload chat with id: $chatId")
            HANDLER.post { ZohoSalesIQ.Chat.open(chatId) }
        }
    }

    @ReactMethod
    fun showOfflineMessage(show: Boolean) {
        HANDLER.post { ZohoSalesIQ.Chat.showOfflineMessage(show) }
    }

    @ReactMethod
    fun endChat(chatId: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.endChat(chatId) }
    }

    @ReactMethod
    fun setLauncherVisibility(visible: Boolean) {
        HANDLER.post { ZohoSalesIQ.Chat.showLauncher(visible) }
    }

    @ReactMethod
    fun setVisitorName(name: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setName(name) }
    }

    @ReactMethod
    fun setVisitorEmail(email: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setEmail(email) }
    }

    @ReactMethod
    fun setVisitorContactNumber(number: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setContactNumber(number) }
    }

    @ReactMethod
    fun setVisitorAddInfo(key: String?, value: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.addInfo(key, value) }
    }

    @ReactMethod
    fun setQuestion(question: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setQuestion(question) }
    }

    @ReactMethod
    fun startChat(question: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.startChat(question) }
    }

    @ReactMethod
    fun setConversationVisibility(visible: Boolean) {
        HANDLER.post { ZohoLiveChat.Conversation.setVisibility(visible) }
    }

    @ReactMethod
    fun setConversationListTitle(title: String?) {
        HANDLER.post { ZohoLiveChat.Conversation.setTitle(title) }
    }

    @ReactMethod
    fun setFAQVisibility(visible: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.KnowledgeBase.setVisibility(
                ZohoSalesIQ.ResourceType.Articles,
                visible
            )
        }
    }

    @ReactMethod
    fun registerVisitor(uniqueid: String, callback: Callback) {
        HANDLER.post {
            ZohoSalesIQ.registerVisitor(uniqueid, object : RegisterListener {
                override fun onSuccess() {
                    callback.invoke(null, java.lang.Boolean.TRUE)
                }

                override fun onFailure(code: Int, message: String) {
                    callback.invoke(
                        getErrorMap(code, message),
                        java.lang.Boolean.FALSE
                    )
                }
            })
        }
    }

    @ReactMethod
    fun unregisterVisitor(callback: Callback) {
        HANDLER.post {
            ZohoSalesIQ.unregisterVisitor(currentActivity, object : UnRegisterListener {
                override fun onSuccess() {
                    callback.invoke(null, java.lang.Boolean.TRUE)
                }

                override fun onFailure(code: Int, message: String) {
                    callback.invoke(
                        getErrorMap(code, message),
                        java.lang.Boolean.FALSE
                    )
                }
            })
        }
    }

    @ReactMethod
    fun setPageTitle(title: String?) {
        HANDLER.post { ZohoSalesIQ.Tracking.setPageTitle(title) }
    }

    @ReactMethod
    fun setCustomAction(actionName: String?) {
        HANDLER.post { ZohoSalesIQ.Tracking.setCustomAction(actionName) }
    }

    @ReactMethod
    fun performCustomAction(actionName: String?, shouldOpenChatWindow: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.Tracking.setCustomAction(
                actionName,
                shouldOpenChatWindow
            )
        }
    }

    @ReactMethod
    fun enableInAppNotification() {
        HANDLER.post { ZohoLiveChat.Notification.enableInApp() }
    }

    @ReactMethod
    fun disableInAppNotification() {
        HANDLER.post { ZohoLiveChat.Notification.disableInApp() }
    }

    @ReactMethod
    fun setThemeColorforiOS(colorCode: String?) {
    }

    @ReactMethod
    fun setChatComponentVisibility(chatComponentName: String, visibility: Boolean) {
        HANDLER.post {
            val chatComponent =
                getChatComponent(chatComponentName)
            if (chatComponent != null) {
                ZohoSalesIQ.Chat.setVisibility(chatComponent, visibility)
            }
        }
    }

    @ReactMethod
    fun setVisitorNameVisibility(visibility: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.visitorName,
                visibility
            )
        }
    }

    @ReactMethod
    fun enablePreChatForms() {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.prechatForm,
                true
            )
        }
    }

    @ReactMethod
    fun disablePreChatForms() {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.prechatForm,
                false
            )
        }
    }

    @ReactMethod
    fun enableScreenshotOption() {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.screenshot,
                true
            )
        }
    }

    @ReactMethod
    fun disableScreenshotOption() {
        HANDLER.post {
            ZohoSalesIQ.Chat.setVisibility(
                ChatComponent.screenshot,
                false
            )
        }
    }

    @ReactMethod
    fun registerChatAction(actionName: String?) {
        HANDLER.post { ZohoLiveChat.ChatActions.register(actionName) }
    }

    @ReactMethod
    fun unregisterChatAction(actionName: String?) {
        HANDLER.post { ZohoLiveChat.ChatActions.unregister(actionName) }
    }

    @ReactMethod
    fun unregisterAllChatActions() {
        HANDLER.post { ZohoLiveChat.ChatActions.unregisterAll() }
    }

    @ReactMethod
    fun setChatActionTimeout(timeout: Double) {
        HANDLER.post { ZohoLiveChat.ChatActions.setTimeout(timeout.toLong() * 1000) }
    }

    @ReactMethod
    fun completeChatAction(uuid: String) {
        HANDLER.post {
            val listener = actionsList[uuid]
            listener?.onSuccess()
            actionsList.remove(uuid)
        }
    }

    @ReactMethod
    fun completeChatActionWithMessage(
        uuid: String,
        success: Boolean,
        message: String?
    ) {
        HANDLER.post {
            val listener =
                actionsList[uuid]
            if (listener != null) {
                if (success) {
                    if (message != null) {
                        listener.onSuccess(message)
                    }
                }
            }
        }
    }

    @ReactMethod
    fun setVisitorLocation(visitorLocation: ReadableMap) {
        val siqVisitorLocation = SIQVisitorLocation()

        if (visitorLocation.hasKey("latitude")) {
            siqVisitorLocation.latitude = visitorLocation.getDouble("latitude") // No I18N
        }
        if (visitorLocation.hasKey("longitude")) {
            siqVisitorLocation.longitude = visitorLocation.getDouble("longitude") // No I18N
        }
        if (visitorLocation.hasKey("country")) {
            siqVisitorLocation.country = visitorLocation.getString("country") // No I18N
        }
        if (visitorLocation.hasKey("city")) {
            siqVisitorLocation.city = visitorLocation.getString("city") // No I18N
        }
        if (visitorLocation.hasKey("state")) {
            siqVisitorLocation.state = visitorLocation.getString("state") // No I18N
        }
        if (visitorLocation.hasKey("countryCode")) {
            siqVisitorLocation.countryCode = visitorLocation.getString("countryCode")
        }
        if (visitorLocation.hasKey("zipCode")) {
            siqVisitorLocation.zipCode = visitorLocation.getString("zipCode") // No I18N
        }
        ZohoSalesIQ.Visitor.setLocation(siqVisitorLocation)
    }

    @ReactMethod
    fun syncThemeWithOsForAndroid(sync: Boolean) {
        HANDLER.post { ZohoSalesIQ.syncThemeWithOS(sync) }
    }

    @ReactMethod
    fun isChatEnabled(callback: Callback) {
        HANDLER.post { callback.invoke(ZohoSalesIQ.isSDKEnabled()) }
    }

    @ReactMethod
    fun getChatUnreadCount(callback: Callback) {
        HANDLER.post { callback.invoke(ZohoLiveChat.Notification.getBadgeCount()) }
    }

    @ReactMethod
    fun setLauncherPropertiesForAndroid(launcherPropertiesMap: ReadableMap) {
        HANDLER.post {
            var mode = LauncherModes.FLOATING
            if (launcherPropertiesMap.hasKey("mode")) {
                mode = launcherPropertiesMap.getInt("mode")
            }
            val launcherProperties =
                LauncherProperties(mode)
            if (launcherPropertiesMap.hasKey("x")) {
                val x = launcherPropertiesMap.getInt("x")
                if (x > -1) {
                    launcherProperties.x = x
                }
            }
            if (launcherPropertiesMap.hasKey("y")) {
                val y = launcherPropertiesMap.getInt("y")
                if (y > -1) {
                    launcherProperties.setY(y)
                }
            }
            if (launcherPropertiesMap.hasKey("horizontalDirection")) {
                var horizontalDirection: Horizontal? = null
                if (LAUNCHER_HORIZONTAL_LEFT == launcherPropertiesMap.getString(
                        "horizontalDirection"
                    )
                ) {
                    horizontalDirection = Horizontal.LEFT
                } else if (LAUNCHER_HORIZONTAL_RIGHT == launcherPropertiesMap.getString(
                        "horizontalDirection"
                    )
                ) {
                    horizontalDirection = Horizontal.RIGHT
                }
                if (horizontalDirection != null) {
                    launcherProperties.setDirection(horizontalDirection)
                }
            }
            if (launcherPropertiesMap.hasKey("verticalDirection")) {
                var verticalDirection: Vertical? = null
                if (LAUNCHER_VERTICAL_TOP == launcherPropertiesMap.getString(
                        "verticalDirection"
                    )
                ) {
                    verticalDirection = Vertical.TOP
                } else if (LAUNCHER_VERTICAL_BOTTOM == launcherPropertiesMap.getString(
                        "verticalDirection"
                    )
                ) {
                    verticalDirection = Vertical.BOTTOM
                }
                if (verticalDirection != null) {
                    launcherProperties.setDirection(verticalDirection)
                }
            }
            if (launcherPropertiesMap.hasKey("icon") && launcherPropertiesMap.getString("icon") != null && ZohoSalesIQ.getApplicationManager() != null && ZohoSalesIQ.getApplicationManager()!!
                    .application != null
            ) {
                val resourceId =
                    getDrawableResourceId(launcherPropertiesMap.getString("icon"))
                val drawable =
                    AppCompatResources.getDrawable(
                        ZohoSalesIQ.getApplicationManager()!!.application,
                        resourceId
                    )
                if (resourceId > 0) {
                    launcherProperties.icon = drawable
                }
            }
            ZohoSalesIQ.setLauncherProperties(launcherProperties)
        }
    }

    @ReactMethod
    fun refreshLauncherPropertiesForAndroid() {
        HANDLER.post {
            val salesIQApplicationManager =
                ZohoSalesIQ.getApplicationManager()
            if (salesIQApplicationManager != null && SalesIQApplicationManager.getCurrentActivity() != null && isAllowedToShow(
                    SalesIQApplicationManager.getCurrentActivity()
                )
            ) {
                showChatBubble(SalesIQApplicationManager.getCurrentActivity())
            }
        }
    }

    @ReactMethod
    fun refreshLauncher() {
    }

    @ReactMethod
    fun addListener(eventName: String) {
        hasAnyEventListeners = true
        LiveChatUtil.log("Add listener, Event: $eventName added ")
        if (pendingEvents != null && pendingEvents!!.isNotEmpty()) {
            if (reactContext!!.hasCatalystInstance()) {
                for ((key, value) in pendingEvents!!) {
                    eventEmitter(key, value)
                }
                pendingEvents = null
            } else {
                LiveChatUtil.log("Add listener, pending events ignored " + (pendingEvents == null))
            }
        }
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun removeListeners(count: Int?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun processNotificationMessage(extras: ReadableMap) {
        HANDLER.post {
            ZohoLiveChat.Notification.handle(
                reactContext!!.applicationContext, extras.toHashMap()
            )
        }
    }

    @ReactMethod
    fun isSDKMessage(map: ReadableMap, callback: Callback) {
        callback.invoke(ZohoLiveChat.Notification.isZohoSalesIQNotification(map.toHashMap()))
    }

    @ReactMethod
    fun registerPush(fcmToken: String?, isTestDevice: Boolean) {
        enablePush(fcmToken, isTestDevice)
    }

    @ReactMethod
    fun getNotificationPayload(readableMap: ReadableMap, callback: Callback) {
        val map = getMap<String, String>(readableMap.toHashMap())
        if (map != null) {
            ZohoLiveChat.Notification.getPayload(map
            ) { result: SalesIQResult<SalesIQNotificationPayload?> ->
                if (result.isSuccess) {
                    val payload = result.data
                    callback.invoke(getNotificationPayloadMap(payload))
                } else {
                    callback.invoke(null as Any?)
                }
            }
        } else {
            callback.invoke(null as Any?)
        }
    }

    @ReactMethod
    fun setNotificationActionSource(actionSource: String) {
        ZohoLiveChat.Notification.setActionSource(getActionSource(actionSource))
    }

    private fun getActionSource(actionSourceString: String): ActionSource {
        val actionSource = if (ACTION_SOURCE_APP == actionSourceString) {
            ActionSource.APP
        } else {
            ActionSource.SDK
        }
        return actionSource
    }

    @ReactMethod
    fun present(tabString: String?, id: String?, callback: Callback?) {
        HANDLER.post {
            val tab = getTab(tabString)
            ZohoSalesIQ.present(
                tab, id
            ) { result: SalesIQResult<Unit> ->
                if (callback != null) {
                    if (result.isSuccess) {
                        callback.invoke(null, true)
                    } else {
                        val error = result.error
                        callback.invoke(
                            getErrorMap(
                                error!!.code,
                                error.message
                            ), false
                        )
                    }
                }
            }
        }
    }

    @ReactMethod
    fun setCustomFont(map: ReadableMap) {
        val regular = map.getMap("regular") // No I18N
        val medium = map.getMap("medium") // No I18N
        val regularPath = regular?.getString("path") // No I18N
        val mediumPath = medium?.getString("path") // No I18N
        if (regularPath != null || mediumPath != null) {
            customFont = Font()
            customFont!!.regular =
                if (regularPath != null) LiveChatUtil.getString(regularPath) else null
            customFont!!.medium =
                if (mediumPath != null) LiveChatUtil.getString(mediumPath) else null
        } else {
            customFont = null
        }
    }

    private fun isValidFilterName(filterName: String): Boolean {
        for (type in ConversationType.values()) {
            if (type.name == filterName) {
                return true
            }
        }
        return false
    }

    private fun getFilterName(filter: String): ConversationType {
        return when (filter) {
            TYPE_WAITING -> ConversationType.WAITING
            TYPE_OPEN -> ConversationType.OPEN
            TYPE_CLOSED -> ConversationType.CLOSED
            TYPE_MISSED -> ConversationType.MISSED
            TYPE_ENDED -> ConversationType.ENDED
            else -> ConversationType.CONNECTED
        }
    }

    fun getArticleMapObject(resource: Resource?): WritableMap {
        val articleMap: WritableMap = WritableNativeMap()
        if (resource != null) {
            articleMap.putString("id", resource.id) // No I18N
            articleMap.putString("name", resource.title) // No I18N
            if (resource.stats != null) {
                articleMap.putInt("likeCount", resource.stats!!.liked) // No I18N
                articleMap.putInt("dislikeCount", resource.stats!!.disliked) // No I18N
                articleMap.putInt("viewCount", resource.stats!!.viewed) // No I18N
            }
            if (resource.category != null) {
                if (resource.category!!.id != null) {
                    articleMap.putString("categoryID", resource.category!!.id) // No I18N
                }
                if (resource.category!!.name != null) {
                    articleMap.putString("categoryName", resource.category!!.name) // No I18N
                }
            }
        }
        return articleMap
    }

    fun getArticleMapObject(article: SalesIQArticle): WritableMap {
        val articleMap: WritableMap = WritableNativeMap()
        articleMap.putString("id", article.id) // No I18N
        articleMap.putString("name", article.title) // No I18N
        articleMap.putInt("likeCount", article.liked) // No I18N
        articleMap.putInt("dislikeCount", article.disliked) // No I18N
        articleMap.putInt("viewCount", article.viewed) // No I18N
        if (article.categoryId != null) {
            articleMap.putString("categoryID", article.categoryId) // No I18N
        }
        if (article.categoryName != null) {
            articleMap.putString("categoryName", article.categoryName) // No I18N
        }
        return articleMap
    }

    fun getDepartmentMapObject(department: SIQDepartment): WritableMap {
        val departmentMap: WritableMap = WritableNativeMap()
        departmentMap.putString("id", department.id) // No I18N
        departmentMap.putString("name", department.name) // No I18N
        departmentMap.putBoolean("available", department.available) // No I18N
        return departmentMap
    }

    class RNZohoSalesIQListener : SalesIQListener, SalesIQChatListener,
        SalesIQKnowledgeBaseListener,
        SalesIQActionListener, NotificationListener {
        override fun handleFeedback(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(EVENT_FEEDBACK_RECEIVED, visitorMap.copy())
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_FEEDBACK_RECEIVED, visitorMap)
            )
        }

        override fun handleQueuePositionChange(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(EVENT_CHAT_QUEUE_POSITION_CHANGED, visitorMap.copy())
            eventEmitter(
                CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_CHAT_QUEUE_POSITION_CHANGED, visitorMap
                )
            )
        }

        override fun handleRating(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_RATING_RECEIVED, visitorMap.copy())
            )
            // DEPRECATED
            eventEmitter(EVENT_RATING_RECEIVED, visitorMap)
        }

        override fun handleOperatorsOnline() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_OPERATORS_ONLINE, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_OPERATORS_ONLINE, null)
        }

        override fun handleOperatorsOffline() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_OPERATORS_OFFLINE, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_OPERATORS_OFFLINE, null)
        }

        override fun handleResourceOpened(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", getWritableMap(resource)) // No I18N
            eventEmitter(EVENT_RESOURCE_OPENED, resourceMap.copy())

            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_OPENED, resourceMap
                )
            )

            eventEmitter(
                EVENT_ARTICLE_OPENED,
                resource?.id
            )
        }

        override fun handleResourceClosed(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", getWritableMap(resource)) // No I18N
            eventEmitter(EVENT_RESOURCE_CLOSED, resourceMap.copy())

            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_CLOSED, resourceMap
                )
            )
            eventEmitter(
                EVENT_ARTICLE_CLOSED,
                resource?.id
            )
        }

        override fun handleResourceLiked(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", getWritableMap(resource)) // No I18N
            eventEmitter(EVENT_RESOURCE_LIKED, resourceMap.copy())

            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_LIKED, resourceMap
                )
            )

            eventEmitter(
                EVENT_ARTICLE_LIKED,
                resource?.id
            )
        }

        override fun handleResourceDisliked(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", getWritableMap(resource)) // No I18N
            eventEmitter(EVENT_RESOURCE_DISLIKED, resourceMap.copy())
            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_DISLIKED, resourceMap
                )
            )

            eventEmitter(
                EVENT_ARTICLE_DISLIKED,
                resource?.id
            )
        }

        override fun handleSupportOpen() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_SUPPORT_OPENED, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_SUPPORT_OPENED, null)
        }

        override fun handleSupportClose() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_SUPPORT_CLOSED, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_SUPPORT_CLOSED, null)
        }

        override fun handleChatViewOpen(id: String?) {
            val chatMap: WritableMap = WritableNativeMap()
            chatMap.putString("id", id) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHATVIEW_OPENED, chatMap)
            )
            // DEPRECATED
            eventEmitter(EVENT_CHATVIEW_OPENED, id)
        }

        override fun handleChatViewClose(id: String?) {
            val chatMap: WritableMap = WritableNativeMap()
            chatMap.putString("id", id) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHATVIEW_CLOSED, chatMap)
            )
            // DEPRECATED
            eventEmitter(EVENT_CHATVIEW_CLOSED, id)
        }

        override fun handleIPBlock() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_VISITOR_IPBLOCKED, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_VISITOR_IPBLOCKED, null)
        }

        override fun handleTrigger(triggerName: String?, visitor: SIQVisitor?) {
            val visitorInfoMap = visitor?.let { getVisitorInfoObject(it) }
            val triggerMap: WritableMap = WritableNativeMap()
            triggerMap.putString("triggerName", triggerName) // No I18N
            triggerMap.putMap("visitorInformation", visitorInfoMap) // No I18N

            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CUSTOMTRIGGER, triggerMap.copy())
            )

            // DEPRECATED
            eventEmitter(EVENT_CUSTOMTRIGGER, triggerMap)
        }

        override fun handleBotTrigger() {
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_BOT_TRIGGER, null))
            eventEmitter(EVENT_BOT_TRIGGER, null)
        }

        override fun handleCustomLauncherVisibility(visible: Boolean) {
            val launcherMap: WritableMap = WritableNativeMap()
            launcherMap.putBoolean("visible", visible) // No I18N
            eventEmitter(
                LAUNCHER_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY, launcherMap
                )
            )
            // DEPRECATED
            eventEmitter(EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY, visible)
        }

        override fun onVisitorRegistrationFailed(salesIQError: SalesIQError): SalesIQAuth? {
            val eventMap: WritableMap = WritableNativeMap()
            eventMap.putInt("code", salesIQError.code) // No I18N
            if (salesIQError.message != null) {
                eventMap.putString("message", salesIQError.message) // No I18N
            }
            eventEmitter(
                ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_VISITOR_REGISTRATION_FAILURE, eventMap
                )
            )
            return null
        }

        override fun handleChatOpened(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHAT_OPENED, visitorMap.copy())
            )
            // DEPRECATED
            eventEmitter(EVENT_CHAT_OPENED, visitorMap)
        }

        override fun handleChatClosed(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHAT_CLOSED, visitorMap.copy())
            )

            eventEmitter(EVENT_CHAT_CLOSED, visitorMap)
        }

        override fun handleChatAttended(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHAT_ATTENDED, visitorMap.copy())
            )

            eventEmitter(EVENT_CHAT_ATTENDED, visitorMap)
        }

        override fun handleChatMissed(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHAT_MISSED, visitorMap.copy())
            )

            eventEmitter(EVENT_CHAT_MISSED, visitorMap)
        }

        override fun handleChatReOpened(visitorChat: VisitorChat) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_CHAT_REOPENED, visitorMap.copy())
            )

            eventEmitter(EVENT_CHAT_REOPENED, visitorMap)
        }

        override fun handleCustomAction(
            salesIQCustomAction: SalesIQCustomAction,
            salesIQCustomActionListener: SalesIQCustomActionListener
        ) {
            val uuid = UUID.randomUUID()

            val actionDetailsMap: WritableMap = WritableNativeMap()
            actionDetailsMap.putString("uuid", uuid.toString()) // No I18N
            actionDetailsMap.putString("elementID", salesIQCustomAction.elementID) // No I18N
            actionDetailsMap.putString("label", salesIQCustomAction.label) // No I18N
            actionDetailsMap.putString("name", salesIQCustomAction.name) // No I18N
            actionDetailsMap.putString(
                "clientActionName",
                salesIQCustomAction.clientActionName
            ) // No I18N

            actionsList[uuid.toString()] = salesIQCustomActionListener
            // DEPRECATED
            eventEmitter(EVENT_PERFORM_CHATACTION, actionDetailsMap.copy())
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_PERFORM_CHATACTION, actionDetailsMap)
            )
        }

        override fun onBadgeChange(count: Int) {
            val countMap: WritableMap = WritableNativeMap()
            countMap.putInt("count", count) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(
                    EVENT_CHAT_UNREAD_COUNT_CHANGED, countMap
                )
            )

            eventEmitter(EVENT_CHAT_UNREAD_COUNT_CHANGED, count)
        }

        override fun onClick(context: Context?, payload: SalesIQNotificationPayload) {
            var context = context
            LiveChatUtil.log("NotificationListener onClick Received")
            val notificationPayloadMap = getNotificationPayloadMap(payload)
            if (notificationPayloadMap != null) {
                eventEmitter(EVENT_NOTIFICATION_CLICKED, notificationPayloadMap.copy())

                eventEmitter(
                    NOTIFICATION_EVENT_LISTENER, getEventEmitterObjectWithMap(
                        EVENT_NOTIFICATION_CLICKED, notificationPayloadMap
                    )
                )
            }
            if (SalesIQActivitiesManager.instance.isActivityStackEmpty(true)) {
                var intent: Intent? = null
                if (context != null) {
                    intent = context.packageManager.getLaunchIntentForPackage(context.packageName)
                } else if (reactContext != null && reactContext!!.applicationContext != null) {
                    context = reactContext!!.applicationContext
                    intent = context.packageManager.getLaunchIntentForPackage(context.packageName)
                    intent?.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                }
                if (intent != null) {
                    context!!.startActivity(intent)
                }
            }
        }

        override fun handleUri(uri: Uri, visitorChat: VisitorChat): Boolean {
            val visitorChatMap = getChatMapObject(visitorChat)
            val chatMap: WritableMap = WritableNativeMap()
            chatMap.putMap("chat", visitorChatMap.copy()) // No I18N
            chatMap.putString("url", uri.toString()) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER,
                getEventEmitterObjectWithMap(EVENT_HANDLE_URL, chatMap)
            )
            // DEPRECATED
            visitorChatMap.putString("url", uri.toString()) // No I18N
            eventEmitter(EVENT_HANDLE_URL, visitorChatMap)
            return shouldOpenUrl
        }
    }

    @ReactMethod
    fun sendEvent(event: String, objects: ReadableArray) {
        HANDLER.post {
            when (event) {
                EVENT_OPEN_URL -> if (!shouldOpenUrl && objects.size() == 1) {
                    LiveChatUtil.openUri(
                        reactContext,
                        Uri.parse(objects.getString(0))
                    )
                }

                EVENT_COMPLETE_CHAT_ACTION -> if (objects.size() > 0) {
                    val uuid = objects.getString(0)
                    val success = objects.size() <= 1 || objects.getBoolean(1)
                    val message =
                        if (objects.size() == 3) objects.getString(2) else null
                    if (uuid?.isNotEmpty() == true) {
                        val listener =
                            actionsList[uuid]
                        if (listener != null) {
                            if (!message.isNullOrEmpty()) {
                                if (success) {
                                    listener.onSuccess(message)
                                } else {
                                    listener.onFailure(message)
                                }
                            } else {
                                if (success) {
                                    listener.onSuccess()
                                } else {
                                    listener.onFailure()
                                }
                            }
                        }
                        if (actionsList != null) {
                            actionsList.remove(uuid)
                        }
                    }
                }

                EVENT_VISITOR_REGISTRATION_FAILURE -> if (objects.size() > 0) {
                    val auth: ReadableMap? = objects.getMap(0)
                    if (auth is ReadableNativeMap) {
                        handleVisitorRegistrationFailure(auth)
                    }
                }
            }
        }
    }

    @ReactMethod
    fun shouldOpenUrl(value: Boolean) {
        shouldOpenUrl = value
    }

    @ReactMethod
    fun setTabOrder(tabNames: ReadableArray) {
        /** @apiNote Please remove the -1 below when the [ZohoSalesIQ.Tab.FAQ] is removed
         */
        val minimumTabOrdersSize =
            min(tabNames.size().toDouble(), (ZohoSalesIQ.Tab.values().size - 1).toDouble()).toInt()
        val tabOrder = arrayOfNulls<ZohoSalesIQ.Tab>(minimumTabOrdersSize)
        var insertIndex = 0
        for (index in 0 until minimumTabOrdersSize) {
            val tabName = tabNames.getString(index)
            if (Tab.CONVERSATIONS.value == tabName) {
                tabOrder[insertIndex++] = ZohoSalesIQ.Tab.Conversations
            } else if (Tab.FAQ.value == tabName || Tab.KNOWLEDGE_BASE.value == tabName) {
                tabOrder[insertIndex++] = ZohoSalesIQ.Tab.KnowledgeBase
            }
        }
        ZohoSalesIQ.setTabOrder(*tabOrder)
    }

    @ReactMethod
    fun printDebugLogsForAndroid(value: Boolean) {
        ZohoSalesIQ.printDebugLogs(value)
    }

    @ReactMethod
    fun setNotificationIconForAndroid(drawableName: String?) {
        val resourceId = getDrawableResourceId(drawableName)
        if (resourceId > 0) {
            ZohoLiveChat.Notification.setIcon(resourceId)
        }
    }

    @ReactMethod
    fun setThemeForAndroid(name: String) {
        val resourceId = getStyleResourceId(name)
        if (resourceId > 0) {
            ZohoSalesIQ.setTheme(resourceId)
        }
    }


    private fun getStyleResourceId(id: String): Int {
        val salesIQApplicationManager = ZohoSalesIQ.getApplicationManager()
        var resourceId = 0
        if (salesIQApplicationManager != null && salesIQApplicationManager.application != null) {
            resourceId = salesIQApplicationManager.application.resources.getIdentifier(
                id, "style",  // No I18N
                ZohoSalesIQ.getApplicationManager()!!.application.packageName
            )
        }
        return resourceId
    }

    private fun getDrawableResourceId(drawableName: String?): Int {
        val salesIQApplicationManager = ZohoSalesIQ.getApplicationManager()
        var resourceId = 0
        if (salesIQApplicationManager != null && salesIQApplicationManager.application != null) {
            resourceId = salesIQApplicationManager.application.resources.getIdentifier(
                drawableName, "drawable",  // No I18N
                ZohoSalesIQ.getApplicationManager()!!.application.packageName
            )
        }
        return resourceId
    }

    @ReactMethod
    fun setLoggerEnabled(value: Boolean) {
        ZohoSalesIQ.Logger.setEnabled(value)
    }

    @ReactMethod
    fun isLoggerEnabled(callback: Callback) {
        HANDLER.post { callback.invoke(ZohoSalesIQ.Logger.isEnabled()) }
    }

    @ReactMethod
    fun clearLogsForiOS() {
    }

    @ReactMethod
    fun setLoggerPathForiOS(value: String?) {
    }

    @ReactMethod
    fun dismissUI() {
        ZohoSalesIQ.dismissUI()
    }

    @ReactMethod
    fun showFeedbackAfterSkip(enable: Boolean) {
        ZohoSalesIQ.Chat.showFeedbackAfterSkip(enable)
    }

    @ReactMethod
    fun showFeedbackUpToDuration(duration: Int) {
        ZohoSalesIQ.Chat.showFeedback(duration.toLong())
    }

    @ReactMethod
    fun startNewChat(
        question: String,
        customChatId: String?,
        departmentName: String?,
        callback: Callback?
    ) {
        val finalCallback = arrayOf(callback)
        ZohoSalesIQ.Chat.start(
            question, customChatId, departmentName
        ) { result: SalesIQResult<VisitorChat?> ->
            if (finalCallback[0] != null) {
                if (result.isSuccess) {
                    val visitorChat = result.data
                    val visitorMap = getChatMapObject(visitorChat!!)
                    finalCallback[0]!!.invoke(null, visitorMap)
                } else {
                    val error = result.error
                    finalCallback[0]!!
                        .invoke(
                            getErrorMap(error!!.code, error.message),
                            null
                        )
                }
            }
            finalCallback[0] = null
        }
    }

    @ReactMethod
    fun startNewChatWithTrigger(
        customChatId: String?,
        departmentName: String?,
        callback: Callback?
    ) {
        val finalCallback = arrayOf(callback)
        ZohoSalesIQ.Chat.startWithTrigger(
            customChatId, departmentName
        ) { result: SalesIQResult<VisitorChat?> ->
            if (finalCallback[0] != null) {
                if (result.isSuccess) {
                    val visitorChat = result.data
                    val visitorMap = getChatMapObject(visitorChat!!)
                    finalCallback[0]!!.invoke(null, visitorMap)
                } else {
                    val error = result.error
                    finalCallback[0]!!
                        .invoke(
                            getErrorMap(error!!.code, error.message),
                            null
                        )
                }
            }
            finalCallback[0] = null
        }
    }

    @ReactMethod
    fun getChat(chatId: String, callback: Callback?) {
        ZohoSalesIQ.Chat.get(
            chatId
        ) { result: SalesIQResult<VisitorChat?> ->
            if (callback != null) {
                if (result.isSuccess) {
                    val visitorChat = result.data
                    val visitorMap = getChatMapObject(visitorChat!!)
                    callback.invoke(null, visitorMap)
                } else {
                    val error = result.error
                    callback.invoke(
                        getErrorMap(
                            error!!.code,
                            error.message
                        ), null
                    )
                }
            }
        }
    }

    @ReactMethod
    fun setChatWaitingTime(seconds: Int) {
        ZohoSalesIQ.Chat.setWaitingTime(seconds.toLong())
    }

    init {
        Companion.reactContext = reactContext
    }

    private fun getResourceType(value: String): ZohoSalesIQ.ResourceType? {
        val resourceType = if (RESOURCE_ARTICLES == value) {
            ZohoSalesIQ.ResourceType.Articles
        } else {
            null
        }
        return resourceType
    }

    @ReactMethod
    fun isKnowledgeBaseEnabled(type: String, callback: Callback) {
        executeIfResourceTypeIsValid(type, callback) {
            callback.invoke(
                ZohoSalesIQ.KnowledgeBase.isEnabled(
                    getResourceType(type)!!
                )
            )
        }
    }

    @ReactMethod
    fun setKnowledgeBaseRecentlyViewedCount(limit: Int) {
        ZohoSalesIQ.KnowledgeBase.setRecentlyViewedCount(limit)
    }

    @ReactMethod
    fun setKnowledgeBaseVisibility(type: String, shouldShow: Boolean) {
        executeIfResourceTypeIsValid(
            type, null
        ) { ZohoSalesIQ.KnowledgeBase.setVisibility(getResourceType(type)!!, shouldShow) }
    }

    @ReactMethod
    fun categorizeKnowledgeBase(type: String, shouldCategorize: Boolean) {
        executeIfResourceTypeIsValid(
            type, null
        ) { ZohoSalesIQ.KnowledgeBase.categorize(getResourceType(type)!!, shouldCategorize) }
    }

    @ReactMethod
    fun combineKnowledgeBaseDepartments(type: String, merge: Boolean) {
        executeIfResourceTypeIsValid(
            type, null
        ) { ZohoSalesIQ.KnowledgeBase.combineDepartments(getResourceType(type)!!, merge) }
    }

    //void  setRecentShowLimit(String type) {
    //   ZohoSalesIQ.KnowledgeBase.setRecentShowLimit(value)
    // }
    @ReactMethod
    fun getKnowledgeBaseResourceDepartments(callback: Callback) {
        ZohoSalesIQ.KnowledgeBase.getResourceDepartments(object : ResourceDepartmentsListener {
            override fun onSuccess(resourceDepartments: List<ResourceDepartment>) {
                callback.invoke(null, getWritableArray(resourceDepartments))
            }

            override fun onFailure(code: Int, message: String) {
                callback.invoke(getErrorMap(code, message), null)
            }
        })
    }

    @ReactMethod
    fun openKnowledgeBase(type: String, id: String?, callback: Callback) {
        executeIfResourceTypeIsValid(
            type, callback
        ) {
            ZohoSalesIQ.KnowledgeBase.open(
                getResourceType(type)!!,
                id,
                object : OpenResourceListener {
                    override fun onSuccess() {
                        callback.invoke(null, java.lang.Boolean.TRUE)
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(getErrorMap(code, message), null)
                    }
                })
        }
    }

    @ReactMethod
    fun getKnowledgeBaseSingleResource(type: String, id: String?, callback: Callback) {
        executeIfResourceTypeIsValid(
            type, callback
        ) {
            ZohoSalesIQ.KnowledgeBase.getSingleResource(
                getResourceType(type)!!,
                id,
                object : ResourceListener {
                    override fun onSuccess(resource: Resource?) {
                        callback.invoke(null, getWritableMap(resource))
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(getErrorMap(code, message), null)
                    }
                })
        }
    }

    @ReactMethod
    fun getKnowledgeBaseResources(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        page: Int,
        limit: Int,
        searchKey: String?,
        callback: Callback
    ) {
        executeIfResourceTypeIsValid(
            type, callback
        ) {
            ZohoSalesIQ.KnowledgeBase.getResources(
                getResourceType(type)!!,
                departmentID,
                parentCategoryID,
                searchKey,
                page,
                limit,
                false,
                object : ResourcesListener {
                    override fun onSuccess(
                        articles: List<Resource>,
                        moreDataAvailable: Boolean
                    ) {
                        callback.invoke(
                            null,
                            getWritableArray(articles),
                            moreDataAvailable
                        )
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(getErrorMap(code, message), null)
                    }
                })
        }
    }

    @ReactMethod
    fun getKnowledgeBaseCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        callback: Callback
    ) {
        executeIfResourceTypeIsValid(
            type, callback
        ) {
            ZohoSalesIQ.KnowledgeBase.getCategories(
                getResourceType(type)!!,
                departmentID,
                parentCategoryID,
                object : ResourceCategoryListener {
                    override fun onSuccess(resourceCategories: List<ResourceCategory>) {
                        callback.invoke(
                            null,
                            getWritableArray(resourceCategories)
                        )
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(getErrorMap(code, message), null)
                    }
                })
        }
    }

    @ReactMethod
    fun setThemeColor(theme: ReadableMap?) {
    }

    @ReactMethod
    fun updateConfiguration(key: String, value: Boolean) {
        if (key == "NeutralRatingDisabled") {
            System.setProperty("binaryRating", value.toString())
        }
    }

    private fun executeIfResourceTypeIsValid(
        type: String,
        callback: Callback?,
        runnable: Runnable
    ) {
        val resourceType = getResourceType(type)
        if (resourceType != null) {
            runnable.run()
        } else {
            callback?.invoke(resourceTypeErrorMap)
        }
    }

    companion object {
        private var fcmToken: String? = null
        private var isTestDevice = true
        private var reactContext: ReactApplicationContext? = null

        private const val EVENT_SUPPORT_OPENED = "EVENT_SUPPORT_OPENED" // No I18N
        private const val EVENT_SUPPORT_CLOSED = "EVENT_SUPPORT_CLOSED" // No I18N
        private const val EVENT_CHATVIEW_OPENED = "EVENT_CHATVIEW_OPENED" // No I18N
        private const val EVENT_CHATVIEW_CLOSED = "EVENT_CHATVIEW_CLOSED" // No I18N
        private const val EVENT_CHAT_ATTENDED = "EVENT_CHAT_ATTENDED" // No I18N
        private const val EVENT_CHAT_MISSED = "EVENT_CHAT_MISSED" // No I18N
        private const val EVENT_CHAT_OPENED = "EVENT_CHAT_OPENED" // No I18N
        private const val EVENT_CHAT_CLOSED = "EVENT_CHAT_CLOSED" // No I18N
        private const val EVENT_CHAT_REOPENED = "EVENT_CHAT_REOPENED" // No I18N
        private const val EVENT_ARTICLE_LIKED = "EVENT_ARTICLE_LIKED" // No I18N
        private const val EVENT_ARTICLE_DISLIKED = "EVENT_ARTICLE_DISLIKED" // No I18N
        private const val EVENT_ARTICLE_OPENED = "EVENT_ARTICLE_OPENED" // No I18N
        private const val EVENT_ARTICLE_CLOSED = "EVENT_ARTICLE_CLOSED" // No I18N
        private const val EVENT_OPERATORS_ONLINE = "EVENT_OPERATORS_ONLINE" // No I18N
        private const val EVENT_OPERATORS_OFFLINE = "EVENT_OPERATORS_OFFLINE" // No I18N
        private const val EVENT_VISITOR_IPBLOCKED = "EVENT_VISITOR_IPBLOCKED" // No I18N
        private const val EVENT_FEEDBACK_RECEIVED = "EVENT_FEEDBACK_RECEIVED" // No I18N
        private const val EVENT_RATING_RECEIVED = "EVENT_RATING_RECEIVED" // No I18N
        private const val EVENT_PERFORM_CHATACTION = "EVENT_PERFORM_CHATACTION" // No I18N
        private const val EVENT_CUSTOMTRIGGER = "EVENT_CUSTOMTRIGGER" // No I18N
        private const val EVENT_BOT_TRIGGER = "EVENT_BOT_TRIGGER" // No I18N
        private const val EVENT_HANDLE_URL = "EVENT_HANDLE_URL" // No I18N
        private const val EVENT_OPEN_URL = "EVENT_OPEN_URL" // No I18N
        private const val EVENT_COMPLETE_CHAT_ACTION = "EVENT_COMPLETE_CHAT_ACTION" // No I18N
        private const val EVENT_CHAT_QUEUE_POSITION_CHANGED =
            "EVENT_CHAT_QUEUE_POSITION_CHANGED" // No I18N
        private const val EVENT_CHAT_UNREAD_COUNT_CHANGED =
            "EVENT_CHAT_UNREAD_COUNT_CHANGED" // No I18N

        private const val EVENT_NOTIFICATION_CLICKED = "EVENT_NOTIFICATION_CLICKED" // No I18N

        private const val TYPE_OPEN = "OPEN" // No I18N
        private const val TYPE_CONNECTED = "CONNECTED" // No I18N
        private const val TYPE_CLOSED = "CLOSED" // No I18N
        private const val TYPE_ENDED = "ENDED" // No I18N
        private const val TYPE_MISSED = "MISSED" // No I18N
        private const val TYPE_WAITING = "WAITING" // No I18N

        private const val INFO_LOG = "INFO_LOG" // No I18N
        private const val WARNING_LOG = "WARNING_LOG" // No I18N
        private const val ERROR_LOG = "ERROR_LOG" // No I18N

        private const val SENDING = "SENDING" // No I18N
        private const val UPLOADING = "UPLOADING" // No I18N
        private const val SENT = "SENT" // No I18N
        private const val FAILURE = "FAILURE" // No I18N

        private const val INVALID_FILTER_CODE = 604 // No I18N
        private const val INVALID_FILTER_TYPE = "Invalid filter type" // No I18N

        private const val LAUNCHER_MODE_STATIC = 1
        private const val LAUNCHER_MODE_FLOATING = 2

        private const val EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY =
            "EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY" // No I18N
        private const val EVENT_VISITOR_REGISTRATION_FAILURE =
            "EVENT_VISITOR_REGISTRATION_FAILURE" // No I18N

        private const val LAUNCHER_VISIBILITY_MODE_ALWAYS =
            "LAUNCHER_VISIBILITY_MODE_ALWAYS" // No I18N
        private const val LAUNCHER_VISIBILITY_MODE_NEVER =
            "LAUNCHER_VISIBILITY_MODE_NEVER" // No I18N
        private const val LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT =
            "LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT" // No I18N

        private const val LAUNCHER_HORIZONTAL_LEFT = "LAUNCHER_HORIZONTAL_LEFT" // No I18N
        private const val LAUNCHER_HORIZONTAL_RIGHT = "LAUNCHER_HORIZONTAL_RIGHT" // No I18N
        private const val LAUNCHER_VERTICAL_TOP = "LAUNCHER_VERTICAL_TOP" // No I18N
        private const val LAUNCHER_VERTICAL_BOTTOM = "LAUNCHER_VERTICAL_BOTTOM" // No I18N

        private var shouldOpenUrl = true

        private val actionsList = Hashtable<String, SalesIQCustomActionListener>()

        private val HANDLER = Handler(Looper.getMainLooper())

        private const val EVENT_RESOURCE_LIKED = "EVENT_RESOURCE_LIKED" // No I18N
        private const val EVENT_RESOURCE_DISLIKED = "EVENT_RESOURCE_DISLIKED" // No I18N
        private const val EVENT_RESOURCE_OPENED = "EVENT_RESOURCE_OPENED" // No I18N
        private const val EVENT_RESOURCE_CLOSED = "EVENT_RESOURCE_CLOSED" // No I18N

        private const val ACTION_SOURCE_APP = "APP" // No I18N
        private const val ACTION_SOURCE_SDK = "SDK" // No I18N

        // Common event names;
        private const val ZSIQ_EVENT_LISTENER = "ZSIQ_EVENT_LISTENER" // No I18N
        private const val CHAT_EVENT_LISTENER = "CHAT_EVENT_LISTENER" // No I18N
        private const val KNOWLEDGEBASE_EVENT_LISTENER = "KNOWLEDGEBASE_EVENT_LISTENER" // No I18N
        private const val NOTIFICATION_EVENT_LISTENER = "NOTIFICATION_EVENT_LISTENER" // No I18N
        private const val LAUNCHER_EVENT_LISTENER = "LAUNCHER_EVENT_LISTENER" // No I18N

        private var customFont: Font? = null

        var sharedInstance: RNZohoSalesIQ? = null

        fun setInstance(reactContext: ReactApplicationContext) {
            if (sharedInstance == null) {
                synchronized(RNZohoSalesIQ::class.java) { // Thread-safe initialization
                    if (sharedInstance == null) {
                        sharedInstance = RNZohoSalesIQ(reactContext)
                    }
                }
            }
        }

        private var isCallbacksRegistered = false

        fun registerCallbacks(application: Application?) {
            if (!isCallbacksRegistered && application != null) {
                register(application)
                val rnZohoSalesIQListener = RNZohoSalesIQListener()
                ZohoSalesIQ.setListener(rnZohoSalesIQListener)
                ZohoSalesIQ.Chat.setListener(rnZohoSalesIQListener)
                ZohoSalesIQ.KnowledgeBase.setListener(rnZohoSalesIQListener)
                ZohoLiveChat.ChatActions.setListener(rnZohoSalesIQListener)
                ZohoLiveChat.Notification.setListener(rnZohoSalesIQListener)
                isCallbacksRegistered = true
                LiveChatUtil.log("Callbacks registered")
            }
        }

        private fun getVisibilityMode(mode: String): VisibilityMode {
            var visibilityMode = VisibilityMode.NEVER
            if (LAUNCHER_VISIBILITY_MODE_ALWAYS == mode) {
                visibilityMode = VisibilityMode.ALWAYS
            } else if (LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT == mode) {
                visibilityMode = VisibilityMode.WHEN_ACTIVE_CHAT
            }
            return visibilityMode
        }

        private fun getChatComponent(componentName: String): ChatComponent? {
            var chatComponent: ChatComponent? = null
            when (componentName) {
                "OPERATOR_IMAGE" -> chatComponent = ChatComponent.operatorImage
                "RATING" -> chatComponent = ChatComponent.rating
                "FEEDBACK" -> chatComponent = ChatComponent.feedback
                "SCREENSHOT" -> chatComponent = ChatComponent.screenshot
                "PRE_CHAT_FORM" -> chatComponent = ChatComponent.prechatForm
                "VISITOR_NAME" -> chatComponent = ChatComponent.visitorName
                "EMAIL_TRANSCRIPT" -> chatComponent = ChatComponent.emailTranscript
                "FILE_SHARE" -> chatComponent = ChatComponent.fileShare
                "MEDIA_CAPTURE" -> chatComponent = ChatComponent.mediaCapture
                "END" -> chatComponent = ChatComponent.end
                "END_WHEN_IN_QUEUE" -> chatComponent = ChatComponent.endWhenInQueue
                "END_WHEN_BOT_CONNECTED" -> chatComponent = ChatComponent.endWhenBotConnected
                "END_WHEN_OPERATOR_CONNECTED" -> chatComponent =
                    ChatComponent.endWhenOperatorConnected

                "REOPEN" -> chatComponent = ChatComponent.reopen
                else -> {}
            }
            return chatComponent
        }

        private var hasAnyEventListeners = false

        fun handleNotification(application: Application?, extras: Map<*, *>?) {
            HANDLER.post {
                ZohoLiveChat.Notification.handle(application, extras)
            }
        }

        fun isSDKMessage(extras: Map<*, *>?): Boolean {
            return ZohoLiveChat.Notification.isZohoSalesIQNotification(extras)
        }

        private fun getNotificationPayloadMap(payload: SalesIQNotificationPayload?): WritableMap? {
            var resultMap: WritableMap? = WritableNativeMap()
            resultMap!!.putMap("payload", getWritableMap(payload)) // No I18N
            when (payload) {
                is SalesIQNotificationPayload.Chat -> {
                    resultMap.putString("type", "chat") // No I18N
                }

                is SalesIQNotificationPayload.VisitorHistory -> {
                    resultMap.putString("type", "visitorHistory") // No I18N
                }

                is SalesIQNotificationPayload.EndChatDetails -> {
                    resultMap.putString("type", "endChatDetails") // No I18N
                }

                else -> {
                    resultMap = null
                }
            }
            return resultMap
        }

        fun enablePush(token: String?, testDevice: Boolean) {
            fcmToken = token
            isTestDevice = testDevice
            ZohoLiveChat.Notification.enablePush(token, isTestDevice)
        }

        private fun initSalesIQ(
            application: Application?,
            activity: Activity?,
            appKey: String,
            accessKey: String,
            initCallback: Callback?
        ) {
            if (application != null) {
                val canInvokeCallBack = booleanArrayOf(true)
                ZohoSalesIQ.setPlatformName(SalesIQConstants.Platform.REACT_NATIVE)
                var initConfig: InitConfig? = null
                if (customFont != null) {
                    initConfig = InitConfig()
                    initConfig.setFont(Fonts.REGULAR, customFont!!.regular)
                    initConfig.setFont(Fonts.MEDIUM, customFont!!.medium)
                }
                ZohoSalesIQ.init(
                    application,
                    appKey,
                    accessKey,
                    initConfig,
                    object : OnInitCompleteListener {
                        override fun onInitComplete() {
                            if (fcmToken != null) {
                                ZohoLiveChat.Notification.enablePush(fcmToken, isTestDevice)
                            }
                            if (activity != null && ZohoSalesIQ.getApplicationManager() != null) {
                                refreshLauncher()
                            }
                            if (initCallback != null && canInvokeCallBack[0]) {
                                canInvokeCallBack[0] = false
                                initCallback.invoke(true)
                            }
                        }

                        override fun onInitError() {
                            if (initCallback != null && canInvokeCallBack[0]) {
                                canInvokeCallBack[0] = false
                                initCallback.invoke(false)
                            }
                        }
                    })
                if (activity != null && ZohoSalesIQ.getApplicationManager() != null) {
                    ZohoSalesIQ.getApplicationManager()!!.setCurrentActivity(activity)
                    ZohoSalesIQ.getApplicationManager()!!.appActivity = activity
                }
            }
        }

        private fun getTab(tab: String?): ZohoSalesIQ.Tab? {
            var tabType: ZohoSalesIQ.Tab? = null
            if (tab != null) {
                if (Tab.CONVERSATIONS.value == tab) {
                    tabType = ZohoSalesIQ.Tab.Conversations
                } else if (Tab.KNOWLEDGE_BASE.value == tab || Tab.FAQ.value == tab) {
                    tabType = ZohoSalesIQ.Tab.KnowledgeBase
                }
            }
            return tabType
        }

        fun eventEmitter(event: String, value: Any?) {
            if (reactContext != null && hasAnyEventListeners) {
                LiveChatUtil.log("eventEmitter, Send event: $event")
                reactContext!!.getJSModule(
                    DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
                )
                    .emit(event, value)
                LiveChatUtil.log("eventEmitter, Event: $event sent")
            } else {
                LiveChatUtil.log("eventEmitter, Added pending event: $event")
                if (pendingEvents == null) {
                    pendingEvents = HashMap()
                }
                pendingEvents!![event] = value
            }
        }

        private var pendingEvents: HashMap<String, Any?>? = null

        fun getChatMapObject(chat: VisitorChat): WritableMap {
            val visitorMap: WritableMap = WritableNativeMap()
            visitorMap.putString("id", chat.chatID) // No I18N
            visitorMap.putInt("unreadCount", chat.unreadCount) // No I18N
            visitorMap.putBoolean("isBotAttender", chat.isBotAttender) // No I18N
            if (chat.queuePosition > 0) {
                visitorMap.putInt("queuePosition", chat.queuePosition) // No I18N
            }
            if (chat.question != null) {
                visitorMap.putString("question", chat.question) // No I18N
            }
            if (chat.departmentName != null) {
                visitorMap.putString("departmentName", chat.departmentName) // No I18N
            }
            if (chat.chatStatus != null) {
                visitorMap.putString("status", chat.chatStatus) // No I18N
            }

            val lastMessage = chat.lastMessage
            if (lastMessage != null) {
                val lastMessageMap: WritableMap = WritableNativeMap()
                if (lastMessage.text != null) {
                    visitorMap.putString("lastMessage", lastMessage.text) // No I18N
                    lastMessageMap.putString("text", lastMessage.text) // No I18N
                }
                if (lastMessage.sender != null) {
                    visitorMap.putString("lastMessageSender", lastMessage.sender) // No I18N
                    lastMessageMap.putString("sender", lastMessage.sender) // No I18N
                }
                if (lastMessage.time != null && lastMessage.time > 0) {
                    visitorMap.putString(
                        "lastMessageTime",
                        LiveChatUtil.getString(lastMessage.time)
                    ) // No I18N
                    lastMessageMap.putString(
                        "time",
                        LiveChatUtil.getString(lastMessage.time)
                    ) // No I18N
                }
                // lastMessageMap.putString("sender_id", lastMessage.getSenderId());   // No I18N
                // lastMessageMap.putString("type", lastMessage.getType());    // No I18N
                lastMessageMap.putBoolean("is_read", lastMessage.isRead) // No I18N
                // lastMessageMap.putBoolean("sent_by_visitor", lastMessage.getSentByVisitor());   // No I18N
                // if (lastMessage.getStatus() != null) {
                //     String status = null;
                //     switch (lastMessage.getStatus()) {
                //         case Sending:
                //             status = SENDING;
                //             break;
                //         case Uploading:
                //             status = UPLOADING;
                //             break;
                //         case Sent:
                //             status = SENT;
                //             break;
                //         case Failure:
                //             status = FAILURE;
                //             break;
                //     }
                //     lastMessageMap.putString("status", status); // No I18N
                // }
                val salesIQFile = lastMessage.file
                val fileMap: WritableMap = WritableNativeMap()
                if (salesIQFile != null) {
                    fileMap.putString("name", salesIQFile.name) // No I18N
                    fileMap.putString("content_type", salesIQFile.contentType) // No I18N
                    fileMap.putString("comment", salesIQFile.comment) // No I18N
                    fileMap.putDouble("size", LiveChatUtil.getDouble(salesIQFile.size)) // No I18N
                    lastMessageMap.putMap("file", fileMap) // No I18N
                }
                visitorMap.putMap("recentMessage", lastMessageMap) // No I18N
            }

            if (chat.attenderName != null) {
                visitorMap.putString("attenderName", chat.attenderName) // No I18N
            }
            if (chat.attenderId != null) {
                visitorMap.putString("attenderID", chat.attenderId) // No I18N
            }
            if (chat.attenderEmail != null) {
                visitorMap.putString("attenderEmail", chat.attenderEmail) // No I18N
            }
            if (chat.feedbackMessage != null) {
                visitorMap.putString("feedback", chat.feedbackMessage) // No I18N
            }
            if (chat.rating != null) {
                visitorMap.putString("rating", chat.rating) // No I18N
            }

            return visitorMap
        }

        fun getVisitorInfoObject(siqVisitor: SIQVisitor): WritableMap {
            val infoMap: WritableMap = WritableNativeMap()
            if (siqVisitor.name != null) {
                infoMap.putString("name", siqVisitor.name) // No I18N
            }
            if (siqVisitor.email != null) {
                infoMap.putString("email", siqVisitor.email) // No I18N
            }
            if (siqVisitor.phone != null) {
                infoMap.putString("phone", siqVisitor.phone) // No I18N
            }
            infoMap.putString(
                "numberOfChats",
                LiveChatUtil.getString(siqVisitor.numberOfChats)
            ) // No I18N
            if (siqVisitor.city != null) {
                infoMap.putString("city", siqVisitor.city) // No I18N
            }
            if (siqVisitor.ip != null) {
                infoMap.putString("ip", siqVisitor.ip) // No I18N
            }
            if (siqVisitor.firstVisitTime != null) {
                val firstVisitTime = siqVisitor.firstVisitTime
                infoMap.putString(
                    "firstVisitTime",
                    LiveChatUtil.getString(firstVisitTime.time)
                ) // No I18N
            }
            if (siqVisitor.lastVisitTime != null) {
                val lastVisitTime = siqVisitor.lastVisitTime
                infoMap.putString(
                    "lastVisitTime",
                    LiveChatUtil.getString(lastVisitTime.time)
                ) // No I18N
            }
            if (siqVisitor.region != null) {
                infoMap.putString("region", siqVisitor.region) // No I18N
            }
            if (siqVisitor.os != null) {
                infoMap.putString("os", siqVisitor.os) // No I18N
            }
            if (siqVisitor.countryCode != null) {
                infoMap.putString("countryCode", siqVisitor.countryCode) // No I18N
            }
            if (siqVisitor.browser != null) {
                infoMap.putString("browser", siqVisitor.browser) // No I18N
            }
            if (siqVisitor.totalTimeSpent != null) {
                infoMap.putString("totalTimeSpent", siqVisitor.totalTimeSpent) // No I18N
            }
            infoMap.putString(
                "numberOfVisits",
                LiveChatUtil.getString(siqVisitor.numberOfVisits)
            ) // No I18N
            infoMap.putString(
                "noOfDaysVisited",
                LiveChatUtil.getString(siqVisitor.noOfDaysVisited)
            ) // No I18N
            if (siqVisitor.state != null) {
                infoMap.putString("state", siqVisitor.state) // No I18N
            }
            if (siqVisitor.searchEngine != null) {
                infoMap.putString("searchEngine", siqVisitor.searchEngine) // No I18N
            }
            if (siqVisitor.searchQuery != null) {
                infoMap.putString("searchQuery", siqVisitor.searchQuery) // No I18N
            }
            return infoMap
        }

        fun getEventEmitterObjectWithMap(eventName: String?, body: ReadableMap?): WritableMap? {
            try {
                val eventEmitterObject: WritableMap = WritableNativeMap()
                eventEmitterObject.putString("event", eventName) // No I18N
                eventEmitterObject.putMap("body", body) // No I18N
                return eventEmitterObject
            } catch (e: Exception) {
                return null
            }
        }

        fun getEventEmitterObjectWithBoolean(eventName: String?, body: Boolean): WritableMap {
            val eventEmitterObject: WritableMap = WritableNativeMap()
            eventEmitterObject.putString("event", eventName) // No I18N
            eventEmitterObject.putBoolean("body", body) // No I18N
            return eventEmitterObject
        }

        private fun handleVisitorRegistrationFailure(map: ReadableNativeMap) {
            if (map.hasKey("type")) {
                val type = map.getString("type")
                val userId = map.getString("userId")
                if ("registered_visitor" == type) {
                    if (userId != null && !TextUtils.isEmpty(userId)) {
                        LiveChatUtil.log("MobilistenEncryptedSharedPreferences- re-registering visitor") // No I18N
                        LiveChatUtil.registerVisitor(userId, object : RegisterListener {
                            override fun onSuccess() {
                                logDebugInfo(DebugInfoData.VisitorFailureReRegistrationAcknowledged(userId))
                                LiveChatUtil.log("MobilistenEncryptedSharedPreferences- re-registering visitor success") // No I18N
                                if (sharedPreferences.contains(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES) && sharedPreferences.getBoolean(
                                        MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES,
                                        true
                                    )
                                ) {
                                    if (DeviceConfig.getPreferences() != null) {
                                        DeviceConfig.getPreferences()!!
                                            .edit().putBoolean(
                                                CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged,
                                                true
                                            ).commit()
                                    }
                                } else {
                                    sharedPreferences.edit()
                                        .remove(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged)
                                        .commit()
                                }
                            }

                            override fun onFailure(code: Int, message: String) {
                            }
                        })
                    }
                } else if ("guest" == type) {
                    LiveChatUtil.log("MobilistenEncryptedSharedPreferences- Guest user acknowledged")
                    val jsonObject = JSONObject()
                    try {
                        jsonObject.put("avuid", LiveChatUtil.getAVUID())
                    } catch (e: Exception) {
                        LiveChatUtil.log(e)
                    }
                    logDebugInfo(DebugInfoData.VisitorFailureGuestAcknowledged(jsonObject.toString()))
                    if (sharedPreferences.contains(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES) && sharedPreferences.getBoolean(
                            MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES,
                            true
                        )
                    ) {
                        if (DeviceConfig.getPreferences() != null) {
                            DeviceConfig.getPreferences()!!.edit()
                                .putBoolean(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged, true)
                                .commit()
                        }
                    } else {
                        sharedPreferences.edit()
                            .remove(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged).commit()
                    }
                }
            }
        }

        const val RESOURCE_ARTICLES: String = "RESOURCE_ARTICLES" // No I18N

        fun getWritableArray(`object`: Any?): WritableArray {
            val finalWritableNativeArray = WritableNativeArray()
            if (`object` != null) {
                val mapType = object : TypeToken<List<Map<String?, Any?>?>?>() {}.type
                val mapList =
                    gson.fromJsonSafe<List<Map<String, Any>?>>(gson.toJson(`object`), mapType)
                val writableNativeArray = Arguments.makeNativeArray(mapList)
                val size = writableNativeArray.size()
                for (index in 0 until size) {
                    finalWritableNativeArray.pushMap(getWritableMap(writableNativeArray.getMap(index)))
                }
            }
            return finalWritableNativeArray
        }

        fun <K, V> getMap(readableMap: HashMap<*, *>?): Map<K, V>? {
            var map: Map<K, V>? = null
            try {
                val mapType = object : TypeToken<Map<K, V>?>() {}.type
                map = gson.fromJsonSafe<Map<K, V>>(gson.toJson(readableMap), mapType)
            } catch (ignored: Exception) {
            }
            return map
        }

        fun getWritableMap(`object`: Any?): WritableMap {
            val writableNativeMap = WritableNativeMap()
            if (`object` != null) {
                var map: Map<String?, Any?>? = null
                if (`object` !is ReadableMap) {
                    val mapType = object : TypeToken<Map<String?, Any?>?>() {}.type
                    map = gson.fromJsonSafe<Map<String?, Any?>>(gson.toJson(`object`), mapType)
                }
                val readableMap =
                    if (`object` is ReadableMap) `object` else Arguments.makeNativeMap(map)
                val it = (readableMap).entryIterator
                while (it.hasNext()) {
                    val entry = it.next()
                    val key = convertToCamelCase(entry.key)
                    val value = entry.value
                    if (value == null) {
                        writableNativeMap.putNull(key)
                    } else if (value is ReadableArray) {
                        writableNativeMap.putArray(key, value)
                    } else if (value is String) {
                        writableNativeMap.putString(key, value)
                    } else if (value is Number) {
                        if (value is Int) {
                            writableNativeMap.putInt(key, value)
                        } else {
                            writableNativeMap.putDouble(key, value.toDouble())
                        }
                    } else if (value is Boolean) {
                        writableNativeMap.putBoolean(key, value)
                    } else if (value is ReadableMap) {
                        writableNativeMap.putMap(key, getWritableMap(value))
                    }
                }
            }
            return writableNativeMap
        }

        private fun convertToCamelCase(input: String?): String {
            val camelCase = StringBuilder(30)
            var capitalizeNext = false

            if (input != null) {
                for (c in input.toCharArray()) {
                    if (c == '_') {
                        capitalizeNext = true
                    } else {
                        camelCase.append(if (capitalizeNext) c.uppercaseChar() else c)
                        capitalizeNext = false
                    }
                }
            }

            return camelCase.toString()
        }

        fun getErrorMap(code: Int, message: String?): WritableMap {
            val errorMap: WritableMap = WritableNativeMap()
            errorMap.putInt("code", code) // No I18N
            errorMap.putString("message", message) // No I18N
            return errorMap
        }

        val resourceTypeErrorMap: WritableMap
            get() {
                val errorMap: WritableMap = WritableNativeMap()
                errorMap.putInt("code", 100) // No I18N
                errorMap.putString("message", "Invalid resource type") // No I18N
                return errorMap
            }
    }
}
