package com.zoho.salesiq.core.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext

class RNZohoSalesIQMobilistenCore(private val reactContext: ReactApplicationContext) :
    ZohoSalesIQMobilistenCoreSpec(reactContext) {
    companion object {
        const val NAME = "RNZohoSalesIQMobilistenCore"
    }

    override fun initialize() {
        super.initialize()
        RNZohoSalesIQCore.setInstance(reactContext)
    }

    override fun getName(): String {
        return NAME
    }
}
