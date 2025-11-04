package com.zoho.salesiq.calls.reactlibrary.views

import android.util.Log
import android.view.ViewGroup
import android.widget.LinearLayout
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.StateWrapper
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.zoho.salesiq.mobilisten.calls.apis.ZohoSalesIQCalls

class SalesIQCallsStatusBarViewManager(private val reactContext: ReactApplicationContext) :
    SimpleViewManager<ViewGroup>() {

    private var isDarkMode = false

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(
        reactTag: Int,
        reactContext: ThemedReactContext,
        initialProps: ReactStylesDiffMap?,
        stateWrapper: StateWrapper?,
    ): ViewGroup {
        return getNewStatusBarView()
    }

    override fun createViewInstance(p0: ThemedReactContext): ViewGroup {
        return getNewStatusBarView()
    }

    @ReactProp(name = "isDarkMode")
    fun setIsDarkMode(view: ViewGroup, isDark: Boolean = false) {
        isDarkMode = isDark
    }

    private fun getNewStatusBarView(): ViewGroup {
        return runCatching { ZohoSalesIQCalls.getStatusBarView(isDarkMode) }.getOrNull()?.also {
            Log.d(TAG, "Status bar view created successfully.")
        } ?: LinearLayout(reactContext)
    }

    companion object {
        const val REACT_CLASS: String = "SalesIQAndroidCallStatusBarView"
        private const val TAG = "SalesIQCallsStatusBarViewManager"
    }
}