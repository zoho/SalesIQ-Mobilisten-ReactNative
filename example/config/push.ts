/**
 * Push-notification integration mode for the sample app.
 *
 * The SalesIQ SDK supports two ways to integrate push, and this sample demonstrates both:
 *
 *  - 'native' — the app's own native layer receives FCM/APNS and forwards to the SDK:
 *      Android: `MyFirebaseMessagingService` → `RNZohoSalesIQ.handleNotification` / `enablePush`
 *      iOS:     `AppDelegate` → `RNZSIQNotifications.processNotificationWithInfo` / `enablePush`
 *
 *  - 'js' — the app receives push in JavaScript via `@react-native-firebase/messaging` and forwards
 *      to the SDK through the TypeScript APIs:
 *      token:    `messaging().getToken()` / `onTokenRefresh` → `ZohoSalesIQ.Notification.registerPush`
 *      messages: `messaging().onMessage` / `setBackgroundMessageHandler`
 *                → `Notification.isSDKMessage` → `Notification.process` / `getPayload`
 *
 * IMPORTANT — this flag is the JS-side source of truth, but the two flows are also selected natively
 * and MUST be kept in sync when you change it:
 *  - Android: run the matching product flavor — `nativePush` or `jsPush`
 *    (they include/strip the FCM service; see example/android/app/build.gradle).
 *  - iOS: set `SIQPushMode` (native | js) in example/ios/mobilistensampleapp/Info.plist
 *    (the AppDelegate reads it to gate chat-message forwarding).
 *
 * Platform notes:
 *  - iOS VoIP/call push and APNS-token registration always go through the AppDelegate regardless of mode.
 *  - 'js' mode on iOS additionally requires a real Firebase iOS app + GoogleService-Info.plist.
 */
export type PushMode = 'native' | 'js';

/**
 * The active push integration mode. Change this together with the Android flavor + iOS Info.plist value.
 * (`as PushMode` keeps the type the union rather than narrowing to the literal, so both derived flags below
 * compile whichever value is set.)
 */
export const PUSH_MODE = 'native' as PushMode;

/** Whether the sample should wire the JavaScript (`@react-native-firebase/messaging`) push flow. */
export const isJsPush = PUSH_MODE === 'js';

/** Whether the sample relies on the native FCM service / AppDelegate to forward push to the SDK. */
export const isNativePush = PUSH_MODE === 'native';
