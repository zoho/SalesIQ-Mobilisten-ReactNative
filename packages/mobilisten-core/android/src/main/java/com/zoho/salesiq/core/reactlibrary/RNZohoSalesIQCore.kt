package com.zoho.salesiq.core.reactlibrary

import android.app.Activity
import android.app.Application
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.os.Handler
import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.zoho.livechat.android.SIQDepartment
import com.zoho.livechat.android.modules.common.ui.result.entities.SalesIQResult
import com.zoho.livechat.android.modules.conversations.models.CommunicationMode
import com.zoho.salesiq.core.modules.conversations.models.SalesIQConversationAttributes
import com.zoho.salesiq.mobilisten.core.enums.ResultType

class RNZohoSalesIQCore private constructor(reactContext: ReactApplicationContext) {
    private val currentActivity: Activity?
        get() = reactContext!!.currentActivity

    val constants: MutableMap<String, Any>
        get() {
            val constants: MutableMap<String, Any> = HashMap()
            return constants
        }

    private val application: Application?
        get() {
            val activity = currentActivity
            return if (activity != null) activity.application else (if (reactContext != null) (if (reactContext!!.applicationContext is Application) reactContext!!.applicationContext as Application else null) else null)
        }

    @ReactMethod
    fun sendEvent(event: String, objects: ReadableArray) {
        HANDLER.post {
            when (event) {

            }
        }
    }

    private fun getStyleResourceId(id: String): Int {
        var resourceId = 0
        reactContext?.applicationContext?.let {
            resourceId = it.resources.getIdentifier(
                id, "style", it.packageName
            )
        }
        return resourceId
    }

    private fun getDrawableResourceId(drawableName: String?): Int {
        var resourceId = 0
        reactContext?.applicationContext?.let {
            resourceId = it.resources.getIdentifier(
                drawableName, "drawable", it.packageName
            )
        }
        return resourceId
    }

    init {
        Companion.reactContext = reactContext
    }

    object Bitmap {

        fun convertToBitmap(drawable: Drawable): android.graphics.Bitmap {
            if (drawable is BitmapDrawable) {
                if (drawable.bitmap != null) {
                    return drawable.bitmap
                }
            }

            val bitmap = if (drawable.intrinsicWidth <= 0 || drawable.intrinsicHeight <= 0) {
                android.graphics.Bitmap.createBitmap(1, 1, android.graphics.Bitmap.Config.ARGB_8888)
            } else {
                android.graphics.Bitmap.createBitmap(
                    drawable.intrinsicWidth,
                    drawable.intrinsicHeight,
                    android.graphics.Bitmap.Config.ARGB_8888
                )
            }

            val canvas = Canvas(bitmap)
            drawable.setBounds(0, 0, canvas.width, canvas.height)
            drawable.draw(canvas)
            return bitmap
        }
    }

    companion object {

        private const val TAG = "RNZohoSalesIQCore" // No I18N

        internal val gson by lazy { Gson() }

        private var reactContext: ReactApplicationContext? = null

        private val HANDLER = Handler(Looper.getMainLooper())

        var sharedInstance: RNZohoSalesIQCore? = null

        fun setInstance(reactContext: ReactApplicationContext) {
            if (sharedInstance == null) {
                synchronized(RNZohoSalesIQCore::class.java) { // Thread-safe initialization
                    if (sharedInstance == null) {
                        sharedInstance = RNZohoSalesIQCore(reactContext)
                    }
                }
            }
        }

        fun getConversationAttributes(map: ReadableMap?): SalesIQConversationAttributes? {
            if (map == null) return null
            return SalesIQConversationAttributes.Builder().apply {
                (map.getString("name"))?.let { setName(it) }
                (map.getString("additionalInfo"))?.let { setAdditionalInfo(it) }
                map.getString("displayPicture")?.let { setDisplayPicture(it) }
                (map.getArray("departments")
                    ?.toArrayList() as? List<Map<String, Any?>>)?.map { departmentMap ->
                    SIQDepartment(
                        id = departmentMap["id"] as? String?,
                        name = departmentMap["name"] as? String?,
                        communicationMode = (departmentMap["communicationMode"] as? Int?)?.let {
                            CommunicationMode.entries[it]
                        })
                }?.let {
                    setDepartments(it)
                }
            }.build()
        }

        fun ReadableMap?.toMap(): Map<String, Any?>? {
            if (this == null) {
                return null
            }
            var map: Map<String, Any?>? = null
            try {
                val mapType = object : TypeToken<HashMap<String, Any?>>() {}.type
                map = gson.fromJson<Map<String, Any?>>(gson.toJson(this.toHashMap()), mapType)
            } catch (ignored: Exception) {
                Log.e(TAG, "Error converting ReadableMap to Map: ${ignored.message}") // No I18N
            }
            return map
        }

        @JvmStatic
        fun <T> SalesIQResult<T>.sendPromise(
            promise: Promise?,
            resultType: ResultType = ResultType.DirectValue,
        ) {
            promise?.let {
                if (isSuccess && data != null) {
                    val output = when (resultType) {
                        ResultType.ListMap -> {
                            data.toWritableArray()
                        }

                        ResultType.Map -> {
                            data.toWritableMap()
                        }

                        else -> {
                            data
                        }
                    }
                    it.resolve(output)
                } else {
                    it.reject(error?.code?.toString() ?: "UNKNOWN_ERROR", error?.message, null)
                }
            }
        }

        @JvmStatic
        fun <T> SalesIQResult<T>.sendPromise(
            promise: Promise?,
            value: Any?,
        ) {
            promise?.let {
                if (isSuccess && data != null) {
                    it.resolve(value)
                } else {
                    it.reject(error?.code?.toString() ?: "UNKNOWN_ERROR", error?.message, null)
                }
            }
        }

        fun Any?.toWritableMap(): WritableMap {
            if (this == null) {
                return WritableNativeMap()
            }
            val writableNativeMap = WritableNativeMap()
            var map: Map<String?, Any?>? = null
            if (this !is ReadableMap) {
                val mapType = object : TypeToken<Map<String?, Any?>?>() {}.type
                map = gson.fromJson<Map<String?, Any?>>(gson.toJson(this), mapType)
            }
            val readableMap = this as? ReadableMap ?: Arguments.makeNativeMap(map)
            val it = (readableMap).entryIterator
            while (it.hasNext()) {
                val entry = it.next()
                val key = convertToCamelCase(entry.key)
                val value = entry.value
                if (value == null) {
                    writableNativeMap.putNull(key)
                } else if (value is ReadableArray) {
                    writableNativeMap.putArray(key, value)
                } else if (value is String) {
                    writableNativeMap.putString(key, value)
                } else if (value is Number) {
                    if (value is Int) {
                        writableNativeMap.putInt(key, value)
                    } else {
                        writableNativeMap.putDouble(key, value.toDouble())
                    }
                } else if (value is Boolean) {
                    writableNativeMap.putBoolean(key, value)
                } else if (value is ReadableMap) {
                    writableNativeMap.putMap(key, value.toWritableMap())
                }
            }
            return writableNativeMap
        }

        fun Any?.toWritableArray(): WritableArray {
            if (this == null) {
                return WritableNativeArray()
            }
            val finalWritableNativeArray = WritableNativeArray()

            val mapType = object : TypeToken<List<Map<String?, Any?>?>?>() {}.type
            runCatching {
                val mapList = gson.fromJson<List<Map<String, Any>?>>(
                    gson.toJson(this), mapType
                )
                val writableNativeArray = Arguments.makeNativeArray(mapList)
                val size = writableNativeArray.size()
                for (index in 0 until size) {
                    finalWritableNativeArray.pushMap(
                        writableNativeArray.getMap(index).toWritableMap()
                    )
                }
            }
            return finalWritableNativeArray
        }

        fun List<WritableMap?>?.toWritableArray(): WritableArray {
            if (this == null) {
                return WritableNativeArray()
            }
            val finalWritableNativeArray = WritableNativeArray()
            runCatching {
                forEach {
                    finalWritableNativeArray.pushMap(it)
                }
            }
            return finalWritableNativeArray
        }

        internal fun convertToCamelCase(input: String?): String {
            val camelCase = StringBuilder(30)
            var capitalizeNext = false

            if (input != null) {
                for (c in input.toCharArray()) {
                    if (c == '_') {
                        capitalizeNext = true
                    } else {
                        camelCase.append(if (capitalizeNext) c.uppercaseChar() else c)
                        capitalizeNext = false
                    }
                }
            }

            return camelCase.toString()
        }

        fun getErrorMap(code: Int, message: String?): WritableMap {
            val errorMap: WritableMap = WritableNativeMap()
            errorMap.putInt("code", code)
            errorMap.putString("message", message)
            return errorMap
        }

        fun getEventEmitterObjectWithMap(eventName: String?, body: ReadableMap?): WritableMap? {
            return runCatching {
                val eventEmitterObject: WritableMap = WritableNativeMap()
                eventEmitterObject.putString("event", eventName) // No I18N
                eventEmitterObject.putMap("body", body) // No I18N
                return eventEmitterObject
            }.getOrNull()
        }
    }
}