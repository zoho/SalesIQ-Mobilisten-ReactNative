export { default as SIQTheme } from './components/ios-theme';
export { SalesIQUser, SalesIQGuestUser } from './components/auth';
export { SalesIQAuth } from './components/auth/SalesIQAuth';
export { ZSIQWrapper as ZohoSalesIQ } from "./components";
export { ZSIQChatComponent } from './components/chat/types/Chat';


// {/**

// import {
//   Dimensions,
//   Platform,
//   // NativeEventEmitter
// } from 'react-native'; //No I18N
// import RNZohoSalesIQ from '../commons/utils';
// // const emitter = new NativeEventEmitter(RNZohoSalesIQ);

// interface ZSIQWrapper {
//   init: (appKey: string, accessKey: string) => void;
//   initWithCallback: (appKey: string, accessKey: string, callback: () => void) => void;
//   setChatTitle: (title: string) => void;
//   setLanguage: (language_code: string) => void;
//   setDepartment: (department: any) => void
//   setOperatorEmail: (email: string) => void;
//   showOperatorImageInChat: (show: boolean) => void;
//   setRatingVisibility: (visibility) => void;
//   showOperatorImageInLauncher: (show) => void;
//   openChat: () => void;
//   openChatWithID: (id) => void;
//   showOfflineMessage: (show) => void;
//   endChat: (id) => void;
//   getChats: (callback) => void;
//   getChatsWithFilter: (filter, callback) => void;
//   setLauncherVisibility: (visibility) => void;
//   setVisitorName: (name) => void;
//   setVisitorEmail: (email) => void;
//   setVisitorContactNumber: (number) => void;
//   setVisitorAddInfo: (key, value) => void;
//   setQuestion: (question) => void;
//   startChat: (message) => void;
//   setConversationVisibility: (visibility) => void;
//   setConversationListTitle: (title) => void;
//   setFAQVisibility: (visibility) => void;
//   getArticles: (callback) => void;
//   getArticlesWithCategoryID: (id, callback) => void;
//   getCategories: (callback) => void;
//   openArticle: (id, callback) => void;
//   fetchAttenderImage: (atttenderId, fetchDefaultImage, callback) => void;
//   registerVisitor: (visitorId, callback) => void;
//   setThemeColorforiOS: (colorCode) => void;
//   setVisitorNameVisibility: (visible) => void;
//   enablePreChatForms: () => void;
//   disablePreChatForms: () => void;
//   enableScreenshotOption: () => void;
//   disableScreenshotOption: () => void;
//   enableInAppNotification: () => void;
//   disableInAppNotification: () => void;
//   unregisterVisitor: (callback) => void;
//   setPageTitle: (title) => void;
//   setCustomAction: (actionName) => void;
//   performCustomAction: (actionName, shouldOpenChatWindow = false) => void;
//   registerChatAction: (chatActionName) => void;
//   unregisterChatAction: (chatActionName) => void;
//   unregisterAllChatActions: () => void;
//   // DEPRECATED
//   completeChatAction: (uuid) => void;
//   // DEPRECATED
//   completeChatActionWithMessage: (uuid, success, message) => void;
//   setChatActionTimeout: (timeout) => void;
//   setVisitorLocation: (location) => void;
//   addEventListener: (type, listener) => void;
//   syncThemeWithOsForAndroid: (sync) => void;
//   getDepartments: (callback) => void;
//   isMultipleOpenChatRestricted: (callback) => void;
//   isChatEnabled: (callback) => void;
//   getChatUnreadCount: (callback) => void;
//   setLauncherPropertiesForAndroid: (launcherPropertiesMap) => void;
//   printDebugLogsForAndroid: (value) => void;
//   setThemeForAndroid: (value) => void;
//   registerLocalizationFileForiOS: (value) => void;
//   refreshLauncher: () => void;
//   setThemeForiOS: (value) => void;
// }

// export default {
//   init: function (appKey, accessKey) {
//     RNZohoSalesIQ.init(appKey, accessKey);
//   },
//   initWithCallback: function (appKey, accessKey, callback) {
//     RNZohoSalesIQ.initWithCallback(appKey, accessKey, callback);
//   },
//   setChatTitle: function (title) {
//     RNZohoSalesIQ.setChatTitle(title);
//   },
//   setLanguage: function (language_code) {
//     RNZohoSalesIQ.setLanguage(language_code);
//   },
//   setDepartment: function (department) {
//     RNZohoSalesIQ.setDepartment(department);
//   },
//   setOperatorEmail: function (email) {
//     RNZohoSalesIQ.setOperatorEmail(email);
//   },
//   showOperatorImageInChat: function (show) {
//     RNZohoSalesIQ.showOperatorImageInChat(show);
//   },
//   setFeedbackVisibility: function (visibility) {
//     RNZohoSalesIQ.setFeedbackVisibility(visibility);
//   },
//   setRatingVisibility: function (visibility) {
//     RNZohoSalesIQ.setRatingVisibility(visibility);
//   },
//   showOperatorImageInLauncher: function (show) {
//     RNZohoSalesIQ.showOperatorImageInLauncher(show);
//   },
//   openChat: function () {
//     RNZohoSalesIQ.openChat();
//   },
//   openChatWithID: function (id) {
//     RNZohoSalesIQ.openChatWithID(id);
//   },
//   showOfflineMessage: function (show) {
//     RNZohoSalesIQ.showOfflineMessage(show);
//   },
//   endChat: function (id) {
//     RNZohoSalesIQ.endChat(id);
//   },
//   getChats: function (callback) {
//     RNZohoSalesIQ.getChats(callback);
//   },
//   getChatsWithFilter: function (filter, callback) {
//     RNZohoSalesIQ.getChatsWithFilter(filter, callback);
//   },
//   setLauncherVisibility: function (visibility) {
//     RNZohoSalesIQ.setLauncherVisibility(visibility);
//   },
//   setVisitorName: function (name) {
//     RNZohoSalesIQ.setVisitorName(name);
//   },
//   setVisitorEmail: function (email) {
//     RNZohoSalesIQ.setVisitorEmail(email);
//   },
//   setVisitorContactNumber: function (number) {
//     RNZohoSalesIQ.setVisitorContactNumber(number);
//   },
//   setVisitorAddInfo: function (key, value) {
//     RNZohoSalesIQ.setVisitorAddInfo(key, value);
//   },
//   setQuestion: function (question) {
//     RNZohoSalesIQ.setQuestion(question);
//   },
//   startChat: function (message) {
//     RNZohoSalesIQ.startChat(message);
//   },
//   setConversationVisibility: function (visibility) {
//     RNZohoSalesIQ.setConversationVisibility(visibility);
//   },
//   setConversationListTitle: function (title) {
//     RNZohoSalesIQ.setConversationListTitle(title);
//   },
//   setFAQVisibility: function (visibility) {
//     RNZohoSalesIQ.setFAQVisibility(visibility);
//   },
//   getArticles: function (callback) {
//     RNZohoSalesIQ.getArticles(callback);
//   },
//   getArticlesWithCategoryID: function (id, callback) {
//     RNZohoSalesIQ.getArticlesWithCategoryID(id, callback);
//   },
//   getCategories: function (callback) {
//     RNZohoSalesIQ.getCategories(callback);
//   },
//   openArticle: function (id, callback) {
//     RNZohoSalesIQ.openArticle(id, callback);
//   },
//   fetchAttenderImage: function (atttenderId, fetchDefaultImage, callback) {
//     RNZohoSalesIQ.fetchAttenderImage(atttenderId, fetchDefaultImage, callback);
//   },
//   registerVisitor: function (visitorId, callback) {
//     RNZohoSalesIQ.registerVisitor(visitorId, callback ? callback : () => {});
//   },
//   setThemeColorforiOS: function (colorCode) {
//     RNZohoSalesIQ.setThemeColorforiOS(colorCode);
//   },
//   setVisitorNameVisibility: function (visible) {
//     RNZohoSalesIQ.setVisitorNameVisibility(visible);
//   },
//   enablePreChatForms: function () {
//     RNZohoSalesIQ.enablePreChatForms();
//   },
//   disablePreChatForms: function () {
//     RNZohoSalesIQ.disablePreChatForms();
//   },
//   enableScreenshotOption: function () {
//     RNZohoSalesIQ.enableScreenshotOption();
//   },
//   disableScreenshotOption: function () {
//     RNZohoSalesIQ.disableScreenshotOption();
//   },
//   enableInAppNotification: function () {
//     RNZohoSalesIQ.enableInAppNotification();
//   },
//   disableInAppNotification: function () {
//     RNZohoSalesIQ.disableInAppNotification();
//   },
//   unregisterVisitor: function (callback) {
//     RNZohoSalesIQ.unregisterVisitor(callback ? callback : () => {});
//   },
//   setPageTitle: function (title) {
//     RNZohoSalesIQ.setPageTitle(title);
//   },
//   setCustomAction: function (actionName) {
//     RNZohoSalesIQ.setCustomAction(actionName);
//   },
//   performCustomAction: function (actionName, shouldOpenChatWindow = false) {
//     RNZohoSalesIQ.performCustomAction(actionName, shouldOpenChatWindow);
//   },
//   registerChatAction: function (chatActionName) {
//     RNZohoSalesIQ.registerChatAction(chatActionName);
//   },
//   unregisterChatAction: function (chatActionName) {
//     RNZohoSalesIQ.unregisterChatAction(chatActionName);
//   },
//   unregisterAllChatActions: function () {
//     RNZohoSalesIQ.unregisterAllChatActions();
//   },
//   // DEPRECATED
//   completeChatAction: function (uuid) {
//     RNZohoSalesIQ.completeChatAction(uuid);
//   },
//   // DEPRECATED
//   completeChatActionWithMessage: function (uuid, success, message) {
//     RNZohoSalesIQ.completeChatActionWithMessage(uuid, success, message);
//   },
//   setChatActionTimeout: function (timeout) {
//     RNZohoSalesIQ.setChatActionTimeout(timeout);
//   },
//   setVisitorLocation: function (location) {
//     RNZohoSalesIQ.setVisitorLocation(location);
//   },
//   addEventListener: function (type, listener) {
//     RNZohoSalesIQ.updateListener(type);
//     listener = emitter.addListener(type, listener);
//   },
//   syncThemeWithOsForAndroid: function (sync) {
//     RNZohoSalesIQ.syncThemeWithOsForAndroid(sync);
//   },
//   getDepartments: function (callback) {
//     RNZohoSalesIQ.getDepartments(callback);
//   },
//   isMultipleOpenChatRestricted: function (callback) {
//     RNZohoSalesIQ.isMultipleOpenChatRestricted(callback);
//   },
//   isChatEnabled: function (callback) {
//     RNZohoSalesIQ.isChatEnabled(callback);
//   },
//   getChatUnreadCount: function (callback) {
//     RNZohoSalesIQ.getChatUnreadCount(callback);
//   },
//   setLauncherPropertiesForAndroid: function (launcherPropertiesMap) {
//     RNZohoSalesIQ.setLauncherPropertiesForAndroid(launcherPropertiesMap);
//   },
//   printDebugLogsForAndroid: function (value) {
//     RNZohoSalesIQ.printDebugLogsForAndroid(value)
//   },
//   setThemeForAndroid: function (value) {
//     RNZohoSalesIQ.setThemeForAndroid(value)
//   },
//   registerLocalizationFileForiOS: function (value) {
//     RNZohoSalesIQ.registerLocalizationFile(value)
//   },
//   refreshLauncher: function() {
//     RNZohoSalesIQ.refreshLauncher();
//   },
//   setThemeForiOS: function (value) {
//     RNZohoSalesIQ.setThemeColor(value)
//   },

//   Chat: {
//     shouldOpenUrl: function (value) {
//       RNZohoSalesIQ.shouldOpenUrl(value)
//     },
//     showFeedbackAfterSkip: function (enable) {
//       RNZohoSalesIQ.showFeedbackAfterSkip(enable)
//     },
//     showFeedback: function (UpToDuration) {
//       RNZohoSalesIQ.showFeedbackUpToDuration(UpToDuration)
//     },
//     hideQueueTime: function (value) {
//       RNZohoSalesIQ.hideQueueTime(value)
//     },
//     open: function (map) {
//       RNZohoSalesIQ.showPayloadChat(map);
//     }
//   },
//   sendEvent: function (eventName, ...values) {
//     RNZohoSalesIQ.sendEvent(eventName, values)
//   },

//   /**
//    *
//    * @param  {...Tab} tabNames
//    */
//   setTabOrder: function (...tabNames) {
//     RNZohoSalesIQ.setTabOrder(tabNames)
//   },

//   dismissUI: function () {
//     RNZohoSalesIQ.dismissUI()
//   },

//   Notification: {
//     setIconForAndroid: function(resourceName) {
//       RNZohoSalesIQ.setNotificationIconForAndroid(resourceName)
//     },
//     registerPush: function(token, isTestDevice) {
//       RNZohoSalesIQ.registerPush(token, isTestDevice)
//     },
//     isSDKMessage: function(map, callback) {
//       RNZohoSalesIQ.isSDKMessage(map, callback)
//     },
//     process: function(map) {
//       RNZohoSalesIQ.processNotificationMessage(map)
//     },
//     getPayload: function(map, callback) {
//       RNZohoSalesIQ.getNotificationPayload(map, callback)
//     },
//     setActionSource: function(actionSource) {
//         RNZohoSalesIQ.setNotificationActionSource(actionSource)
//     }
//   },

//   Logger: {

//     INFO: RNZohoSalesIQ.INFO_LOG,
//     WARNING: RNZohoSalesIQ.WARNING_LOG,
//     ERROR: RNZohoSalesIQ.ERROR_LOG,

//     setEnabled: function (value) {
//       RNZohoSalesIQ.setLoggerEnabled(value)
//     },
//     isEnabled: function (callback) {
//       RNZohoSalesIQ.isLoggerEnabled(callback)
//     },
//     setPathForiOS: function (url) {
//       RNZohoSalesIQ.setLoggerPathForiOS(url)
//     },
//     clearLogsForiOS: function () {
//       RNZohoSalesIQ.clearLogsForiOS()
//     },
//     writeLogForiOS: function (log, level, callback) {
//       RNZohoSalesIQ.writeLogForiOS(log, level, callback);
//     }
//   },

//   Launcher: {
//     VisibilityMode: {
//       ALWAYS: RNZohoSalesIQ.LAUNCHER_VISIBILITY_MODE_ALWAYS,
//       NEVER: RNZohoSalesIQ.LAUNCHER_VISIBILITY_MODE_NEVER,
//       WHEN_ACTIVE_CHAT: RNZohoSalesIQ.LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT
//     },
//     show: function (mode) {
//       RNZohoSalesIQ.showLauncher(mode)
//     },
//     setVisibilityModeToCustomLauncher: function (mode) {
//       RNZohoSalesIQ.setVisibilityModeToCustomLauncher(mode)
//     },
//     enableDragToDismiss: function (enabled) {
//       RNZohoSalesIQ.enableDragToDismiss(enabled)
//     },
//     setMinimumPressDuration: function (duration) {
//       RNZohoSalesIQ.setMinimumPressDuration(duration)
//     }
//   },

//   KnowledgeBase: {
//     isEnabled: function (type, callback) {
//       RNZohoSalesIQ.isKnowledgeBaseEnabled(type, callback);
//     },
//     setVisibility: function (type, shouldShow) {
//       RNZohoSalesIQ.setKnowledgeBaseVisibility(type, shouldShow)
//     },
//     categorize: function (type, shouldCategorize) {
//       RNZohoSalesIQ.categorizeKnowledgeBase(type, shouldCategorize)
//     },
//     combineDepartments: function (type, merge) {
//       RNZohoSalesIQ.combineKnowledgeBaseDepartments(type, merge)
//     },
//     setRecentlyViewedCount: function (limit) {
//       RNZohoSalesIQ.setKnowledgeBaseRecentlyViewedCount(limit)
//     },
//     getResourceDepartments: function (callback) {
//       RNZohoSalesIQ.getKnowledgeBaseResourceDepartments(callback);
//     },
//     open: function (type, id, callback) {
//       RNZohoSalesIQ.openKnowledgeBase(type, id, callback);
//     },
//     getSingleResource: function (type, id, callback) {
//       RNZohoSalesIQ.getKnowledgeBaseSingleResource(type, id, callback);
//     },
//     getResources: function (type, departmentId = null, parentCategoryId = null, page = 1, limit = 99, searchKey = null, callback) {
//       RNZohoSalesIQ.getKnowledgeBaseResources(type, departmentId, parentCategoryId, page, limit, searchKey, callback);
//     },
//     getCategories: function (type, departmentId = null, parentCategoryId = null, callback) {
//       RNZohoSalesIQ.getKnowledgeBaseCategories(type, departmentId, parentCategoryId, callback);
//     }
// } as ZSIQWrapper;

// //  MessageStatus: {
// //    SENDING: RNZohoSalesIQ.SENDING,
// //    UPLOADING: RNZohoSalesIQ.UPLOADING,
// //    SENT: RNZohoSalesIQ.SENT,
// //    FAILURE: RNZohoSalesIQ.FAILURE
// //  }

// if (Platform.OS === 'android') {
//   Dimensions.addEventListener('change', () => {
//     RNZohoSalesIQ.refreshLauncherPropertiesForAndroid();
//   });
// }

// */}