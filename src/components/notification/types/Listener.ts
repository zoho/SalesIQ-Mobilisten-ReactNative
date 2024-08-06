import type { ZSIQNotificationPayloadResult } from './Notification';

export enum NotificationListenerEvent {
  /**
   * Invoked when the notification clicked.
   */
  NOTIFICATION_CLICKED = 'EVENT_NOTIFICATION_CLICKED',
}

export type NotificationListener = {
  event: NotificationListenerEvent.NOTIFICATION_CLICKED;
  body: ZSIQNotificationPayloadResult;
};
