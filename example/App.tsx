import React, { useEffect } from 'react';
import { Platform, StatusBar } from "react-native";
import { addListeners } from "./scripts/listeners";

import { ZohoSalesIQ } from "@react-native-zohosalesiq/mobilisten";
import Main from "./screens/Main";

const App: React.FC = () => {
    function initSalesIQ() {
        /*
            Follow the steps outlined in https://www.zoho.com/salesiq/help/developer-guides/android-mobile-sdk-installation-2.0.html 
            to obtain a distinct app key and access key for Android and iOS for your application from the SalesIQ portal.
        */
        const androidAppKey = "<YOUR_ANDROID_APP_KEY>";
        const androidAccessKey = "<YOUR_ANDROID_ACCESS_KEY>";

        const iosAppKey = "<YOUR_IOS_APP_KEY>";
        const iosAccessKey = "<YOUR_IOS_ACCESS_KEY>";

        let appkey = "";
        let accesskey = "";

        if (Platform.OS === "android") {
            appkey = androidAppKey;
            accesskey = androidAccessKey;
        } else if (Platform.OS === "ios") {
            appkey = iosAppKey;
            accesskey = iosAccessKey;
        }

        /*
            The Mobilisten React-Native SDK provides various events that developers can use to perform customized actions. 
            Refer ./scripts/listeners file
        */
        addListeners();

        ZohoSalesIQ.printDebugLogsForAndroid(true);

        //This API is used to initialize the SalesIQ SDK with callback.
        ZohoSalesIQ.initWithCallback(appkey, accesskey, (success) => {
            if (success) {
                /*
                        ThisAPI allows managing the visibility of the mobilisten launcher according to your visibility mode. 
                        The three available visibility modes are ALWAYS, NEVER, WHEN_ACTIVE_CHAT.
                    */
                ZohoSalesIQ.Launcher.show(
                    ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS
                );
                ZohoSalesIQ.Launcher.enableDragToDismiss(true);

                /*
                        SalesIQ Android SDK follows the system theme by default. You can opt-out of this option by setting the value to false.
                        Refer android/app/main/res/values/styles.xml and https://www.zoho.com/salesiq/help/developer-guides/android-mobile-sdk-theme-customization-2.0.html
                    */
                ZohoSalesIQ.syncThemeWithOsForAndroid(false);

                ZohoSalesIQ.showOperatorImageInLauncher(true); //This API can be used to set the operator image in the launcher

                /*
                        This API will set offline banner in chat window when the brand is offline.
                        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-chat-show-offline-message.html
                    */
                ZohoSalesIQ.showOfflineMessage(true);

                /*
                        Chat Actions allows you to define custom actions that can be invoked when a user clicks on them inside the chat.
                        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-chatactions-v2.html
                    */
                ZohoSalesIQ.registerChatAction("book_ticket"); //This API allows you to register any custom action that you have created.
                ZohoSalesIQ.setChatActionTimeout(10); //This API allows you to set the timeout value until which loader needs to be shown. Value in seconds

                /*
                        This API allows you to set an icon for the SalesIQ Android SDK notifications.
                        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-notification-android.html
                    */
                ZohoSalesIQ.Notification.setIconForAndroid("salesiq_logo");

                /*
                        You can use this API to enable/disable the conversation history option in the SalesIQ SDK.
                        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-conversation-visibility.html
                    */
                ZohoSalesIQ.setConversationVisibility(true);
                ZohoSalesIQ.setConversationListTitle("Mobilisten Live Support"); // This API is used to set title in the header of the conversation history section

                /*
                        You can use this API to show/hide the Knowledgebase option in the SalesIQ SDK.
                        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-faq-visibility.html
                    */
                ZohoSalesIQ.setFAQVisibility(true);

                ZohoSalesIQ.enableInAppNotification();
            } else {
                console.log("ERROR WHILE initwithcallback");
            }
        });
    }

    useEffect(() => {
        initSalesIQ();
        Platform.OS == 'android' && StatusBar.setBackgroundColor("#007AFF");
    }, []);

    return <Main />;
};

export default App;