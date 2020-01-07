package com.reactlibrary;

import android.app.Activity;
import android.app.Application;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.zoho.commons.OnInitCompleteListener;
import com.zoho.livechat.android.exception.InvalidEmailException;
import com.zoho.livechat.android.exception.InvalidVisitorIDException;
import com.zoho.salesiqembed.ZohoSalesIQ;
import java.util.Locale;
import java.util.Map;
import com.zoho.commons.ChatComponent;

public class RNZohoSalesIQ extends ReactContextBaseJavaModule {

  private static String fcmtoken = null;
  private static Boolean istestdevice = true;
  private final ReactApplicationContext reactContext;


  public RNZohoSalesIQ(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNZohoSalesIQ";
  }

  @ReactMethod
  public void init(final String appKey, final String accessKey) {
    final Activity activity = reactContext.getCurrentActivity();
    if (activity != null) {
      Handler handler = new Handler(Looper.getMainLooper());
      handler.post(new Runnable() {
        public void run() {
          initSalesIQ(activity.getApplication(), activity, appKey, accessKey);
        }
      });
    }
  }

  @ReactMethod
  public void setChatTitle(String title) {
    ZohoSalesIQ.Chat.setTitle(title);
  }

  @ReactMethod
  public void setLanguage(String code) {
    ZohoSalesIQ.Chat.setLanguage(new Locale(code));
  }

  @ReactMethod
  public void setDepartment(String department) {
    ZohoSalesIQ.Chat.setDepartment(department);
  }

  @ReactMethod
  public void setOperatorEmail(String email) throws InvalidEmailException {
    ZohoSalesIQ.Chat.setOperatorEmail(email);
  }

  @ReactMethod
  public void setThemeColorforAndroid(String attribute, String color_code) {
    int color = Color.parseColor(color_code);
    int r = (color & 0xFF0000) >> 16;
    int g = (color & 0xFF00) >> 8;
    int b = (color & 0xFF);
    ZohoSalesIQ.setThemeColor(attribute, new com.zoho.commons.Color(r, g, b));
  }

  @ReactMethod
  public void setThemeColorforiOS(String color_code) {

  }

  @ReactMethod
  public void showOperatorImageinLauncher(final Boolean show) {
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
    ZohoSalesIQ.Chat.open();
  }

  @ReactMethod
  public void endChat() {
    ZohoSalesIQ.Chat.endSession();
  }

  @ReactMethod
  public void showOperatorImageInChat(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.Operator_Image, visible);
      }
    });
  }


  @ReactMethod
  public void setLauncherVisibility(Boolean visible) {
    ZohoSalesIQ.Chat.setFloatingChatButtonVisibility(visible);
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
  public void showOfflineMessage(final Boolean show) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.showOfflineMessage(show);
      }
    });
  }

  @ReactMethod
  public void setRatingVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.Rating, visible);
      }
    });
  }

  @ReactMethod
  public void setFeedbackVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Chat.setVisibility(ChatComponent.Feedback, visible);
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
  public void setQuestion(String question) {
    ZohoSalesIQ.Visitor.setQuestion(question);
  }

  @ReactMethod
  public void startChat(String question) {
    ZohoSalesIQ.Visitor.startChat(question);
  }

  @ReactMethod
  public void registerVisitor(final String uniqueid){
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        try {
          ZohoSalesIQ.registerVisitor(uniqueid);
        } catch (InvalidVisitorIDException e) {

        }
      }
    });
  }

  @ReactMethod
  public void unregisterVisitor() {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.unregisterVisitor();
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
  public void setCustomAction(String actionName) {
    ZohoSalesIQ.Tracking.setCustomAction(actionName);
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
  public void setConversationVisibility(final Boolean visible) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.post(new Runnable() {
      public void run() {
        ZohoSalesIQ.Conversation.setVisibility(visible);
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


  public static void handleNotification(final Application application, final Map extras) {
    SharedPreferences sharedPreferences = application.getSharedPreferences("siq_session", 0);
    final String appKey = sharedPreferences.getString("salesiq_appkey", null);
    final String accessKey = sharedPreferences.getString("salesiq_accesskey", null);
    if (appKey != null && accessKey != null) {
      Handler handler = new Handler(Looper.getMainLooper());
      handler.post(new Runnable() {
        public void run() {
          initSalesIQ(application, null, appKey, accessKey);
          ZohoSalesIQ.Notification.handle(application, extras, 0);
        }
      });
    }
  }

  public static void enablePush(String token, Boolean testdevice) {
    fcmtoken = token;
    istestdevice = testdevice;
  }

  private static void initSalesIQ(final Application application, final Activity activity, final String appKey, final String accessKey) {
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
        }
      });
      if (activity != null) {
        ZohoSalesIQ.getApplicationManager().setCurrentActivity(activity);
        ZohoSalesIQ.getApplicationManager().setAppActivity(activity);
      }
      ZohoSalesIQ.forceInitialiseSDK();

      if (ZohoSalesIQ.Chat.getThemeColor("colorPrimary") == -1) {
        ZohoSalesIQ.Chat.setThemeColor("colorPrimary", new com.zoho.commons.Color(0, 12, 255));
      }
      if (ZohoSalesIQ.Chat.getThemeColor("colorPrimaryDark") == -1) {
        ZohoSalesIQ.Chat.setThemeColor("colorPrimaryDark", new com.zoho.commons.Color(0, 97, 204));
      }
    }
  }

}
