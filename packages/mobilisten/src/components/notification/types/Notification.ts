import { EmitterSubscription } from 'react-native';
import type {
  NotificationListenerEvent,
  NotificationListener,
} from './Listener';

export type ChatNotificationPayloadType = {
  type?: 'chat';
  payload?: {
    message?: string;
    userId?: string;
    chatId?: string;
    senderName?: string;
    previousMessageUID?: string;
    messageUID?: string;
    sender?: string;
    title?: string;
    department?: {
      id?: string;
      name?: string;
    };
  };
};

export type VisitorHistoryNotificationPayloadType = {
  type?: 'visitorHistory';
  payload?: {
    imagePath?: string;
    message?: string;
    targetLink?: string;
    title?: string;
  };
};

export type EndChatDetailsNotificationPayload = {
  type?: 'endChatDetails';
  payload?: {
    message: string;
    userId: string;
    chatId: string;
    title: string;
    department: {
      id?: string;
      name?: string;
    };
  };
};

export type CallDetailsNotificationPayload = {
  type?: 'callDetails';
  payload?: {
    content: string | null;
    userId: string | null;
    userName: string | null;
    chatId: string | null;
    title: string | null;
    operation: string | null;
    department: {
      id?: string | null;
      name?: string | null;
    };
  };
};

export type ZSIQNotificationPayloadResult =
  | ChatNotificationPayloadType
  | VisitorHistoryNotificationPayloadType
  | EndChatDetailsNotificationPayload
  | CallDetailsNotificationPayload;

export interface ZSIQNotificationTypes {
  Notification: {
    /**
     * This API allows you to set an icon for the Mobilisten related notifications in your Android application.
     *
     * @param resourceName Add name of the icon in the drawable folder inside android, without extension.
     *
     *
     * Steps:
     * 1. Add the icon to the drawable folder of your project's resources (res/drawable).
     * 2. When mentioning the icon name in the API, do not use the extension names.
     *
     *
     * For example: If you have an icon called "siq_notify.xml" in your drawable folder. Then the name used in the API should be ZohoSalesIQ.Notification.setIconForAndroid("siq_notify").
     * @returns
     */
    setIconForAndroid: (resourceName: string) => void;

    /**
     * This API allows device registration to receive push notifications from SalesIQ by the FCM token.
     *
     *
     * @param token - FCM token received from the firebase.
     * @param isTestDevice -  (true/false) registers the device as a test device if the value is true.
     *
     * Note:
     *
     * 1. The isTestDevice must be false in production.
     * 2. Use this API onTokenRefresh() method.
     * @returns
     */
    registerPush: (token: string, isTestDevice: boolean) => void;

    /**
     * This API returns a boolean value indicating whether the received push is a message from SalesIQ.
     *
     *
     * @param map
     * @param callback
     * @returns
     */
    isSDKMessage: (
      map?: object,
      callback?: (isSDKMessage: boolean) => void
    ) => void;

    /**
     * This API processes the push message and generates a notification if it originated from SalesIQ.
     * @param map
     * @returns
     */
    process: (map?: object) => void;

    /**
     * The API parses the map that was received from the Firebase push message to the SalesIQNotificationPayload map. This API can be used when the notifications need to be created on your own.
     *
     * The API needs to be handled using the onMessage() method from the firebase.
     * @param map
     * @param callback
     * @returns
     *
     * @see https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-notification.html
     */
    getPayload: (
      map?: object,
      callback?: (result: ZSIQNotificationPayloadResult) => void
    ) => void;

    /**
     * API enables you to specify whether the notification click action should be managed by the App or the Mobilisten SDK.
     *
     * If the ACTION_SOURCE.APP value is set, and the taps of SDK notifications will be invoked in the EVENT_NOTIFICATION_CLICKED listeners.
     * @param actionSource
     * @returns
     */
    setActionSource: (actionSource: string) => void;

    /**
     * This listener allows you to register a callback that is to be invoked whenever an event is triggered regarding the notification.
     * @param callback
     * @returns
     */
    addListener: (
      callback: (callbackData: NotificationListener) => EmitterSubscription
    ) => void;

    Event: typeof NotificationListenerEvent;
  };
}
