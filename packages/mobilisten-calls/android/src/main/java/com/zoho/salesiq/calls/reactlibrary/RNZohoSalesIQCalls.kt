package com.zoho.salesiq.calls.reactlibrary

import android.app.Application
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.zoho.livechat.android.modules.common.ui.result.entities.CallError
import com.zoho.livechat.android.modules.conversations.models.SalesIQConversation
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.sendPromise
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toSalesIQConversationMap
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toSalesIQConversationWritableArray
import com.zoho.salesiq.core.reactlibrary.RNZohoSalesIQCore.Companion.toWritableMap
import com.zoho.salesiq.mobilisten.calls.apis.ZohoSalesIQCalls
import com.zoho.salesiq.mobilisten.calls.apis.interfaces.SalesIQCallsListener

class RNZohoSalesIQCalls private constructor(reactContext: ReactApplicationContext) {
//    private val currentActivity: Activity?
//        get() = reactContext!!.currentActivity

    val constants: MutableMap<String, Any>
        get() {
            val constants: MutableMap<String, Any> = HashMap()
            constants["ZSIQ_CALLS_EVENT_LISTENER"] = ZSIQ_CALLS_EVENT_LISTENER // No I18N
            return constants
        }

//    private val application: Application?
//        get() {
//            val activity = currentActivity
//            return if (activity != null) activity.application else (if (reactContext != null) (if (reactContext!!.applicationContext is Application) reactContext!!.applicationContext as Application else null) else null)
//        }

    @ReactMethod
    fun sendEvent(event: String, objects: ReadableArray) {
        HANDLER.post {

        }
    }

    init {
        Companion.reactContext = reactContext
    }

    private class RNSalesIQCallsListener : SalesIQCallsListener {
        override fun onCallStateChanged(callState: ZohoSalesIQCalls.SalesIQCallState) {
            eventEmitter(
                ZSIQ_CALLS_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_STATE_CHANGED, callState.toWritableMap()
                )
            )
        }

        override fun onQueuePositionChanged(conversationId: String, position: Int) {
            eventEmitter(
                ZSIQ_CALLS_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_QUEUE_POSITION_CHANGED, mapOf(
                        "conversationId" to conversationId, "position" to position
                    ).toWritableMap()
                )
            )
        }

        override fun onError(error: CallError) {
            eventEmitter(
                ZSIQ_CALLS_EVENT_LISTENER, RNZohoSalesIQCore.getEventEmitterObjectWithMap(
                    EVENT_ERROR, mapOf(
                        "code" to error.code, "message" to error.message
                    ).toWritableMap()
                )
            )
        }
    }

    @ReactMethod
    fun isEnabled(promise: Promise) {
        promise.resolve(ZohoSalesIQCalls.isEnabled)
    }

    @ReactMethod
    fun getCurrentCallId(promise: Promise) {
        promise.resolve(ZohoSalesIQCalls.currentCallId)
    }

    @ReactMethod
    fun getCurrentCallState(promise: Promise) {
        promise.resolve(ZohoSalesIQCalls.currentState.toWritableMap())
    }

    @ReactMethod
    fun enterFloatingViewMode() {
        ZohoSalesIQCalls.enterFloatingViewMode()
    }

    @ReactMethod
    fun enterFullScreenMode() {
        ZohoSalesIQCalls.enterFullScreenMode()
    }

    @ReactMethod
    fun start(
        id: String?,
        displayActiveCall: Boolean?,
        attributes: ReadableMap?,
        promise: Promise,
    ) {
        ZohoSalesIQCalls.start(
            id,
            displayActiveCall ?: true,
            RNZohoSalesIQCore.getConversationAttributes(attributes)
        ) {
            it.sendPromise(promise, it.data?.toSalesIQConversationMap())
        }
    }

    @ReactMethod
    fun end(promise: Promise) {
        ZohoSalesIQCalls.end {
            it.sendPromise(promise, it.data?.toSalesIQConversationMap())
        }
    }

    @ReactMethod
    fun setAndroidReplyMessages(messages: ReadableArray) {
        ZohoSalesIQCalls.setReplyMessages(messages.toArrayList().filterIsInstance<String>())
    }

    @ReactMethod
    fun setTitle(onlineTitle: String?, offlineTitle: String?) {
        ZohoSalesIQCalls.setTitle(onlineTitle, offlineTitle)
    }

    @ReactMethod
    fun setVisibility(component: String, isVisible: Boolean) {
        val callComponent = getCallComponent(component)
        if (callComponent != null) {
            ZohoSalesIQCalls.setVisibility(callComponent, isVisible)
        }
    }

    @ReactMethod
    fun getList(promise: Promise) {
        ZohoSalesIQCalls.getList { result ->
            result.sendPromise(promise, result.data?.toSalesIQConversationWritableArray())
        }
    }

    @ReactMethod
    fun addListener(eventName: String) {
        hasAnyEventListeners = true
//        Log.d(TAG, "Add listener, Event: $eventName added ")
        if (!pendingEvents.isNullOrEmpty()) {
            if (reactContext?.hasCatalystInstance() == true) {
                for ((key, value) in pendingEvents!!) {
                    eventEmitter(key, value)
                }
                pendingEvents = null
            } else {
//                Log.d(TAG, "Add listener, pending events ignored " + (pendingEvents == null))
            }
        }
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    fun setCallKitIcon(icon: String?) {

    }

    @ReactMethod
    fun enableVoIP(token: String?, isTestDevice: Boolean, mode: String?) {
        // iOS only: VoIP (PushKit) registration. On Android, call notifications are
        // delivered through FCM via ZohoSalesIQ.Notification.registerPush.
    }

    @ReactMethod
    fun handleVOIPNotificationAction(info: ReadableMap?, promise: Promise) {
        // iOS only: VoIP (PushKit) notification handling. Resolve immediately so the
        // JS promise never hangs on Android.
        promise.resolve(null)
    }

    companion object {

        private const val TAG = "RNZohoSalesIQCalls" // No I18N

        private var reactContext: ReactApplicationContext? = null

        private const val EVENT_STATE_CHANGED = "EVENT_STATE_CHANGED" // No I18N
        private const val EVENT_QUEUE_POSITION_CHANGED = "EVENT_QUEUE_POSITION_CHANGED" // No I18N
        private const val EVENT_ERROR = "EVENT_ERROR" // No I18N
        private const val ZSIQ_CALLS_EVENT_LISTENER = "ZSIQ_CALLS_EVENT_LISTENER" // No I18N

        private val HANDLER = Handler(Looper.getMainLooper())

        var sharedInstance: RNZohoSalesIQCalls? = null

        fun setInstance(reactContext: ReactApplicationContext) {
            if (sharedInstance == null) {
                synchronized(RNZohoSalesIQCalls::class.java) { // Thread-safe initialization
                    if (sharedInstance == null) {
                        sharedInstance = RNZohoSalesIQCalls(reactContext)
                        registerCallbacks(reactContext.applicationContext as Application?)
                    }
                }
            }
        }

        private var isCallbacksRegistered = false

        fun registerCallbacks(application: Application?) {
            if (!isCallbacksRegistered && application != null) {
                val salesIQCallsListener = RNSalesIQCallsListener()
                ZohoSalesIQCalls.addListener(salesIQCallsListener)
                isCallbacksRegistered = true
                Log.d(TAG, "RNZohoSalesIQCalls Callbacks registered")
            }
        }

        internal fun getCallComponent(componentName: String): ZohoSalesIQCalls.CallComponent? {
            var chatComponent: ZohoSalesIQCalls.CallComponent? = null
            when (componentName) {
                "OPERATOR_NAME" -> chatComponent =
                    ZohoSalesIQCalls.CallComponent.OperatorName // No I18N
                "OPERATOR_IMAGE" -> chatComponent =
                    ZohoSalesIQCalls.CallComponent.OperatorImage //  No I18N
                "PRE_CHAT_FORM" -> chatComponent =
                    ZohoSalesIQCalls.CallComponent.PreChatForm // No I18N
                "QUEUE_POSITION" -> chatComponent =
                    ZohoSalesIQCalls.CallComponent.QueuePosition // No I18N
                else -> {}
            }
            return chatComponent
        }

        private var hasAnyEventListeners = false

        fun eventEmitter(event: String, value: Any?) {
            if (reactContext != null && hasAnyEventListeners) {
                Log.d(TAG, "eventEmitter, Send event: $event")
                reactContext!!.getJSModule(
                    DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
                ).emit(event, value)
                Log.d(TAG, "eventEmitter, Event: $event sent")
            } else {
                Log.d(TAG, "eventEmitter, Added pending event: $event")
                if (pendingEvents == null) {
                    pendingEvents = HashMap()
                }
                pendingEvents!![event] = value
            }
        }

        private var pendingEvents: HashMap<String, Any?>? = null
    }
}
