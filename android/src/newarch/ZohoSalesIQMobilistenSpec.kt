package com.zohosalesiq.reactlibrary

import com.facebook.react.bridge.ReactApplicationContext

abstract class ZohoSalesIQMobilistenSpec internal constructor(context: ReactApplicationContext) :
  NativeRNZohoSalesIQSpec(context) {
  override fun getTypedExportedConstants(): MutableMap<String, Any>? {
    return RNZohoSalesIQ.sharedInstance?.constants
  }
}
