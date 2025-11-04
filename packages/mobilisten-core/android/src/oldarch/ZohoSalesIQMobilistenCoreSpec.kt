package com.zoho.salesiq.core.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class ZohoSalesIQMobilistenCoreSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {
    override fun getConstants(): MutableMap<String, Any>? {
        return RNZohoSalesIQCore.sharedInstance?.constants
    }
}
