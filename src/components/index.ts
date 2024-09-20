import type {
  ZSIQWrapperTypes,
} from '../types/ZSIQWrapperTypes';
import { Dimensions, Platform, NativeEventEmitter } from 'react-native'; //No I18N
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

const emitter = new NativeEventEmitter(RNZohoSalesIQ);

export const ZSIQWrapper = {
  ...ZSIQConstants,
  init: function (appKey, accessKey) {
    RNZohoSalesIQ.init(appKey, accessKey);
  },
  initWithCallback: function (appKey, accessKey, callback) {
    RNZohoSalesIQ.initWithCallback(appKey, accessKey, callback);
  },
  setCustomFont: function (font) {
    RNZohoSalesIQ.setCustomFont(font);
  },
  present: function (tab = null, id = null, callback = () => {}) {
    RNZohoSalesIQ.present(tab, id, callback);
  },
  setChatTitle: function (title) {
    RNZohoSalesIQ.setChatTitle(title);
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
  showOperatorImageInChat: function (show) {
    RNZohoSalesIQ.showOperatorImageInChat(show);
  },
  setFeedbackVisibility: function (visibility) {
    RNZohoSalesIQ.setFeedbackVisibility(visibility);
  },
  setRatingVisibility: function (visibility) {
    RNZohoSalesIQ.setRatingVisibility(visibility);
  },
  showOperatorImageInLauncher: function (show) {
    RNZohoSalesIQ.showOperatorImageInLauncher(show);
  },
  openChat: function () {
    RNZohoSalesIQ.openChat();
  },
  openChatWithID: function (id) {
    RNZohoSalesIQ.openChatWithID(id);
  },
  showOfflineMessage: function (show) {
    RNZohoSalesIQ.showOfflineMessage(show);
  },
  endChat: function (id) {
    RNZohoSalesIQ.endChat(id);
  },
  getChats: function (callback) {
    RNZohoSalesIQ.getChats(callback);
  },
  getChatsWithFilter: function (filter, callback) {
    RNZohoSalesIQ.getChatsWithFilter(filter, callback);
  },
  setLauncherVisibility: function (visibility) {
    RNZohoSalesIQ.setLauncherVisibility(visibility);
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
  startChat: function (message) {
    RNZohoSalesIQ.startChat(message);
  },
  setConversationVisibility: function (visibility) {
    RNZohoSalesIQ.setConversationVisibility(visibility);
  },
  setConversationListTitle: function (title) {
    RNZohoSalesIQ.setConversationListTitle(title);
  },
  setFAQVisibility: function (visibility) {
    RNZohoSalesIQ.setFAQVisibility(visibility);
  },
  getArticles: function (callback) {
    RNZohoSalesIQ.getArticles(callback);
  },
  getArticlesWithCategoryID: function (id, callback) {
    RNZohoSalesIQ.getArticlesWithCategoryID(id, callback);
  },
  getCategories: function (callback) {
    RNZohoSalesIQ.getCategories(callback);
  },
  openArticle: function (id, callback) {
    RNZohoSalesIQ.openArticle(id, callback);
  },
  fetchAttenderImage: function (atttenderId, fetchDefaultImage, callback) {
    RNZohoSalesIQ.fetchAttenderImage(atttenderId, fetchDefaultImage, callback);
  },
  registerVisitor: function (visitorId, callback = () => {}) {
    RNZohoSalesIQ.registerVisitor(visitorId, callback);
  },
  setThemeColorforiOS: function (colorCode) {
    RNZohoSalesIQ.setThemeColorforiOS(colorCode);
  },
  setVisitorNameVisibility: function (visible) {
    RNZohoSalesIQ.setVisitorNameVisibility(visible);
  },
  enablePreChatForms: function () {
    RNZohoSalesIQ.enablePreChatForms();
  },
  disablePreChatForms: function () {
    RNZohoSalesIQ.disablePreChatForms();
  },
  enableScreenshotOption: function () {
    RNZohoSalesIQ.enableScreenshotOption();
  },
  disableScreenshotOption: function () {
    RNZohoSalesIQ.disableScreenshotOption();
  },
  enableInAppNotification: function () {
    RNZohoSalesIQ.enableInAppNotification();
  },
  disableInAppNotification: function () {
    RNZohoSalesIQ.disableInAppNotification();
  },
  unregisterVisitor: function (callback = () => {}) {
    RNZohoSalesIQ.unregisterVisitor(callback);
  },
  setPageTitle: function (title) {
    RNZohoSalesIQ.setPageTitle(title);
  },
  setCustomAction: function (actionName) {
    RNZohoSalesIQ.setCustomAction(actionName);
  },
  performCustomAction: function (actionName, shouldOpenChatWindow = false) {
    RNZohoSalesIQ.performCustomAction(actionName, shouldOpenChatWindow);
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
  // DEPRECATED
  completeChatAction: function (uuid) {
    RNZohoSalesIQ.completeChatAction(uuid);
  },
  // DEPRECATED
  completeChatActionWithMessage: function (uuid, success, message) {
    RNZohoSalesIQ.completeChatActionWithMessage(uuid, success, message);
  },
  setChatActionTimeout: function (timeoutInSec) {
    RNZohoSalesIQ.setChatActionTimeout(timeoutInSec);
  },
  setVisitorLocation: function (location) {
    RNZohoSalesIQ.setVisitorLocation(location);
  },
  addEventListener: function (type, listener) {
    RNZohoSalesIQ.updateListener(type);
    emitter.addListener(type, listener);
  },
  addListener: function (callback) {
    RNZohoSalesIQEmitter.addListener("ZSIQ_EVENT_LISTENER", callback);
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
  printDebugLogsForAndroid: function (value) {
    RNZohoSalesIQ.printDebugLogsForAndroid(value);
  },
  setThemeForAndroid: function (value) {
    RNZohoSalesIQ.setThemeForAndroid(value);
  },
  registerLocalizationFileForiOS: function (fileName) {
    RNZohoSalesIQ.registerLocalizationFile(fileName);
  },
  refreshLauncher: function () {
    RNZohoSalesIQ.refreshLauncher();
  },
  setThemeForiOS: function (value) {
    RNZohoSalesIQ.setThemeColor(value);
  },

  ...ZSIQChats,

  sendEvent: function (eventName, ...values) {
    RNZohoSalesIQ.sendEvent(eventName, values);
  },

  /**
   *
   * @param  {...Tab} tabNames
   */
  setTabOrder: function (...tabNames) {
    RNZohoSalesIQ.setTabOrder(tabNames);
  },

  dismissUI: function () {
    RNZohoSalesIQ.dismissUI();
  },

  ...ZSIQNotification,

  ...ZSIQLogger,

  ...ZSIQLauncher,

  ...ZSIQKnowledgeBase,
} as ZSIQWrapperTypes &
  ZSIQConstantsTypes &
  ZSIQListenerEventsType &
  ChatTypes &
  ZSIQNotificationTypes &
  ZSIQLoggerTypes &
  ZSIQLauncherTypes &
  ZSIQKnowledgeBaseTypes;

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
