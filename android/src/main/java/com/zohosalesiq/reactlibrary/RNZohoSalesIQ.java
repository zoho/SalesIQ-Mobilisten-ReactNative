package com.zohosalesiq.reactlibrary;

import android.app.Activity;
import android.app.Application;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Handler;
import android.os.Looper;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.zoho.commons.OnInitCompleteListener;
import com.zoho.livechat.android.SIQVisitor;
import com.zoho.livechat.android.SIQVisitorLocation;
import com.zoho.livechat.android.SalesIQCustomAction;
import com.zoho.livechat.android.VisitorChat;
import com.zoho.livechat.android.constants.ConversationType;
import com.zoho.livechat.android.constants.SalesIQConstants;
import com.zoho.livechat.android.exception.InvalidEmailException;
import com.zoho.livechat.android.exception.InvalidVisitorIDException;
import com.zoho.livechat.android.listeners.ConversationListener;
import com.zoho.livechat.android.listeners.FAQCategoryListener;
import com.zoho.livechat.android.listeners.FAQListener;
import com.zoho.livechat.android.listeners.OpenArticleListener;
import com.zoho.livechat.android.listeners.OperatorImageListener;
import com.zoho.livechat.android.listeners.SalesIQActionListener;
import com.zoho.livechat.android.listeners.SalesIQChatListener;
import com.zoho.livechat.android.listeners.SalesIQCustomActionListener;
import com.zoho.livechat.android.listeners.SalesIQFAQListener;
import com.zoho.livechat.android.listeners.SalesIQListener;
import com.zoho.livechat.android.models.SalesIQArticle;
import com.zoho.livechat.android.models.SalesIQArticleCategory;
import com.zoho.livechat.android.utils.LiveChatUtil;
import com.zoho.salesiqembed.ZohoSalesIQ;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.UUID;

import com.zoho.commons.ChatComponent;

public class RNZohoSalesIQ extends ReactContextBaseJavaModule {

  private static String fcmtoken = null;
  private static Boolean istestdevice = true;
  private final ReactApplicationContext reactContext;

  private static final String EVENT_SUPPORT_OPENED = "EVENT_SUPPORT_OPENED";         // No I18N
  private static final String EVENT_SUPPORT_CLOSED = "EVENT_SUPPORT_CLOSED";         // No I18N
  private static final String EVENT_CHATVIEW_OPENED = "EVENT_CHATVIEW_OPENED";         // No I18N
  private static final String EVENT_CHATVIEW_CLOSED = "EVENT_CHATVIEW_CLOSED";         // No I18N
  private static final String EVENT_CHAT_ATTENDED = "EVENT_CHAT_ATTENDED";         // No I18N
  private static final String EVENT_CHAT_MISSED = "EVENT_CHAT_MISSED";         // No I18N
  private static final String EVENT_CHAT_OPENED = "EVENT_CHAT_OPENED";         // No I18N
  private static final String EVENT_CHAT_CLOSED = "EVENT_CHAT_CLOSED";         // No I18N
  private static final String EVENT_CHAT_REOPENED = "EVENT_CHAT_REOPENED";         // No I18N
  private static final String EVENT_ARTICLE_LIKED = "EVENT_ARTICLE_LIKED";         // No I18N
  private static final String EVENT_ARTICLE_DISLIKED = "EVENT_ARTICLE_DISLIKED";         // No I18N
  private static final String EVENT_ARTICLE_OPENED = "EVENT_ARTICLE_OPENED";         // No I18N
  private static final String EVENT_ARTICLE_CLOSED = "EVENT_ARTICLE_CLOSED";         // No I18N
  private static final String EVENT_OPERATORS_ONLINE = "EVENT_OPERATORS_ONLINE";         // No I18N
  private static final String EVENT_OPERATORS_OFFLINE = "EVENT_OPERATORS_OFFLINE";         // No I18N
  private static final String EVENT_VISITOR_IPBLOCKED = "EVENT_VISITOR_IPBLOCKED";         // No I18N
  private static final String EVENT_FEEDBACK_RECEIVED = "EVENT_FEEDBACK_RECEIVED";         // No I18N
  private static final String EVENT_RATING_RECEIVED = "EVENT_RATING_RECEIVED";         // No I18N
  private static final String EVENT_PERFORM_CHATACTION = "EVENT_PERFORM_CHATACTION";         // No I18N
  private static final String EVENT_CUSTOMTRIGGER = "EVENT_CUSTOMTRIGGER";         // No I18N
  private static final String EVENT_QUEUE_POSITIONCHANGE = "EVENT_QUEUE_POSITIONCHANGE";         // No I18N

  private static final String TYPE_OPEN = "OPEN";         // No I18N
  private static final String TYPE_CONNECTED = "CONNECTED";         // No I18N
  private static final String TYPE_CLOSED = "CLOSED";         // No I18N
  private static final String TYPE_ENDED = "ENDED";         // No I18N
  private static final String TYPE_MISSED = "MISSED";         // No I18N
  private static final String TYPE_WAITING = "WAITING";         // No I18N

  private static final int INVALID_FILTER_CODE = 604;         // No I18N
  private static final String INVALID_FILTER_TYPE = "invalid filter type";         // No I18N
  private static final String TRYCATCH_EXCEPTION = "trycatch exception";         // No I18N

  private static Hashtable<String, SalesIQCustomActionListener> actionsList = new Hashtable<>();

  public RNZohoSalesIQ(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
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
    constants.put("QUEUE_POSITIONCHANGE", EVENT_QUEUE_POSITIONCHANGE);         // No I18N

    constants.put("ARTICLE_LIKED", EVENT_ARTICLE_LIKED);         // No I18N
    constants.put("ARTICLE_DISLIKED", EVENT_ARTICLE_DISLIKED);         // No I18N
    constants.put("ARTICLE_OPENED", EVENT_ARTICLE_OPENED);         // No I18N
    constants.put("ARTICLE_CLOSED", EVENT_ARTICLE_CLOSED);         // No I18N

    return constants;
  }

  @Override
  public String getName() {
    return "RNZohoSalesIQ";         // No I18N
  }

  @ReactMethod
  public void fetchAttenderImage(@NonNull String attenderId, @NonNull Boolean defaultImage, @NonNull final Callback imageCallback) {
    ZohoSalesIQ.Chat.fetchAttenderImage(attenderId, defaultImage, new OperatorImageListener() {
      @Override
      public void onSuccess(Drawable drawable) {
        Bitmap bitmap = ((BitmapDrawable)drawable).getBitmap();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, baos); //bm is the bitmap object
        byte[] byteArrayImage = baos.toByteArray();

        String encodedImage = Base64.encodeToString(byteArrayImage, Base64.DEFAULT);

        encodedImage = encodedImage.replace("\n","");         // No I18N

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
  public void getChats(@NonNull final Callback listCallback){
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable(){
      public void run(){
        ZohoSalesIQ.Chat.getList(new ConversationListener(){
          @Override
          public void onSuccess(ArrayList<VisitorChat> arrayList){
            if (arrayList != null){
              WritableArray array = new WritableNativeArray();
              for (int i=0; i<arrayList.size(); i++){
                VisitorChat chat = arrayList.get(i);
                WritableMap visitorMap = getChatMapObject(chat);
                array.pushMap(visitorMap);
              }
              listCallback.invoke(null, array);
            }
          }

          @Override
          public void onFailure(int code, String message){
            WritableMap errorMap = new WritableNativeMap();
            errorMap.putInt("code", code);         // No I18N
            errorMap.putString("message", message);         // No I18N
            listCallback.invoke(errorMap, null);
          }
        });
      }
    });
  }

  @ReactMethod
  public void getChatsWithFilter(@NonNull final String filter, @NonNull final Callback listCallback) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
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
          }
          else{
            WritableMap errorMap = new WritableNativeMap();
            errorMap.putInt("code", INVALID_FILTER_CODE);         // No I18N
            errorMap.putString("message", INVALID_FILTER_TYPE);         // No I18N
            listCallback.invoke(errorMap, null);
          }
        }
        catch (Exception e){
          WritableMap errorMap = new WritableNativeMap();
          errorMap.putInt("code", SalesIQConstants.LocalAPI.TRYCATCH_EXCEPTION_CODE);         // No I18N
          errorMap.putString("message", TRYCATCH_EXCEPTION);         // No I18N
          listCallback.invoke(errorMap, null);
        }
      }
    });
  }

  @ReactMethod
  public void getArticles(@NonNull final Callback articlesCallback) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.FAQ.getArticles(new FAQListener() {
          @Override
          public void onSuccess(ArrayList<SalesIQArticle> articlesList) {
            if (articlesList != null) {
              WritableArray array = new WritableNativeArray();
              for (int i=0; i<articlesList.size(); i++){
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
        });
      }
    });
  }

  @ReactMethod
  public void getArticlesWithCategoryID(@NonNull final String categoryId, @NonNull final Callback articlesCallback) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.FAQ.getArticles(categoryId, new FAQListener() {
          @Override
          public void onSuccess(ArrayList<SalesIQArticle> articlesList) {
            if (articlesList != null) {
              WritableArray array = new WritableNativeArray();
              for (int i=0; i<articlesList.size(); i++){
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
        });
      }
    });
  }

  @ReactMethod
  public void getCategories(@NonNull final Callback categoryCallback) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.FAQ.getCategories(new FAQCategoryListener() {
          @Override
          public void onSuccess(ArrayList<SalesIQArticleCategory> categoryList) {
            if (categoryList != null) {
              WritableArray array = new WritableNativeArray();

              for (int i=0; i<categoryList.size(); i++){
                SalesIQArticleCategory category = categoryList.get(i);

                WritableMap categoryMap = new WritableNativeMap();
                categoryMap.putString("id", category.getCategoryid());         // No I18N
                categoryMap.putString("name", category.getCategoryname());         // No I18N
                categoryMap.putInt("articleCount", category.getCount());         // No I18N

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
        });
      }
    });
  }

  @ReactMethod
  public void openArticle(final String id, @NonNull final Callback articlesCallback) {
    final Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.FAQ.openArticle(id, new OpenArticleListener() {
          @Override
          public void onSuccess() {
            articlesCallback.invoke("null");
          }

          @Override
          public void onFailure(int code, String message) {
            WritableMap errorMap = new WritableNativeMap();
            errorMap.putInt("code", code);         // No I18N
            errorMap.putString("message", message);         // No I18N
            articlesCallback.invoke(errorMap);
          }
        });
      }
    });
  }

  @ReactMethod
  public void init(final String appKey, final String accessKey) {
    final Activity activity = getCurrentActivity();
    if (activity != null) {
      Handler handler = new Handler(Looper.getMainLooper());
      handler.post(new Runnable() {
        public void run() {
          initSalesIQ(activity.getApplication(), activity, appKey, accessKey, null);
          ZohoSalesIQ.setListener(new RNZohoSalesIQListener());
          ZohoSalesIQ.Chat.setListener(new RNZohoSalesIQListener());
          ZohoSalesIQ.FAQ.setListener(new RNZohoSalesIQListener());
          ZohoSalesIQ.ChatActions.setListener(new RNZohoSalesIQListener());
        }
      });
    }
  }

  @ReactMethod
  public void initWithCallback(final String appKey, final String accessKey, final Callback initCallback ) {
    final Activity activity = getCurrentActivity();
    if (activity != null) {
      Handler handler = new Handler(Looper.getMainLooper());
      handler.post(new Runnable() {
        public void run() {
          initSalesIQ(activity.getApplication(), activity, appKey, accessKey, initCallback);
          ZohoSalesIQ.setListener(new RNZohoSalesIQListener());
          ZohoSalesIQ.Chat.setListener(new RNZohoSalesIQListener());
          ZohoSalesIQ.FAQ.setListener(new RNZohoSalesIQListener());
          ZohoSalesIQ.ChatActions.setListener(new RNZohoSalesIQListener());
        }
      });
    }
  }

  @ReactMethod
  public void setChatTitle(final String title) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setTitle(title);
      }
    });
  }

  @ReactMethod
  public void setLanguage(final String code) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setLanguage(code);
      }
    });
  }

  @ReactMethod
  public void setDepartment(final String department) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setDepartment(department);
      }
    });
  }

  @ReactMethod
  public void setDepartments(final ArrayList department) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setDepartments(department);
      }
    });
  }

  @ReactMethod
  public void setOperatorEmail(final String email) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        try {
          ZohoSalesIQ.Chat.setOperatorEmail(email);
        } catch (InvalidEmailException e) {
          LiveChatUtil.log(e);
        }
      }
    });
  }

  @ReactMethod
  public void showOperatorImageInChat(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.operatorImage, visible);
      }
    });
  }

  @ReactMethod
  public void setFeedbackVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.feedback, visible);
      }
    });
  }

  @ReactMethod
  public void setRatingVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.rating, visible);
      }
    });
  }

  @ReactMethod
  public void showOperatorImageInLauncher(final Boolean show) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
          ZohoSalesIQ.getApplicationManager().setCurrentActivity(activity);
          ZohoSalesIQ.Chat.showOperatorImageInLauncher(show);
        }
      }
    });
  }

  @ReactMethod
  public void openChat() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.show();
      }
    });
  }

  @ReactMethod
  public void openChatWithID(final String chat_id) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.open(chat_id);
      }
    });
  }

  @ReactMethod
  public void showOfflineMessage(final Boolean show) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.showOfflineMessage(show);
      }
    });
  }

  @ReactMethod
  public void endChat(final String chat_id) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.endChat(chat_id);
      }
    });
  }

  @ReactMethod
  public void setLauncherVisibility(Boolean visible) {
    ZohoSalesIQ.Chat.showLauncher(visible);
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
          ZohoSalesIQ.getApplicationManager().setCurrentActivity(activity);
          ZohoSalesIQ.getApplicationManager().refreshChatBubble();
        }
      }
    });
  }

  @ReactMethod
  public void setVisitorName(final String name) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Visitor.setName(name);
      }
    });
  }

  @ReactMethod
  public void setVisitorEmail(final String email) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Visitor.setEmail(email);
      }
    });
  }

  @ReactMethod
  public void setVisitorContactNumber(final String number) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Visitor.setContactNumber(number);
      }
    });
  }

  @ReactMethod
  public void setVisitorAddInfo(final String key, final String value) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Visitor.addInfo(key, value);
      }
    });
  }

  @ReactMethod
  public void setQuestion(final String question) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Visitor.setQuestion(question);
      }
    });
  }

  @ReactMethod
  public void startChat(final String question) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Visitor.startChat(question);
      }
    });
  }

  @ReactMethod
  public void setConversationVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Conversation.setVisibility(visible);
      }
    });
  }

  @ReactMethod
  public void setConversationListTitle(final String title) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Conversation.setTitle(title);
      }
    });
  }

  @ReactMethod
  public void setFAQVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.FAQ.setVisibility(visible);
      }
    });
  }

  @ReactMethod
  public void registerVisitor(final String uniqueid){
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        try {
          ZohoSalesIQ.registerVisitor(uniqueid);
        } catch (InvalidVisitorIDException e) {
          LiveChatUtil.log(e);
        }
      }
    });
  }

  @ReactMethod
  public void unregisterVisitor(){
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.unregisterVisitor(getCurrentActivity());
      }
    });
  }

  @ReactMethod
  public void setPageTitle(final String title) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Tracking.setPageTitle(title);
      }
    });
  }

  @ReactMethod
  public void setCustomAction(final String actionName) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Tracking.setCustomAction(actionName);
      }
    });
  }

  @ReactMethod
  public void performCustomAction(final String actionName) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Tracking.setCustomAction(actionName);
      }
    });
  }

  @ReactMethod
  public void enableInAppNotification() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Notification.enableInApp();
      }
    });
  }

  @ReactMethod
  public void disableInAppNotification() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Notification.disableInApp();
      }
    });
  }

  @ReactMethod
  @Deprecated
  public void setThemeColorforAndroid(String attribute, String color_code) {
    int color = Color.parseColor(color_code);
    int r = (color & 0xFF0000) >> 16;
    int g = (color & 0xFF00) >> 8;
    int b = (color & 0xFF);
  }

  @ReactMethod
  public void setThemeColorforiOS(String color_code) {

  }

  @ReactMethod
  public void setVisitorNameVisibility(final boolean visibility){
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.visitorName, visibility);
      }
    });
  }

  @ReactMethod
  public void enablePreChatForms() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.prechatForm, true);
      }
    });
  }

  @ReactMethod
  public void disablePreChatForms() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.prechatForm, false);
      }
    });
  }

  @ReactMethod
  public void enableScreenshotOption() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.screenshot, true);
      }
    });
  }

  @ReactMethod
  public void disableScreenshotOption() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.screenshot, false);
      }
    });
  }

  @ReactMethod
  public void registerChatAction(final String actionName) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.ChatActions.register(actionName);
      }
    });
  }

  @ReactMethod
  public void unregisterChatAction(final String actionName) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.ChatActions.unregister(actionName);
      }
    });
  }

  @ReactMethod
  public void unregisterAllChatActions() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.ChatActions.unregisterAll();
      }
    });
  }

  @ReactMethod
  public void setChatActionTimeout(final double timeout) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.ChatActions.setTimeout((long)timeout*1000);
      }
    });
  }

  @ReactMethod
  public void completeChatAction(final String uuid) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        SalesIQCustomActionListener listener;
        listener = actionsList.get(uuid);
        if (listener != null){
          listener.onSuccess();
        }
        if (actionsList != null) {
          actionsList.remove(uuid);
        }
      }
    });
  }

  @ReactMethod
  public void completeChatActionWithMessage(final String uuid, final boolean success, final String message) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        SalesIQCustomActionListener listener = actionsList.get(uuid);
        if (listener != null){
          if (success) {
            if (message != null) {
              listener.onSuccess(message);
            }
            else{
              listener.onSuccess();
            }
          }
          else{
            if (message != null) {
              listener.onFailure(message);
            }
            else{
              listener.onFailure();
            }
          }
        }
        if (actionsList != null) {
          actionsList.remove(uuid);
        }
      }
    });
  }

  @ReactMethod
  public void setVisitorLocation(final ReadableMap visitorLocation){
    SIQVisitorLocation siqVisitorLocation = new SIQVisitorLocation();

    if (visitorLocation.hasKey("latitude")){
      siqVisitorLocation.setLatitude(visitorLocation.getDouble("latitude"));         // No I18N
    }
    if (visitorLocation.hasKey("longitude")){
      siqVisitorLocation.setLongitude(visitorLocation.getDouble("longitude"));         // No I18N
    }
    if (visitorLocation.hasKey("country")){
      siqVisitorLocation.setCountry(visitorLocation.getString("country"));         // No I18N
    }
    if (visitorLocation.hasKey("city")){
      siqVisitorLocation.setCity(visitorLocation.getString("city"));         // No I18N
    }
    if (visitorLocation.hasKey("state")){
      siqVisitorLocation.setState(visitorLocation.getString("state"));         // No I18N
    }
    if (visitorLocation.hasKey("countryCode")){
      siqVisitorLocation.setCountryCode(visitorLocation.getString("countryCode"));         // No I18N
    }
    if (visitorLocation.hasKey("zipCode")){
      siqVisitorLocation.setZipCode(visitorLocation.getString("zipCode"));         // No I18N
    }
    ZohoSalesIQ.Visitor.setLocation(siqVisitorLocation);
  }

  @ReactMethod
  public void syncThemeWithOS(final boolean sync){
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.syncThemeWithOS(sync);
      }
    });
  }

  public static void handleNotification(final Application application, final Map extras) {
    SharedPreferences sharedPreferences = application.getSharedPreferences("siq_session", 0);         // No I18N
    final String appKey = sharedPreferences.getString("salesiq_appkey", null);         // No I18N
    final String accessKey = sharedPreferences.getString("salesiq_accesskey", null);         // No I18N
    if (appKey != null && accessKey != null) {
      Handler handler = new Handler(Looper.getMainLooper());
      handler.post(new Runnable() {
        public void run() {
          initSalesIQ(application, null, appKey, accessKey, null);
          ZohoSalesIQ.Notification.handle(application, extras, 0);
        }
      });
    }
  }

  public static void enablePush(String token, Boolean testdevice) {
    fcmtoken = token;
    istestdevice = testdevice;
  }

  private static void initSalesIQ(final Application application, final Activity activity, final String appKey, final String accessKey, final Callback initCallback) {
    if (application != null) {
      ZohoSalesIQ.init(application, appKey, accessKey, null, new OnInitCompleteListener() {
        @Override
        public void onInitComplete() {
          if (fcmtoken != null) {
            ZohoSalesIQ.Notification.enablePush(fcmtoken, istestdevice);
          }
          if (activity != null) {
            Handler handler = new Handler(Looper.getMainLooper());
            handler.post(new Runnable() {
              public void run() {
                ZohoSalesIQ.getApplicationManager().refreshChatBubble();
              }
            });
          }
          if (initCallback != null){
            initCallback.invoke(true);
          }
        }

        @Override
        public void onInitError() {
          if (initCallback != null){
            initCallback.invoke(false);
          }
        }
      });
      ZohoSalesIQ.setPlatformName(SalesIQConstants.Platform.REACT_NATIVE);
      if (activity != null) {
        ZohoSalesIQ.getApplicationManager().setCurrentActivity(activity);
        ZohoSalesIQ.getApplicationManager().setAppActivity(activity);
      }
      ZohoSalesIQ.forceInitialiseSDK();
    }
  }

  public void eventEmitter(String event,Object value){
    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(event, value);
  }

  private Boolean isValidFilterName(String filterName){
    for (ConversationType type : ConversationType.values()) {
      if (type.name().equals(filterName)) {
        return true;
      }
    }
    return false;
  }

  private ConversationType getFilterName(String filter){
    switch (filter){
      case TYPE_CONNECTED : return ConversationType.CONNECTED;
      case TYPE_WAITING : return ConversationType.WAITING;
      case TYPE_OPEN : return ConversationType.OPEN;
      case TYPE_CLOSED : return ConversationType.CLOSED;
      case TYPE_MISSED : return ConversationType.MISSED;
      case TYPE_ENDED : return ConversationType.ENDED;
      default: return ConversationType.CONNECTED;
    }
  }

  public WritableMap getChatMapObject(VisitorChat chat){
    WritableMap visitorMap = new WritableNativeMap();
    visitorMap.putString("id", chat.getChatID());         // No I18N
    visitorMap.putInt("unreadCount", chat.getUnreadCount());         // No I18N
    visitorMap.putBoolean("isBotAttender", chat.isBotAttender());         // No I18N
    if (chat.getQuestion() != null){
      visitorMap.putString("question", chat.getQuestion());         // No I18N
    }
    if (chat.getDepartmentName() != null){
      visitorMap.putString("departmentName", chat.getDepartmentName());         // No I18N
    }
    if (chat.getChatStatus() != null){
      visitorMap.putString("status", chat.getChatStatus());         // No I18N
    }
    if (chat.getLastMessage() != null){
      visitorMap.putString("lastMessage", chat.getLastMessage());         // No I18N
    }
    if (chat.getLastMessageSender() != null){
      visitorMap.putString("lastMessageSender", chat.getLastMessageSender());         // No I18N
    }
    if (chat.getLastMessageTime() > 0){
      int lastMessageTime = (int) chat.getLastMessageTime();
      visitorMap.putInt("lastMessageTime", lastMessageTime);         // No I18N
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

  public WritableMap getArticleMapObject(SalesIQArticle article) {
    WritableMap articleMap = new WritableNativeMap();
    articleMap.putString("id", article.getId());         // No I18N
    articleMap.putString("name", article.getTitle());         // No I18N
    articleMap.putInt("likeCount", article.getLiked());         // No I18N
    articleMap.putInt("dislikeCount", article.getDisliked());         // No I18N
    articleMap.putInt("viewCount", article.getViewed());         // No I18N
    if (article.getCategory_id() != null) {
      articleMap.putString("categoryID", article.getCategory_id());         // No I18N
    }
    if (article.getCategoryName() != null) {
      articleMap.putString("categoryName", article.getCategoryName());         // No I18N
    }
    return articleMap;
  }

  public WritableMap getVisitorInfoObject(SIQVisitor siqVisitor) {
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
    infoMap.putString("numberOfVisits", LiveChatUtil.getString(siqVisitor.getNumberOfVisits()));         // No I18N
    infoMap.putString("noOfDaysVisited",LiveChatUtil.getString(siqVisitor.getNoOfDaysVisited()));         // No I18N
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

  public class RNZohoSalesIQListener implements SalesIQListener, SalesIQChatListener, SalesIQFAQListener, SalesIQActionListener {

    @Override
    public void handleFeedback(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_FEEDBACK_RECEIVED, visitorMap);
    }

    @Override
    public void handleQueuePositionChange(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_QUEUE_POSITIONCHANGE, visitorMap);
    }

    @Override
    public void handleRating(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_RATING_RECEIVED, visitorMap);
    }

    @Override
    public void handleOperatorsOnline() {
      eventEmitter(EVENT_OPERATORS_ONLINE, null);
    }

    @Override
    public void handleOperatorsOffline() {
      eventEmitter(EVENT_OPERATORS_OFFLINE, null);
    }

    @Override
    public void handleArticleOpened(String id) {
      eventEmitter(EVENT_ARTICLE_OPENED, id);
    }

    @Override
    public void handleArticleClosed(String id) {
      eventEmitter(EVENT_ARTICLE_CLOSED, id);
    }

    @Override
    public void handleArticleLiked(String id) {
      eventEmitter(EVENT_ARTICLE_LIKED, id);
    }

    @Override
    public void handleArticleDisliked(String id) {
      eventEmitter(EVENT_ARTICLE_DISLIKED, id);
    }

    @Override
    public void handleSupportOpen() {
      eventEmitter(EVENT_SUPPORT_OPENED, null);
    }

    @Override
    public void handleSupportClose() {
      eventEmitter(EVENT_SUPPORT_CLOSED, null);
    }

    @Override
    public void handleChatViewOpen(String id) {
      eventEmitter(EVENT_CHATVIEW_OPENED, id);
    }

    @Override
    public void handleChatViewClose(String id) {
      eventEmitter(EVENT_CHATVIEW_CLOSED, id);
    }

    @Override
    public void handleIPBlock() {
      eventEmitter(EVENT_VISITOR_IPBLOCKED, null);
    }

    @Override
    public void handleTrigger(String triggerName, SIQVisitor visitor) {
      WritableMap visitorInfoMap = getVisitorInfoObject(visitor);
      WritableMap triggerMap = new WritableNativeMap();
      triggerMap.putString("triggerName", triggerName);         // No I18N
      triggerMap.putMap("visitorInformation", visitorInfoMap);         // No I18N
      eventEmitter(EVENT_CUSTOMTRIGGER, triggerMap);
    }

    @Override
    public void handleChatOpened(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_CHAT_OPENED, visitorMap);
    }

    @Override
    public void handleChatClosed(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_CHAT_CLOSED, visitorMap);
    }

    @Override
    public void handleChatAttended(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_CHAT_ATTENDED, visitorMap);
    }

    @Override
    public void handleChatMissed(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_CHAT_MISSED, visitorMap);
    }

    @Override
    public void handleChatReOpened(VisitorChat visitorChat) {
      WritableMap visitorMap = getChatMapObject(visitorChat);
      eventEmitter(EVENT_CHAT_REOPENED, visitorMap);
    }

    @Override
    public void handleCustomAction(SalesIQCustomAction salesIQCustomAction, final SalesIQCustomActionListener salesIQCustomActionListener) {
      UUID uuid = UUID.randomUUID();

      final WritableMap actionDetailsMap = new WritableNativeMap();
      actionDetailsMap.putString("uuid", uuid.toString());         // No I18N
      actionDetailsMap.putString("elementID", salesIQCustomAction.elementID);         // No I18N
      actionDetailsMap.putString("label", salesIQCustomAction.label);         // No I18N
      actionDetailsMap.putString("name", salesIQCustomAction.name);         // No I18N
      actionDetailsMap.putString("clientActionName", salesIQCustomAction.clientActionName);         // No I18N

      actionsList.put(uuid.toString(), salesIQCustomActionListener);

      eventEmitter(EVENT_PERFORM_CHATACTION, actionDetailsMap);
    }
  }
}
