package com.zoho.salesiq.calls.reactlibrary

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap

class RNZohoSalesIQMobilistenCalls(private val reactContext: ReactApplicationContext) :
    ZohoSalesIQMobilistenCallsSpec(reactContext) {
    companion object {
        const val NAME = "RNZohoSalesIQMobilistenCalls"
    }

    override fun initialize() {
        super.initialize()
        RNZohoSalesIQCalls.setInstance(reactContext)
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    override fun isEnabled(promise: Promise) {
        RNZohoSalesIQCalls.sharedInstance?.isEnabled(promise)
    }

    @ReactMethod
    override fun getCurrentCallId(promise: Promise) {
        RNZohoSalesIQCalls.sharedInstance?.getCurrentCallId(promise)
    }

    @ReactMethod
    override fun getCurrentCallState(promise: Promise) {
        RNZohoSalesIQCalls.sharedInstance?.getCurrentCallState(promise)
    }

    @ReactMethod
    override fun enterFloatingViewMode() {
        RNZohoSalesIQCalls.sharedInstance?.enterFloatingViewMode()
    }

    @ReactMethod
    override fun enterFullScreenMode() {
        RNZohoSalesIQCalls.sharedInstance?.enterFullScreenMode()
    }

    @ReactMethod
    override fun initialiseForiOS() {
        
    }

    @ReactMethod
    override fun start(
        id: String?,
        displayActiveCall: Boolean?,
        attributes: ReadableMap?,
        promise: Promise,
    ) {
        RNZohoSalesIQCalls.sharedInstance?.start(id, displayActiveCall, attributes, promise)
    }

    @ReactMethod
    override fun end(promise: Promise) {
        RNZohoSalesIQCalls.sharedInstance?.end(promise)
    }

    @ReactMethod
    override fun setAndroidReplyMessages(messages: ReadableArray) {
        RNZohoSalesIQCalls.sharedInstance?.setAndroidReplyMessages(messages)
    }

    @ReactMethod
    override fun setTitle(onlineTitle: String?, offlineTitle: String?) {
        RNZohoSalesIQCalls.sharedInstance?.setTitle(onlineTitle, offlineTitle)
    }

    @ReactMethod
    override fun setVisibility(component: String, isVisible: Boolean) {
        RNZohoSalesIQCalls.sharedInstance?.setVisibility(component, isVisible)
    }

    @ReactMethod
    override fun getList(promise: Promise) {
        RNZohoSalesIQCalls.sharedInstance?.getList(promise)
    }

    @ReactMethod
    override fun setCallKitIcon(icon: String?) {
        
    }

    @ReactMethod
    override fun addListener(eventName: String) {
        RNZohoSalesIQCalls.sharedInstance?.addListener(eventName)
    }

    @ReactMethod
    override fun removeListeners(count: Double) {
    }
}
