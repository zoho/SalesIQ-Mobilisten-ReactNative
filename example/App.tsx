import React, {useEffect, useRef} from 'react';
import {AppState, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import {SalesIQCallViewMode} from '@react-native-zohosalesiq/mobilisten-core';

import ThemeProvider from './theme/ThemeProvider';
import AppNavigator from './navigation';
import ToastHost from './components/ui/Toast';
import {addListeners} from './scripts/listeners';
import {setupJsPush, announceNativePush} from './scripts/push';
import {
  requestNotificationPermission,
  getNotificationPermissionStatus,
} from './scripts/permissions';
import {setPushPermission} from './state/pushStatus';
import {loadDepartments} from './state/departments';
import {hasPlaceholderKeys, setInitStatus, useSettings} from './state/settings';

let listenersAttached = false;

/** Initializes the SDK with the given keys and applies the sample app's default runtime config. */
const initializeSalesIQ = (appKey: string, accessKey: string) => {
  if (!listenersAttached) {
    listenersAttached = true;
    addListeners();
  }

  // Start the SDK with your portal's app key + access key; must succeed before any other API works.
  ZohoSalesIQ.initialize({
    appKey,
    accessKey,
    androidCallViewMode: SalesIQCallViewMode.FLOATING,
  })
    .then(() => {
      setInitStatus('initialized');
      // Show the floating chat launcher button, and keep it always visible.
      ZohoSalesIQ.Launcher.show(ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS);
      // Let the user drag the launcher to a dismiss target to hide it.
      ZohoSalesIQ.Launcher.enableDragToDismiss(true);
      // Show the connected operator's photo on the launcher.
      ZohoSalesIQ.Launcher.showOperatorImage(true);
      // Let visitors leave a message when all operators are offline.
      ZohoSalesIQ.showOfflineMessage(true);
      // Show chat/notification banners while the app is in the foreground.
      ZohoSalesIQ.Notification.enableInAppNotification(true);
      // Push: in 'js' mode wire @react-native-firebase/messaging → SDK; no-op in 'native' mode
      // (the native FirebaseMessagingService / AppDelegate forward push instead). See config/push.ts.
      setupJsPush();
      // Native mode: surface once that the native layer owns push (no-op in 'js' mode).
      announceNativePush();
      // Fetch departments once init succeeds, so the Chat screen's attribute pickers can offer them.
      loadDepartments();
      if (Platform.OS === 'android') {
        // Android only: stop the SDK UI from following the OS light/dark theme.
        ZohoSalesIQ.syncThemeWithOsForAndroid(false);
      }
    })
    .catch((error: {message?: string}) => {
      setInitStatus('failed', error?.message ?? 'Unknown initialization error');
    });
};

/**
 * SDK bootstrap + app shell. Initialization and push registration are automatic — there
 * are no manual "init" or "register push" buttons anywhere in the UI (see Core &
 * Notifications screens), matching the design system's automatic-startup rule.
 *
 * Re-runs whenever the stored credentials change (e.g. after Settings → Save keys), so
 * pasting real keys over the shipped placeholders initializes the SDK without a rebuild.
 */
const App = () => {
  const {appKey, accessKey} = useSettings();
  const initializedFor = useRef<string | null>(null);

  // Notification permission: request it once at startup (Android 13+ runtime prompt; no-op on iOS, where
  // the AppDelegate already requests it), then publish the resulting status to the app-wide push-status
  // store. Re-read on every foreground so the global header warning + Notifications banner clear right
  // after the user enables notifications in Settings and returns. Independent of SDK init.
  useEffect(() => {
    const refreshStatus = () =>
      getNotificationPermissionStatus().then(setPushPermission);
    requestNotificationPermission().finally(refreshStatus);
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') {
        refreshStatus();
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (hasPlaceholderKeys(appKey, accessKey)) {
      setInitStatus('keysRequired');
      return;
    }
    const credentialsKey = `${appKey}:${accessKey}`;
    if (initializedFor.current === credentialsKey) {
      return;
    }
    initializedFor.current = credentialsKey;
    initializeSalesIQ(appKey, accessKey);
  }, [appKey, accessKey]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
          <ToastHost />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
