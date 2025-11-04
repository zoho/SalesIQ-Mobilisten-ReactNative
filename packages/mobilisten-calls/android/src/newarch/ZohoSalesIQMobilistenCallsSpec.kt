package com.zoho.salesiq.calls.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext

abstract class ZohoSalesIQMobilistenCallsSpec internal constructor(context: ReactApplicationContext) :
    NativeRNZohoSalesIQCallsSpec(context) {
    override fun getTypedExportedConstants(): MutableMap<String, Any>? {
        return RNZohoSalesIQCalls.sharedInstance?.constants
    }
}
