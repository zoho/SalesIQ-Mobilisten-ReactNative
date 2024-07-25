package com.mobilistensampleapp;

import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.zohosalesiq.reactlibrary.RNZohoSalesIQ;

import java.util.Map;

public class MyFirebaseMessagingService extends FirebaseMessagingService {
    /*
        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-mobile-push-notification-android.html to
        configure Push notifications for Android SDK in Zoho SalesIQ
    */
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage)
    {
        Map extras = remoteMessage.getData();
        RNZohoSalesIQ.handleNotification(MainApplication.Companion.getApplication(), extras);
    }

    @Override
    public void onNewToken(String token) {
        RNZohoSalesIQ.enablePush(token,true);
    }
}