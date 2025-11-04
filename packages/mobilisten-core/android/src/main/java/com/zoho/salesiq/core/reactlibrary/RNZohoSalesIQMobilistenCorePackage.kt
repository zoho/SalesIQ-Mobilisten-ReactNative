package com.zoho.salesiq.core.reactlibrary

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.module.model.ReactModuleInfo
import java.util.HashMap

class RNZohoSalesIQMobilistenCorePackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == RNZohoSalesIQMobilistenCore.NAME) {
            RNZohoSalesIQMobilistenCore(reactContext)
        } else {
            null
        }
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
            val isTurboModule: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            moduleInfos[RNZohoSalesIQMobilistenCore.NAME] = ReactModuleInfo(
                RNZohoSalesIQMobilistenCore.NAME,
                RNZohoSalesIQMobilistenCore.NAME,
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
}
