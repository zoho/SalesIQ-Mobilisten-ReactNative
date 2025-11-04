package com.zoho.salesiq.calls.reactlibrary

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

abstract class ZohoSalesIQMobilistenCallsSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {
    override fun getConstants(): MutableMap<String, Any>? {
        return RNZohoSalesIQCalls.sharedInstance?.constants
    }

    abstract fun isEnabled(promise: Promise)
    abstract fun getCurrentCallId(promise: Promise)
    abstract fun getCurrentCallState(promise: Promise)
    abstract fun enterFullScreenMode()
    abstract fun enterFloatingViewMode()
    abstract fun initialiseForiOS()
    abstract fun setTitle(onlineTitle: String?, offlineTitle: String?)
    abstract fun start(
        id: String? = null,
        displayActiveCall: Boolean? = null,
        attributes: ReadableMap? = null,
        promise: Promise,
    )

    abstract fun end(promise: Promise)
    abstract fun setAndroidReplyMessages(messages: ReadableArray)
    abstract fun setVisibility(component: String, isVisible: Boolean)
    abstract fun getList(promise: Promise)
    abstract fun addListener(eventName: String)
    abstract fun removeListeners(count: Double)
    abstract fun setCallKitIcon(icon: String?)
}
