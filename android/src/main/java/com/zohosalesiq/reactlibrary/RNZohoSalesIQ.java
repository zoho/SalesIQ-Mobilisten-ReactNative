package com.zohosalesiq.reactlibrary;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.Base64;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.content.res.AppCompatResources;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.zoho.commons.Fonts;
import com.zoho.commons.InitConfig;
import com.zoho.commons.ChatComponent;
import com.zoho.commons.LauncherModes;
import com.zoho.commons.LauncherProperties;
import com.zoho.commons.OnInitCompleteListener;
import com.zoho.livechat.android.MobilistenActivityLifecycleCallbacks;
import com.zoho.livechat.android.NotificationListener;
import com.zoho.livechat.android.SIQDepartment;
import com.zoho.livechat.android.SIQVisitor;
import com.zoho.livechat.android.SIQVisitorLocation;
import com.zoho.livechat.android.SalesIQCustomAction;
import com.zoho.livechat.android.VisitorChat;
import com.zoho.livechat.android.ZohoLiveChat;
import com.zoho.livechat.android.config.DeviceConfig;
import com.zoho.livechat.android.constants.ConversationType;
import com.zoho.livechat.android.constants.SalesIQConstants;
import com.zoho.livechat.android.exception.InvalidEmailException;
import com.zoho.livechat.android.listeners.ConversationListener;
import com.zoho.livechat.android.listeners.DepartmentListener;
import com.zoho.livechat.android.listeners.FAQCategoryListener;
import com.zoho.livechat.android.listeners.FAQListener;
import com.zoho.livechat.android.listeners.OperatorImageListener;
import com.zoho.livechat.android.listeners.RegisterListener;
import com.zoho.livechat.android.listeners.SalesIQActionListener;
import com.zoho.livechat.android.listeners.SalesIQChatListener;
import com.zoho.livechat.android.listeners.SalesIQCustomActionListener;
import com.zoho.livechat.android.listeners.SalesIQListener;
import com.zoho.livechat.android.listeners.UnRegisterListener;
import com.zoho.livechat.android.models.SalesIQArticle;
import com.zoho.livechat.android.models.SalesIQArticleCategory;
import com.zoho.livechat.android.modules.common.DataModule;
import com.zoho.livechat.android.modules.common.data.local.MobilistenEncryptedSharedPreferences;
import com.zoho.livechat.android.modules.common.domain.repositories.entities.DebugInfoData;
import com.zoho.livechat.android.modules.common.ui.LauncherUtil;
import com.zoho.livechat.android.modules.common.ui.LoggerUtil;
import com.zoho.livechat.android.modules.common.ui.lifecycle.SalesIQActivitiesManager;
import com.zoho.livechat.android.modules.common.ui.result.entities.SalesIQError;
import com.zoho.livechat.android.modules.commonpreferences.data.local.entities.CommonPreferencesLocalDataSource;
import com.zoho.livechat.android.modules.jwt.domain.entities.SalesIQAuth;
import com.zoho.livechat.android.modules.knowledgebase.ui.entities.Resource;
import com.zoho.livechat.android.modules.knowledgebase.ui.entities.ResourceCategory;
import com.zoho.livechat.android.modules.knowledgebase.ui.entities.ResourceDepartment;
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.OpenResourceListener;
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourceCategoryListener;
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourceDepartmentsListener;
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourceListener;
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.ResourcesListener;
import com.zoho.livechat.android.modules.knowledgebase.ui.listeners.SalesIQKnowledgeBaseListener;
import com.zoho.livechat.android.modules.notifications.sdk.entities.SalesIQNotificationPayload;
import com.zoho.livechat.android.operation.SalesIQApplicationManager;
import com.zoho.livechat.android.utils.LiveChatUtil;
import com.zoho.salesiqembed.ZohoSalesIQ;
import com.zoho.salesiqembed.ktx.GsonExtensionsKt;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class RNZohoSalesIQ extends ReactContextBaseJavaModule {

    private static String fcmToken = null;
    private static Boolean isTestDevice = true;
    static ReactApplicationContext reactContext = null;

    private static final String EVENT_SUPPORT_OPENED = "EVENT_SUPPORT_OPENED";  // No I18N
    private static final String EVENT_SUPPORT_CLOSED = "EVENT_SUPPORT_CLOSED";  // No I18N
    private static final String EVENT_CHATVIEW_OPENED = "EVENT_CHATVIEW_OPENED";  // No I18N
    private static final String EVENT_CHATVIEW_CLOSED = "EVENT_CHATVIEW_CLOSED";  // No I18N
    private static final String EVENT_CHAT_ATTENDED = "EVENT_CHAT_ATTENDED";  // No I18N
    private static final String EVENT_CHAT_MISSED = "EVENT_CHAT_MISSED";  // No I18N
    private static final String EVENT_CHAT_OPENED = "EVENT_CHAT_OPENED";  // No I18N
    private static final String EVENT_CHAT_CLOSED = "EVENT_CHAT_CLOSED";  // No I18N
    private static final String EVENT_CHAT_REOPENED = "EVENT_CHAT_REOPENED";  // No I18N
    private static final String EVENT_ARTICLE_LIKED = "EVENT_ARTICLE_LIKED";  // No I18N
    private static final String EVENT_ARTICLE_DISLIKED = "EVENT_ARTICLE_DISLIKED";  // No I18N
    private static final String EVENT_ARTICLE_OPENED = "EVENT_ARTICLE_OPENED";  // No I18N
    private static final String EVENT_ARTICLE_CLOSED = "EVENT_ARTICLE_CLOSED";  // No I18N
    private static final String EVENT_OPERATORS_ONLINE = "EVENT_OPERATORS_ONLINE";  // No I18N
    private static final String EVENT_OPERATORS_OFFLINE = "EVENT_OPERATORS_OFFLINE";  // No I18N
    private static final String EVENT_VISITOR_IPBLOCKED = "EVENT_VISITOR_IPBLOCKED";  // No I18N
    private static final String EVENT_FEEDBACK_RECEIVED = "EVENT_FEEDBACK_RECEIVED";  // No I18N
    private static final String EVENT_RATING_RECEIVED = "EVENT_RATING_RECEIVED";  // No I18N
    private static final String EVENT_PERFORM_CHATACTION = "EVENT_PERFORM_CHATACTION";  // No I18N
    private static final String EVENT_CUSTOMTRIGGER = "EVENT_CUSTOMTRIGGER";  // No I18N
    private static final String EVENT_BOT_TRIGGER = "EVENT_BOT_TRIGGER";  // No I18N
    private static final String EVENT_HANDLE_URL = "EVENT_HANDLE_URL";  // No I18N
    private static final String EVENT_OPEN_URL = "EVENT_OPEN_URL";  // No I18N
    private static final String EVENT_COMPLETE_CHAT_ACTION = "EVENT_COMPLETE_CHAT_ACTION";// No I18N
    private static final String EVENT_CHAT_QUEUE_POSITION_CHANGED =
            "EVENT_CHAT_QUEUE_POSITION_CHANGED";         // No I18N
    private static final String EVENT_CHAT_UNREAD_COUNT_CHANGED =
            "EVENT_CHAT_UNREAD_COUNT_CHANGED";         // No I18N

    private static final String EVENT_NOTIFICATION_CLICKED = "EVENT_NOTIFICATION_CLICKED";  // No I18N

    private static final String TYPE_OPEN = "OPEN";         // No I18N
    private static final String TYPE_CONNECTED = "CONNECTED";         // No I18N
    private static final String TYPE_CLOSED = "CLOSED";         // No I18N
    private static final String TYPE_ENDED = "ENDED";         // No I18N
    private static final String TYPE_MISSED = "MISSED";         // No I18N
    private static final String TYPE_WAITING = "WAITING";         // No I18N

    private static final String INFO_LOG = "INFO_LOG";         // No I18N
    private static final String WARNING_LOG = "WARNING_LOG";         // No I18N
    private static final String ERROR_LOG = "ERROR_LOG";         // No I18N

    private static final String SENDING = "SENDING";         // No I18N
    private static final String UPLOADING = "UPLOADING";         // No I18N
    private static final String SENT = "SENT";         // No I18N
    private static final String FAILURE = "FAILURE";         // No I18N

    private static final int INVALID_FILTER_CODE = 604;         // No I18N
    private static final String INVALID_FILTER_TYPE = "Invalid filter type";         // No I18N

    private static final int LAUNCHER_MODE_STATIC = 1;
    private static final int LAUNCHER_MODE_FLOATING = 2;

    private static final String EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY = "EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY";    // No I18N
    private static final String EVENT_VISITOR_REGISTRATION_FAILURE = "EVENT_VISITOR_REGISTRATION_FAILURE";    // No I18N

    private static final String LAUNCHER_VISIBILITY_MODE_ALWAYS = "LAUNCHER_VISIBILITY_MODE_ALWAYS";    // No I18N
    private static final String LAUNCHER_VISIBILITY_MODE_NEVER = "LAUNCHER_VISIBILITY_MODE_NEVER";  // No I18N
    private static final String LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT = "LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT";    // No I18N

    private static final String LAUNCHER_HORIZONTAL_LEFT = "LAUNCHER_HORIZONTAL_LEFT";  // No I18N
    private static final String LAUNCHER_HORIZONTAL_RIGHT = "LAUNCHER_HORIZONTAL_RIGHT";    // No I18N
    private static final String LAUNCHER_VERTICAL_TOP = "LAUNCHER_VERTICAL_TOP";    // No I18N
    private static final String LAUNCHER_VERTICAL_BOTTOM = "LAUNCHER_VERTICAL_BOTTOM";  // No I18N

    private static boolean shouldOpenUrl = true;

    private static Hashtable<String, SalesIQCustomActionListener> actionsList = new Hashtable<>();

    private static final Handler HANDLER = new Handler(Looper.getMainLooper());

    private static final String EVENT_RESOURCE_LIKED = "EVENT_RESOURCE_LIKED";  // No I18N
    private static final String EVENT_RESOURCE_DISLIKED = "EVENT_RESOURCE_DISLIKED";  // No I18N
    private static final String EVENT_RESOURCE_OPENED = "EVENT_RESOURCE_OPENED";  // No I18N
    private static final String EVENT_RESOURCE_CLOSED = "EVENT_RESOURCE_CLOSED";  // No I18N

    private static final String ACTION_SOURCE_APP = "APP";  // No I18N
    private static final String ACTION_SOURCE_SDK = "SDK";  // No I18N

    // Common event names;
    private static final String ZSIQ_EVENT_LISTENER = "ZSIQ_EVENT_LISTENER"; // No I18N
    private static final String CHAT_EVENT_LISTENER = "CHAT_EVENT_LISTENER"; // No I18N
    private static final String KNOWLEDGEBASE_EVENT_LISTENER = "KNOWLEDGEBASE_EVENT_LISTENER"; // No I18N
    private static final String NOTIFICATION_EVENT_LISTENER = "NOTIFICATION_EVENT_LISTENER"; // No I18N
    private static final String LAUNCHER_EVENT_LISTENER = "LAUNCHER_EVENT_LISTENER"; // No I18N

    private static Font customFont = null;

    static class Font {
        public String regular;
        public String medium;
    }

    enum Tab {
        CONVERSATIONS("TAB_CONVERSATIONS"),
        @Deprecated FAQ("TAB_FAQ"),
        KNOWLEDGE_BASE("TAB_KNOWLEDGE_BASE");

        final String name;

        Tab(String name) {
            this.name = name;
        }
    }

    public RNZohoSalesIQ(ReactApplicationContext reactContext) {
        super(reactContext);
        RNZohoSalesIQ.reactContext = reactContext;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("TYPE_CONNECTED", TYPE_CONNECTED);         // No I18N
        constants.put("TYPE_OPEN", TYPE_OPEN);         // No I18N
        constants.put("TYPE_WAITING", TYPE_WAITING);         // No I18N
        constants.put("TYPE_MISSED", TYPE_MISSED);         // No I18N
        constants.put("TYPE_ENDED", TYPE_ENDED);         // No I18N
        constants.put("TYPE_CLOSED", TYPE_CLOSED);         // No I18N

        constants.put("TAB_CONVERSATIONS", Tab.CONVERSATIONS.name);         // No I18N
        constants.put("TAB_FAQ", Tab.FAQ.name);         // No I18N
        constants.put("TAB_KNOWLEDGE_BASE", Tab.KNOWLEDGE_BASE.name);         // No I18N

        constants.put("SUPPORT_OPENED", EVENT_SUPPORT_OPENED);         // No I18N
        constants.put("SUPPORT_CLOSED", EVENT_SUPPORT_CLOSED);         // No I18N
        constants.put("CHATVIEW_OPENED", EVENT_CHATVIEW_OPENED);         // No I18N
        constants.put("CHATVIEW_CLOSED", EVENT_CHATVIEW_CLOSED);         // No I18N
        constants.put("OPERATORS_ONLINE", EVENT_OPERATORS_ONLINE);         // No I18N
        constants.put("OPERATORS_OFFLINE", EVENT_OPERATORS_OFFLINE);         // No I18N
        constants.put("VISITOR_IPBLOCKED", EVENT_VISITOR_IPBLOCKED);         // No I18N

        constants.put("CHAT_ATTENDED", EVENT_CHAT_ATTENDED);         // No I18N
        constants.put("CHAT_MISSED", EVENT_CHAT_MISSED);         // No I18N
        constants.put("CHAT_OPENED", EVENT_CHAT_OPENED);         // No I18N
        constants.put("CHAT_CLOSED", EVENT_CHAT_CLOSED);         // No I18N
        constants.put("CHAT_REOPENED", EVENT_CHAT_REOPENED);         // No I18N
        constants.put("FEEDBACK_RECEIVED", EVENT_FEEDBACK_RECEIVED);         // No I18N
        constants.put("RATING_RECEIVED", EVENT_RATING_RECEIVED);         // No I18N
        constants.put("PERFORM_CHATACTION", EVENT_PERFORM_CHATACTION);         // No I18N
        constants.put("CUSTOMTRIGGER", EVENT_CUSTOMTRIGGER);         // No I18N
        constants.put("BOT_TRIGGER", EVENT_BOT_TRIGGER);         // No I18N
        constants.put("EVENT_HANDLE_URL", EVENT_HANDLE_URL);         // No I18N
        constants.put("EVENT_OPEN_URL", EVENT_OPEN_URL);         // No I18N
        constants.put("EVENT_COMPLETE_CHAT_ACTION", EVENT_COMPLETE_CHAT_ACTION);         // No I18N
        constants.put("CHAT_QUEUE_POSITION_CHANGED", EVENT_CHAT_QUEUE_POSITION_CHANGED);  // No I18N
        constants.put("CHAT_UNREAD_COUNT_CHANGED", EVENT_CHAT_UNREAD_COUNT_CHANGED);  // No I18N

        constants.put("EVENT_RESOURCE_LIKED", EVENT_RESOURCE_LIKED);         // No I18N
        constants.put("EVENT_RESOURCE_DISLIKED", EVENT_RESOURCE_DISLIKED);         // No I18N
        constants.put("EVENT_RESOURCE_OPENED", EVENT_RESOURCE_OPENED);         // No I18N
        constants.put("EVENT_RESOURCE_CLOSED", EVENT_RESOURCE_CLOSED);         // No I18N

        constants.put("EVENT_NOTIFICATION_CLICKED", EVENT_NOTIFICATION_CLICKED);         // No I18N

        constants.put("ACTION_SOURCE_APP", ACTION_SOURCE_APP);         // No I18N
        constants.put("ACTION_SOURCE_SDK", ACTION_SOURCE_SDK);         // No I18N

        constants.put("ARTICLE_LIKED", EVENT_ARTICLE_LIKED);         // No I18N
        constants.put("ARTICLE_DISLIKED", EVENT_ARTICLE_DISLIKED);         // No I18N
        constants.put("ARTICLE_OPENED", EVENT_ARTICLE_OPENED);         // No I18N
        constants.put("ARTICLE_CLOSED", EVENT_ARTICLE_CLOSED);

        constants.put("LAUNCHER_MODE_STATIC", LAUNCHER_MODE_STATIC);         // No I18N
        constants.put("LAUNCHER_MODE_FLOATING", LAUNCHER_MODE_FLOATING);         // No I18N
        constants.put("EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY", EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY);         // No I18N
        constants.put("EVENT_VISITOR_REGISTRATION_FAILURE", EVENT_VISITOR_REGISTRATION_FAILURE);         // No I18N
        constants.put("LAUNCHER_VISIBILITY_MODE_ALWAYS", LAUNCHER_VISIBILITY_MODE_ALWAYS);         // No I18N
        constants.put("LAUNCHER_VISIBILITY_MODE_NEVER", LAUNCHER_VISIBILITY_MODE_NEVER);         // No I18N
        constants.put("LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT", LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT);         // No I18N
        constants.put("LAUNCHER_HORIZONTAL_RIGHT", LAUNCHER_HORIZONTAL_RIGHT);         // No I18N
        constants.put("LAUNCHER_HORIZONTAL_LEFT", LAUNCHER_HORIZONTAL_LEFT);         // No I18N
        constants.put("LAUNCHER_VERTICAL_TOP", LAUNCHER_VERTICAL_TOP);         // No I18N
        constants.put("LAUNCHER_VERTICAL_BOTTOM", LAUNCHER_VERTICAL_BOTTOM);         // No I18N

        constants.put("RESOURCE_ARTICLES", RESOURCE_ARTICLES);         // No I18N

        constants.put("CHAT_EVENT_LISTENER", CHAT_EVENT_LISTENER); // No I18N
        constants.put("KNOWLEDGEBASE_EVENT_LISTENER", KNOWLEDGEBASE_EVENT_LISTENER); // No I18N
        constants.put("NOTIFICATION_EVENT_LISTENER", NOTIFICATION_EVENT_LISTENER); // No I18N
        constants.put("LAUNCHER_EVENT_LISTENER", LAUNCHER_EVENT_LISTENER); // No I18N
        constants.put("ZSIQ_EVENT_LISTENER", ZSIQ_EVENT_LISTENER); // No I18N

        return constants;
    }

    @Override
    public String getName() {
        return "RNZohoSalesIQ";         // No I18N
    }

    private Bitmap convertToBitmap(Drawable drawable) {
        Bitmap bitmap;

        if (drawable instanceof BitmapDrawable) {
            BitmapDrawable bitmapDrawable = (BitmapDrawable) drawable;
            if (bitmapDrawable.getBitmap() != null) {
                return bitmapDrawable.getBitmap();
            }
        }

        if (drawable.getIntrinsicWidth() <= 0 || drawable.getIntrinsicHeight() <= 0) {
            bitmap = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888);
        } else {
            bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(),
                    drawable.getIntrinsicHeight(),
                    Bitmap.Config.ARGB_8888);
        }

        Canvas canvas = new Canvas(bitmap);
        drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
        drawable.draw(canvas);
        return bitmap;
    }

    @ReactMethod
    public void fetchAttenderImage(
            @NonNull String attenderId,
            @NonNull Boolean defaultImage,
            @NonNull final Callback imageCallback
    ) {
        ZohoSalesIQ.Chat.fetchAttenderImage(attenderId, defaultImage, new OperatorImageListener() {
            @Override
            public void onSuccess(Drawable drawable) {
                Bitmap bitmap = convertToBitmap(drawable);

                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos); //bm is the bitmap object
                byte[] byteArrayImage = baos.toByteArray();

                String encodedImage = Base64.encodeToString(byteArrayImage, Base64.DEFAULT);

                encodedImage = encodedImage.replace("\n", "");         // No I18N

                imageCallback.invoke(null, encodedImage);
            }

            @Override
            public void onFailure(int code, String message) {
                WritableMap errorMap = new WritableNativeMap();
                errorMap.putInt("code", code);         // No I18N
                errorMap.putString("message", message);         // No I18N
                imageCallback.invoke(errorMap, null);
            }
        });
    }

    @ReactMethod
    public void getChats(@NonNull final Callback listCallback) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.getList(new ConversationListener() {
            @Override
            public void onSuccess(ArrayList<VisitorChat> arrayList) {
                if (arrayList != null) {
                    WritableArray array = new WritableNativeArray();
                    for (int i = 0; i < arrayList.size(); i++) {
                        VisitorChat chat = arrayList.get(i);
                        WritableMap visitorMap = getChatMapObject(chat);
                        array.pushMap(visitorMap);
                    }
                    listCallback.invoke(null, array);
                }
            }

            @Override
            public void onFailure(int code, String message) {
                WritableMap errorMap = new WritableNativeMap();
                errorMap.putInt("code", code);         // No I18N
                errorMap.putString("message", message);         // No I18N
                listCallback.invoke(errorMap, null);
            }
        }));
    }

    @ReactMethod
    public void getChatsWithFilter(
            @NonNull final String filter,
            @NonNull final Callback listCallback
    ) {
        HANDLER.post(() -> {
            try {
                if (isValidFilterName(filter)) {
                    ConversationType filterName = getFilterName(filter);
                    ZohoSalesIQ.Chat.getList(filterName, new ConversationListener() {
                        @Override
                        public void onSuccess(ArrayList<VisitorChat> arrayList) {
                            if (arrayList != null) {
                                WritableArray array = new WritableNativeArray();

                                for (int i = 0; i < arrayList.size(); i++) {
                                    VisitorChat chat = arrayList.get(i);
                                    WritableMap visitorMap = getChatMapObject(chat);
                                    array.pushMap(visitorMap);
                                }
                                listCallback.invoke(null, array);
                            }
                        }

                        @Override
                        public void onFailure(int code, String message) {
                            WritableMap errorMap = new WritableNativeMap();
                            errorMap.putInt("code", code);         // No I18N
                            errorMap.putString("message", message);         // No I18N
                            listCallback.invoke(errorMap, null);
                        }
                    });
                } else {
                    WritableMap errorMap = new WritableNativeMap();
                    errorMap.putInt("code", INVALID_FILTER_CODE);         // No I18N
                    errorMap.putString("message", INVALID_FILTER_TYPE);         // No I18N
                    listCallback.invoke(errorMap, null);
                }
            } catch (Exception e) {
                LiveChatUtil.log(e);
            }
        });
    }

    @ReactMethod
    public void getDepartments(@NonNull final Callback departmentCallback) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.getDepartments(new DepartmentListener() {
            @Override
            public void onSuccess(ArrayList<SIQDepartment> departmentList) {
                if (departmentList != null) {
                    WritableArray array = new WritableNativeArray();
                    for (int i = 0; i < departmentList.size(); i++) {
                        SIQDepartment department = departmentList.get(i);
                        WritableMap departmentMap = getDepartmentMapObject(department);
                        array.pushMap(departmentMap);
                    }
                    departmentCallback.invoke(null, array);
                }
            }

            @Override
            public void onFailure(int code, String message) {
                WritableMap errorMap = new WritableNativeMap();
                errorMap.putInt("code", code);         // No I18N
                errorMap.putString("message", message);         // No I18N
                departmentCallback.invoke(errorMap, null);
            }
        }));
    }

    @ReactMethod
    public void isMultipleOpenChatRestricted(@NonNull final Callback callback) {
        callback.invoke(ZohoSalesIQ.Chat.isMultipleOpenRestricted());
    }

    @ReactMethod
    public void getArticles(@NonNull final Callback articlesCallback) {
        HANDLER.post(() -> ZohoSalesIQ.FAQ.getArticles(new FAQListener() {
            @Override
            public void onSuccess(ArrayList<SalesIQArticle> articlesList) {
                if (articlesList != null) {
                    WritableArray array = new WritableNativeArray();
                    for (int i = 0; i < articlesList.size(); i++) {
                        SalesIQArticle article = articlesList.get(i);
                        WritableMap articleMap = getArticleMapObject(article);
                        array.pushMap(articleMap);
                    }
                    articlesCallback.invoke(null, array);
                }
            }

            @Override
            public void onFailure(int code, String message) {
                WritableMap errorMap = new WritableNativeMap();
                errorMap.putInt("code", code);         // No I18N
                errorMap.putString("message", message);         // No I18N
                articlesCallback.invoke(errorMap, null);
            }
        }));
    }

    @ReactMethod
    public void getArticlesWithCategoryID(
            @NonNull final String categoryId,
            @NonNull final Callback articlesCallback
    ) {
        HANDLER.post(() -> ZohoSalesIQ.KnowledgeBase.getResources(ZohoSalesIQ.ResourceType.Articles, null, categoryId, null, false, new ResourcesListener() {
            @Override
            public void onSuccess(@NonNull List<Resource> resources, boolean moreDataAvailable) {
                WritableArray array = new WritableNativeArray();
                for (int i = 0; i < resources.size(); i++) {
                    array.pushMap(getArticleMapObject(resources.get(i)));
                }
                articlesCallback.invoke(null, array);
            }

            @Override
            public void onFailure(int code, @Nullable String message) {
                WritableMap errorMap = new WritableNativeMap();
                errorMap.putInt("code", code);         // No I18N
                errorMap.putString("message", message);         // No I18N
                articlesCallback.invoke(errorMap, null);
            }
        }));
    }

    @ReactMethod
    public void getCategories(@NonNull final Callback categoryCallback) {
        HANDLER.post(() -> ZohoSalesIQ.FAQ.getCategories(new FAQCategoryListener() {
            @Override
            public void onSuccess(ArrayList<SalesIQArticleCategory> categoryList) {
                if (categoryList != null) {
                    WritableArray array = new WritableNativeArray();

                    for (int i = 0; i < categoryList.size(); i++) {
                        SalesIQArticleCategory category = categoryList.get(i);

                        WritableMap categoryMap = new WritableNativeMap();
                        categoryMap.putString("id", category.getCategoryId());  // No I18N
                        categoryMap.putString(
                                "name",     // No I18N
                                category.getCategoryName()
                        );
                        categoryMap.putInt("articleCount", category.getCount());  // No I18N

                        array.pushMap(categoryMap);
                    }
                    categoryCallback.invoke(null, array);
                }
            }

            @Override
            public void onFailure(int code, String message) {
                WritableMap errorMap = new WritableNativeMap();
                errorMap.putInt("code", code);         // No I18N
                errorMap.putString("message", message);         // No I18N
                categoryCallback.invoke(errorMap, null);
            }
        }));
    }

    @ReactMethod
    public void openArticle(final String id, @NonNull final Callback articlesCallback) {
        HANDLER.post(() -> ZohoSalesIQ.KnowledgeBase.open(ZohoSalesIQ.ResourceType.Articles, id,
                new OpenResourceListener() {
                    @Override
                    public void onSuccess() {
                        articlesCallback.invoke("null");
                    }

                    @Override
                    public void onFailure(int code, @Nullable String message) {
                        WritableMap errorMap = new WritableNativeMap();
                        errorMap.putInt("code", code);         // No I18N
                        errorMap.putString("message", message);         // No I18N
                        articlesCallback.invoke(errorMap);
                    }
                }
        ));
    }

    private static boolean isCallbacksRegistered = false;

    public static void registerCallbacks(Application application) {
        if (!isCallbacksRegistered && application != null) {
            MobilistenActivityLifecycleCallbacks.register(application);
            RNZohoSalesIQListener rnZohoSalesIQListener = new RNZohoSalesIQListener();
            ZohoSalesIQ.setListener(rnZohoSalesIQListener);
            ZohoSalesIQ.Chat.setListener(rnZohoSalesIQListener);
            ZohoSalesIQ.KnowledgeBase.setListener(rnZohoSalesIQListener);
            ZohoSalesIQ.ChatActions.setListener(rnZohoSalesIQListener);
            ZohoSalesIQ.Notification.setListener(rnZohoSalesIQListener);
            isCallbacksRegistered = true;
            LiveChatUtil.log("Callbacks registered");
        }
    }

    @ReactMethod
    public void init(final String appKey, final String accessKey) {
        final Application application = getApplication();
        if (application != null) {
            registerCallbacks(application);
            HANDLER.post(() -> {
                initSalesIQ(application, getCurrentActivity(), appKey, accessKey, null);
            });
        }
    }

    @ReactMethod
    public void initWithCallback(
            final String appKey,
            final String accessKey,
            final Callback initCallback
    ) {
        Application application = getApplication();
        LiveChatUtil.log("initWithCallback, application: " + application);
        if (application != null) {
            registerCallbacks(application);
            HANDLER.post(() -> {
                initSalesIQ(application, getCurrentActivity(), appKey, accessKey, initCallback);
            });
        }
    }

    @Nullable
    private Application getApplication() {
        Activity activity = getCurrentActivity();
        return activity != null ? activity.getApplication() : (reactContext != null ? (reactContext.getApplicationContext() instanceof Application ? (Application) reactContext.getApplicationContext() : null) : null);
    }

    private static ZohoSalesIQ.Launcher.VisibilityMode getVisibilityMode(final String mode) {
        ZohoSalesIQ.Launcher.VisibilityMode visibilityMode = ZohoSalesIQ.Launcher.VisibilityMode.NEVER;
        if (LAUNCHER_VISIBILITY_MODE_ALWAYS.equals(mode)) {
            visibilityMode = ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS;
        } else if (LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT.equals(mode)) {
            visibilityMode = ZohoSalesIQ.Launcher.VisibilityMode.WHEN_ACTIVE_CHAT;
        }
        return visibilityMode;
    }

    @ReactMethod
    public static void showLauncher(final String mode) {
        ZohoSalesIQ.Launcher.show(getVisibilityMode(mode));
    }

    @ReactMethod
    public static void updateListener(final String listener) {

    }

    @ReactMethod
    public static void setVisibilityModeToCustomLauncher(final String mode) {
        ZohoSalesIQ.Launcher.setVisibilityModeToCustomLauncher(getVisibilityMode(mode));
    }

    @ReactMethod
    public static void enableDragToDismiss(final boolean enabled) {
        ZohoSalesIQ.Launcher.enableDragToDismiss(enabled);
    }

    @ReactMethod
    public static void setMinimumPressDuration(final int duration) {
        ZohoSalesIQ.Launcher.setMinimumPressDuration(duration);
    }

    @ReactMethod
    public void setChatTitle(final String title) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setTitle(title));
    }

    @ReactMethod
    public void hideQueueTime(final boolean hide) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.hideQueueTime(hide));
    }

    @ReactMethod
    public void setLanguage(final String code) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setLanguage(code));
    }

    @ReactMethod
    public void setDepartment(final String department) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setDepartment(department));
    }

    @ReactMethod
    public void setDepartments(final ArrayList department) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setDepartments(department));
    }

    @ReactMethod
    public void setOperatorEmail(final String email) {
        HANDLER.post(() -> {
            try {
                ZohoSalesIQ.Chat.setOperatorEmail(email);
            } catch (InvalidEmailException e) {
                LiveChatUtil.log(e);
            }
        });
    }

    @ReactMethod
    public void showOperatorImageInChat(final Boolean visible) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.operatorImage, visible));
    }

    @ReactMethod
    public void setFeedbackVisibility(final Boolean visible) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.feedback, visible));
    }

    @ReactMethod
    public void setRatingVisibility(final Boolean visible) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.rating, visible));
    }

    @ReactMethod
    public void showOperatorImageInLauncher(final Boolean show) {
        HANDLER.post(() -> {
            Activity activity = getCurrentActivity();
            if (activity != null && ZohoSalesIQ.getApplicationManager() != null) {
                ZohoSalesIQ.getApplicationManager().setCurrentActivity(activity);
                ZohoSalesIQ.Chat.showOperatorImageInLauncher(show);
            }
        });
    }

    @ReactMethod
    public void openChat() {
        HANDLER.post(() -> ZohoSalesIQ.Chat.show());
    }

    @ReactMethod
    public void openChatWithID(final String chat_id) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.open(chat_id));
    }

    @ReactMethod
    public void showPayloadChat(final ReadableMap result) {
        String chatId;
        if (result.hasKey("chatId")) {
            chatId = result.getString("chatId");
        } else if (result.hasKey("payload")) {
            ReadableMap payload = result.getMap("payload"); // No I18N
            if (payload != null && payload.hasKey("chatId")) {
                chatId = payload.getString("chatId");
            } else {
                chatId = null;
            }
        } else {
            chatId = null;
        }
        if (chatId != null) {
            LiveChatUtil.log("Opening payload chat with id: " + chatId);
            HANDLER.post(() -> ZohoSalesIQ.Chat.open(chatId));
        }
    }

    @ReactMethod
    public void showOfflineMessage(final Boolean show) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.showOfflineMessage(show));
    }

    @ReactMethod
    public void endChat(final String chat_id) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.endChat(chat_id));
    }

    @ReactMethod
    public void setLauncherVisibility(final Boolean visible) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.showLauncher(visible));
    }

    @ReactMethod
    public void setVisitorName(final String name) {
        HANDLER.post(() -> ZohoSalesIQ.Visitor.setName(name));
    }

    @ReactMethod
    public void setVisitorEmail(final String email) {
        HANDLER.post(() -> ZohoSalesIQ.Visitor.setEmail(email));
    }

    @ReactMethod
    public void setVisitorContactNumber(final String number) {
        HANDLER.post(() -> ZohoSalesIQ.Visitor.setContactNumber(number));
    }

    @ReactMethod
    public void setVisitorAddInfo(final String key, final String value) {
        HANDLER.post(() -> ZohoSalesIQ.Visitor.addInfo(key, value));
    }

    @ReactMethod
    public void setQuestion(final String question) {
        HANDLER.post(() -> ZohoSalesIQ.Visitor.setQuestion(question));
    }

    @ReactMethod
    public void startChat(final String question) {
        HANDLER.post(() -> ZohoSalesIQ.Visitor.startChat(question));
    }

    @ReactMethod
    public void setConversationVisibility(final Boolean visible) {
        HANDLER.post(() -> ZohoSalesIQ.Conversation.setVisibility(visible));
    }

    @ReactMethod
    public void setConversationListTitle(final String title) {
        HANDLER.post(() -> ZohoSalesIQ.Conversation.setTitle(title));
    }

    @ReactMethod
    public void setFAQVisibility(final Boolean visible) {
        HANDLER.post(() -> ZohoSalesIQ.KnowledgeBase.setVisibility(ZohoSalesIQ.ResourceType.Articles, visible));
    }

    @ReactMethod
    public void registerVisitor(final String uniqueid, final Callback callback) {
        HANDLER.post(() -> {
            ZohoSalesIQ.registerVisitor(uniqueid, new RegisterListener() {
                @Override
                public void onSuccess() {
                    callback.invoke(null, Boolean.TRUE);
                }

                @Override
                public void onFailure(int code, String message) {
                    callback.invoke(getErrorMap(code, message), Boolean.FALSE);
                }
            });
        });
    }

    @ReactMethod
    public void unregisterVisitor(final Callback callback) {
        HANDLER.post(() -> ZohoSalesIQ.unregisterVisitor(getCurrentActivity(), new UnRegisterListener() {
            @Override
            public void onSuccess() {
                callback.invoke(null, Boolean.TRUE);
            }

            @Override
            public void onFailure(int code, String message) {
                callback.invoke(getErrorMap(code, message), Boolean.FALSE);
            }
        }));
    }

    @ReactMethod
    public void setPageTitle(final String title) {
        HANDLER.post(() -> ZohoSalesIQ.Tracking.setPageTitle(title));
    }

    @ReactMethod
    public void setCustomAction(final String actionName) {
        HANDLER.post(() -> ZohoSalesIQ.Tracking.setCustomAction(actionName));
    }

    @ReactMethod
    public void performCustomAction(final String actionName, final boolean shouldOpenChatWindow) {
        HANDLER.post(() -> ZohoSalesIQ.Tracking.setCustomAction(actionName, shouldOpenChatWindow));
    }

    @ReactMethod
    public void enableInAppNotification() {
        HANDLER.post(() -> ZohoSalesIQ.Notification.enableInApp());
    }

    @ReactMethod
    public void disableInAppNotification() {
        HANDLER.post(() -> ZohoSalesIQ.Notification.disableInApp());
    }

    @ReactMethod
    public void setThemeColorforiOS(String color_code) {

    }

    private static @Nullable ChatComponent getChatComponent(final String componentName) {
        ChatComponent chatComponent = null;
        switch (componentName) {
            case "OPERATOR_IMAGE":
                chatComponent = ChatComponent.operatorImage;
                break;
            case "RATING":
                chatComponent = ChatComponent.rating;
                break;
            case "FEEDBACK":
                chatComponent = ChatComponent.feedback;
                break;
            case "SCREENSHOT":
                chatComponent = ChatComponent.screenshot;
                break;
            case "PRE_CHAT_FORM":
                chatComponent = ChatComponent.prechatForm;
                break;
            case "VISITOR_NAME":
                chatComponent = ChatComponent.visitorName;
                break;
            case "EMAIL_TRANSCRIPT":
                chatComponent = ChatComponent.emailTranscript;
                break;
            case "FILE_SHARE":
                chatComponent = ChatComponent.fileShare;
                break;
            case "MEDIA_CAPTURE":
                chatComponent = ChatComponent.mediaCapture;
                break;
            case "END":
                chatComponent = ChatComponent.end;
                break;
            case "END_WHEN_IN_QUEUE":
                chatComponent = ChatComponent.endWhenInQueue;
                break;
            case "END_WHEN_BOT_CONNECTED":
                chatComponent = ChatComponent.endWhenBotConnected;
                break;
            case "END_WHEN_OPERATOR_CONNECTED":
                chatComponent = ChatComponent.endWhenOperatorConnected;
                break;
            case "REOPEN":
                chatComponent = ChatComponent.reopen;
                break;
            default:
        }
        return chatComponent;
    }

    @ReactMethod
    public static void setChatComponentVisibility(final String chatComponentName, final boolean visibility) {
        HANDLER.post(() -> {
            ChatComponent chatComponent = getChatComponent(chatComponentName);
            if (chatComponent != null) {
                ZohoSalesIQ.Chat.setVisibility(chatComponent, visibility);
            }
        });
    }

    @ReactMethod
    public void setVisitorNameVisibility(final boolean visibility) {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.visitorName, visibility));
    }

    @ReactMethod
    public void enablePreChatForms() {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.prechatForm, true));
    }

    @ReactMethod
    public void disablePreChatForms() {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.prechatForm, false));
    }

    @ReactMethod
    public void enableScreenshotOption() {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.screenshot, true));
    }

    @ReactMethod
    public void disableScreenshotOption() {
        HANDLER.post(() -> ZohoSalesIQ.Chat.setVisibility(ChatComponent.screenshot, false));
    }

    @ReactMethod
    public void registerChatAction(final String actionName) {
        HANDLER.post(() -> ZohoSalesIQ.ChatActions.register(actionName));
    }

    @ReactMethod
    public void unregisterChatAction(final String actionName) {
        HANDLER.post(() -> ZohoSalesIQ.ChatActions.unregister(actionName));
    }

    @ReactMethod
    public void unregisterAllChatActions() {
        HANDLER.post(() -> ZohoSalesIQ.ChatActions.unregisterAll());
    }

    @ReactMethod
    public void setChatActionTimeout(final double timeout) {
        HANDLER.post(() -> ZohoSalesIQ.ChatActions.setTimeout((long) timeout * 1000));
    }

    @ReactMethod
    public void completeChatAction(final String uuid) {
        HANDLER.post(() -> {
            SalesIQCustomActionListener listener;
            listener = actionsList.get(uuid);
            if (listener != null) {
                listener.onSuccess();
            }
            if (actionsList != null) {
                actionsList.remove(uuid);
            }
        });
    }

    @ReactMethod
    public void completeChatActionWithMessage(
            final String uuid,
            final boolean success,
            final String message
    ) {
        HANDLER.post(() -> {
            SalesIQCustomActionListener listener = actionsList.get(uuid);
            if (listener != null) {
                if (success) {
                    if (message != null) {
                        listener.onSuccess(message);
                    }
                }
            }
        });
    }

    @ReactMethod
    public void setVisitorLocation(final ReadableMap visitorLocation) {
        SIQVisitorLocation siqVisitorLocation = new SIQVisitorLocation();

        if (visitorLocation.hasKey("latitude")) {
            siqVisitorLocation.setLatitude(visitorLocation.getDouble("latitude"));  // No I18N
        }
        if (visitorLocation.hasKey("longitude")) {
            siqVisitorLocation.setLongitude(visitorLocation.getDouble("longitude"));  // No I18N
        }
        if (visitorLocation.hasKey("country")) {
            siqVisitorLocation.setCountry(visitorLocation.getString("country"));  // No I18N
        }
        if (visitorLocation.hasKey("city")) {
            siqVisitorLocation.setCity(visitorLocation.getString("city"));  // No I18N
        }
        if (visitorLocation.hasKey("state")) {
            siqVisitorLocation.setState(visitorLocation.getString("state"));  // No I18N
        }
        if (visitorLocation.hasKey("countryCode")) {
            siqVisitorLocation.setCountryCode(
                    visitorLocation.getString("countryCode")  // No I18N
            );
        }
        if (visitorLocation.hasKey("zipCode")) {
            siqVisitorLocation.setZipCode(visitorLocation.getString("zipCode"));  // No I18N
        }
        ZohoSalesIQ.Visitor.setLocation(siqVisitorLocation);
    }

    @ReactMethod
    public void syncThemeWithOsForAndroid(final boolean sync) {
        HANDLER.post(() -> ZohoSalesIQ.syncThemeWithOS(sync));
    }

    @ReactMethod
    public void isChatEnabled(@NonNull final Callback callback) {
        HANDLER.post(() -> callback.invoke(ZohoSalesIQ.isSDKEnabled()));
    }

    @ReactMethod
    public void getChatUnreadCount(@NonNull final Callback callback) {
        HANDLER.post(() -> callback.invoke(ZohoSalesIQ.Notification.getBadgeCount()));
    }

    @ReactMethod
    public void setLauncherPropertiesForAndroid(final ReadableMap launcherPropertiesMap) {
        HANDLER.post(() -> {
            int mode = LauncherModes.FLOATING;
            if (launcherPropertiesMap.hasKey("mode")) {
                mode = launcherPropertiesMap.getInt("mode");
            }
            LauncherProperties launcherProperties = new LauncherProperties(mode);
            if (launcherPropertiesMap.hasKey("x")) {
                int x = launcherPropertiesMap.getInt("x");
                if (x > -1) {
                    launcherProperties.setX(x);
                }
            }
            if (launcherPropertiesMap.hasKey("y")) {
                int y = launcherPropertiesMap.getInt("y");
                if (y > -1) {
                    launcherProperties.setY(y);
                }
            }
            if (launcherPropertiesMap.hasKey("horizontalDirection")) {
                LauncherProperties.Horizontal horizontalDirection = null;
                if (LAUNCHER_HORIZONTAL_LEFT.equals(launcherPropertiesMap.getString(
                        "horizontalDirection"))) {
                    horizontalDirection = LauncherProperties.Horizontal.LEFT;
                } else if (LAUNCHER_HORIZONTAL_RIGHT.equals(launcherPropertiesMap.getString(
                        "horizontalDirection"))) {
                    horizontalDirection = LauncherProperties.Horizontal.RIGHT;
                }
                if (horizontalDirection != null) {
                    launcherProperties.setDirection(horizontalDirection);
                }
            }
            if (launcherPropertiesMap.hasKey("verticalDirection")) {
                LauncherProperties.Vertical verticalDirection = null;
                if (LAUNCHER_VERTICAL_TOP.equals(launcherPropertiesMap.getString(
                        "verticalDirection"))) {
                    verticalDirection = LauncherProperties.Vertical.TOP;
                } else if (LAUNCHER_VERTICAL_BOTTOM.equals(launcherPropertiesMap.getString(
                        "verticalDirection"))) {
                    verticalDirection = LauncherProperties.Vertical.BOTTOM;
                }
                if (verticalDirection != null) {
                    launcherProperties.setDirection(verticalDirection);
                }
            }
            if (launcherPropertiesMap.hasKey("icon") &&
                    launcherPropertiesMap.getString("icon") != null &&
                    ZohoSalesIQ.getApplicationManager() != null &&
                    ZohoSalesIQ.getApplicationManager().getApplication() != null
            ) {
                int resourceId = getDrawableResourceId(launcherPropertiesMap.getString("icon"));
                Drawable drawable =
                        AppCompatResources.getDrawable(ZohoSalesIQ.getApplicationManager().getApplication(), resourceId);
                if (resourceId > 0) {
                    launcherProperties.setIcon(drawable);
                }
            }
            ZohoSalesIQ.setLauncherProperties(launcherProperties);
        });
    }

    @ReactMethod
    public static void refreshLauncherPropertiesForAndroid() {
        HANDLER.post(() -> {
            SalesIQApplicationManager salesIQApplicationManager =
                    ZohoSalesIQ.getApplicationManager();
            if (salesIQApplicationManager != null && salesIQApplicationManager.getCurrentActivity() != null
                    && LauncherUtil.isAllowedToShow(salesIQApplicationManager.getCurrentActivity())) {
                LauncherUtil.showChatBubble(salesIQApplicationManager.getCurrentActivity());
            }
        });
    }

    @ReactMethod
    public static void refreshLauncher() {

    }

    private static boolean hasAnyEventListeners = false;

    @ReactMethod
    public void addListener(String eventName) {
        hasAnyEventListeners = true;
        LiveChatUtil.log("Add listener, Event: " + eventName + " added ");
        if (pendingEvents != null && !pendingEvents.isEmpty()) {
            if (reactContext.hasCatalystInstance()) {
                for (Map.Entry<String, Object> entry : pendingEvents.entrySet()) {
                    eventEmitter(entry.getKey(), entry.getValue());
                }
                pendingEvents = null;
            } else {
                LiveChatUtil.log("Add listener, pending events ignored " + (pendingEvents == null));
            }
        }
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    public static void handleNotification(final Application application, final Map extras) {
        HANDLER.post(() -> {
            ZohoSalesIQ.Notification.handle(application, extras);
        });
    }

    @ReactMethod
    void processNotificationMessage(final ReadableMap extras) {
        HANDLER.post(() -> {
            ZohoSalesIQ.Notification.handle(reactContext.getApplicationContext(), extras.toHashMap());
        });
    }

    @ReactMethod
    public static void isSDKMessage(final ReadableMap map, final Callback callback) {
        callback.invoke(ZohoSalesIQ.Notification.isZohoSalesIQNotification(map.toHashMap()));
    }

    public static boolean isSDKMessage(Map extras) {
        return ZohoSalesIQ.Notification.isZohoSalesIQNotification(extras);
    }

    @ReactMethod
    void registerPush(final String fcmToken, final boolean isTestDevice) {
        enablePush(fcmToken, isTestDevice);
    }

    @ReactMethod
    void getNotificationPayload(final ReadableMap readableMap, final Callback callback) {
        Map<String, String> map = getMap(readableMap.toHashMap());
        if (map != null) {
            ZohoSalesIQ.Notification.getPayload(map, result -> {
                if (result.isSuccess()) {
                    SalesIQNotificationPayload payload = result.getData();
                    callback.invoke(getNotificationPayloadMap(payload));
                } else {
                    callback.invoke((Object) null);
                }
            });
        } else {
            callback.invoke((Object) null);
        }
    }

    @ReactMethod
    void setNotificationActionSource(String actionSource) {
        ZohoLiveChat.Notification.setActionSource(getActionSource(actionSource));
    }

    @Nullable
    private static WritableMap getNotificationPayloadMap(SalesIQNotificationPayload payload) {
        WritableMap resultMap = new WritableNativeMap();
        resultMap.putMap("payload", getWritableMap(payload));   // No I18N
        if (payload instanceof SalesIQNotificationPayload.Chat) {
            resultMap.putString("type", "chat");    // No I18N
        } else if (payload instanceof SalesIQNotificationPayload.VisitorHistory) {
            resultMap.putString("type", "visitorHistory"); // No I18N
        } else if (payload instanceof SalesIQNotificationPayload.EndChatDetails) {
            resultMap.putString("type", "endChatDetails");  // No I18N
        } else {
            resultMap = null;
        }
        return resultMap;
    }

    ZohoSalesIQ.ActionSource getActionSource(String actionSourceString) {
        ZohoSalesIQ.ActionSource actionSource;
        if (ACTION_SOURCE_APP.equals(actionSourceString)) {
            actionSource = ZohoSalesIQ.ActionSource.APP;
        } else {
            actionSource = ZohoSalesIQ.ActionSource.SDK;
        }
        return actionSource;
    }

    public static void enablePush(String token, Boolean testDevice) {
        fcmToken = token;
        isTestDevice = testDevice;
        ZohoSalesIQ.Notification.enablePush(token, isTestDevice);
    }

    private static void initSalesIQ(
            final Application application,
            final Activity activity,
            final String appKey,
            final String accessKey,
            final Callback initCallback
    ) {
        if (application != null) {
            final boolean[] canInvokeCallBack = {true};
            ZohoSalesIQ.setPlatformName(SalesIQConstants.Platform.REACT_NATIVE);
            InitConfig initConfig = null;
            if (customFont != null) {
                initConfig = new InitConfig();
                initConfig.setFont(Fonts.REGULAR, customFont.regular);
                initConfig.setFont(Fonts.MEDIUM, customFont.medium);
            }
            ZohoSalesIQ.init(application, appKey, accessKey, initConfig, new OnInitCompleteListener() {
                @Override
                public void onInitComplete() {
                    if (fcmToken != null) {
                        ZohoSalesIQ.Notification.enablePush(fcmToken, isTestDevice);
                    }
                    if (activity != null && ZohoSalesIQ.getApplicationManager() != null) {
                        LauncherUtil.refreshLauncher();
                    }
                    if (initCallback != null && canInvokeCallBack[0]) {
                        canInvokeCallBack[0] = false;
                        initCallback.invoke(true);
                    }
                }

                @Override
                public void onInitError() {
                    if (initCallback != null && canInvokeCallBack[0]) {
                        canInvokeCallBack[0] = false;
                        initCallback.invoke(false);
                    }
                }
            });
            if (activity != null && ZohoSalesIQ.getApplicationManager() != null) {
                ZohoSalesIQ.getApplicationManager().setCurrentActivity(activity);
                ZohoSalesIQ.getApplicationManager().setAppActivity(activity);
            }
        }
    }

    @ReactMethod
    void present(final String tabString, final String id, final Callback callback) {
        HANDLER.post(() -> {
            ZohoSalesIQ.Tab tab = getTab(tabString);
            ZohoSalesIQ.present(tab, id, result -> {
                if (callback != null) {
                    if (result.isSuccess()) {
                        callback.invoke(null, result.getData());
                    } else {
                        SalesIQError error = result.getError();
                        callback.invoke(getErrorMap(error.getCode(), error.getMessage()), null);
                    }
                }
            });
        });
    }

    @ReactMethod
    static void setCustomFont(final ReadableMap map) {
        ReadableMap regular = map.getMap("regular");    // No I18N
        ReadableMap medium = map.getMap("medium");  // No I18N
        String regularPath = regular != null ? regular.getString("path") : null;    // No I18N
        String mediumPath = medium != null ? medium.getString("path") : null;   // No I18N
        if (regularPath != null || mediumPath != null) {
            customFont = new Font();
            customFont.regular = regularPath != null ? LiveChatUtil.getString(regularPath) : null;
            customFont.medium = mediumPath != null ? LiveChatUtil.getString(mediumPath) : null;
        } else {
            customFont = null;
        }
    }

    private static ZohoSalesIQ.Tab getTab(String tab) {
        ZohoSalesIQ.Tab tabType = null;
        if (tab != null) {
            if (Tab.CONVERSATIONS.name.equals(tab)) {
                tabType = ZohoSalesIQ.Tab.Conversations;
            } else if (Tab.KNOWLEDGE_BASE.name.equals(tab) || Tab.FAQ.name.equals(tab)) {
                tabType = ZohoSalesIQ.Tab.KnowledgeBase;
            }
        }
        return tabType;
    }

    public static void eventEmitter(String event, Object value) {
        if (reactContext != null && hasAnyEventListeners) {
            LiveChatUtil.log("eventEmitter, Send event: " + event);
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(event, value);
            LiveChatUtil.log("eventEmitter, Event: " + event + " sent");
        } else {
            LiveChatUtil.log("eventEmitter, Added pending event: " + event);
            if (pendingEvents == null) {
                pendingEvents = new HashMap<>();
            }
            pendingEvents.put(event, value);
        }
    }

    private static HashMap<String, Object> pendingEvents = null;

    private Boolean isValidFilterName(String filterName) {
        for (ConversationType type : ConversationType.values()) {
            if (type.name().equals(filterName)) {
                return true;
            }
        }
        return false;
    }

    private ConversationType getFilterName(String filter) {
        switch (filter) {
            case TYPE_WAITING:
                return ConversationType.WAITING;
            case TYPE_OPEN:
                return ConversationType.OPEN;
            case TYPE_CLOSED:
                return ConversationType.CLOSED;
            case TYPE_MISSED:
                return ConversationType.MISSED;
            case TYPE_ENDED:
                return ConversationType.ENDED;
            default:
                return ConversationType.CONNECTED;
        }
    }

    public static WritableMap getChatMapObject(VisitorChat chat) {
        WritableMap visitorMap = new WritableNativeMap();
        visitorMap.putString("id", chat.getChatID());         // No I18N
        visitorMap.putInt("unreadCount", chat.getUnreadCount());         // No I18N
        visitorMap.putBoolean("isBotAttender", chat.isBotAttender());         // No I18N
        if (chat.getQueuePosition() > 0) {
            visitorMap.putInt("queuePosition", chat.getQueuePosition());         // No I18N
        }
        if (chat.getQuestion() != null) {
            visitorMap.putString("question", chat.getQuestion());         // No I18N
        }
        if (chat.getDepartmentName() != null) {
            visitorMap.putString("departmentName", chat.getDepartmentName());         // No I18N
        }
        if (chat.getChatStatus() != null) {
            visitorMap.putString("status", chat.getChatStatus());         // No I18N
        }

        VisitorChat.SalesIQMessage lastMessage = chat.getLastMessage();
        if (lastMessage != null) {
            WritableMap lastMessageMap = new WritableNativeMap();
            if (lastMessage.getText() != null) {
                visitorMap.putString("lastMessage", lastMessage.getText());         // No I18N
                lastMessageMap.putString("text", lastMessage.getText());         // No I18N
            }
            if (lastMessage.getSender() != null) {
                visitorMap.putString("lastMessageSender", lastMessage.getSender());         // No I18N
                lastMessageMap.putString("sender", lastMessage.getSender());    // No I18N
            }
            if (lastMessage.getTime() != null && lastMessage.getTime() > 0) {
                visitorMap.putString("lastMessageTime", LiveChatUtil.getString(lastMessage.getTime()));         // No I18N
                lastMessageMap.putString("time", LiveChatUtil.getString(lastMessage.getTime()));         // No I18N
            }
            // lastMessageMap.putString("sender_id", lastMessage.getSenderId());   // No I18N
            // lastMessageMap.putString("type", lastMessage.getType());    // No I18N
            lastMessageMap.putBoolean("is_read", lastMessage.isRead()); // No I18N
            // lastMessageMap.putBoolean("sent_by_visitor", lastMessage.getSentByVisitor());   // No I18N
            // if (lastMessage.getStatus() != null) {
            //     String status = null;
            //     switch (lastMessage.getStatus()) {
            //         case Sending:
            //             status = SENDING;
            //             break;
            //         case Uploading:
            //             status = UPLOADING;
            //             break;
            //         case Sent:
            //             status = SENT;
            //             break;
            //         case Failure:
            //             status = FAILURE;
            //             break;
            //     }
            //     lastMessageMap.putString("status", status); // No I18N
            // }
            VisitorChat.SalesIQMessage.SalesIQFile salesIQFile = lastMessage.getFile();
            WritableMap fileMap = new WritableNativeMap();
            if (salesIQFile != null) {
                fileMap.putString("name", salesIQFile.getName());   // No I18N
                fileMap.putString("content_type", salesIQFile.getContentType());    // No I18N
                fileMap.putString("comment", salesIQFile.getComment()); // No I18N
                fileMap.putDouble("size", LiveChatUtil.getDouble(salesIQFile.getSize())); // No I18N
                lastMessageMap.putMap("file", fileMap);    // No I18N
            }
            visitorMap.putMap("recentMessage", lastMessageMap);         // No I18N
        }

        if (chat.getAttenderName() != null) {
            visitorMap.putString("attenderName", chat.getAttenderName());         // No I18N
        }
        if (chat.getAttenderId() != null) {
            visitorMap.putString("attenderID", chat.getAttenderId());         // No I18N
        }
        if (chat.getAttenderEmail() != null) {
            visitorMap.putString("attenderEmail", chat.getAttenderEmail());         // No I18N
        }
        if (chat.getFeedbackMessage() != null) {
            visitorMap.putString("feedback", chat.getFeedbackMessage());         // No I18N
        }
        if (chat.getRating() != null) {
            visitorMap.putString("rating", chat.getRating());         // No I18N
        }

        return visitorMap;
    }

    public WritableMap getArticleMapObject(Resource resource) {
        WritableMap articleMap = new WritableNativeMap();
        if (resource != null) {
            articleMap.putString("id", resource.getId());   // No I18N
            articleMap.putString("name", resource.getTitle());  // No I18N
            if (resource.getStats() != null) {
                articleMap.putInt("likeCount", resource.getStats().getLiked()); // No I18N
                articleMap.putInt("dislikeCount", resource.getStats().getDisliked());   // No I18N
                articleMap.putInt("viewCount", resource.getStats().getViewed());    // No I18N
            }
            if (resource.getCategory() != null) {
                if (resource.getCategory().getId() != null) {
                    articleMap.putString("categoryID", resource.getCategory().getId()); // No I18N
                }
                if (resource.getCategory().getName() != null) {
                    articleMap.putString("categoryName", resource.getCategory().getName()); // No I18N
                }
            }
        }
        return articleMap;
    }

    public WritableMap getArticleMapObject(SalesIQArticle article) {
        WritableMap articleMap = new WritableNativeMap();
        articleMap.putString("id", article.getId());         // No I18N
        articleMap.putString("name", article.getTitle());         // No I18N
        articleMap.putInt("likeCount", article.getLiked());         // No I18N
        articleMap.putInt("dislikeCount", article.getDisliked());         // No I18N
        articleMap.putInt("viewCount", article.getViewed());         // No I18N
        if (article.getCategoryId() != null) {
            articleMap.putString("categoryID", article.getCategoryId());         // No I18N
        }
        if (article.getCategoryName() != null) {
            articleMap.putString("categoryName", article.getCategoryName());         // No I18N
        }
        return articleMap;
    }

    public WritableMap getDepartmentMapObject(SIQDepartment department) {
        WritableMap departmentMap = new WritableNativeMap();
        departmentMap.putString("id", department.id);         // No I18N
        departmentMap.putString("name", department.name);         // No I18N
        departmentMap.putBoolean("available", department.available);         // No I18N
        return departmentMap;
    }

    public static WritableMap getVisitorInfoObject(SIQVisitor siqVisitor) {
        WritableMap infoMap = new WritableNativeMap();
        if (siqVisitor.getName() != null) {
            infoMap.putString("name", siqVisitor.getName());         // No I18N
        }
        if (siqVisitor.getEmail() != null) {
            infoMap.putString("email", siqVisitor.getEmail());         // No I18N
        }
        if (siqVisitor.getPhone() != null) {
            infoMap.putString("phone", siqVisitor.getPhone());         // No I18N
        }
        infoMap.putString("numberOfChats", LiveChatUtil.getString(siqVisitor.getNumberOfChats()));         // No I18N
        if (siqVisitor.getCity() != null) {
            infoMap.putString("city", siqVisitor.getCity());         // No I18N
        }
        if (siqVisitor.getIp() != null) {
            infoMap.putString("ip", siqVisitor.getIp());         // No I18N
        }
        if (siqVisitor.getFirstVisitTime() != null) {
            Date firstVisitTime = siqVisitor.getFirstVisitTime();
            infoMap.putString("firstVisitTime", LiveChatUtil.getString(firstVisitTime.getTime()));         // No I18N
        }
        if (siqVisitor.getLastVisitTime() != null) {
            Date lastVisitTime = siqVisitor.getLastVisitTime();
            infoMap.putString("lastVisitTime", LiveChatUtil.getString(lastVisitTime.getTime()));         // No I18N
        }
        if (siqVisitor.getRegion() != null) {
            infoMap.putString("region", siqVisitor.getRegion());         // No I18N
        }
        if (siqVisitor.getOs() != null) {
            infoMap.putString("os", siqVisitor.getOs());         // No I18N
        }
        if (siqVisitor.getCountryCode() != null) {
            infoMap.putString("countryCode", siqVisitor.getCountryCode());         // No I18N
        }
        if (siqVisitor.getBrowser() != null) {
            infoMap.putString("browser", siqVisitor.getBrowser());         // No I18N
        }
        if (siqVisitor.getTotalTimeSpent() != null) {
            infoMap.putString("totalTimeSpent", siqVisitor.getTotalTimeSpent());         // No I18N
        }
        infoMap.putString("numberOfVisits",
                LiveChatUtil.getString(siqVisitor.getNumberOfVisits()));         // No I18N
        infoMap.putString("noOfDaysVisited",
                LiveChatUtil.getString(siqVisitor.getNoOfDaysVisited()));         // No I18N
        if (siqVisitor.getState() != null) {
            infoMap.putString("state", siqVisitor.getState());         // No I18N
        }
        if (siqVisitor.getSearchEngine() != null) {
            infoMap.putString("searchEngine", siqVisitor.getSearchEngine());         // No I18N
        }
        if (siqVisitor.getSearchQuery() != null) {
            infoMap.putString("searchQuery", siqVisitor.getSearchQuery());         // No I18N
        }
        return infoMap;
    }

    public static WritableMap getEventEmitterObjectWithMap(String eventName, ReadableMap body) {
        try {
            WritableMap eventEmitterObject = new WritableNativeMap();
            eventEmitterObject.putString("event", eventName); // No I18N
            eventEmitterObject.putMap("body", body); // No I18N
            return eventEmitterObject;
        } catch (Exception e) {
            return null;
        }
    }

    public static WritableMap getEventEmitterObjectWithBoolean(String eventName, Boolean body) {
        WritableMap eventEmitterObject = new WritableNativeMap();
        eventEmitterObject.putString("event", eventName); // No I18N
        eventEmitterObject.putBoolean("body", body); // No I18N
        return eventEmitterObject;
    }

    public static class RNZohoSalesIQListener implements SalesIQListener, SalesIQChatListener, SalesIQKnowledgeBaseListener, SalesIQActionListener, NotificationListener {
        @Override
        public void handleFeedback(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(EVENT_FEEDBACK_RECEIVED, visitorMap.copy());
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_FEEDBACK_RECEIVED, visitorMap));
        }

        @Override
        public void handleQueuePositionChange(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(EVENT_CHAT_QUEUE_POSITION_CHANGED, visitorMap.copy());
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_QUEUE_POSITION_CHANGED, visitorMap));
        }

        @Override
        public void handleRating(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_RATING_RECEIVED, visitorMap.copy()));
            // DEPRECATED
            eventEmitter(EVENT_RATING_RECEIVED, visitorMap);
        }

        @Override
        public void handleOperatorsOnline() {
            eventEmitter(ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_OPERATORS_ONLINE, null));
            // DEPRECATED
            eventEmitter(EVENT_OPERATORS_ONLINE, null);
        }

        @Override
        public void handleOperatorsOffline() {
            eventEmitter(ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_OPERATORS_OFFLINE, null));
            // DEPRECATED
            eventEmitter(EVENT_OPERATORS_OFFLINE, null);
        }

        @Override
        public void handleResourceOpened(@NonNull ZohoSalesIQ.ResourceType resourceType, @Nullable Resource resource) {
            WritableMap resourceMap = new WritableNativeMap();
            resourceMap.putString("type", RESOURCE_ARTICLES);       // No I18N
            resourceMap.putMap("resource", getWritableMap(resource));       // No I18N
            eventEmitter(EVENT_RESOURCE_OPENED, resourceMap.copy());

            eventEmitter(KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_RESOURCE_OPENED, resourceMap));

            eventEmitter(EVENT_ARTICLE_OPENED, resource != null ? resource.getId() : null);
        }

        @Override
        public void handleResourceClosed(@NonNull ZohoSalesIQ.ResourceType resourceType, @Nullable Resource resource) {
            WritableMap resourceMap = new WritableNativeMap();
            resourceMap.putString("type", RESOURCE_ARTICLES);       // No I18N
            resourceMap.putMap("resource", getWritableMap(resource));       // No I18N
            eventEmitter(EVENT_RESOURCE_CLOSED, resourceMap.copy());

            eventEmitter(KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_RESOURCE_CLOSED, resourceMap));
            eventEmitter(EVENT_ARTICLE_CLOSED, resource != null ? resource.getId() : null);
        }

        @Override
        public void handleResourceLiked(@NonNull ZohoSalesIQ.ResourceType resourceType, @Nullable Resource resource) {
            WritableMap resourceMap = new WritableNativeMap();
            resourceMap.putString("type", RESOURCE_ARTICLES);       // No I18N
            resourceMap.putMap("resource", getWritableMap(resource));       // No I18N
            eventEmitter(EVENT_RESOURCE_LIKED, resourceMap.copy());

            eventEmitter(KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_RESOURCE_LIKED, resourceMap));

            eventEmitter(EVENT_ARTICLE_LIKED, resource != null ? resource.getId() : null);
        }

        @Override
        public void handleResourceDisliked(@NonNull ZohoSalesIQ.ResourceType resourceType, @Nullable Resource resource) {
            WritableMap resourceMap = new WritableNativeMap();
            resourceMap.putString("type", RESOURCE_ARTICLES);       // No I18N
            resourceMap.putMap("resource", getWritableMap(resource));       // No I18N
            eventEmitter(EVENT_RESOURCE_DISLIKED, resourceMap.copy());
            eventEmitter(KNOWLEDGEBASE_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_RESOURCE_DISLIKED, resourceMap));

            eventEmitter(EVENT_ARTICLE_DISLIKED, resource != null ? resource.getId() : null);
        }

        @Override
        public void handleSupportOpen() {
            eventEmitter(ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_SUPPORT_OPENED, null));
            // DEPRECATED
            eventEmitter(EVENT_SUPPORT_OPENED, null);
        }

        @Override
        public void handleSupportClose() {
            eventEmitter(ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_SUPPORT_CLOSED, null));
            // DEPRECATED
            eventEmitter(EVENT_SUPPORT_CLOSED, null);
        }

        @Override
        public void handleChatViewOpen(String id) {
            WritableMap chatMap = new WritableNativeMap();
            chatMap.putString("id", id); // No I18N
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHATVIEW_OPENED, chatMap));
            // DEPRECATED
            eventEmitter(EVENT_CHATVIEW_OPENED, id);
        }

        @Override
        public void handleChatViewClose(String id) {
            WritableMap chatMap = new WritableNativeMap();
            chatMap.putString("id", id); // No I18N
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHATVIEW_CLOSED, chatMap));
            // DEPRECATED
            eventEmitter(EVENT_CHATVIEW_CLOSED, id);
        }

        @Override
        public void handleIPBlock() {
            eventEmitter(ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_VISITOR_IPBLOCKED, null));
            // DEPRECATED
            eventEmitter(EVENT_VISITOR_IPBLOCKED, null);
        }

        @Override
        public void handleTrigger(String triggerName, SIQVisitor visitor) {
            WritableMap visitorInfoMap = getVisitorInfoObject(visitor);
            WritableMap triggerMap = new WritableNativeMap();
            triggerMap.putString("triggerName", triggerName);         // No I18N
            triggerMap.putMap("visitorInformation", visitorInfoMap);         // No I18N

            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CUSTOMTRIGGER, triggerMap.copy()));

            // DEPRECATED
            eventEmitter(EVENT_CUSTOMTRIGGER, triggerMap);
        }

        @Override
        public void handleBotTrigger() {
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_BOT_TRIGGER, null));
            eventEmitter(EVENT_BOT_TRIGGER, null);
        }

        @Override
        public void handleCustomLauncherVisibility(boolean visible) {
            WritableMap launcherMap = new WritableNativeMap();
            launcherMap.putBoolean("visible", visible); // No I18N
            eventEmitter(LAUNCHER_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY, launcherMap));
            // DEPRECATED
            eventEmitter(EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY, visible);
        }

        @Nullable
        @Override
        public SalesIQAuth onVisitorRegistrationFailed(@NonNull SalesIQError salesIQError) {
            WritableMap eventMap = new WritableNativeMap();
            eventMap.putInt("code", salesIQError.getCode());    // No I18N
            if (salesIQError.getMessage() != null) {
                eventMap.putString("message", salesIQError.getMessage());   // No I18N
            }
            eventEmitter(ZSIQ_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_VISITOR_REGISTRATION_FAILURE, eventMap));
            return null;
        }

        @Override
        public void handleChatOpened(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_OPENED, visitorMap.copy()));
            // DEPRECATED
            eventEmitter(EVENT_CHAT_OPENED, visitorMap);
        }

        @Override
        public void handleChatClosed(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_CLOSED, visitorMap.copy()));

            eventEmitter(EVENT_CHAT_CLOSED, visitorMap);
        }

        @Override
        public void handleChatAttended(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_ATTENDED, visitorMap.copy()));

            eventEmitter(EVENT_CHAT_ATTENDED, visitorMap);
        }

        @Override
        public void handleChatMissed(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_MISSED, visitorMap.copy()));

            eventEmitter(EVENT_CHAT_MISSED, visitorMap);
        }

        @Override
        public void handleChatReOpened(VisitorChat visitorChat) {
            WritableMap visitorMap = getChatMapObject(visitorChat);
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_REOPENED, visitorMap.copy()));

            eventEmitter(EVENT_CHAT_REOPENED, visitorMap);
        }

        @Override
        public void handleCustomAction(
                SalesIQCustomAction salesIQCustomAction,
                final SalesIQCustomActionListener salesIQCustomActionListener
        ) {
            UUID uuid = UUID.randomUUID();

            final WritableMap actionDetailsMap = new WritableNativeMap();
            actionDetailsMap.putString("uuid", uuid.toString());         // No I18N
            actionDetailsMap.putString("elementID", salesIQCustomAction.elementID); // No I18N
            actionDetailsMap.putString("label", salesIQCustomAction.label);         // No I18N
            actionDetailsMap.putString("name", salesIQCustomAction.name);         // No I18N
            actionDetailsMap.putString("clientActionName", salesIQCustomAction.clientActionName);         // No I18N

            actionsList.put(uuid.toString(), salesIQCustomActionListener);
            // DEPRECATED
            eventEmitter(EVENT_PERFORM_CHATACTION, actionDetailsMap.copy());
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_PERFORM_CHATACTION, actionDetailsMap));
        }

        @Override
        public void onBadgeChange(int count) {
            WritableMap countMap = new WritableNativeMap();
            countMap.putInt("count", count); // No I18N
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_CHAT_UNREAD_COUNT_CHANGED, countMap));

            eventEmitter(EVENT_CHAT_UNREAD_COUNT_CHANGED, count);
        }

        @Override
        public void onClick(@Nullable Context context, @NonNull SalesIQNotificationPayload payload) {
            LiveChatUtil.log("NotificationListener onClick Received");
            WritableMap notificationPayloadMap = getNotificationPayloadMap(payload);
            if (notificationPayloadMap != null) {
                eventEmitter(EVENT_NOTIFICATION_CLICKED, notificationPayloadMap.copy());

                eventEmitter(NOTIFICATION_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_NOTIFICATION_CLICKED, notificationPayloadMap));
            }
            if (SalesIQActivitiesManager.getInstance().isActivityStackEmpty(true)) {
                Intent intent = null;
                if (context != null) {
                    intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                } else if (reactContext != null && reactContext.getApplicationContext() != null) {
                    context = reactContext.getApplicationContext();
                    intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                    if (intent != null) {
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    }
                }
                if (intent != null) {
                    context.startActivity(intent);
                }
            }
        }

        @Override
        public boolean handleUri(final Uri uri, final VisitorChat visitorChat) {
            WritableMap visitorChatMap = getChatMapObject(visitorChat);
            WritableMap chatMap = new WritableNativeMap();
            chatMap.putMap("chat", visitorChatMap.copy()); // No I18N
            chatMap.putString("url", uri.toString()); // No I18N
            eventEmitter(CHAT_EVENT_LISTENER, getEventEmitterObjectWithMap(EVENT_HANDLE_URL, chatMap));
            // DEPRECATED
            visitorChatMap.putString("url", uri.toString());    // No I18N
            eventEmitter(EVENT_HANDLE_URL, visitorChatMap);
            return shouldOpenUrl;
        }
    }

    @ReactMethod
    public void sendEvent(final String event, final ReadableArray objects) {
        HANDLER.post(() -> {
            switch (event) {
                case EVENT_OPEN_URL:
                    if (!shouldOpenUrl && objects.size() == 1) {
                        LiveChatUtil.openUri(reactContext, Uri.parse(objects.getString(0)));
                    }
                    break;
                case EVENT_COMPLETE_CHAT_ACTION:
                    if (objects.size() > 0) {
                        String uuid = objects.getString(0);
                        boolean success = objects.size() <= 1 || objects.getBoolean(1);
                        String message = objects.size() == 3 ? objects.getString(2) : null;
                        if (uuid != null && !uuid.isEmpty()) {
                            SalesIQCustomActionListener listener = actionsList.get(uuid);
                            if (listener != null) {
                                if (message != null && !message.isEmpty()) {
                                    if (success) {
                                        listener.onSuccess(message);
                                    } else {
                                        listener.onFailure(message);
                                    }
                                } else {
                                    if (success) {
                                        listener.onSuccess();
                                    } else {
                                        listener.onFailure();
                                    }
                                }
                            }
                            if (actionsList != null) {
                                actionsList.remove(uuid);
                            }
                        }
                    }
                    break;
                case EVENT_VISITOR_REGISTRATION_FAILURE:
                    if (objects.size() > 0) {
                        Object auth = objects.getMap(0);
                        if (auth instanceof ReadableNativeMap) {
                            handleVisitorRegistrationFailure((ReadableNativeMap) auth);
                        }
                    }
                    break;
            }
        });
    }

    private static void handleVisitorRegistrationFailure(ReadableNativeMap map) {
        if (map.hasKey("type")) {
            String type = map.getString("type");
            String userId = map.getString("userId");
            if ("registered_visitor".equals(type)) {
                if (userId != null && !TextUtils.isEmpty(userId)) {
                    LiveChatUtil.log("MobilistenEncryptedSharedPreferences- re-registering visitor");   // No I18N
                    LiveChatUtil.registerVisitor(userId, new RegisterListener() {
                        @Override
                        public void onSuccess() {
                            LoggerUtil.logDebugInfo(new DebugInfoData.VisitorFailureReRegistrationAcknowledged(userId));
                            LiveChatUtil.log("MobilistenEncryptedSharedPreferences- re-registering visitor success");   // No I18N
                            if (DataModule.getSharedPreferences().contains(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES) && DataModule.getSharedPreferences().getBoolean(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES, true)) {
                                if (DeviceConfig.getPreferences() != null) {
                                    DeviceConfig.getPreferences().edit().putBoolean(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged, true).commit();
                                }
                            } else {
                                DataModule.getSharedPreferences().edit().remove(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged).commit();
                            }
                        }
                        @Override
                        public void onFailure(int code, String message) {
                        }
                    });
                }
            } else if ("guest".equals(type)) {
                LiveChatUtil.log("MobilistenEncryptedSharedPreferences- Guest user acknowledged");
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("avuid", LiveChatUtil.getAVUID());
                } catch (Exception e) {
                    LiveChatUtil.log(e);
                }
                LoggerUtil.logDebugInfo(new DebugInfoData.VisitorFailureGuestAcknowledged(jsonObject.toString()));
                if (DataModule.getSharedPreferences().contains(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES) && DataModule.getSharedPreferences().getBoolean(MobilistenEncryptedSharedPreferences.ARE_NEW_ENCRYPTED_KEYS_PRESENT_IN_DEFAULT_PREFERENCES, true)) {
                    if (DeviceConfig.getPreferences() != null) {
                        DeviceConfig.getPreferences().edit().putBoolean(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged, true).commit();
                    }
                } else {
                    DataModule.getSharedPreferences().edit().remove(CommonPreferencesLocalDataSource.SharedPreferenceKeys.IsEncryptedSharedPreferenceFailureAcknowledged).commit();
                }
            }
        }
    }

    @ReactMethod
    public void shouldOpenUrl(final boolean value) {
        shouldOpenUrl = value;
    }

    @ReactMethod
    public void setTabOrder(final ReadableArray tabNames) {
        /** @apiNote Please remove the -1 below when the {@link ZohoSalesIQ.Tab.FAQ} is removed */
        int minimumTabOrdersSize = Math.min(tabNames.size(), ZohoSalesIQ.Tab.values().length - 1);
        ZohoSalesIQ.Tab[] tabOrder = new ZohoSalesIQ.Tab[minimumTabOrdersSize];
        int insertIndex = 0;
        for (int index = 0; index < minimumTabOrdersSize; index++) {
            String tabName = tabNames.getString(index);
            if (Tab.CONVERSATIONS.name.equals(tabName)) {
                tabOrder[insertIndex++] = ZohoSalesIQ.Tab.Conversations;
            } else if (Tab.FAQ.name.equals(tabName) || Tab.KNOWLEDGE_BASE.name.equals(tabName)) {
                tabOrder[insertIndex++] = ZohoSalesIQ.Tab.KnowledgeBase;
            }
        }
        ZohoSalesIQ.setTabOrder(tabOrder);
    }

    @ReactMethod
    public void printDebugLogsForAndroid(final Boolean value) {
        ZohoSalesIQ.printDebugLogs(value);
    }

    @ReactMethod
    public void updateConfiguration(final String key, final Boolean value) {
        if ("NeutralRatingDisabled".equals(key)) {
            System.setProperty("binaryRating", value.toString());
        }
    }

    @ReactMethod
    void setNotificationIconForAndroid(final String drawableName) {
        int resourceId = getDrawableResourceId(drawableName);
        if (resourceId > 0) {
            ZohoSalesIQ.Notification.setIcon(resourceId);
        }
    }

    @ReactMethod
    void setThemeForAndroid(final String name) {
        int resourceId = getStyleResourceId(name);
        if (resourceId > 0) {
            ZohoSalesIQ.setTheme(resourceId);
        }
    }


    private int getStyleResourceId(String id) {
        SalesIQApplicationManager salesIQApplicationManager = ZohoSalesIQ.getApplicationManager();
        int resourceId = 0;
        if (salesIQApplicationManager != null && salesIQApplicationManager.getApplication() != null) {
            resourceId = salesIQApplicationManager.getApplication().getResources().getIdentifier(
                    id, "style",   // No I18N
                    ZohoSalesIQ.getApplicationManager().getApplication().getPackageName());

        }
        return resourceId;
    }

    private int getDrawableResourceId(String drawableName) {
        SalesIQApplicationManager salesIQApplicationManager = ZohoSalesIQ.getApplicationManager();
        int resourceId = 0;
        if (salesIQApplicationManager != null && salesIQApplicationManager.getApplication() != null) {
            resourceId = salesIQApplicationManager.getApplication().getResources().getIdentifier(
                    drawableName, "drawable",   // No I18N
                    ZohoSalesIQ.getApplicationManager().getApplication().getPackageName());

        }
        return resourceId;
    }

    @ReactMethod
    void setLoggerEnabled(final boolean value) {
        ZohoSalesIQ.Logger.setEnabled(value);
    }

    @ReactMethod
    void isLoggerEnabled(final Callback callback) {
        HANDLER.post(() -> callback.invoke(ZohoSalesIQ.Logger.isEnabled()));
    }

    @ReactMethod
    void clearLogsForiOS() {}

    @ReactMethod
    void setLoggerPathForiOS(final String value) {}

    @ReactMethod
    void writeLogForiOS(final String message, final String logLevel, final Callback callback) {}

    @ReactMethod
    static void dismissUI() {
        ZohoSalesIQ.dismissUI();
    }

    @ReactMethod
    static void showFeedbackAfterSkip(final boolean enable) {
        ZohoSalesIQ.Chat.showFeedbackAfterSkip(enable);
    }

    @ReactMethod
    static void showFeedbackUpToDuration(final int duration) {
        ZohoSalesIQ.Chat.showFeedback(duration);
    }

    @ReactMethod
    static void startNewChat(final String question, final String customChatId, final String departmentName, final Callback callback) {
        final Callback[] finalCallback = {callback};
        ZohoSalesIQ.Chat.start(question, customChatId, departmentName, result -> {
            if (finalCallback[0] != null) {
                if (result.isSuccess()) {
                    VisitorChat visitorChat = result.getData();
                    WritableMap visitorMap = getChatMapObject(visitorChat);
                    finalCallback[0].invoke(null, visitorMap);
                } else {
                    SalesIQError error = result.getError();
                    finalCallback[0].invoke(getErrorMap(error.getCode(), error.getMessage()), null);
                }
            }
            finalCallback[0] = null;
        });
    }

    @ReactMethod
    static void startNewChatWithTrigger(final String customChatId, final String departmentName, final Callback callback) {
        final Callback[] finalCallback = {callback};
        ZohoSalesIQ.Chat.startWithTrigger(customChatId, departmentName, result -> {
            if (finalCallback[0] != null) {
                if (result.isSuccess()) {
                    VisitorChat visitorChat = result.getData();
                    WritableMap visitorMap = getChatMapObject(visitorChat);
                    finalCallback[0].invoke(null, visitorMap);
                } else {
                    SalesIQError error = result.getError();
                    finalCallback[0].invoke(getErrorMap(error.getCode(), error.getMessage()), null);
                }
            }
            finalCallback[0] = null;
        });
    }

    @ReactMethod
    static void getChat(final String chatId, final Callback callback) {
        ZohoSalesIQ.Chat.get(chatId, result -> {
            if (callback != null) {
                if (result.isSuccess()) {
                    VisitorChat visitorChat = result.getData();
                    WritableMap visitorMap = getChatMapObject(visitorChat);
                    callback.invoke(null, visitorMap);
                } else {
                    SalesIQError error = result.getError();
                    callback.invoke(getErrorMap(error.getCode(), error.getMessage()), null);
                }
            }
        });
    }

    @ReactMethod
    static void setChatWaitingTime(final int seconds) {
        ZohoSalesIQ.Chat.setWaitingTime(seconds);
    }

    public static final String RESOURCE_ARTICLES = "RESOURCE_ARTICLES";    // No I18N

    private @Nullable ZohoSalesIQ.ResourceType getResourceType(String value) {
        ZohoSalesIQ.ResourceType resourceType;
        if (RESOURCE_ARTICLES.equals(value)) {
            resourceType = ZohoSalesIQ.ResourceType.Articles;
        } else {
            resourceType = null;
        }
        return resourceType;
    }

    @ReactMethod
    public void isKnowledgeBaseEnabled(final String type, final Callback callback) {
        executeIfResourceTypeIsValid(type, callback, () -> callback.invoke(ZohoSalesIQ.KnowledgeBase.isEnabled(getResourceType(type))));
    }

    @ReactMethod
    public static void setKnowledgeBaseRecentlyViewedCount(final int limit) {
        ZohoSalesIQ.KnowledgeBase.setRecentlyViewedCount(limit);
    }

    @ReactMethod
    public void setKnowledgeBaseVisibility(final String type, final boolean shouldShow) {
        executeIfResourceTypeIsValid(type, null, () -> ZohoSalesIQ.KnowledgeBase.setVisibility(getResourceType(type), shouldShow));
    }

    @ReactMethod
    public void categorizeKnowledgeBase(final String type, final boolean shouldCategorize) {
        executeIfResourceTypeIsValid(type, null, () -> ZohoSalesIQ.KnowledgeBase.categorize(getResourceType(type), shouldCategorize));
    }

    @ReactMethod
    public void combineKnowledgeBaseDepartments(final String type, final boolean merge) {
        executeIfResourceTypeIsValid(type, null, () -> ZohoSalesIQ.KnowledgeBase.combineDepartments(getResourceType(type), merge));
    }

    //void  setRecentShowLimit(String type) {
    //   ZohoSalesIQ.KnowledgeBase.setRecentShowLimit(value)
    // }

    @ReactMethod
    public void getKnowledgeBaseResourceDepartments(final Callback callback) {
        ZohoSalesIQ.KnowledgeBase.getResourceDepartments(new ResourceDepartmentsListener() {
            @Override
            public void onSuccess(@NonNull List<ResourceDepartment> resourceDepartments) {
                callback.invoke(null, getWritableArray(resourceDepartments));
            }

            @Override
            public void onFailure(int code, @Nullable String message) {
                callback.invoke(getErrorMap(code, message), null);
            }
        });
    }

    @ReactMethod
    public void openKnowledgeBase(final String type, final String id, final Callback callback) {
        executeIfResourceTypeIsValid(type, callback, () -> ZohoSalesIQ.KnowledgeBase.open(getResourceType(type), id, new OpenResourceListener() {
            @Override
            public void onSuccess() {
                callback.invoke(null, Boolean.TRUE);
            }

            @Override
            public void onFailure(int code, @Nullable String message) {
                callback.invoke(getErrorMap(code, message), null);
            }
        }));
    }

    @ReactMethod
    public void getKnowledgeBaseSingleResource(final String type, final String id, final Callback callback) {
        executeIfResourceTypeIsValid(type, callback, () -> ZohoSalesIQ.KnowledgeBase.getSingleResource(getResourceType(type), id, new ResourceListener() {
            @Override
            public void onSuccess(@Nullable Resource resource) {
                callback.invoke(null, getWritableMap(resource));
            }

            @Override
            public void onFailure(int code, @Nullable String message) {
                callback.invoke(getErrorMap(code, message), null);
            }
        }));
    }

    @ReactMethod
    public void getKnowledgeBaseResources(final String type, final String departmentID, final String parentCategoryID, final int page, final int limit, final String searchKey, final Callback callback) {
        executeIfResourceTypeIsValid(type, callback, () -> ZohoSalesIQ.KnowledgeBase.getResources(getResourceType(type), departmentID, parentCategoryID, searchKey, page, limit, false, new ResourcesListener() {
            @Override
            public void onSuccess(@NonNull List<Resource> resources, boolean moreDataAvailable) {
                callback.invoke(null, getWritableArray(resources), moreDataAvailable);
            }

            @Override
            public void onFailure(int code, @Nullable String message) {
                callback.invoke(getErrorMap(code, message), null);
            }
        }));
    }

    @ReactMethod
    public void getKnowledgeBaseCategories(final String type, final String departmentID, final String parentCategoryID, final Callback callback) {
        executeIfResourceTypeIsValid(type, callback, () -> ZohoSalesIQ.KnowledgeBase.getCategories(getResourceType(type), departmentID, parentCategoryID, new ResourceCategoryListener() {
            @Override
            public void onSuccess(@NonNull List<ResourceCategory> resourceCategories) {
                callback.invoke(null, getWritableArray(resourceCategories));
            }

            @Override
            public void onFailure(int code, @Nullable String message) {
                callback.invoke(getErrorMap(code, message), null);
            }
        }));
    }

    @ReactMethod
    public void setThemeColor(final ReadableMap theme) {

    }

    static WritableArray getWritableArray(Object object) {
        WritableNativeArray finalWritableNativeArray = new WritableNativeArray();
        if (object != null) {
            Type mapType = new TypeToken<List<Map<String, Object>>>() {}.getType();
            List<Map<String, Object>> mapList = GsonExtensionsKt.fromJsonSafe(DataModule.getGson(), DataModule.getGson().toJson(object), mapType);
            WritableNativeArray writableNativeArray = Arguments.makeNativeArray(mapList);
            int size = writableNativeArray.size();
            for (int index = 0; index < size; index++) {
                finalWritableNativeArray.pushMap(getWritableMap(writableNativeArray.getMap(index)));
            }
        }
        return finalWritableNativeArray;
    }

    static <K, V> Map<K, V> getMap(HashMap<?, ?> readableMap) {
        Map<K, V> map = null;
        try {
            Type mapType = new TypeToken<Map<K, V>>() {}.getType();
            map = GsonExtensionsKt.fromJsonSafe(DataModule.getGson(), DataModule.getGson().toJson(readableMap), mapType);
        } catch (Exception ignored) {}
        return map;
    }

    static WritableMap getWritableMap(Object object) {
        WritableNativeMap writableNativeMap = new WritableNativeMap();
        if (object != null) {
            Map<String, Object> map = null;
            if (!(object instanceof ReadableMap)) {
                Type mapType = new TypeToken<Map<String, Object>>() {}.getType();
                map = GsonExtensionsKt.fromJsonSafe(DataModule.getGson(), DataModule.getGson().toJson(object), mapType);
            }
            ReadableMap readableMap = object instanceof ReadableMap ? (ReadableMap) object : Arguments.makeNativeMap(map);
            for (Iterator<Map.Entry<String, Object>> it = (readableMap).getEntryIterator(); it.hasNext(); ) {
                Map.Entry<String, Object> entry = it.next();
                String key = convertToCamelCase(entry.getKey());
                Object value = entry.getValue();
                if (value == null) {
                    writableNativeMap.putNull(key);
                } else if (value instanceof ReadableArray) {
                    writableNativeMap.putArray(key, (ReadableArray) value);
                } else if (value instanceof String) {
                    writableNativeMap.putString(key, (String) value);
                } else if (value instanceof Number) {
                    if (value instanceof Integer) {
                        writableNativeMap.putInt(key, (Integer) value);
                    } else {
                        writableNativeMap.putDouble(key, ((Number) value).doubleValue());
                    }
                } else if (value instanceof Boolean) {
                    writableNativeMap.putBoolean(key, (Boolean) value);
                } else if (value instanceof ReadableMap) {
                    writableNativeMap.putMap(key, getWritableMap(value));
                }
            }
        }
        return writableNativeMap;
    }

    static String convertToCamelCase(String input) {
        StringBuilder camelCase = new StringBuilder(30);
        boolean capitalizeNext = false;

        if (input != null) {
            for (char c : input.toCharArray()) {
                if (c == '_') {
                    capitalizeNext = true;
                } else {
                    camelCase.append(capitalizeNext ? Character.toUpperCase(c) : c);
                    capitalizeNext = false;
                }
            }
        }

        return camelCase.toString();
    }

    static WritableMap getErrorMap(int code, String message) {
        WritableMap errorMap = new WritableNativeMap();
        errorMap.putInt("code", code);         // No I18N
        errorMap.putString("message", message);         // No I18N
        return errorMap;
    }

    private void executeIfResourceTypeIsValid(String type, Callback callback, Runnable runnable) {
        ZohoSalesIQ.ResourceType resourceType = getResourceType(type);
        if (resourceType != null) {
            runnable.run();
        } else {
            if (callback != null) {
                callback.invoke(getResourceTypeErrorMap());
            }
        }
    }

    static WritableMap getResourceTypeErrorMap() {
        WritableMap errorMap = new WritableNativeMap();
        errorMap.putInt("code", 100);         // No I18N
        errorMap.putString("message", "Invalid resource type");         // No I18N
        return errorMap;
    }
}
