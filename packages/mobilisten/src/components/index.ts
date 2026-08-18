import type { ZSIQWrapperTypes, SalesIQData } from '../types/ZSIQWrapperTypes';
import { Dimensions, Platform } from 'react-native'; //No I18N
import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from '../commons/utils';
import {
  ListenerEvent,
  type ZSIQConstantsTypes,
  type ZSIQListenerEventsType,
} from '../types/Listener';
import { ZSIQConstants } from '../commons/ZSIQConstants';
import { ZSIQChats } from './chat';
import { ZSIQNotification } from './notification';
import { ZSIQLauncher } from './launcher';
import { ZSIQKnowledgeBase } from './knowledgebase';
import type { ZSIQNotificationTypes } from './notification/types/Notification';
import type { ZSIQLoggerTypes } from './logger/types/Logger';
import type { ZSIQKnowledgeBaseTypes } from './knowledgebase/types/KnowledgeBase';
import type { ZSIQLauncherTypes } from './launcher/types/Launcher';
import type { ChatTypes } from './chat/types/Chat';
import { ZSIQLogger } from './logger';
import { ZSIQConversationAPI } from './conversation';
import { ZSIQConversationTypes } from './conversation/types/Conversation';
import { ZSIQHomepage } from './homepage';
import type { ZSIQHomepageTypes } from './homepage/types/Homepage';
import { ZSIQTracking } from './tracking';
import type { ZSIQTrackingTypes } from './tracking/types/Tracking';
import { ZSIQChatActions } from './chatactions';
import type { ZSIQChatActionsTypes } from './chatactions/types/ChatActions';
import { ZSIQVisitor } from './visitor';
import type { ZSIQVisitorTypes } from './visitor/types/Visitor';
import { ZSIQHelpCenter } from './helpcenter';
import type { ZSIQHelpCenterTypes } from './helpcenter/types/HelpCenter';
import {
  SalesIQCallsHelper,
  SalesIQCallViewMode,
} from '@react-native-zohosalesiq/mobilisten-core';

// const emitter = new NativeEventEmitter(RNZohoSalesIQ);

/**
 * The root SalesIQ Mobilisten object, exported as `ZohoSalesIQ`. It is the single entry
 * point to the SDK: initialization plus the namespaced modules — `Chat`, `Conversation`,
 * `Visitor`, `Notification`, `Launcher`, `KnowledgeBase`, `Homepage`, `HelpCenter`,
 * `Tracking`, `Logger` and `ChatActions` — along with the chat-status, launcher-mode and
 * event-name constants.
 */
export const ZSIQWrapper = {
  ...ZSIQConstants,
  initialize: function (configuration) {
    if (
      configuration.androidCallViewMode != null &&
      configuration.androidCallViewMode != undefined
    ) {
      SalesIQCallsHelper.setCallStatusViewMode(
        configuration.androidCallViewMode == SalesIQCallViewMode.BANNER
          ? 'banner'
          : 'floating'
      );
    }
    return RNZohoSalesIQ.initialize(configuration);
  },
  init: function (appKey, accessKey) {
    RNZohoSalesIQ.init(appKey, accessKey);
  },
  initWithCallback: function (appKey, accessKey, callback) {
    RNZohoSalesIQ.initWithCallback(appKey, accessKey, callback);
  },
  setCustomFont: function (font) {
    RNZohoSalesIQ.setCustomFont(font);
  },
  present: function (screen, showHomepage = false) {
    return RNZohoSalesIQ.presentSDK(screen ?? {}, showHomepage);
  },
  setLanguage: function (languageCode) {
    RNZohoSalesIQ.setLanguage(languageCode);
  },
  setDepartment: function (departmentName) {
    RNZohoSalesIQ.setDepartment(departmentName);
  },
  setOperatorEmail: function (operatorMailID) {
    RNZohoSalesIQ.setOperatorEmail(operatorMailID);
  },
  showOperatorImageInLauncher: function (show) {
    RNZohoSalesIQ.showOperatorImageInLauncher(show);
  },
  showOfflineMessage: function (show) {
    RNZohoSalesIQ.showOfflineMessage(show);
  },
  endChat: function (id) {
    RNZohoSalesIQ.end(id);
  },
  getChats: function (callback) {
    RNZohoSalesIQ.getChats(callback);
  },
  getChatsWithFilter: function (filter, callback) {
    RNZohoSalesIQ.getChatsWithFilter(filter, callback);
  },
  setVisitorName: function (name) {
    RNZohoSalesIQ.setVisitorName(name);
  },
  setVisitorEmail: function (email) {
    RNZohoSalesIQ.setVisitorEmail(email);
  },
  setVisitorContactNumber: function (number) {
    RNZohoSalesIQ.setVisitorContactNumber(number);
  },
  setVisitorAddInfo: function (key, value) {
    RNZohoSalesIQ.setVisitorAddInfo(key, value);
  },
  setQuestion: function (question) {
    RNZohoSalesIQ.setQuestion(question);
  },
  setConversationListTitle: function (title) {
    RNZohoSalesIQ.setConversationListTitle(title);
  },
  fetchAttenderImage: function (atttenderId, fetchDefaultImage, callback) {
    RNZohoSalesIQ.fetchAttenderImage(atttenderId, fetchDefaultImage, callback);
  },
  registerVisitor: function (
    visitorId,
    visitorInfoOrCallback?: any,
    callback?: any
  ) {
    // Backward compatible overload handling:
    // Old: registerVisitor(visitorId, callback?)
    // New: registerVisitor(visitorId, visitorInfo?, callback?)

    // Native `registerVisitor` takes only (uniqueId, callback); visitorInfo has no
    // native counterpart, so the `visitorInfo` overload is accepted for source
    // compatibility but not forwarded. Set profile fields via Visitor.updateProfile().
    if (typeof visitorInfoOrCallback === 'function') {
      // registerVisitor(visitorId, callback)
      RNZohoSalesIQ.registerVisitor(visitorId, visitorInfoOrCallback);
    } else {
      // registerVisitor(visitorId), registerVisitor(visitorId, null|visitorInfo, callback?)
      RNZohoSalesIQ.registerVisitor(visitorId, callback ?? (() => {}));
    }
  },
  setThemeColorforiOS: function (colorCode) {
    RNZohoSalesIQ.setThemeColorforiOS(colorCode);
  },
  enableInAppNotification: function () {
    RNZohoSalesIQ.enableInAppNotification(true);
  },
  disableInAppNotification: function () {
    RNZohoSalesIQ.enableInAppNotification(false);
  },
  unregisterVisitor: function (callback?: any) {
    RNZohoSalesIQ.unregisterVisitor(callback ?? (() => {}));
  },
  setPageTitle: function (title) {
    RNZohoSalesIQ.setPageTitle(title);
  },
  registerChatAction: function (chatActionName) {
    RNZohoSalesIQ.registerChatAction(chatActionName);
  },
  unregisterChatAction: function (chatActionName) {
    RNZohoSalesIQ.unregisterChatAction(chatActionName);
  },
  unregisterAllChatActions: function () {
    RNZohoSalesIQ.unregisterAllChatActions();
  },
  setChatActionTimeout: function (timeoutInSec) {
    RNZohoSalesIQ.setChatActionTimeout(timeoutInSec);
  },
  setVisitorLocation: function (location) {
    RNZohoSalesIQ.setVisitorLocation(location);
  },
  addEventListener: function (type, listener) {
    RNZohoSalesIQ.updateListener(type);
    RNZohoSalesIQEmitter.addListener(type, listener);
  },
  addListener: function (callback) {
    return RNZohoSalesIQEmitter.addListener('ZSIQ_EVENT_LISTENER', callback);
  },
  Event: ListenerEvent,
  syncThemeWithOsForAndroid: function (sync) {
    RNZohoSalesIQ.syncThemeWithOsForAndroid(sync);
  },
  getDepartments: function (callback) {
    RNZohoSalesIQ.getDepartments(callback);
  },
  isMultipleOpenChatRestricted: function (callback) {
    RNZohoSalesIQ.isMultipleOpenChatRestricted(callback);
  },
  isChatEnabled: function (callback) {
    RNZohoSalesIQ.isChatEnabled(callback);
  },
  getChatUnreadCount: function (callback) {
    RNZohoSalesIQ.getChatUnreadCount(callback);
  },
  setLauncherPropertiesForAndroid: function (launcherPropertiesMap) {
    RNZohoSalesIQ.setLauncherPropertiesForAndroid(launcherPropertiesMap);
  },
  setThemeForAndroid: function (value) {
    RNZohoSalesIQ.setThemeForAndroid(value);
  },
  registerLocalizationFileForiOS: function (fileName) {
    RNZohoSalesIQ.registerLocalizationFile(fileName);
  },
  reRegisterPush: function () {
    RNZohoSalesIQ.reRegisterPush();
  },
  refreshLauncher: function () {
    RNZohoSalesIQ.refreshLauncher();
  },
  setThemeForiOS: function (value) {
    RNZohoSalesIQ.setThemeColor(value);
  },
  getCommunicationMode: function () {
    return RNZohoSalesIQ.getCommunicationMode();
  },

  ...ZSIQChats,

  sendEvent: function (eventName, ...values) {
    RNZohoSalesIQ.sendEvent(eventName, values);
  },

  dismissUI: function () {
    RNZohoSalesIQ.dismissUI();
  },

  setUriScheme: function (scheme) {
    RNZohoSalesIQ.setUriScheme(scheme);
  },

  // These APIs are not needed for now, will handle if it is needed in future.
  // isLiveChatAvailable: function (callback) {
  //   RNZohoSalesIQ.isLiveChatAvailable(callback);
  // },

  // isBrandOnline: function (callback) {
  //   RNZohoSalesIQ.isBrandOnline(callback);
  // },

  setThemeSource: function (source) {
    RNZohoSalesIQ.setThemeSource(source);
  },
  setSessionId: function (id) {
    RNZohoSalesIQ.setSessionId(id);
  },

  updateConfiguration: function (configuration, value) {
    const valueType = typeof value;
    let payload: { type: string; value: any };

    switch (valueType) {
      case 'string':
        payload = { type: 'string', value };
        break;
      case 'number':
        payload = { type: 'number', value };
        break;
      case 'boolean':
        payload = { type: 'boolean', value };
        break;
      default:
        throw new Error(`Unsupported value type: ${valueType}`);
    }
    RNZohoSalesIQ.updateConfiguration(configuration, payload);
  },

  refreshData: function (data: SalesIQData): Promise<void> {
    // Normalize input once so both platforms receive identical values:
    // canonicalize the type casing (native Android matches exact-case).
    const conversationId = (data.conversationId ?? '').trim();
    const rawType = (data.type ?? '').toLowerCase();
    const type =
      rawType === 'secretfields'
        ? 'secretFields'
        : rawType === 'displayfields'
          ? 'displayFields'
          : data.type;
    return RNZohoSalesIQ.refreshData({ type, conversationId });
  },

  ...ZSIQNotification,
  ...ZSIQLogger,
  ...ZSIQLauncher,
  ...ZSIQKnowledgeBase,
  ...ZSIQConversationAPI,
  ...ZSIQHomepage,
  ...ZSIQTracking,
  ...ZSIQChatActions,
  ...ZSIQVisitor,
  ...ZSIQHelpCenter,
} as ZSIQWrapperTypes &
  ZSIQConstantsTypes &
  ZSIQListenerEventsType &
  ChatTypes &
  ZSIQNotificationTypes &
  ZSIQLoggerTypes &
  ZSIQLauncherTypes &
  ZSIQKnowledgeBaseTypes &
  ZSIQConversationTypes &
  ZSIQHomepageTypes &
  ZSIQTrackingTypes &
  ZSIQChatActionsTypes &
  ZSIQVisitorTypes &
  ZSIQHelpCenterTypes;

//  MessageStatus: {
//    SENDING: RNZohoSalesIQ.SENDING,
//    UPLOADING: RNZohoSalesIQ.UPLOADING,
//    SENT: RNZohoSalesIQ.SENT,
//    FAILURE: RNZohoSalesIQ.FAILURE
//  }

if (Platform.OS === 'android') {
  Dimensions.addEventListener('change', () => {
    RNZohoSalesIQ.refreshLauncherPropertiesForAndroid();
  });
}
