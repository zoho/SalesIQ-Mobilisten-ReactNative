import {useSyncExternalStore} from 'react';
import type {NotificationPermissionStatus} from '../scripts/permissions';

/**
 * App-wide push/notification health, so a warning indicator can live in the global header (every screen)
 * and the Notifications screen can show the in-detail banner — both reading the same source.
 *
 * Today this tracks the OS notification-permission status (the concrete, detectable signal). It's designed
 * to grow: add fields here (e.g. `registered`, `lastError`) and fold them into `pushHasIssue` as more push
 * failure signals become available, without touching the header/banner consumers.
 */
export interface PushStatusState {
  permission: NotificationPermissionStatus;
}

let state: PushStatusState = {permission: 'unknown'};
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());

export const getPushStatus = (): PushStatusState => state;

/** External-store subscribe for `useSyncExternalStore`; returns the unsubscribe fn. */
const subscribe = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const setPushPermission = (
  permission: NotificationPermissionStatus,
): void => {
  if (state.permission === permission) {
    return;
  }
  state = {...state, permission};
  notify();
};

/** True when notifications need the user's attention (denied/blocked) — drives the header warning. */
export const pushHasIssue = (s: PushStatusState = state): boolean =>
  s.permission === 'denied';

/**
 * Live-subscribes to the push status via `useSyncExternalStore`, which re-reads the snapshot on every
 * render — including the re-render when react-native-screens *unfreezes* a screen. This is why the global
 * header badge shows correctly on the Home screen: Home is the initial/bottom-of-stack route and gets
 * frozen while you're elsewhere, so a hand-rolled `useState`+listener would miss the update fired (via
 * AppState) while frozen and keep a stale value on unfreeze.
 */
export const usePushStatus = (): PushStatusState =>
  useSyncExternalStore(subscribe, getPushStatus);
