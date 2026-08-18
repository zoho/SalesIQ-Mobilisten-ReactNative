package com.zohosalesiq.reactlibrary

import android.annotation.SuppressLint
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
import androidx.core.content.edit
import androidx.core.net.toUri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
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
import com.zoho.livechat.android.config.DeviceConfig
import com.zoho.livechat.android.constants.ConversationType
import com.zoho.livechat.android.constants.SalesIQConstants
import com.zoho.livechat.android.exception.InvalidEmailException
import com.zoho.livechat.android.listeners.ConversationListener
import com.zoho.livechat.android.listeners.DepartmentListener
import com.zoho.livechat.android.listeners.OperatorImageListener
import com.zoho.livechat.android.listeners.RegisterListener
import com.zoho.livechat.android.listeners.SalesIQActionListener
import com.zoho.livechat.android.listeners.SalesIQChatListener
import com.zoho.livechat.android.listeners.SalesIQCustomActionListener
import com.zoho.livechat.android.listeners.SalesIQListener
import com.zoho.livechat.android.listeners.UnRegisterListener
import com.zoho.livechat.android.modules.conversations.models.SalesIQConversation
import com.zoho.livechat.android.modules.conversations.providers.DataProviderCallback
import com.zoho.livechat.android.modules.conversations.providers.SalesIQConversationDataProvider
import com.zoho.livechat.android.modules.common.DataModule.sharedPreferences
import com.zoho.livechat.android.modules.common.data.local.MobilistenEncryptedSharedPreferences
import com.zoho.livechat.android.modules.common.domain.entities.DebugInfoData
import com.zoho.livechat.android.modules.common.ui.LauncherUtil
import com.zoho.livechat.android.modules.common.ui.LauncherUtil.isAllowedToShow
import com.zoho.livechat.android.modules.common.ui.LauncherUtil.refreshLauncher
import com.zoho.livechat.android.modules.common.ui.LauncherUtil.showChatBubble
import com.zoho.livechat.android.modules.common.ui.LoggerUtil
import com.zoho.livechat.android.modules.common.ui.annotations.ExperimentalSdkApi
import com.zoho.livechat.android.modules.common.ui.lifecycle.SalesIQActivitiesManager
import com.zoho.livechat.android.modules.common.ui.result.entities.SalesIQError
import com.zoho.livechat.android.modules.common.ui.result.entities.SalesIQResult
import com.zoho.livechat.android.modules.common.ui.result.callbacks.ZohoSalesIQResultCallback
import com.zoho.livechat.android.modules.commonpreferences.data.local.CommonPreferencesLocalDataSource
import com.zoho.livechat.android.modules.authentication.domain.entities.SalesIQAuth
import com.zoho.livechat.android.modules.deeplinking.models.SalesIQUriScheme
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
import com.zoho.livechat.android.modules.visitor.SalesIQVisitorInfo
import com.zoho.livechat.android.operation.SalesIQApplicationManager
import com.zoho.livechat.android.utils.LiveChatUtil
import com.zoho.salesiq.core.config.SalesIQConfig
import com.zoho.salesiq.core.models.SalesIQData
import com.zoho.salesiq.core.models.SalesIQTimeoutType
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.sendPromise
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toSalesIQConversationMap
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toMap
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toWritableArray
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toWritableMap
import com.zoho.salesiq.mobilisten.core.enums.ResultType
import com.zoho.livechat.android.modules.common.ui.entities.PresentOptions
import com.zoho.livechat.android.modules.visitor.models.SalesIQVisitorProfile
import com.zoho.salesiqembed.ZohoSalesIQ
import com.zoho.salesiqembed.ZohoSalesIQ.ActionSource
import com.zoho.salesiqembed.ZohoSalesIQ.Launcher.VisibilityMode
import com.zoho.salesiqembed.models.SalesIQConfiguration
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.util.Hashtable
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import kotlin.math.min

class RNZohoSalesIQ private constructor(reactContext: ReactApplicationContext) {
    private val currentActivity: Activity?
        get() = reactContext!!.currentActivity

    private val pendingSecretFieldsCallbacks =
        ConcurrentHashMap<String, DataProviderCallback<Map<String, String>>>()
    private val pendingDisplayFieldsCallbacks =
        ConcurrentHashMap<String, DataProviderCallback<Map<String, String>>>()

    @Volatile
    private var isSecretFieldsProviderEnabled = false

    @Volatile
    private var isDisplayFieldsProviderEnabled = false

    private val conversationDataProvider = object : SalesIQConversationDataProvider {
        override fun getSecretFields(
            conversation: SalesIQConversation,
            callback: DataProviderCallback<Map<String, String>>,
        ) {
            if (!isSecretFieldsProviderEnabled) {
                callback.onResult(null)
                return
            }

            val requestId = UUID.randomUUID().toString()
            pendingSecretFieldsCallbacks[requestId] = callback

            val eventMap = WritableNativeMap()
            eventMap.putString("requestId", requestId) // No I18N
            eventMap.putMap("chat", conversation.toSalesIQConversationMap()) // No I18N
            eventEmitter(CONVERSATION_SECRET_FIELDS_REQUEST, eventMap)
        }

        override fun getDisplayFields(
            conversation: SalesIQConversation,
            callback: DataProviderCallback<Map<String, String>>,
        ) {
            if (!isDisplayFieldsProviderEnabled) {
                callback.onResult(null)
                return
            }

            val requestId = UUID.randomUUID().toString()
            pendingDisplayFieldsCallbacks[requestId] = callback

            val eventMap = WritableNativeMap()
            eventMap.putString("requestId", requestId) // No I18N
            eventMap.putMap("chat", conversation.toSalesIQConversationMap()) // No I18N
            eventEmitter(CONVERSATION_DISPLAY_FIELDS_REQUEST, eventMap)
        }
    }

    internal class Font {
        var regular: String? = null
        var medium: String? = null
    }

    val constants: MutableMap<String, Any>
        get() {
            val constants: MutableMap<String, Any> = HashMap()
            constants["TYPE_CONNECTED"] = TYPE_CONNECTED // No I18N
            constants["TYPE_OPEN"] = TYPE_OPEN // No I18N
            constants["TYPE_WAITING"] = TYPE_WAITING // No I18N
            constants["TYPE_MISSED"] = TYPE_MISSED // No I18N
            constants["TYPE_ENDED"] = TYPE_ENDED // No I18N
            constants["TYPE_CLOSED"] = TYPE_CLOSED // No I18N

            constants["SUPPORT_OPENED"] = EVENT_SUPPORT_OPENED // No I18N
            constants["SUPPORT_CLOSED"] = EVENT_SUPPORT_CLOSED // No I18N
            constants["CHATVIEW_OPENED"] = EVENT_CHATVIEW_OPENED // No I18N
            constants["CHATVIEW_CLOSED"] = EVENT_CHATVIEW_CLOSED // No I18N
            constants["OPERATORS_ONLINE"] = EVENT_OPERATORS_ONLINE // No I18N
            constants["OPERATORS_OFFLINE"] = EVENT_OPERATORS_OFFLINE // No I18N
            constants["VISITOR_IPBLOCKED"] = EVENT_VISITOR_IPBLOCKED // No I18N

            constants["CHAT_ATTENDED"] = EVENT_CHAT_ATTENDED // No I18N
            constants["CHAT_MISSED"] = EVENT_CHAT_MISSED // No I18N
            constants["CHAT_OPENED"] = EVENT_CHAT_OPENED // No I18N
            constants["CHAT_CLOSED"] = EVENT_CHAT_CLOSED // No I18N
            constants["CHAT_REOPENED"] = EVENT_CHAT_REOPENED // No I18N
            constants["CHAT_EXPIRED"] = EVENT_CHAT_EXPIRED // No I18N
            constants["FEEDBACK_RECEIVED"] = EVENT_FEEDBACK_RECEIVED // No I18N
            constants["RATING_RECEIVED"] = EVENT_RATING_RECEIVED // No I18N
            constants["PERFORM_CHATACTION"] = EVENT_PERFORM_CHATACTION // No I18N
            constants["CUSTOMTRIGGER"] = EVENT_CUSTOMTRIGGER // No I18N
            constants["BOT_TRIGGER"] = EVENT_BOT_TRIGGER // No I18N
            constants["EVENT_HANDLE_URL"] = EVENT_HANDLE_URL // No I18N
            constants["RE_REGISTER_PUSH"] = RE_REGISTER_PUSH // No I18N
            constants["EVENT_OPEN_URL"] = EVENT_OPEN_URL // No I18N
            constants["EVENT_COMPLETE_CHAT_ACTION"] = EVENT_COMPLETE_CHAT_ACTION // No I18N
            constants["CHAT_QUEUE_POSITION_CHANGED"] = EVENT_CHAT_QUEUE_POSITION_CHANGED // No I18N
            constants["CHAT_UNREAD_COUNT_CHANGED"] = EVENT_CHAT_UNREAD_COUNT_CHANGED // No I18N

            constants["EVENT_RESOURCE_LIKED"] = EVENT_RESOURCE_LIKED // No I18N
            constants["EVENT_RESOURCE_DISLIKED"] = EVENT_RESOURCE_DISLIKED // No I18N
            constants["EVENT_RESOURCE_OPENED"] = EVENT_RESOURCE_OPENED // No I18N
            constants["EVENT_RESOURCE_CLOSED"] = EVENT_RESOURCE_CLOSED // No I18N

            constants["EVENT_NOTIFICATION_CLICKED"] = EVENT_NOTIFICATION_CLICKED // No I18N

            constants["ACTION_SOURCE_APP"] = ACTION_SOURCE_APP // No I18N
            constants["ACTION_SOURCE_SDK"] = ACTION_SOURCE_SDK // No I18N

            constants["LAUNCHER_MODE_STATIC"] = LAUNCHER_MODE_STATIC // No I18N
            constants["LAUNCHER_MODE_FLOATING"] = LAUNCHER_MODE_FLOATING // No I18N
            constants["EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY"] =
                EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY // No I18N
            constants["EVENT_VISITOR_REGISTRATION_FAILURE"] =
                EVENT_VISITOR_REGISTRATION_FAILURE // No I18N
            constants["LAUNCHER_VISIBILITY_MODE_ALWAYS"] =
                LAUNCHER_VISIBILITY_MODE_ALWAYS // No I18N
            constants["LAUNCHER_VISIBILITY_MODE_NEVER"] = LAUNCHER_VISIBILITY_MODE_NEVER // No I18N
            constants["LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT"] =
                LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT // No I18N
            constants["LAUNCHER_HORIZONTAL_RIGHT"] = LAUNCHER_HORIZONTAL_RIGHT // No I18N
            constants["LAUNCHER_HORIZONTAL_LEFT"] = LAUNCHER_HORIZONTAL_LEFT // No I18N
            constants["LAUNCHER_VERTICAL_TOP"] = LAUNCHER_VERTICAL_TOP // No I18N
            constants["LAUNCHER_VERTICAL_BOTTOM"] = LAUNCHER_VERTICAL_BOTTOM // No I18N

            constants["RESOURCE_ARTICLES"] = RESOURCE_ARTICLES // No I18N

            constants["CHAT_EVENT_LISTENER"] = CHAT_EVENT_LISTENER // No I18N
            constants["KNOWLEDGEBASE_EVENT_LISTENER"] = KNOWLEDGEBASE_EVENT_LISTENER // No I18N
            constants["NOTIFICATION_EVENT_LISTENER"] = NOTIFICATION_EVENT_LISTENER // No I18N
            constants["LAUNCHER_EVENT_LISTENER"] = LAUNCHER_EVENT_LISTENER // No I18N
            constants["ZSIQ_EVENT_LISTENER"] = ZSIQ_EVENT_LISTENER // No I18N

            return constants
        }

    @SuppressLint("UseKtx")
    internal fun convertToBitmap(drawable: Drawable): Bitmap {
        if (drawable is BitmapDrawable) {
            if (drawable.bitmap != null) {
                return drawable.bitmap
            }
        }

        val bitmap = if (drawable.intrinsicWidth <= 0 || drawable.intrinsicHeight <= 0) {
            Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888)
        } else {
            Bitmap.createBitmap(
                drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888
            )
        }

        val canvas = Canvas(bitmap)
        drawable.setBounds(0, 0, canvas.width, canvas.height)
        drawable.draw(canvas)
        return bitmap
    }

    @OptIn(ExperimentalSdkApi::class)
    @ReactMethod
    fun initialize(readableMap: ReadableMap, promise: Promise?) {
        val appKey = readableMap.getString("appKey")
        val accessKey = readableMap.getString("accessKey")
        val application = application
        val activity = currentActivity
        if (application == null) {
            promise?.reject("-1000", "Operation failed, Unknown error")
            return
        }
        if (appKey.isNullOrEmpty() || accessKey.isNullOrEmpty()) {
            promise?.reject("-1000", "App and access key must not be empty")
            return
        }
        val configurationBuilder = SalesIQConfiguration.Builder(appKey, accessKey)
        readableMap.getString("androidCallViewMode")?.let { viewMode ->
            when (viewMode) {
                "BANNER" -> {
                    SalesIQConfiguration.SalesIQCallViewMode.BANNER
                }

                "FLOATING" -> {
                    SalesIQConfiguration.SalesIQCallViewMode.FLOATING
                }

                else -> {
                    null
                }
            }
        }?.let { salesIQCallViewMode ->
            configurationBuilder.setCallViewMode(salesIQCallViewMode)
        }

        val canInvokeCallBack = booleanArrayOf(true)
        ZohoSalesIQ.setPlatformName(SalesIQConstants.Platform.REACT_NATIVE)

        // Visitor authentication (registered / guest / JWT) is intentionally not handled here —
        // it will be provided by a dedicated upcoming API rather than via SalesIQConfiguration.

        val fontsMap = readableMap.getMap("fonts")
        val regularFontPath =
            fontsMap?.getMap("regular")?.getString("path")?.takeIf { it.isNotEmpty() }
                ?: customFont?.regular
        val mediumFontPath =
            fontsMap?.getMap("medium")?.getString("path")?.takeIf { it.isNotEmpty() }
                ?: customFont?.medium
        regularFontPath?.let {
            configurationBuilder.setFont(Fonts.REGULAR, it)
        }
        mediumFontPath?.let {
            configurationBuilder.setFont(Fonts.MEDIUM, it)
        }

        val configuration = configurationBuilder.build()
        ZohoSalesIQ.initialize(application, configuration) { result ->
            if (result.isSuccess) {
                fcmToken?.let { ZohoSalesIQ.Notification.enablePush(it, isTestDevice) }

                if (activity != null) {
                    LauncherUtil.refreshLauncher()
                }
                if (canInvokeCallBack[0]) {
                    canInvokeCallBack[0] = false
                    promise?.resolve(null)
                }
            } else {
                if (canInvokeCallBack[0]) {
                    canInvokeCallBack[0] = false
                    promise?.reject(
                        result.error?.code?.toString() ?: "-1000", result.error?.message
                    )
                }
            }
        }
    }

    @ReactMethod
    fun fetchAttenderImage(
        attenderId: String,
        defaultImage: Boolean,
        imageCallback: Callback,
    ) {
        ZohoSalesIQ.Chat.fetchAttenderImage(
            attenderId, defaultImage, object : OperatorImageListener {
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
                        val visitorMap = getChatMapObject(chat)
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
    fun getChatsList(promise: Promise) {
        HANDLER.post {
            ZohoSalesIQ.Chat.getList(object : ConversationListener {
                override fun onSuccess(arrayList: ArrayList<VisitorChat>) {
                    val array: WritableArray = WritableNativeArray()
                    for (i in arrayList.indices) {
                        array.pushMap(getChatMapObject(arrayList[i]))
                    }
                    promise.resolve(array)
                }

                override fun onFailure(code: Int, message: String) {
                    promise.reject(code.toString(), message) // No I18N
                }
            })
        }
    }

    @ReactMethod
    fun getChatsWithFilter(
        filter: String,
        listCallback: Callback,
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
                                val visitorMap = getChatMapObject(chat)
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
                        "message", INVALID_FILTER_TYPE
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
    fun fetchDepartments(promise: Promise) {
        ZohoSalesIQ.Conversation.getDepartments { result ->
            result.sendPromise(promise, ResultType.ListMap)
        }
    }

    @ReactMethod
    fun isMultipleOpenChatRestricted(callback: Callback) {
        callback.invoke(ZohoSalesIQ.Chat.isMultipleOpenRestricted())
    }

    @ReactMethod
    fun init(appKey: String, accessKey: String) {
        val application = application
        if (application != null) {
            registerCallbacks(application)
            HANDLER.post {
                initSalesIQ(
                    application, currentActivity, appKey, accessKey, null
                )
            }
        }
    }

    @ReactMethod
    fun getCommunicationMode(promise: Promise) {
        val communicationMode = ZohoSalesIQ.getCommunicationMode()

        if (communicationMode != null) {
            promise.resolve(communicationMode.name)
        } else {
            promise.reject("-100", "No communication mode found")
        }
    }

    @ReactMethod
    fun initWithCallback(
        appKey: String,
        accessKey: String,
        initCallback: Callback?,
    ) {
        val application = application
        LiveChatUtil.log("initWithCallback, application: $application")
        if (application != null) {
            registerCallbacks(application)
            HANDLER.post {
                initSalesIQ(
                    application, currentActivity, appKey, accessKey, initCallback
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
    fun updateListener(@Suppress("unused") listener: String?) {
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
    fun setChatConversationTitle(onlineTitle: String?, offlineTitle: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.setTitle(onlineTitle.orEmpty(), offlineTitle.orEmpty()) }
    }

    @ReactMethod
    fun hideQueueTime(hide: Boolean) {
        HANDLER.post { ZohoSalesIQ.Chat.hideQueueTime(hide) }
    }

    @ReactMethod
    fun setLanguage(code: String) {
        HANDLER.post { ZohoSalesIQ.Chat.setLanguage(code) }
    }

    @ReactMethod
    fun setDepartment(department: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.setDepartment(department) }
    }

    @ReactMethod
    fun setDepartments(departments: List<String>?) {
        HANDLER.post { ZohoSalesIQ.Chat.setDepartments(departments.orEmpty()) }
    }

    @ReactMethod
    fun setOperatorEmail(email: String?) {
        HANDLER.post {
            try {
                email?.let { ZohoSalesIQ.Chat.setOperatorEmail(it) }
            } catch (e: InvalidEmailException) {
                LiveChatUtil.log(e)
            }
        }
    }

    @ReactMethod
    fun showOperatorImageInLauncher(show: Boolean) {
        HANDLER.post {
            ZohoSalesIQ.Chat.showOperatorImageInLauncher(show)
        }
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
            ZohoSalesIQ.present(
                PresentOptions(
                    screen = PresentOptions.Screen.Conversation(
                        chatId, PresentOptions.Screen.Conversation.SessionType.CHAT
                    )
                )
            )
        }
    }

    @ReactMethod
    fun showOfflineMessage(show: Boolean) {
        HANDLER.post { ZohoSalesIQ.Chat.showOfflineMessage(show) }
    }

    @ReactMethod
    fun end(chatId: String?, promise: Promise) {
        HANDLER.post {
            chatId?.let { ZohoSalesIQ.Chat.endChat(it) }
            promise.resolve(null)
        }
    }

    @ReactMethod
    fun setVisitorName(name: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setName(name.orEmpty()) }
    }

    @ReactMethod
    fun setVisitorEmail(email: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setEmail(email.orEmpty()) }
    }

    @ReactMethod
    fun setVisitorContactNumber(number: String?) {
        HANDLER.post { ZohoSalesIQ.Visitor.setContactNumber(number.orEmpty()) }
    }

    @ReactMethod
    fun setVisitorAddInfo(key: String?, value: String?) {
        // An empty key is never a valid custom-info entry; skip rather than storing a "" key.
        if (key.isNullOrBlank()) return
        HANDLER.post { ZohoSalesIQ.Visitor.addInfo(key, value.orEmpty()) }
    }

    @ReactMethod
    fun setQuestion(question: String?) {
        HANDLER.post { ZohoSalesIQ.Chat.setQuestion(question.orEmpty()) }
    }

    @ReactMethod
    fun setConversationListTitle(title: String?) {
        HANDLER.post { ZohoSalesIQ.Conversation.setTitle(title.orEmpty()) }
    }

    @ReactMethod
    fun setConversationVisibility(visible: Boolean) {
        HANDLER.post { ZohoSalesIQ.Conversation.setVisibility(visible) }
    }

    @ReactMethod
    fun registerVisitor(uniqueid: String, callback: Callback?) {
        HANDLER.post {
            ZohoSalesIQ.registerVisitor(uniqueid, object : RegisterListener {
                override fun onSuccess() {
                    if (callback != null) {
                        callback.invoke(null, java.lang.Boolean.TRUE)
                    }
                }

                override fun onFailure(code: Int, message: String) {
                    if (callback != null) {
                        callback.invoke(
                            RNZohoSalesIQCore.getErrorMap(code, message), java.lang.Boolean.FALSE
                        )
                    }
                }
            })
        }
    }

    @ReactMethod
    fun unregisterVisitor(callback: Callback?) {
        HANDLER.post {
            val context = reactContext?.currentActivity ?: reactContext ?: return@post
            ZohoSalesIQ.unregisterVisitor(context, object : UnRegisterListener {
                override fun onSuccess() {
                    if (callback != null) {
                        callback.invoke(null, true)
                    }
                }

                override fun onFailure(code: Int, message: String) {
                    if (callback != null) {
                        callback.invoke(
                            RNZohoSalesIQCore.getErrorMap(code, message), java.lang.Boolean.FALSE
                        )
                    }
                }
            })
        }
    }

    @ReactMethod
    fun setPageTitle(title: String?) {
        HANDLER.post { ZohoSalesIQ.Tracking.setPageTitle(title.orEmpty()) }
    }

    @ReactMethod
    fun enableInAppNotification(enabled: Boolean) {
        HANDLER.post {
            if (enabled) {
                ZohoSalesIQ.Notification.enableInApp()
            } else {
                ZohoSalesIQ.Notification.disableInApp()
            }
        }
    }

    @ReactMethod
    fun setThemeColorforiOS(@Suppress("unused") colorCode: String?) {
    }

    @ReactMethod
    fun setAttributes(attributesMap: ReadableMap, promise: Promise) {
        ZohoSalesIQ.Conversation.setAttributes {
            RNZohoSalesIQCore.getConversationAttributes(attributesMap)?.toBuilder() ?: it
        }
        promise.resolve(true)
    }

    @ReactMethod
    fun setChatComponentVisibility(chatComponentName: String, visibility: Boolean) {
        HANDLER.post {
            val chatComponent = getChatComponent(chatComponentName)
            if (chatComponent != null) {
                ZohoSalesIQ.Chat.setVisibility(chatComponent, visibility)
            }
        }
    }

    @ReactMethod
    fun registerChatAction(actionName: String?) {
        HANDLER.post { actionName?.let { ZohoSalesIQ.ChatActions.register(it) } }
    }

    @ReactMethod
    fun unregisterChatAction(actionName: String?) {
        HANDLER.post { actionName?.let { ZohoSalesIQ.ChatActions.unregister(it) } }
    }

    @ReactMethod
    fun unregisterAllChatActions() {
        HANDLER.post { ZohoSalesIQ.ChatActions.unregisterAll() }
    }

    @ReactMethod
    fun setChatActionTimeout(timeout: Double) {
        HANDLER.post { ZohoSalesIQ.ChatActions.setTimeout(timeout.toLong() * 1000) }
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

    // These APIs are not needed for now, will handle if it is needed in future.
    // @ReactMethod
    // fun isLiveChatAvailable(callback: Callback) {
    //     HANDLER.post { callback.invoke(ZohoSalesIQ.isLiveChatAvailable()) }
    // }

    // @ReactMethod
    // fun isBrandOnline(callback: Callback) {
    //     HANDLER.post { callback.invoke(ZohoSalesIQ.isBrandOnline()) }
    // }

    // @ReactMethod
    // fun getChatDepartments(callback: Callback) {
    //     HANDLER.post {
    //         val departments = ZohoSalesIQ.Chat.getDepts()
    //         val writableArray = Arguments.createArray()
    //         for (dept in departments) {
    //             writableArray.pushString(dept)
    //         }
    //         callback.invoke(writableArray)
    //     }
    // }

    @ReactMethod
    fun setThemeSource(source: String) {
        HANDLER.post {
            val themeSource = when (source) {
                "portal" -> ZohoSalesIQ.ThemeSource.SalesIQPortalConfiguration
                "sdk" -> ZohoSalesIQ.ThemeSource.SdkConfiguration
                else -> return@post
            }
            ZohoSalesIQ.setThemeSource(themeSource)
        }
    }

    @ReactMethod
    fun setUriScheme(schemeMap: ReadableMap) {
        HANDLER.post {
            val scheme = schemeMap.getString("scheme")
            if (scheme.isNullOrEmpty()) {
                LiveChatUtil.log("MobilistenPlugin - setUriScheme called without a scheme")
                return@post
            }
            val uriScheme = SalesIQUriScheme(scheme)
            schemeMap.getArray("hosts")?.toArrayList()?.filterIsInstance<String>()
                ?.takeIf { it.isNotEmpty() }?.let { hosts ->
                    uriScheme.addHosts(*hosts.toTypedArray())
                }
            schemeMap.getArray("paths")?.let { paths ->
                for (index in 0 until paths.size()) {
                    val pathMap = paths.getMap(index) ?: continue
                    val value = pathMap.getString("value") ?: continue
                    val pathMatcher = when (pathMap.getString("type")) {
                        "exact" -> SalesIQUriScheme.PathMatcher.Exact(value)
                        "prefix" -> SalesIQUriScheme.PathMatcher.Prefix(value)
                        "suffix" -> SalesIQUriScheme.PathMatcher.Suffix(value)
                        "pattern" -> SalesIQUriScheme.PathMatcher.Pattern(value)
                        else -> null
                    }
                    pathMatcher?.let { uriScheme.addPaths(it) }
                }
            }
            ZohoSalesIQ.setUriScheme(uriScheme)
        }
    }

    @ReactMethod
    fun visitorPerformCustomAction(actionName: String, promise: Promise) {
        HANDLER.post {
            ZohoSalesIQ.Visitor.performCustomAction(actionName)
            promise.resolve(null)
        }
    }

    @ReactMethod
    fun setSessionId(id: String) {
        HANDLER.post { ZohoSalesIQ.setSessionID(id) }
    }

    @ReactMethod
    fun getChatUnreadCount(callback: Callback) {
        HANDLER.post { callback.invoke(ZohoSalesIQ.Notification.getBadgeCount()) }
    }

    @Suppress("DEPRECATION")
    @ReactMethod
    fun setLauncherPropertiesForAndroid(launcherPropertiesMap: ReadableMap) {
        HANDLER.post {
            var mode = LauncherModes.FLOATING
            if (launcherPropertiesMap.hasKey("mode")) {
                mode = launcherPropertiesMap.getInt("mode")
            }
            val launcherProperties = LauncherProperties(mode)
            if (launcherPropertiesMap.hasKey("x")) {
                val x = launcherPropertiesMap.getInt("x")
                if (x > -1) {
                    launcherProperties.x = x
                }
            }

            if (launcherPropertiesMap.hasKey("yFromBottom")) {
                val y = launcherPropertiesMap.getInt("yFromBottom")
                if (y > -1) {
                    launcherProperties.setYFromBottom(y)
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

            if (launcherPropertiesMap.hasKey("icon") && launcherPropertiesMap.getString("icon") != null && this@RNZohoSalesIQ.application != null) {
                val resourceId = getDrawableResourceId(launcherPropertiesMap.getString("icon"))
                if (resourceId > 0) {
                    val drawable = AppCompatResources.getDrawable(
                        this@RNZohoSalesIQ.application!!, resourceId
                    )
                    launcherProperties.chatIcon = drawable
                }
            }
            val application = this@RNZohoSalesIQ.application
            if (application != null) {
                val chatIconName =
                    if (launcherPropertiesMap.hasKey("chatIcon")) launcherPropertiesMap.getString("chatIcon") else null
                val callIconName =
                    if (launcherPropertiesMap.hasKey("callIcon")) launcherPropertiesMap.getString("callIcon") else null
                val createIconName =
                    if (launcherPropertiesMap.hasKey("createIcon")) launcherPropertiesMap.getString(
                        "createIcon"
                    ) else null
                val closeIconName =
                    if (launcherPropertiesMap.hasKey("closeIcon")) launcherPropertiesMap.getString("closeIcon") else null

                val chatDrawable = chatIconName?.let {
                    val id = getDrawableResourceId(it); if (id > 0) AppCompatResources.getDrawable(
                    application, id
                ) else null
                }
                val callDrawable = callIconName?.let {
                    val id = getDrawableResourceId(it); if (id > 0) AppCompatResources.getDrawable(
                    application, id
                ) else null
                }
                val createDrawable = createIconName?.let {
                    val id = getDrawableResourceId(it); if (id > 0) AppCompatResources.getDrawable(
                    application, id
                ) else null
                }
                val closeDrawable = closeIconName?.let {
                    val id = getDrawableResourceId(it); if (id > 0) AppCompatResources.getDrawable(
                    application, id
                ) else null
                }

                if (chatDrawable != null || callDrawable != null || createDrawable != null || closeDrawable != null) {
                    launcherProperties.setIcons(
                        chat = chatDrawable ?: launcherProperties.chatIcon,
                        call = callDrawable ?: launcherProperties.callIcon,
                        create = createDrawable ?: launcherProperties.createIcon,
                        close = closeDrawable ?: launcherProperties.closeIcon
                    )
                }
            }
            ZohoSalesIQ.setLauncherProperties(launcherProperties)
        }
    }

    @ReactMethod
    fun refreshLauncherPropertiesForAndroid() {
        HANDLER.post {
            if (SalesIQApplicationManager.getCurrentActivity() != null && isAllowedToShow(
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
    fun removeListeners(@Suppress("unused") count: Int?) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun processNotificationMessage(extras: ReadableMap) {
        HANDLER.post {
            ZohoSalesIQ.Notification.handle(
                reactContext!!.applicationContext, extras.toHashMap()
            )
        }
    }

    @ReactMethod
    fun isSDKMessage(map: ReadableMap, callback: Callback) {
        callback.invoke(ZohoSalesIQ.Notification.isZohoSalesIQNotification(map.toHashMap()))
    }

    @ReactMethod
    fun registerPush(fcmToken: String?, isTestDevice: Boolean) {
        enablePush(fcmToken, isTestDevice)
    }

    @Suppress("UNCHECKED_CAST")
    @ReactMethod
    fun getNotificationPayload(readableMap: ReadableMap, callback: Callback) {
        val map: Map<String, String> = readableMap.toMap()
            .orEmpty().entries.mapNotNull { (key, value) -> (value as? String)?.let { key to it } }
            .toMap()
        ZohoSalesIQ.Notification.getPayload(map) { result ->
            if (result.isSuccess) {
                val payload = result.data
                callback.invoke(getNotificationPayloadMap(payload))
            } else {
                callback.invoke(null as Any?)
            }
        }
    }

    @ReactMethod
    fun setNotificationActionSource(actionSource: String) {
        ZohoSalesIQ.Notification.setActionSource(getActionSource(actionSource))
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

    @Suppress("EnumValuesSoftDeprecate")
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

    fun getDepartmentMapObject(department: SIQDepartment): WritableMap {
        val departmentMap: WritableMap = WritableNativeMap()
        departmentMap.putString("id", department.id) // No I18N
        departmentMap.putString("name", department.name) // No I18N
        department.available?.let { departmentMap.putBoolean("available", it) } // No I18N
        return departmentMap
    }

    class RNZohoSalesIQListener : SalesIQListener, SalesIQChatListener,
        SalesIQKnowledgeBaseListener, SalesIQActionListener, NotificationListener {
        override fun handleFeedback(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(EVENT_FEEDBACK_RECEIVED, visitorMap.copy())
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_FEEDBACK_RECEIVED, visitorMap)
            )
        }

        override fun handleQueuePositionChange(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(EVENT_CHAT_QUEUE_POSITION_CHANGED, visitorMap.copy())
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_CHAT_QUEUE_POSITION_CHANGED, visitorMap
                )
            )
        }

        override fun handleRating(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_RATING_RECEIVED, visitorMap.copy()
                )
            )
            // DEPRECATED
            eventEmitter(EVENT_RATING_RECEIVED, visitorMap)
        }

        override fun handleOperatorsOnline() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_OPERATORS_ONLINE, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_OPERATORS_ONLINE, null)
        }

        override fun handleOperatorsOffline() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_OPERATORS_OFFLINE, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_OPERATORS_OFFLINE, null)
        }

        override fun handleResourceOpened(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?,
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", resource.toWritableMap()) // No I18N
            eventEmitter(EVENT_RESOURCE_OPENED, resourceMap.copy())

            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_OPENED, resourceMap
                )
            )
        }

        override fun handleResourceClosed(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?,
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", resource.toWritableMap()) // No I18N
            eventEmitter(EVENT_RESOURCE_CLOSED, resourceMap.copy())

            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_CLOSED, resourceMap
                )
            )
        }

        override fun handleResourceLiked(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?,
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", resource.toWritableMap()) // No I18N
            eventEmitter(EVENT_RESOURCE_LIKED, resourceMap.copy())

            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_LIKED, resourceMap
                )
            )
        }

        override fun handleResourceDisliked(
            type: ZohoSalesIQ.ResourceType,
            resource: Resource?,
        ) {
            val resourceMap: WritableMap = WritableNativeMap()
            resourceMap.putString("type", RESOURCE_ARTICLES) // No I18N
            resourceMap.putMap("resource", resource.toWritableMap()) // No I18N
            eventEmitter(EVENT_RESOURCE_DISLIKED, resourceMap.copy())
            eventEmitter(
                KNOWLEDGEBASE_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_RESOURCE_DISLIKED, resourceMap
                )
            )
        }

        override fun handleSupportOpen() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_SUPPORT_OPENED, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_SUPPORT_OPENED, null)
        }

        override fun handleSupportClose() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_SUPPORT_CLOSED, null)
            )
            // DEPRECATED
            eventEmitter(EVENT_SUPPORT_CLOSED, null)
        }

        override fun handleChatViewOpen(id: String?) {
            val chatMap: WritableMap = WritableNativeMap()
            chatMap.putString("id", id) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_CHATVIEW_OPENED, chatMap)
            )
            // DEPRECATED
            eventEmitter(EVENT_CHATVIEW_OPENED, id)
        }

        override fun handleChatViewClose(id: String?) {
            val chatMap: WritableMap = WritableNativeMap()
            chatMap.putString("id", id) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_CHATVIEW_CLOSED, chatMap)
            )
            // DEPRECATED
            eventEmitter(EVENT_CHATVIEW_CLOSED, id)
        }

        override fun handleIPBlock() {
            eventEmitter(
                ZSIQ_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_VISITOR_IPBLOCKED, null)
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
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_CUSTOMTRIGGER, triggerMap.copy()
                )
            )

            // DEPRECATED
            eventEmitter(EVENT_CUSTOMTRIGGER, triggerMap)
        }

        override fun handleBotTrigger() {
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_BOT_TRIGGER, null)
            )
            eventEmitter(EVENT_BOT_TRIGGER, null)
        }

        override fun handleCustomLauncherVisibility(visible: Boolean) {
            val launcherMap: WritableMap = WritableNativeMap()
            launcherMap.putBoolean("visible", visible) // No I18N
            eventEmitter(
                LAUNCHER_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
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
                ZSIQ_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_VISITOR_REGISTRATION_FAILURE, eventMap
                )
            )
            return null
        }

        override fun handleChatOpened(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_CHAT_OPENED, visitorMap.copy())
            )
            // DEPRECATED
            eventEmitter(EVENT_CHAT_OPENED, visitorMap)
        }

        override fun handleChatClosed(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_CHAT_CLOSED, visitorMap.copy())
            )

            eventEmitter(EVENT_CHAT_CLOSED, visitorMap)
        }

        override fun handleChatAttended(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_CHAT_ATTENDED, visitorMap.copy()
                )
            )

            eventEmitter(EVENT_CHAT_ATTENDED, visitorMap)
        }

        override fun handleChatMissed(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_CHAT_MISSED, visitorMap.copy())
            )

            eventEmitter(EVENT_CHAT_MISSED, visitorMap)
        }

        override fun handleChatReOpened(visitorChat: VisitorChat?) {
            val visitorMap = getChatMapObject(visitorChat)
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_CHAT_REOPENED, visitorMap.copy()
                )
            )

            eventEmitter(EVENT_CHAT_REOPENED, visitorMap)
        }

        override fun onChatExpired(chat: VisitorChat?) {
            val visitorMap = chat?.let { getChatMapObject(it) }
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_CHAT_EXPIRED, visitorMap?.copy()
                )
            )

            eventEmitter(EVENT_CHAT_EXPIRED, visitorMap)
        }

        override fun handleCustomAction(
            salesIQCustomAction: SalesIQCustomAction,
            salesIQCustomActionListener: SalesIQCustomActionListener,
        ) {
            val uuid = UUID.randomUUID()

            val actionDetailsMap: WritableMap = WritableNativeMap()
            actionDetailsMap.putString("uuid", uuid.toString()) // No I18N
            actionDetailsMap.putString("elementID", salesIQCustomAction.elementID) // No I18N
            actionDetailsMap.putString("label", salesIQCustomAction.label) // No I18N
            actionDetailsMap.putString("name", salesIQCustomAction.name) // No I18N
            actionDetailsMap.putString(
                "clientActionName", salesIQCustomAction.clientActionName
            ) // No I18N

            actionsList[uuid.toString()] = salesIQCustomActionListener
            // DEPRECATED
            eventEmitter(EVENT_PERFORM_CHATACTION, actionDetailsMap.copy())
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_PERFORM_CHATACTION, actionDetailsMap
                )
            )
        }

        override fun onBadgeChange(count: Int) {
            val countMap: WritableMap = WritableNativeMap()
            countMap.putInt("count", count) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
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
                    NOTIFICATION_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
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

        override fun handleUri(uri: Uri?, visitorChat: VisitorChat?): Boolean {
            val visitorChatMap = getChatMapObject(visitorChat)
            val chatMap: WritableMap = WritableNativeMap()
            chatMap.putMap("chat", visitorChatMap.copy()) // No I18N
            chatMap.putString("url", uri.toString()) // No I18N
            eventEmitter(
                CHAT_EVENT_LISTENER,
                RNZohoSalesIQCore.getEventEmitterObjectWithMap(EVENT_HANDLE_URL, chatMap)
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
                        reactContext, objects.getString(0)?.toUri()
                    )
                }

                EVENT_COMPLETE_CHAT_ACTION -> if (objects.size() > 0) {
                    val uuid = objects.getString(0)
                    val success = objects.size() <= 1 || objects.getBoolean(1)
                    val message = if (objects.size() == 3) objects.getString(2) else null
                    if (!uuid.isNullOrEmpty()) {
                        val listener = actionsList[uuid]
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
                        actionsList.remove(uuid)
                    }
                }

                EVENT_VISITOR_REGISTRATION_FAILURE -> if (objects.size() > 0) {
                    val auth: ReadableMap? = objects.getMap(0)
                    if (auth is ReadableNativeMap) {
                        handleVisitorRegistrationFailure(auth)
                    }
                }

                "conversationSecretFieldsResponse" -> if (objects.size() > 0) { // No I18N
                    val payload = objects.getMap(0)
                    if (payload != null) {
                        val requestId = payload.getString("requestId") // No I18N
                        val fieldsMap = payload.getMap("fields") // No I18N
                        if (requestId != null) {
                            pendingSecretFieldsCallbacks.remove(requestId)
                                ?.onResult(fieldsMap?.let { getStringMap(it) } ?: emptyMap())
                        }
                    }
                }

                "conversationDisplayFieldsResponse" -> if (objects.size() > 0) { // No I18N
                    val payload = objects.getMap(0)
                    if (payload != null) {
                        val requestId = payload.getString("requestId") // No I18N
                        val fieldsMap = payload.getMap("fields") // No I18N
                        if (requestId != null) {
                            pendingDisplayFieldsCallbacks.remove(requestId)
                                ?.onResult(fieldsMap?.let { getStringMap(it) } ?: emptyMap())
                        }
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
    fun setThemeForAndroid(name: String) {
        val resourceId = getStyleResourceId(name)
        if (resourceId > 0) {
            ZohoSalesIQ.setTheme(resourceId)
        }
    }


    @SuppressLint("DiscouragedApi")
    private fun getStyleResourceId(id: String): Int {
        val application = this@RNZohoSalesIQ.application
        var resourceId = 0
        if (application != null) {
            resourceId = application.resources.getIdentifier(
                id, "style",  // No I18N
                application.packageName
            )
        }
        return resourceId
    }

    @SuppressLint("DiscouragedApi")
    private fun getDrawableResourceId(drawableName: String?): Int {
        val application = this@RNZohoSalesIQ.application
        var resourceId = 0
        if (application != null) {
            resourceId = application.resources.getIdentifier(
                drawableName, "drawable",  // No I18N
                application.packageName
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
    fun setLoggerPathForiOS(@Suppress("unused") value: String?) {
    }

    @ReactMethod
    fun disablePush(promise: Promise) {
        ZohoSalesIQ.Notification.disablePush()
        promise.resolve(null)
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
        callback: Callback?,
    ) {
        ZohoSalesIQ.Chat.start(
            question, customChatId, departmentName
        ) { result: SalesIQResult<VisitorChat?> ->
            if (result.isSuccess) {
                callback?.invoke(null, result.data?.let { getChatMapObject(it) })
            } else {
                val error = result.error
                callback?.invoke(
                    RNZohoSalesIQCore.getErrorMap(error?.code ?: -1, error?.message), null
                )
            }
        }
    }

    @Suppress("DEPRECATION")
    @ReactMethod
    fun startNewChatWithTrigger(
        customChatId: String?,
        departmentName: String?,
        callback: Callback?,
    ) {
        val finalCallback = arrayOf(callback)
        ZohoSalesIQ.Chat.startWithTrigger(
            customChatId, departmentName
        ) { result: SalesIQResult<VisitorChat?> ->
            if (finalCallback[0] != null) {
                if (result.isSuccess) {
                    finalCallback[0]!!.invoke(null, result.data?.let { getChatMapObject(it) })
                } else {
                    val error = result.error
                    finalCallback[0]!!.invoke(
                        RNZohoSalesIQCore.getErrorMap(error?.code ?: -1, error?.message), null
                    )
                }
            }
            finalCallback[0] = null
        }
    }

    @ReactMethod
    fun allowChatInOfflineMode(allow: Boolean) {
        HANDLER.post { ZohoSalesIQ.Chat.allowChatInOfflineMode(allow) }
    }

    @ReactMethod
    fun setChatOfflineMessage(message: String?) {
        // Note: Setting a custom offline message is an iOS-only native API
        // (ZohoSalesIQ.Chat.setOfflineMessage(message)); no Android equivalent.
        LiveChatUtil.log("MobilistenPlugin - setChatOfflineMessage is not supported on Android")
    }

    @ReactMethod
    fun getBadgeCount(promise: Promise) {
        HANDLER.post { promise.resolve(ZohoSalesIQ.Notification.getBadgeCount()) }
    }

    @ReactMethod
    fun getChat(chatId: String, callback: Callback?) {
        ZohoSalesIQ.Chat.get(
            chatId
        ) { result: SalesIQResult<VisitorChat?> ->
            if (callback != null) {
                if (result.isSuccess) {
                    callback.invoke(null, result.data?.let { getChatMapObject(it) })
                } else {
                    val error = result.error
                    callback.invoke(
                        RNZohoSalesIQCore.getErrorMap(error?.code ?: -1, error?.message), null
                    )
                }
            }
        }
    }

    @ReactMethod
    fun setChatWaitingTime(seconds: Int) {
        ZohoSalesIQ.Chat.setWaitingTime(seconds)
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
                callback.invoke(null, resourceDepartments.toWritableArray())
            }

            override fun onFailure(code: Int, message: String) {
                callback.invoke(RNZohoSalesIQCore.getErrorMap(code, message), null)
            }
        })
    }

    @ReactMethod
    fun openKnowledgeBase(type: String, id: String?, callback: Callback) {
        executeIfResourceTypeIsValid(
            type, callback
        ) {
            ZohoSalesIQ.KnowledgeBase.open(
                getResourceType(type)!!, id.orEmpty(), object : OpenResourceListener {
                    override fun onSuccess() {
                        callback.invoke(null, java.lang.Boolean.TRUE)
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(RNZohoSalesIQCore.getErrorMap(code, message), null)
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
                getResourceType(type)!!, id.orEmpty(), object : ResourceListener {
                    override fun onSuccess(resource: Resource?) {
                        callback.invoke(null, resource.toWritableMap())
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(RNZohoSalesIQCore.getErrorMap(code, message), null)
                    }
                })
        }
    }

    @ReactMethod
    fun getKnowledgeBaseSingleResourceWithLanguageFallback(
        type: String,
        id: String?,
        shouldFallbackToDefaultLanguage: Boolean,
        promise: Promise,
    ) {
        executeIfResourceTypeIsValid(
            type, promise
        ) {
            ZohoSalesIQ.KnowledgeBase.getSingleResource(
                getResourceType(type)!!,
                id.orEmpty(),
                shouldFallbackToDefaultLanguage,
                object : ResourceListener {
                    override fun onSuccess(resource: Resource?) {
                        promise.resolve(resource.toWritableMap())
                    }

                    override fun onFailure(code: Int, message: String?) {
                        promise.reject(code.toString(), message) // No I18N
                    }
                })
        }
    }

    @ReactMethod
    fun getKnowledgeBaseResourcesWithChildCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        page: Int,
        limit: Int,
        searchKey: String?,
        includeChildCategoryResources: Boolean,
        promise: Promise,
    ) {
        executeIfResourceTypeIsValid(
            type, promise
        ) {
            ZohoSalesIQ.KnowledgeBase.getResources(
                getResourceType(type)!!,
                departmentID,
                parentCategoryID,
                searchKey,
                page,
                limit,
                includeChildCategoryResources,
                object : ResourcesListener {
                    override fun onSuccess(
                        articles: List<Resource>,
                        moreDataAvailable: Boolean,
                    ) {
                        promise.resolve(getResourcesResultMap(articles, moreDataAvailable))
                    }

                    override fun onFailure(code: Int, message: String?) {
                        promise.reject(code.toString(), message) // No I18N
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
        callback: Callback,
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
                        moreDataAvailable: Boolean,
                    ) {
                        callback.invoke(
                            null, articles.toWritableArray(), moreDataAvailable
                        )
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(RNZohoSalesIQCore.getErrorMap(code, message), null)
                    }
                })
        }
    }

    private fun getResourcesResultMap(
        articles: List<Resource>,
        moreDataAvailable: Boolean,
    ): WritableMap {
        val map: WritableMap = WritableNativeMap()
        map.putArray("resources", articles.toWritableArray()) // No I18N
        map.putBoolean("moreDataAvailable", moreDataAvailable) // No I18N
        return map
    }

    @ReactMethod
    fun getKnowledgeBaseCategories(
        type: String,
        departmentID: String?,
        parentCategoryID: String?,
        callback: Callback,
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
                            null, resourceCategories.toWritableArray()
                        )
                    }

                    override fun onFailure(code: Int, message: String?) {
                        callback.invoke(RNZohoSalesIQCore.getErrorMap(code, message), null)
                    }
                })
        }
    }

    @ReactMethod
    fun setThemeColor(@Suppress("unused") theme: ReadableMap?) {
    }

    @ReactMethod
    fun updateConfiguration(key: String, config: ReadableMap?) {
        if (config == null) return

        val value = when (val type = config.getString("type")) {
            "boolean" -> {
                config.getBoolean("value")
            }

            "string" -> {
                config.getString("value")
            }

            "number" -> {
                config.getDouble("value")
            }

            else -> {
                LiveChatUtil.log("MobilistenPlugin - Invalid configuration type: $type")
                return
            }
        }

        var configurationKey: String? = null
        when (key) {
            "NeutralRatingDisabled" -> {
                configurationKey = "binaryRating"
            }

            "ChatBotCarousalCardPropertiesOrientation" -> {
                configurationKey = "chat_bot_carousal_card_properties_orientation"
            }

            "ChatBotCarousalCardImageVisibility" -> {
                configurationKey = "chat_bot_carousal_card_image_visibility"
            }

            "ChatFallbackDepartmentsOnReopenIfOffline" -> {
                configurationKey = "fallbackDepartmentsOnReopenIfOffline"
            }

            "HideCreditCardMaskingConsentAlert" -> {
                configurationKey = "siq_mobilisten_bypass_credit_card_masking_consent"
            }

            "DontNeedHomePageInStartFlow" -> {
                configurationKey = "enable_homepage_backstack_for_chat_initiation"
            }
        }
        if (configurationKey != null) {
            if (key == "DontNeedHomePageInStartFlow") {
                // RN semantic: true means do not include homepage in start flow.
                // Android key is inverse (enable homepage backstack), so invert before setting.
                val dontNeedHomePage = when (value) {
                    is Boolean -> value
                    is String -> value.toBoolean()
                    is Number -> value.toInt() != 0
                    else -> false
                }
                System.setProperty(configurationKey, (!dontNeedHomePage).toString())
            } else {
                System.setProperty(configurationKey, value.toString())
            }
        } else {
            when (key) {
                "IncludeVisitorInfoInConversationInfo" -> {
                    ZohoSalesIQ.setConfig(
                        SalesIQConfig.IncludeVisitorInfoWithDisplayFields(
                            LiveChatUtil.getBoolean(value)
                        )
                    )
                }

                "HideCreditCardMaskingConsentAlert" -> {
                    ZohoSalesIQ.setConfig(
                        SalesIQConfig.BypassCreditCardMaskingConsent(LiveChatUtil.getBoolean(value))
                    )
                }

                "SecretFieldsProviderTimeout" -> {
                    ZohoSalesIQ.setTimeout(
                        SalesIQTimeoutType.SECRET_FIELDS, LiveChatUtil.getLong(value)
                    )
                }

                "DisplayFieldsProviderTimeout" -> {
                    ZohoSalesIQ.setTimeout(
                        SalesIQTimeoutType.DISPLAY_FIELDS, LiveChatUtil.getLong(value)
                    )
                }

                else -> {
                    LiveChatUtil.log("MobilistenPlugin - Invalid configuration key: $key")
                }
            }
        }
    }

    @ReactMethod
    fun refreshData(data: ReadableMap, promise: Promise) {
        val type = data.getString("type")?.takeIf { it.isNotBlank() }
        if (type == null) {
            promise.reject("-1200", "Missing refresh data type")
            return
        }

        val conversationId = (when {
            data.hasKey("conversationId") -> data.getString("conversationId")
            data.hasKey("id") -> data.getString("id")
            else -> null
        })?.takeIf { it.isNotBlank() }
        if (conversationId == null) {
            promise.reject("-1201", "Missing conversation identifier")
            return
        }

        val refreshData = when (type) {
            "secretFields" -> SalesIQData.SecretFields(conversationId)
            "displayFields" -> SalesIQData.DisplayFields(conversationId)
            else -> null
        }
        if (refreshData == null) {
            promise.reject("-1202", "Unsupported refresh data type")
            return
        }

        ZohoSalesIQ.refreshData(refreshData) { result ->
            if (result.isSuccess) {
                promise.resolve(null)
            } else {
                val error = result.error
                promise.reject(
                    (error?.code ?: 1203).toString(),
                    error?.message ?: "Failed to refresh provider data"
                )
            }
        }
    }

    @ReactMethod
    fun setDataProvider(config: ReadableMap) {
        isSecretFieldsProviderEnabled =
            config.hasKey("secretFieldsEnabled") && config.getBoolean("secretFieldsEnabled")
        isDisplayFieldsProviderEnabled =
            config.hasKey("customInfoEnabled") && config.getBoolean("customInfoEnabled")

        HANDLER.post {
            if (isSecretFieldsProviderEnabled || isDisplayFieldsProviderEnabled) {
                ZohoSalesIQ.Conversation.setDataProvider(conversationDataProvider)
            } else {
                clearPendingConversationProviderCallbacks()
                ZohoSalesIQ.Conversation.setDataProvider(null)
            }
        }
    }

    private fun clearPendingConversationProviderCallbacks() {
        pendingSecretFieldsCallbacks.values.forEach { it.onResult(null) }
        pendingDisplayFieldsCallbacks.values.forEach { it.onResult(null) }
        pendingSecretFieldsCallbacks.clear()
        pendingDisplayFieldsCallbacks.clear()
    }

    private fun getStringMap(fields: ReadableMap): Map<String, String> {
        val stringMap = HashMap<String, String>()
        for ((key, value) in fields.toHashMap()) {
            if (value != null) {
                stringMap[key] = value.toString()
            }
        }
        return stringMap
    }

    // MARK: Homepage APIs

    @ReactMethod
    fun setHomepageEnabled(enabled: Boolean) {
        ZohoSalesIQ.Homepage.setEnabled(enabled)
    }

    @ReactMethod
    fun setHomepageWidgetVisibility(widget: String, visible: Boolean) {
        val widgetType: ZohoSalesIQ.Homepage.Widget? = when (widget) {
            "HOMEPAGE_WIDGET_CHAT" -> ZohoSalesIQ.Homepage.Widget.CHAT
            "HOMEPAGE_WIDGET_CALL" -> ZohoSalesIQ.Homepage.Widget.CALL
            "HOMEPAGE_WIDGET_ARTICLES" -> ZohoSalesIQ.Homepage.Widget.ARTICLES
            "HOMEPAGE_WIDGET_PREVIOUS_CONVERSATION" -> ZohoSalesIQ.Homepage.Widget.PREVIOUS_CONVERSATIONS
            "HOMEPAGE_WIDGET_IMAGE_CARD" -> ZohoSalesIQ.Homepage.Widget.IMAGE_CARD
            "HOMEPAGE_WIDGET_VIDEO_CARD" -> ZohoSalesIQ.Homepage.Widget.VIDEO_CARD
            else -> null
        }
        if (widgetType != null) {
            ZohoSalesIQ.Homepage.setVisibility(widgetType, visible)
        } else {
            LiveChatUtil.log("MobilistenPlugin - Invalid homepage widget type: $widget")
        }
    }

    @ReactMethod
    fun presentSDK(screen: ReadableMap, showHomepage: Boolean, promise: Promise) {
        HANDLER.post {
            val screenType = screen.getString("screenType") // No I18N
            if (screenType == null) {
                // No screen provided: open the SDK's default UI (null present
                // options) and report the actual result from the present callback.
                ZohoSalesIQ.present(null) { result ->
                    if (result.isSuccess) {
                        promise.resolve(true)
                    } else {
                        val error = result.error
                        promise.reject((error?.code ?: -1).toString(), error?.message) // No I18N
                    }
                }
                return@post
            }
            when (screenType) {
                "conversation" -> { // No I18N
                    val id = if (screen.hasKey("id")) screen.getString("id") else null // No I18N
                    val listMap =
                        if (screen.hasKey("list")) screen.getMap("list") else null // No I18N
                    val sessionBehaviorMap =
                        if (screen.hasKey("sessionBehavior")) screen.getMap("sessionBehavior") else null // No I18N
                    val sessionTypeStr =
                        if (screen.hasKey("sessionType")) screen.getString("sessionType") else null // No I18N

                    val conversationList = parseSIQConversationList(listMap)
                    val sessionBehavior = parseSIQSessionBehavior(sessionBehaviorMap)
                    val sessionType = parseSIQSessionType(sessionTypeStr)

                    val siqScreen = if (id != null) {
                        PresentOptions.Screen.Conversation(
                            id,
                            sessionType ?: PresentOptions.Screen.Conversation.SessionType.CHAT,
                            conversationList
                        )
                    } else {
                        PresentOptions.Screen.Conversation(conversationList, sessionBehavior)
                    }

                    val presentOptions =
                        PresentOptions(screen = siqScreen, isHomepageEnabled = showHomepage)
                    ZohoSalesIQ.present(presentOptions) { result ->
                        if (result.isSuccess) {
                            promise.resolve(true)
                        } else {
                            val error = result.error
                            promise.reject(
                                (error?.code ?: -1).toString(), error?.message
                            ) // No I18N
                        }
                    }
                }

                "knowledgeBase" -> { // No I18N
                    val id = if (screen.hasKey("id")) screen.getString("id") else null // No I18N
                    val siqScreen = PresentOptions.Screen.KnowledgeBase(
                        PresentOptions.Screen.KnowledgeBase.ResourceType.ARTICLES, id
                    )

                    val presentOptions =
                        PresentOptions(screen = siqScreen, isHomepageEnabled = showHomepage)
                    ZohoSalesIQ.present(presentOptions) { result ->
                        if (result.isSuccess) {
                            promise.resolve(true)
                        } else {
                            val error = result.error
                            promise.reject(
                                (error?.code ?: -1).toString(), error?.message
                            ) // No I18N
                        }
                    }
                }

                else -> {
                    promise.reject("-1", "Unknown screenType: $screenType") // No I18N
                }
            }
        }
    }

    @ReactMethod
    fun helpCenterAsk(question: String?, promise: Promise) {
        HANDLER.post {
            ZohoSalesIQ.HelpCenter.ask(question) { result ->
                if (result.isSuccess) {
                    promise.resolve(true)
                } else {
                    val error = result.error
                    promise.reject((error?.code ?: -1).toString(), error?.message)
                }
            }
        }
    }

    @ReactMethod
    fun updateProfile(profile: ReadableMap, promise: Promise) {
        val siqProfile = SalesIQVisitorProfile()
        if (profile.hasKey("salutation")) { // No I18N
            val salutationStr = profile.getString("salutation")
            siqProfile.salutation = when (salutationStr?.lowercase()) {
                "mr" -> SalesIQVisitorProfile.Salutation.Mr
                "ms" -> SalesIQVisitorProfile.Salutation.Ms
                "mrs" -> SalesIQVisitorProfile.Salutation.Mrs
                "dr" -> SalesIQVisitorProfile.Salutation.Dr
                "prof" -> SalesIQVisitorProfile.Salutation.Prof
                else -> SalesIQVisitorProfile.Salutation.None
            }
        }
        siqProfile.firstName =
            if (profile.hasKey("firstName")) profile.getString("firstName") else null // No I18N
        siqProfile.lastName =
            if (profile.hasKey("lastName")) profile.getString("lastName") else null // No I18N
        siqProfile.email =
            if (profile.hasKey("emailID")) profile.getString("emailID") else null // No I18N

        if (profile.hasKey("phone")) { // No I18N
            val phoneMap = profile.getMap("phone") // No I18N
            if (phoneMap != null) {
                val code = if (phoneMap.hasKey("code")) phoneMap.getString("code")
                    .orEmpty() else "" // No I18N
                val number = if (phoneMap.hasKey("number")) phoneMap.getString("number")
                    .orEmpty() else "" // No I18N
                if (code.isNotEmpty() || number.isNotEmpty()) {
                    siqProfile.phoneNumber = SalesIQVisitorProfile.PhoneNumber(code, number)
                }
            }
        }

        if (profile.hasKey("customInfo")) { // No I18N
            val customInfoMap = profile.getMap("customInfo") // No I18N
            if (customInfoMap != null) {
                val iterator = customInfoMap.keySetIterator()
                val map = HashMap<String, String>()
                while (iterator.hasNextKey()) {
                    val key = iterator.nextKey()
                    map[key] = customInfoMap.getString(key).orEmpty()
                }
                siqProfile.customInfo = map
            }
        }

        if (profile.hasKey("location")) { // No I18N
            val locationMap = profile.getMap("location") // No I18N
            if (locationMap != null) {
                val location = SIQVisitorLocation()
                location.countryCode =
                    if (locationMap.hasKey("countryCode")) locationMap.getString("countryCode") else null // No I18N
                location.city =
                    if (locationMap.hasKey("city")) locationMap.getString("city") else null // No I18N
                location.zipCode =
                    if (locationMap.hasKey("zipCode")) locationMap.getString("zipCode") else null // No I18N
                location.state =
                    if (locationMap.hasKey("state")) locationMap.getString("state") else null // No I18N
                location.country =
                    if (locationMap.hasKey("country")) locationMap.getString("country") else null // No I18N
                if (locationMap.hasKey("latitude")) location.latitude =
                    locationMap.getDouble("latitude")  // No I18N
                if (locationMap.hasKey("longitude")) location.longitude =
                    locationMap.getDouble("longitude") // No I18N
                siqProfile.location = location
            }
        }

        HANDLER.post {
            ZohoSalesIQ.Visitor.updateProfile(siqProfile)
            promise.resolve(null)
        }
    }

    private fun parseSIQConversationList(map: ReadableMap?): PresentOptions.ConversationList {
        val type = map?.getString("type") ?: "all" // No I18N
        val filter = parseSIQConversationFilter(map?.getString("filter")) // No I18N
        return when (type) {
            "chat" -> PresentOptions.ConversationList.Chat(filter) // No I18N
            "call" -> PresentOptions.ConversationList.Call(filter) // No I18N
            "none" -> PresentOptions.ConversationList.None // No I18N
            else -> PresentOptions.ConversationList.All(filter)
        }
    }

    private fun parseSIQConversationFilter(str: String?): PresentOptions.ConversationsListFilter {
        return when (str) {
            "ongoing" -> PresentOptions.ConversationsListFilter.ONGOING // No I18N
            "ended" -> PresentOptions.ConversationsListFilter.ENDED // No I18N
            else -> PresentOptions.ConversationsListFilter.ALL
        }
    }

    private fun parseSIQSessionType(str: String?): PresentOptions.Screen.Conversation.SessionType? {
        return when (str) {
            "chat" -> PresentOptions.Screen.Conversation.SessionType.CHAT // No I18N
            "call" -> PresentOptions.Screen.Conversation.SessionType.CALL // No I18N
            else -> null
        }
    }

    private fun parseSIQSessionBehavior(map: ReadableMap?): PresentOptions.Screen.Conversation.SessionBehavior {
        val sessionType = parseSIQSessionType(map?.getString("sessionType"))
            ?: PresentOptions.Screen.Conversation.SessionType.CHAT // No I18N
        return when (map?.getString("type")) { // No I18N
            "alwaysNew" -> PresentOptions.Screen.Conversation.SessionBehavior.AlwaysNew(sessionType) // No I18N
            "continueOrNew" -> PresentOptions.Screen.Conversation.SessionBehavior.ContinueOrNew(
                sessionType
            ) // No I18N
            else -> PresentOptions.Screen.Conversation.SessionBehavior.None
        }
    }

    private fun executeIfResourceTypeIsValid(
        type: String,
        callback: Callback?,
        runnable: Runnable,
    ) {
        val resourceType = getResourceType(type)
        if (resourceType != null) {
            runnable.run()
        } else {
            callback?.invoke(resourceTypeErrorMap)
        }
    }

    private fun executeIfResourceTypeIsValid(
        type: String,
        promise: Promise,
        runnable: Runnable,
    ) {
        val resourceType = getResourceType(type)
        if (resourceType != null) {
            runnable.run()
        } else {
            promise.reject("-100", "Invalid resource type") // No I18N
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
        private const val EVENT_CHAT_EXPIRED = "EVENT_CHAT_EXPIRED" // No I18N
        private const val EVENT_OPERATORS_ONLINE = "EVENT_OPERATORS_ONLINE" // No I18N
        private const val EVENT_OPERATORS_OFFLINE = "EVENT_OPERATORS_OFFLINE" // No I18N
        private const val EVENT_VISITOR_IPBLOCKED = "EVENT_VISITOR_IPBLOCKED" // No I18N
        private const val EVENT_FEEDBACK_RECEIVED = "EVENT_FEEDBACK_RECEIVED" // No I18N
        private const val EVENT_RATING_RECEIVED = "EVENT_RATING_RECEIVED" // No I18N
        private const val EVENT_PERFORM_CHATACTION = "EVENT_PERFORM_CHATACTION" // No I18N
        private const val EVENT_CUSTOMTRIGGER = "EVENT_CUSTOMTRIGGER" // No I18N
        private const val EVENT_BOT_TRIGGER = "EVENT_BOT_TRIGGER" // No I18N
        private const val EVENT_HANDLE_URL = "EVENT_HANDLE_URL" // No I18N
        private const val RE_REGISTER_PUSH = "RE_REGISTER_PUSH" // No I18N
        private const val EVENT_OPEN_URL = "EVENT_OPEN_URL" // No I18N
        private const val EVENT_COMPLETE_CHAT_ACTION = "EVENT_COMPLETE_CHAT_ACTION" // No I18N
        private const val EVENT_CHAT_QUEUE_POSITION_CHANGED =
            "EVENT_CHAT_QUEUE_POSITION_CHANGED" // No I18N
        private const val EVENT_CHAT_UNREAD_COUNT_CHANGED =
            "EVENT_CHAT_UNREAD_COUNT_CHANGED" // No I18N

        private const val EVENT_NOTIFICATION_CLICKED = "EVENT_NOTIFICATION_CLICKED" // No I18N
        private const val CONVERSATION_SECRET_FIELDS_REQUEST =
            "conversationSecretFieldsRequest" // No I18N
        private const val CONVERSATION_DISPLAY_FIELDS_REQUEST =
            "conversationDisplayFieldsRequest" // No I18N

        private const val TYPE_OPEN = "OPEN" // No I18N
        private const val TYPE_CONNECTED = "CONNECTED" // No I18N
        private const val TYPE_CLOSED = "CLOSED" // No I18N
        private const val TYPE_ENDED = "ENDED" // No I18N
        private const val TYPE_MISSED = "MISSED" // No I18N
        private const val TYPE_WAITING = "WAITING" // No I18N

//        private const val INFO_LOG = "INFO_LOG" // No I18N
//        private const val WARNING_LOG = "WARNING_LOG" // No I18N
//        private const val ERROR_LOG = "ERROR_LOG" // No I18N
//
//        private const val SENDING = "SENDING" // No I18N
//        private const val UPLOADING = "UPLOADING" // No I18N
//        private const val SENT = "SENT" // No I18N
//        private const val FAILURE = "FAILURE" // No I18N

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

        @JvmStatic
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

        @JvmStatic
        fun registerCallbacks(application: Application?) {
            if (!isCallbacksRegistered && application != null) {
                register(application)
                val rnZohoSalesIQListener = RNZohoSalesIQListener()
                ZohoSalesIQ.setListener(rnZohoSalesIQListener)
                ZohoSalesIQ.Chat.setListener(rnZohoSalesIQListener)
                ZohoSalesIQ.KnowledgeBase.setListener(rnZohoSalesIQListener)
                ZohoSalesIQ.ChatActions.setListener(rnZohoSalesIQListener)
                ZohoSalesIQ.Notification.setListener(rnZohoSalesIQListener)
                isCallbacksRegistered = true
                LiveChatUtil.log("Callbacks registered")
            }
        }

        internal fun getVisibilityMode(mode: String): VisibilityMode {
            var visibilityMode = VisibilityMode.NEVER
            if (LAUNCHER_VISIBILITY_MODE_ALWAYS == mode) {
                visibilityMode = VisibilityMode.ALWAYS
            } else if (LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT == mode) {
                visibilityMode = VisibilityMode.WHEN_ACTIVE_CHAT
            }
            return visibilityMode
        }

        internal fun getChatComponent(componentName: String): ChatComponent? {
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
                "MEDIA_CAPTURE" -> chatComponent = ChatComponent.takePhoto
                "TAKE_PHOTO" -> chatComponent = ChatComponent.takePhoto
                "RECORD_VIDEO" -> chatComponent = ChatComponent.recordVideo
                "MEDIA_LIBRARY" -> chatComponent = ChatComponent.gallery
                "END" -> chatComponent = ChatComponent.end
                "END_WHEN_IN_QUEUE" -> chatComponent = ChatComponent.endWhenInQueue
                "END_WHEN_BOT_CONNECTED" -> chatComponent = ChatComponent.endWhenBotConnected
                "END_WHEN_OPERATOR_CONNECTED" -> chatComponent =
                    ChatComponent.endWhenOperatorConnected

                "REOPEN" -> chatComponent = ChatComponent.reopen
                "CALL" -> chatComponent = ChatComponent.call
                "FILE_SHARING_WHEN_BOT_CONNECTED" -> chatComponent =
                    ChatComponent.fileSharingWhenBotConnected

                "VOICE_NOTE_WHEN_BOT_CONNECTED" -> chatComponent =
                    ChatComponent.voiceNoteWhenBotConnected

                else -> {}
            }
            return chatComponent
        }

        private var hasAnyEventListeners = false

        @JvmStatic
        fun handleNotification(application: Application?, extras: Map<*, *>?) {
            HANDLER.post {
                if (application != null && extras != null) {
                    ZohoSalesIQ.Notification.handle(application, extras)
                }
            }
        }

        @JvmStatic
        fun isSDKMessage(extras: Map<*, *>?): Boolean {
            return extras != null && ZohoSalesIQ.Notification.isZohoSalesIQNotification(extras)
        }

        internal fun getNotificationPayloadMap(payload: SalesIQNotificationPayload?): WritableMap? {
            var resultMap: WritableMap? = WritableNativeMap()
            resultMap!!.putMap("payload", payload.toWritableMap()) // No I18N
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

                is SalesIQNotificationPayload.Call -> {
                    resultMap.putString("type", "call") // No I18N
                }

                else -> {
                    resultMap = null
                }
            }
            return resultMap
        }

        @JvmStatic
        fun enablePush(token: String?, testDevice: Boolean) {
            fcmToken = token
            isTestDevice = testDevice
            token?.let { ZohoSalesIQ.Notification.enablePush(it, isTestDevice) }
        }

        internal fun initSalesIQ(
            application: Application?,
            activity: Activity?,
            appKey: String,
            accessKey: String,
            initCallback: Callback?,
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
                    application, appKey, accessKey, initConfig, object : OnInitCompleteListener {
                        override fun onInitComplete() {
                            fcmToken?.let { ZohoSalesIQ.Notification.enablePush(it, isTestDevice) }
                            if (activity != null) {
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
            }
        }

        fun eventEmitter(event: String, value: Any?) {
            if (reactContext != null && hasAnyEventListeners) {
                LiveChatUtil.log("eventEmitter, Send event: $event")
                reactContext!!.getJSModule(
                    DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
                ).emit(event, value)
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

        fun getChatMapObject(chat: VisitorChat?): WritableMap {
            if (chat == null) {
                return WritableNativeMap()
            }
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
                        "lastMessageTime", LiveChatUtil.getString(lastMessage.time)
                    ) // No I18N
                    lastMessageMap.putString(
                        "time", LiveChatUtil.getString(lastMessage.time)
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
                "numberOfChats", LiveChatUtil.getString(siqVisitor.numberOfChats)
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
                    "firstVisitTime", LiveChatUtil.getString(firstVisitTime.time)
                ) // No I18N
            }
            if (siqVisitor.lastVisitTime != null) {
                val lastVisitTime = siqVisitor.lastVisitTime
                infoMap.putString(
                    "lastVisitTime", LiveChatUtil.getString(lastVisitTime.time)
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
                "numberOfVisits", LiveChatUtil.getString(siqVisitor.numberOfVisits)
            ) // No I18N
            infoMap.putString(
                "noOfDaysVisited", LiveChatUtil.getString(siqVisitor.noOfDaysVisited)
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

//        fun getEventEmitterObjectWithBoolean(eventName: String?, body: Boolean): WritableMap {
//            val eventEmitterObject: WritableMap = WritableNativeMap()
//            eventEmitterObject.putString("event", eventName) // No I18N
//            eventEmitterObject.putBoolean("body", body) // No I18N
//            return eventEmitterObject
//        }

        internal fun handleVisitorRegistrationFailure(map: ReadableNativeMap) {
            if (map.hasKey("type")) {
                val type = map.getString("type")
                val userId = map.getString("userId")
                if ("registered_visitor" == type) {
                    if (userId != null && !TextUtils.isEmpty(userId)) {
                        LiveChatUtil.log("MobilistenEncryptedSharedPreferences- re-registering visitor") // No I18N
                        LiveChatUtil.registerVisitor(userId, null, object : RegisterListener {
                            override fun onSuccess() {
                                LoggerUtil.logDebugInfo(
                                    DebugInfoData.VisitorFailureReRegistrationAcknowledged(userId)
                                )
                                LiveChatUtil.log("MobilistenEncryptedSharedPreferences- re-registering visitor success") // No I18N
                                if (sharedPreferences.contains(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES) && sharedPreferences.getBoolean(
                                        MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES,
                                        true
                                    )
                                ) {
                                    if (DeviceConfig.getPreferences() != null) {
                                        DeviceConfig.getPreferences()?.edit(true) {
                                            putBoolean(
                                                CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged,
                                                true
                                            )
                                        }
                                    }
                                } else {
                                    sharedPreferences.edit(true) {
                                        remove(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged)
                                    }
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
                    LoggerUtil.logDebugInfo(DebugInfoData.VisitorFailureGuestAcknowledged(jsonObject.toString()))
                    if (sharedPreferences.contains(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES) && sharedPreferences.getBoolean(
                            MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES,
                            true
                        )
                    ) {
                        if (DeviceConfig.getPreferences() != null) {
                            DeviceConfig.getPreferences()?.edit(true) {
                                putBoolean(
                                    CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged,
                                    true
                                )
                            }
                        }
                    } else {
                        sharedPreferences.edit(true) {
                            remove(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged)
                        }
                    }
                }
            }
        }

        const val RESOURCE_ARTICLES: String = "RESOURCE_ARTICLES" // No I18N

        val resourceTypeErrorMap: WritableMap
            get() {
                val errorMap: WritableMap = WritableNativeMap()
                errorMap.putInt("code", 100) // No I18N
                errorMap.putString("message", "Invalid resource type") // No I18N
                return errorMap
            }
    }
}
