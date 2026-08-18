import {Platform} from 'react-native';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
// Type-only import — fully erased at compile time, so it never loads the native module.
import type * as FBMessaging from '@react-native-firebase/messaging';

import {isJsPush, isNativePush} from '../config/push';
import {pushEvent} from '../state/events';
import {showToast} from '../components/ui/Toast';

/**
 * JavaScript push flow via `@react-native-firebase/messaging`.
 *
 * Active only when `PUSH_MODE === 'js'` (see example/config/push.ts). In 'native' mode this is a no-op —
 * the native `FirebaseMessagingService` (Android) / `AppDelegate` (iOS) forward push to the SDK instead.
 *
 * IMPORTANT: `@react-native-firebase/messaging` is loaded **lazily** (via `require` inside the JS-mode
 * guard) so that in 'native' mode the app never touches the Firebase native module. This lets the native
 * flow build and run **without** installing the Firebase pods / GoogleService-Info.plist. JS mode does
 * require them (Android: google-services.json — already present; iOS: a real GoogleService-Info.plist and
 * `pod install`).
 *
 * Token → SDK: SalesIQ's `Notification.registerPush` expects the **FCM** token on Android and the
 * **APNS** token on iOS, so we pass the right one per platform.
 * Message → SDK: hand each incoming payload to `isSDKMessage`; if it's a SalesIQ message, `process` it so
 * the SDK renders/handles its own chat notification. Non-SalesIQ messages are left to the app.
 *
 * NOTE: the dev sample registers as a test device (`isTestDevice = true`). Use `false` in production.
 */
const IS_TEST_DEVICE = true;

/** Tag for all JS push logs — grep the Metro console for this to trace the flow. */
const LOG = '[SIQ-Push][JS]';

type Messaging = ReturnType<typeof FBMessaging.getMessaging>;

/** Forwards one incoming remote-message payload to the SDK if it originated from SalesIQ. */
function forwardToSalesIQ(data: Record<string, string> | undefined): void {
  const payload = data ?? {};
  console.log(`${LOG} incoming message payload:`, payload);
  ZohoSalesIQ.Notification.isSDKMessage(payload, (isSDKMessage: boolean) => {
    console.log(`${LOG} isSDKMessage →`, isSDKMessage);
    if (isSDKMessage) {
      // Let the SDK build/handle its own chat notification from the payload.
      console.log(`${LOG} SalesIQ message → Notification.process(payload)`);
      ZohoSalesIQ.Notification.process(payload);
      pushEvent('JS_PUSH_FORWARDED', payload, 'notification');
    } else {
      console.log(`${LOG} not a SalesIQ message — left to the host app`);
    }
  });
}

/**
 * Returns the real device push token for the current platform in 'js' mode (APNS on iOS, FCM on Android),
 * or `null` in 'native' mode (where the token is owned by the native layer). Used by the Notifications
 * screen to display the live token instead of a pasted one. Safe in native mode — the lazy `require`
 * below is never reached because `isJsPush` short-circuits first.
 */
export async function getJsPushToken(): Promise<string | null> {
  if (!isJsPush) {
    return null;
  }
  const fb = require('@react-native-firebase/messaging') as typeof FBMessaging;
  const messaging: Messaging = fb.getMessaging();
  const token =
    Platform.OS === 'ios'
      ? (await fb.getAPNSToken(messaging)) ?? null
      : (await fb.getToken(messaging)) ?? null;
  console.log(`${LOG} getJsPushToken (${Platform.OS === 'ios' ? 'APNS' : 'FCM'}) →`, token);
  return token;
}

/**
 * Wires the JS push flow. Call once after `ZohoSalesIQ.initialize(...)` succeeds.
 * Returns a cleanup function that removes the foreground/token listeners.
 */
export function setupJsPush(): () => void {
  if (!isJsPush) {
    return () => {};
  }

  console.log(`${LOG} setupJsPush() starting on ${Platform.OS} (js mode)`);
  // Lazy require — only reached in JS mode, so 'native' builds never load the Firebase native module.
  const fb = require('@react-native-firebase/messaging') as typeof FBMessaging;
  const messaging: Messaging = fb.getMessaging();

  /** Resolves the token SalesIQ expects for this platform (FCM on Android, APNS on iOS). */
  const resolveSalesIQToken = async (): Promise<string | null> => {
    const token =
      Platform.OS === 'ios'
        ? (await fb.getAPNSToken(messaging)) ?? null
        : (await fb.getToken(messaging)) ?? null;
    console.log(`${LOG} resolved ${Platform.OS === 'ios' ? 'APNS' : 'FCM'} token →`, token);
    return token;
  };

  const registerCurrentToken = async (): Promise<void> => {
    const token = await resolveSalesIQToken();
    if (token) {
      console.log(`${LOG} registerPush(token, isTestDevice=${IS_TEST_DEVICE})`);
      ZohoSalesIQ.Notification.registerPush(token, IS_TEST_DEVICE);
      // Surface that the JS path handled the token, so the flow is verifiable at a glance.
      const preview = token.length > 14 ? `${token.slice(0, 14)}…` : token;
      showToast(`Push token received (JS) → registered · ${preview}`, 'success');
      pushEvent('JS_PUSH_TOKEN_REGISTERED', {source: 'js', token}, 'notification');
    } else {
      console.log(`${LOG} no token yet (APNS not delivered?) — nothing registered`);
    }
  };

  // Background / quit-state messages.
  fb.setBackgroundMessageHandler(messaging, async remoteMessage => {
    console.log(`${LOG} setBackgroundMessageHandler fired:`, remoteMessage?.data);
    forwardToSalesIQ(remoteMessage.data as Record<string, string> | undefined);
  });

  const unsubscribers: Array<() => void> = [];

  (async () => {
    const status = await fb.requestPermission(messaging);
    const granted =
      status === fb.AuthorizationStatus.AUTHORIZED ||
      status === fb.AuthorizationStatus.PROVISIONAL;
    console.log(`${LOG} requestPermission status=${status} granted=${granted}`);
    if (granted) {
      await registerCurrentToken();
    }  
    unsubscribers.push(
      fb.onTokenRefresh(messaging, token => {
        console.log(`${LOG} onTokenRefresh →`, token);
        registerCurrentToken();
      }),
    );
  })();
fb.onNotificationOpenedApp
  // Foreground messages.
  unsubscribers.push(
    fb.onMessage(messaging, async remoteMessage => {
      console.log(`${LOG} onMessage (foreground) fired:`, remoteMessage?.data);
      forwardToSalesIQ(remoteMessage.data as Record<string, string> | undefined);
    }),
  );

  return () => unsubscribers.forEach(u => u());
}

/**
 * Native-mode counterpart to the JS token toast. Call once after init. In 'native' mode the FCM service
 * (Android) / AppDelegate (iOS) receive and register the token with the SDK, so the JS layer never sees the
 * token value — this just surfaces, once, that the native path is the one handling push. No-op in 'js' mode
 * (there the real token toast fires from setupJsPush instead).
 */
export function announceNativePush(): void {
  if (!isNativePush) {
    return;
  }
  console.log(
    `${LOG} native mode — token is received & registered by the native FCM service (Android) / ` +
      `AppDelegate (iOS). Check the native logs ([SIQ-Push] in Xcode/logcat) for the token & payloads.`,
  );
  showToast('Native push active → token registered by the SDK (FCM service / AppDelegate)', 'success');
  pushEvent('NATIVE_PUSH_ACTIVE', {source: 'native'}, 'notification');
}
