import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from '../../commons/utils';
import { NotificationListenerEvent } from './types/Listener';
import type { ZSIQNotificationTypes } from './types/Notification';

export const ZSIQNotification = {
  Notification: {
    registerPush: function (token, isTestDevice) {
      RNZohoSalesIQ.registerPush(token, isTestDevice);
    },
    disablePush: function () {
      return RNZohoSalesIQ.disablePush();
    },
    isSDKMessage: function (map = {}, callback) {
      RNZohoSalesIQ.isSDKMessage(map, callback);
    },
    process: function (map = {}) {
      RNZohoSalesIQ.processNotificationMessage(map);
    },
    getPayload: function (map = {}, callback) {
      RNZohoSalesIQ.getNotificationPayload(map, callback);
    },
    setActionSource: function (actionSource) {
      RNZohoSalesIQ.setNotificationActionSource(actionSource);
    },
    getBadgeCount: function () {
      return RNZohoSalesIQ.getBadgeCount();
    },
    enableInAppNotification: function (enabled) {
      RNZohoSalesIQ.enableInAppNotification(enabled);
    },
    addListener: function (callback) {
      RNZohoSalesIQ.updateListener(
        NotificationListenerEvent.NOTIFICATION_CLICKED
      );
      return RNZohoSalesIQEmitter.addListener(
        'NOTIFICATION_EVENT_LISTENER',
        callback
      );
    },
    Event: NotificationListenerEvent,
  },
} as ZSIQNotificationTypes;
