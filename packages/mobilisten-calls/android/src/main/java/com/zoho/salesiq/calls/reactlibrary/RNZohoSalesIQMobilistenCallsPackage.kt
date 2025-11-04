package com.zoho.salesiq.calls.reactlibrary

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.uimanager.ViewManager
import com.zoho.salesiq.calls.reactlibrary.views.SalesIQCallsStatusBarViewManager
import java.util.HashMap

class RNZohoSalesIQMobilistenCallsPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == RNZohoSalesIQMobilistenCalls.NAME) {
            RNZohoSalesIQMobilistenCalls(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            moduleInfos[RNZohoSalesIQMobilistenCalls.NAME] = ReactModuleInfo(
                RNZohoSalesIQMobilistenCalls.NAME,
                RNZohoSalesIQMobilistenCalls.NAME,
                false,  // canOverrideExistingModule
                false,  // needsEagerInit
                // hasConstants
                false,
                false, // isCxxModule
                isTurboModule // isTurboModule
            )
            moduleInfos
        }
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<in Nothing, in Nothing>> {
        return listOf(SalesIQCallsStatusBarViewManager(reactContext))
    }
}