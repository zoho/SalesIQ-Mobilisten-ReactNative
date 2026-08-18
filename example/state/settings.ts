import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

/**
 * Placeholder credentials — replace with real keys from the SalesIQ portal.
 * See https://www.zoho.com/salesiq/help/developer-guides/android-mobile-sdk-installation-2.0.html
 */
const PLACEHOLDER_ANDROID_APP_KEY = 'rj3ZRJbxTdayKjFlt4rLRtTKSWu4SgI0fpIavXj2M1Jh64SdzaFh6GWika4axM55nQmxSaPW%2B0g%3D_in';
const PLACEHOLDER_ANDROID_ACCESS_KEY = 'vlTzlvd0nKTstdULuSvfLFNLyXMEzDxrSUJ9rwQArPxS9su58J8g3FP72ZK648cIVa3KLEoJoLkJ%2BChJO97pRSpg1jt3c%2BognEXP1mzXNMdmIKu2S7FDgXjOvBCzV%2F7JtbVMqjA7ArQ%3D';
const PLACEHOLDER_IOS_APP_KEY = 'rj3ZRJbxTdayKjFlt4rLRtTKSWu4SgI0fpIavXj2M1Jh64SdzaFh6GWika4axM55nQmxSaPW%2B0g%3D_in';
const PLACEHOLDER_IOS_ACCESS_KEY = 'aibwlL4DebUSXO0jpJylqVAlxEMo9skHbbB45%2BHYw8j9ne5473KsJV7UhGxJdaMEonI6%2Bwn%2BzCNz07iXKDzffypQ09gPWkeBmG8pl%2BjZ33TeRg3vJtA%2BooWe5wyCEmGW';

export type SDKInitStatus =
  | 'pending'
  | 'initialized'
  | 'failed'
  | 'keysRequired';

interface SettingsState {
  appKey: string;
  accessKey: string;
  initStatus: SDKInitStatus;
  initError: string | null;
}

const platformDefaults =
  Platform.OS === 'ios'
    ? {appKey: PLACEHOLDER_IOS_APP_KEY, accessKey: PLACEHOLDER_IOS_ACCESS_KEY}
    : {
        appKey: PLACEHOLDER_ANDROID_APP_KEY,
        accessKey: PLACEHOLDER_ANDROID_ACCESS_KEY,
      };

/** True while the app is still shipping the placeholder credentials. */
export const hasPlaceholderKeys = (appKey: string, accessKey: string) =>
  appKey.startsWith('<YOUR_') || accessKey.startsWith('<YOUR_');

let state: SettingsState = {
  appKey: platformDefaults.appKey,
  accessKey: platformDefaults.accessKey,
  initStatus: hasPlaceholderKeys(
    platformDefaults.appKey,
    platformDefaults.accessKey,
  )
    ? 'keysRequired'
    : 'pending',
  initError: null,
};

type Listener = () => void;
const listeners = new Set<Listener>();
const notify = () => listeners.forEach(listener => listener());

export const getSettings = (): SettingsState => state;

export const setCredentials = (appKey: string, accessKey: string) => {
  state = {
    ...state,
    appKey,
    accessKey,
    initStatus: hasPlaceholderKeys(appKey, accessKey)
      ? 'keysRequired'
      : 'pending',
  };
  notify();
};

export const setInitStatus = (
  status: SDKInitStatus,
  error: string | null = null,
) => {
  state = {...state, initStatus: status, initError: error};
  notify();
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Live-subscribes to the credentials + SDK init status. */
export const useSettings = (): SettingsState => {
  const [snapshot, setSnapshot] = useState(getSettings);
  useEffect(() => subscribe(() => setSnapshot(getSettings())), []);
  return snapshot;
};
