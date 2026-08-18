import { EmitterSubscription } from 'react-native';
import type {
  NotificationListenerEvent,
  NotificationListener,
} from './Listener';

/** A parsed SalesIQ push payload for a chat message notification. */
export type ChatNotificationPayloadType = {
  /** Discriminator identifying a chat notification. */
  type?: 'chat';
  /** The chat notification details. */
  payload?: {
    /** The message text. */
    message?: string;
    /** The user/visitor identifier. */
    userId?: string;
    /** The chat/conversation identifier. */
    chatId?: string;
    /** The display name of the message sender. */
    senderName?: string;
    /** The unique identifier of the previous message. */
    previousMessageUID?: string;
    /** The unique identifier of the message. */
    messageUID?: string;
    /** The identifier of the message sender. */
    sender?: string;
    /** The notification title. */
    title?: string;
    /** The department associated with the chat. */
    department?: {
      /** The department's unique identifier. */
      id?: string;
      /** The department's name. */
      name?: string;
    };
  };
};

/** A parsed SalesIQ push payload for a visitor-history (proactive) notification. */
export type VisitorHistoryNotificationPayloadType = {
  /** Discriminator identifying a visitor-history notification. */
  type?: 'visitorHistory';
  /** The visitor-history notification details. */
  payload?: {
    /** The path to the notification image. */
    imagePath?: string;
    /** The message text. */
    message?: string;
    /** The link the notification points to. */
    targetLink?: string;
    /** The notification title. */
    title?: string;
  };
};

/** A parsed SalesIQ push payload for an end-of-chat details notification. */
export type EndChatDetailsNotificationPayload = {
  /** Discriminator identifying an end-chat-details notification. */
  type?: 'endChatDetails';
  /** The end-chat notification details. */
  payload?: {
    /** The message text. */
    message: string;
    /** The user/visitor identifier. */
    userId: string;
    /** The chat/conversation identifier. */
    chatId: string;
    /** The notification title. */
    title: string;
    /** The department associated with the chat. */
    department: {
      /** The department's unique identifier. */
      id?: string;
      /** The department's name. */
      name?: string;
    };
  };
};

/** A parsed SalesIQ push payload for a call details notification. */
export type CallDetailsNotificationPayload = {
  /** Discriminator identifying a call-details notification. */
  type?: 'callDetails';
  /** The call notification details. */
  payload?: {
    /** The notification content text. */
    content: string | null;
    /** The user/visitor identifier. */
    userId: string | null;
    /** The name of the user/visitor. */
    userName: string | null;
    /** The chat/conversation identifier. */
    chatId: string | null;
    /** The notification title. */
    title: string | null;
    /** The call operation this notification represents. */
    operation: string | null;
    /** The department associated with the call. */
    department: {
      /** The department's unique identifier. */
      id?: string | null;
      /** The department's name. */
      name?: string | null;
    };
  };
};

/** The union of parsed SalesIQ push payloads returned by {@link ZSIQNotificationTypes.Notification.getPayload getPayload}. */
export type ZSIQNotificationPayloadResult =
  | ChatNotificationPayloadType
  | VisitorHistoryNotificationPayloadType
  | EndChatDetailsNotificationPayload
  | CallDetailsNotificationPayload;

export interface ZSIQNotificationTypes {
  /** Namespace for SalesIQ push and in-app notifications — registration, payload parsing, and click handling. */
  Notification: {
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
     * Unregisters the device from receiving push notifications from SalesIQ.
     * Uses the token previously supplied to {@link registerPush}.
     * @returns A promise that resolves once the device has been unregistered.
     */
    disablePush: () => Promise<void>;

    /**
     * This API returns a boolean value indicating whether the received push is a message from SalesIQ.
     *
     *
     * @param map - The push message data payload received from Firebase.
     * @param callback - Invoked with `true` if the push originated from SalesIQ, `false` otherwise.
     * @returns
     */
    isSDKMessage: (
      map?: object,
      callback?: (isSDKMessage: boolean) => void
    ) => void;

    /**
     * This API processes the push message and generates a notification if it originated from SalesIQ.
     *
     * **Android only.** On iOS this is a **no-op**: SalesIQ delivers push over APNs directly (not FCM), so
     * an incoming push is received and processed by the native `AppDelegate`, never in JavaScript — calling
     * `process` there would double-process it. Use `isSDKMessage` / `getPayload` if you need to inspect a
     * payload; leave rendering to the native layer on iOS.
     * @param map - The push message data payload received from Firebase (Android).
     * @returns
     */
    process: (map?: object) => void;

    /**
     * The API parses the map that was received from the Firebase push message to the SalesIQNotificationPayload map. This API can be used when the notifications need to be created on your own.
     *
     * The API needs to be handled using the onMessage() method from the firebase.
     * @param map - The push message data payload received from Firebase.
     * @param callback - Invoked with the parsed SalesIQ notification payload.
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
     * @param actionSource - Whether notification taps are handled by the app (`ACTION_SOURCE.APP`) or the Mobilisten SDK (`ACTION_SOURCE.SDK`).
     * @returns
     */
    setActionSource: (actionSource: string) => void;

    /**
     * Retrieves the current badge count for unread conversations. On Android, this queries the
     * total number of unread messages across all conversations; on iOS, this returns the
     * unread message count (badge-count equivalent).
     *
     * @returns A Promise resolving to the badge count.
     */
    getBadgeCount: () => Promise<number>;

    /**
     * Toggles in-app notifications. Mirrors the native `Notification.enableInApp` /
     * `Notification.disableInApp`.
     *
     * @param enabled - `true` to enable in-app notifications, `false` to disable them.
     */
    enableInAppNotification: (enabled: boolean) => void;

    /**
     * This listener allows you to register a callback that is to be invoked whenever an event is triggered regarding the notification.
     * @param callback - Invoked with the notification event data whenever a notification event is triggered.
     * @returns
     */
    addListener: (
      callback: (callbackData: NotificationListener) => void
    ) => EmitterSubscription;

    /** The {@link NotificationListenerEvent} enum of notification events delivered to {@link addListener}. */
    Event: typeof NotificationListenerEvent;
  };
}
