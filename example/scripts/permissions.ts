import {Linking, NativeModules, PermissionsAndroid, Platform} from 'react-native';

/** Shared tag so these lines sit alongside the other push logs in Metro. */
const LOG = '[SIQ-Push][JS]';

/** Normalized notification-permission state used to drive the Notifications-screen warning banner. */
export type NotificationPermissionStatus =
  | 'granted'
  | 'denied' // includes iOS "denied" and Android not-granted (denied or blocked) → show the settings prompt
  | 'notDetermined'
  | 'unknown';

/**
 * Requests the OS notification permission the app needs to show push notifications.
 *
 * - **Android 13+ (API 33):** `POST_NOTIFICATIONS` is a runtime permission. We request it explicitly here so
 *   it works in **both** push modes — the `nativePush` flavor never loads `@react-native-firebase`, which
 *   would otherwise be the thing prompting. Below API 33 the permission is granted at install (no-op).
 * - **iOS:** the notification prompt is already shown by the native `AppDelegate`
 *   (`UNUserNotificationCenter requestAuthorizationWithOptions` at launch), so this is a no-op to avoid a
 *   duplicate request.
 *
 * Safe to call once at app startup, independent of SDK init. Never throws.
 */
export async function requestNotificationPermission(): Promise<void> {
  if (Platform.OS !== 'android') {
    // iOS: handled natively in AppDelegate. Nothing to do in JS.
    return;
  }

  // Platform.Version is the Android API level (number) on Android.
  if (typeof Platform.Version === 'number' && Platform.Version >= 33) {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log(`${LOG} POST_NOTIFICATIONS permission →`, result);
    } catch (error) {
      console.log(`${LOG} POST_NOTIFICATIONS request failed:`, error);
    }
  }
}

/**
 * Reads the current notification-permission status (for the Notifications-screen warning banner).
 * - iOS: via the app-local `NotificationPermission` native module (`UNUserNotificationCenter`).
 * - Android 13+: via `PermissionsAndroid.check(POST_NOTIFICATIONS)`. Below API 33 it's granted at install.
 * Never throws — returns 'unknown' on any failure.
 */
export async function getNotificationPermissionStatus(): Promise<NotificationPermissionStatus> {
  try {
    if (Platform.OS === 'ios') {
      const mod = NativeModules.NotificationPermission as
        | {getStatus: () => Promise<string>}
        | undefined;
      if (!mod?.getStatus) {
        return 'unknown';
      }
      const raw = await mod.getStatus();
      if (raw === 'authorized' || raw === 'provisional' || raw === 'ephemeral') {
        return 'granted';
      }
      if (raw === 'denied') {
        return 'denied';
      }
      if (raw === 'notDetermined') {
        return 'notDetermined';
      }
      return 'unknown';
    }

    if (typeof Platform.Version === 'number' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      // check() can't tell "denied" from "blocked"; either way the banner + Open-Settings is the right CTA.
      return granted ? 'granted' : 'denied';
    }

    // Android < 13 (or web): notifications are granted at install.
    return 'granted';
  } catch (error) {
    console.log(`${LOG} getNotificationPermissionStatus failed:`, error);
    return 'unknown';
  }
}

/**
 * Opens the OS settings page for this app, where the user can re-enable notifications after they've denied
 * the runtime prompt (which the OS won't show again). `Linking.openSettings()` is built in and cross-platform.
 */
export function openNotificationSettings(): void {
  Linking.openSettings().catch(error =>
    console.log(`${LOG} openSettings failed:`, error),
  );
}
