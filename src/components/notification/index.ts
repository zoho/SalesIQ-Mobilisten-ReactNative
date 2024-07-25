import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from '../../commons/utils';
import { NotificationListenerEvent } from './types/Listener';
import type { ZSIQNotificationTypes } from './types/Notification';

export const ZSIQNotification = {
  Notification: {
    setIconForAndroid: function (resourceName) {
      RNZohoSalesIQ.setNotificationIconForAndroid(resourceName);
    },
    registerPush: function (token, isTestDevice) {
      RNZohoSalesIQ.registerPush(token, isTestDevice);
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
    addListener: function (callback) {
      RNZohoSalesIQ.updateListener(NotificationListenerEvent.NOTIFICATION_CLICKED);
      RNZohoSalesIQEmitter.addListener("NOTIFICATION_EVENT_LISTENER", callback);
    },
    Event: NotificationListenerEvent
  },
} as ZSIQNotificationTypes;
