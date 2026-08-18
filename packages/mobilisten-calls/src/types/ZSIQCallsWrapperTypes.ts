import type { ListenerEvent, Listeners } from './Listener';
import {
  CallComponent,
  SalesIQCallState,
} from '../components/core/SalesIQCall';
import {
  SalesIQConversationAttributes,
  SalesIQConversation,
} from '@react-native-zohosalesiq/mobilisten-core';
import { EmitterSubscription } from 'react-native/Libraries/vendor/emitter/EventEmitter';

/**
 * Represents an error returned by a callback.
 */
export type CallbackError = {
  /** Error code, if available. */
  code?: string | number;
  /** Error message describing the issue. */
  message?: string;
};

export interface ZSIQCallsWrapperTypes {
  /**
   * Initializes the Zoho SalesIQ Mobilisten Call module on iOS.
   *
   * Required: This must be called before using the `ZohoSalesIQ.initWithCallback` API
   *
   * On Android, this method has no effect.
   *
   * @platform **iOS**
   */
  initialiseForiOS: () => void;
  /**
   * Checks if the call feature is enabled.
   * @returns Promise resolving to true if enabled, false otherwise.
   */
  isEnabled: () => Promise<boolean>;

  /**
   * Gets the current active call ID.
   * @returns Promise resolving to the call ID or null if no call is active.
   */
  getCurrentCallId: () => Promise<string | null>;

  /**
   * Gets the current call state.
   * @returns Promise resolving to the current SalesIQCallState or null.
   */
  getCurrentCallState: () => Promise<SalesIQCallState | null>;

  /**
   * Switches the call UI to full screen mode.
   */
  enterFullScreenMode: () => void;

  /**
   * Switches the call UI to floating view mode.
   */
  enterFloatingViewMode: () => void;

  /**
   * Sets the call screen title for online and offline states.
   * @param onlineTitle Title to display when online.
   * @param offlineTitle Title to display when offline.
   */
  setTitle: (onlineTitle: string | null, offlineTitle: string | null) => void;

  /**
   * Starts a new call or resumes an existing one.
   * @param id Optional call ID to start/resume.
   * @param displayActiveCall Whether to display the active call UI.
   * @param attributes Optional conversation attributes.
   * @returns Promise resolving to the SalesIQConversation or null.
   */
  start: (
    id?: string | null,
    displayActiveCall?: boolean | null,
    attributes?: SalesIQConversationAttributes | null
  ) => Promise<SalesIQConversation | null>;

  /**
   * Ends the current call.
   * @returns Promise resolving to the ended SalesIQConversation or null.
   */
  end: () => Promise<SalesIQConversation | null>;

  /**
   * Sets reply messages for Android incoming calls.
   * @param messages Array of reply message strings.
   */
  setAndroidReplyMessages: (messages: string[]) => void;

  /**
   * Sets the visibility of a call component.
   * @param component The call component to show/hide.
   * @param isVisible Whether the component should be visible.
   */
  setVisibility: (component: CallComponent, isVisible: boolean) => void;

  /**
   * Gets the list of all SalesIQ conversations.
   * @returns Promise resolving to an array of SalesIQConversation objects.
   */
  getList: () => Promise<SalesIQConversation[]>;

  /**
   * Sets the icon for CallKit (iOS call UI).
   * @param icon Base64 string or asset name for the icon.
   */
  setCallKitIcon: (icon: string) => void;

  /**
   * Enables VoIP push notifications for calls using the given PushKit token.
   *
   * Note: iOS only. On Android, call notifications are delivered through FCM
   * (see `ZohoSalesIQ.Notification.registerPush`), so this API has no effect.
   *
   * @param token The PushKit VoIP device token.
   * @param isTestDevice Whether the device is a test device.
   * @param mode The APNs mode — 'sandbox' or 'production'. Defaults to 'production'.
   */
  enableVoIP: (
    token: string,
    isTestDevice: boolean,
    mode?: 'sandbox' | 'production'
  ) => void;

  /**
   * Handles an incoming VoIP push notification payload received via PushKit.
   *
   * Note: iOS only. On Android this API has no effect and the returned promise resolves immediately.
   *
   * ⚠️ **Warning — CallKit timing (iOS 13+).** When a VoIP push arrives, iOS requires an incoming call to
   * be reported to CallKit **synchronously**, inside the native PushKit callback
   * (`pushRegistry(_:didReceiveIncomingPushWith:for:completion:)`), before that callback returns. Calling
   * this API from JavaScript in response to a VoIP push is **not guaranteed to meet that deadline** —
   * especially on a **cold start from a killed app**, where booting the React Native runtime (~1–3 s)
   * exceeds the same-callback contract. Missing it causes iOS to **terminate the app** and, on repeated
   * misses, **stop delivering VoIP pushes** to it entirely.
   *
   * **Recommended:** handle VoIP natively in your `AppDelegate` (forward the payload to the SDK there), as
   * the SalesIQ sample app does. This JavaScript API is provided only as a convenience for integrators who
   * already own a native PushKit→JS bridge and understand the timing requirement — **correct and safe usage
   * is the integrator's responsibility.**
   *
   * @param info The VoIP notification payload.
   * @returns A promise that resolves once the SDK has processed the notification.
   */
  handleVOIPNotificationAction: (info: Record<string, any>) => Promise<void>;

  /**
   * Adds a listener for call-related events.
   * @param callback Function called with event data when an event occurs.
   * @returns EmitterSubscription for managing the listener.
   */
  addListener: (
    callback: (callbackData: Listeners) => void
  ) => EmitterSubscription;

  /**
   * Event types for listeners.
   */
  Event: typeof ListenerEvent;
}
