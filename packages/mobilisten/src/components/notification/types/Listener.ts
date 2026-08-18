import type { ZSIQNotificationPayloadResult } from './Notification';

/**
 * Notification events emitted to `ZohoSalesIQ.Notification.addListener()` callbacks.
 */
export enum NotificationListenerEvent {
  /**
   * Invoked when the notification clicked.
   */
  NOTIFICATION_CLICKED = 'EVENT_NOTIFICATION_CLICKED',
}

/**
 * The payload delivered to `ZohoSalesIQ.Notification.addListener()`, carrying the notification
 * `event` and, in its `body`, the parsed notification payload for the clicked notification.
 */
export type NotificationListener = {
  /** The notification event that occurred. */
  event: NotificationListenerEvent.NOTIFICATION_CLICKED;
  /** Parsed payload of the clicked notification. */
  body: ZSIQNotificationPayloadResult;
};
