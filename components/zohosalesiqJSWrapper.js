const { NativeModules, Dimensions, Platform } = require('react-native');    //No I18N
const { RNZohoSalesIQ } = NativeModules;
import { NativeEventEmitter } from 'react-native';    //No I18N
const emitter = new NativeEventEmitter(RNZohoSalesIQ);

module.exports = {

  Tab: {
    CONVERSATIONS: 'TAB_CONVERSATIONS', //No I18N
    KNOWLEDGE_BASE: 'TAB_KNOWLEDGE_BASE',   //No I18N
    // DEPRECATED
    FAQ: 'TAB_FAQ'  //No I18N
  },
  TYPE_OPEN: RNZohoSalesIQ.TYPE_OPEN,
  TYPE_WAITING: RNZohoSalesIQ.TYPE_WAITING,
  TYPE_CONNECTED: RNZohoSalesIQ.TYPE_CONNECTED,
  TYPE_ENDED: RNZohoSalesIQ.TYPE_ENDED,
  TYPE_CLOSED: RNZohoSalesIQ.TYPE_CLOSED,
  TYPE_MISSED: RNZohoSalesIQ.TYPE_MISSED,

  // DEPRECATED
  LAUNCHER_MODE_STATIC: RNZohoSalesIQ.LAUNCHER_MODE_STATIC,
  // DEPRECATED
  LAUNCHER_MODE_FLOATING: RNZohoSalesIQ.LAUNCHER_MODE_FLOATING,

  EVENT_SUPPORT_OPENED: RNZohoSalesIQ.SUPPORT_OPENED,
  EVENT_SUPPORT_CLOSED: RNZohoSalesIQ.SUPPORT_CLOSED,
  EVENT_VISITOR_IPBLOCKED: RNZohoSalesIQ.VISITOR_IPBLOCKED,
  EVENT_OPERATORS_ONLINE: RNZohoSalesIQ.OPERATORS_ONLINE,
  EVENT_OPERATORS_OFFLINE: RNZohoSalesIQ.OPERATORS_OFFLINE,

  EVENT_CHATVIEW_OPENED: RNZohoSalesIQ.CHATVIEW_OPENED,
  EVENT_CHATVIEW_CLOSED: RNZohoSalesIQ.CHATVIEW_CLOSED,
  EVENT_CHAT_OPENED: RNZohoSalesIQ.CHAT_OPENED,
  EVENT_CHAT_CLOSED: RNZohoSalesIQ.CHAT_CLOSED,
  EVENT_CHAT_REOPENED: RNZohoSalesIQ.CHAT_REOPENED,
  EVENT_CHAT_ATTENDED: RNZohoSalesIQ.CHAT_ATTENDED,
  EVENT_CHAT_MISSED: RNZohoSalesIQ.CHAT_MISSED,
  EVENT_CHAT_QUEUE_POSITION_CHANGED: RNZohoSalesIQ.CHAT_QUEUE_POSITION_CHANGED,
  EVENT_CHAT_UNREAD_COUNT_CHANGED: RNZohoSalesIQ.CHAT_UNREAD_COUNT_CHANGED,
  EVENT_FEEDBACK_RECEIVED: RNZohoSalesIQ.FEEDBACK_RECEIVED,
  EVENT_RATING_RECEIVED: RNZohoSalesIQ.RATING_RECEIVED,

  EVENT_ARTICLE_LIKED: RNZohoSalesIQ.ARTICLE_LIKED,
  EVENT_ARTICLE_DISLIKED: RNZohoSalesIQ.ARTICLE_DISLIKED,
  EVENT_ARTICLE_OPENED: RNZohoSalesIQ.ARTICLE_OPENED,
  EVENT_ARTICLE_CLOSED: RNZohoSalesIQ.ARTICLE_CLOSED,
  EVENT_PERFORM_CHATACTION: RNZohoSalesIQ.PERFORM_CHATACTION,
  EVENT_CUSTOMTRIGGER: RNZohoSalesIQ.CUSTOMTRIGGER,
  EVENT_BOT_TRIGGER: RNZohoSalesIQ.BOT_TRIGGER,
  EVENT_HANDLE_URL: RNZohoSalesIQ.EVENT_HANDLE_URL,

  EVENT_RESOURCE_OPENED: RNZohoSalesIQ.EVENT_RESOURCE_OPENED,
  EVENT_RESOURCE_CLOSED: RNZohoSalesIQ.EVENT_RESOURCE_CLOSED,
  EVENT_RESOURCE_LIKED: RNZohoSalesIQ.EVENT_RESOURCE_LIKED,
  EVENT_RESOURCE_DISLIKED: RNZohoSalesIQ.EVENT_RESOURCE_DISLIKED,

  EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY: RNZohoSalesIQ.EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY,

  EVENT_NOTIFICATION_CLICKED: RNZohoSalesIQ.EVENT_NOTIFICATION_CLICKED,

  ActionSource: {
    APP: RNZohoSalesIQ.ACTION_SOURCE_APP,
    SDK: RNZohoSalesIQ.ACTION_SOURCE_SDK,
  },

  Event: {
    OPEN_URL: RNZohoSalesIQ.EVENT_OPEN_URL,
    COMPLETE_CHAT_ACTION: RNZohoSalesIQ.EVENT_COMPLETE_CHAT_ACTION
  },

  Resource: {
    ARTICLES: RNZohoSalesIQ.RESOURCE_ARTICLES
  },

  Launcher: {
    MODE_STATIC: RNZohoSalesIQ.LAUNCHER_MODE_STATIC,
    MODE_FLOATING: RNZohoSalesIQ.LAUNCHER_MODE_FLOATING,
    HORIZONTAL_LEFT: RNZohoSalesIQ.LAUNCHER_HORIZONTAL_LEFT,
    HORIZONTAL_RIGHT: RNZohoSalesIQ.LAUNCHER_HORIZONTAL_RIGHT,
    VERTICAL_TOP: RNZohoSalesIQ.LAUNCHER_VERTICAL_TOP,
    VERTICAL_BOTTOM: RNZohoSalesIQ.LAUNCHER_VERTICAL_BOTTOM
  },

  init: function (appKey, accessKey) {
    RNZohoSalesIQ.init(appKey, accessKey);
  },
  initWithCallback: function (appKey, accessKey, callback) {
    RNZohoSalesIQ.initWithCallback(appKey, accessKey, callback);
  },
  present: function(tab = null, id = null, callback = ()=>{}) {
    RNZohoSalesIQ.present(tab, id, callback);
  },
  setChatTitle: function (title) {
    RNZohoSalesIQ.setChatTitle(title);
  },
  setLanguage: function (language_code) {
    RNZohoSalesIQ.setLanguage(language_code);
  },
  setDepartment: function (department) {
    RNZohoSalesIQ.setDepartment(department);
  },
  setOperatorEmail: function (email) {
    RNZohoSalesIQ.setOperatorEmail(email);
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
  // DEPRECATED
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
  registerVisitor: function (visitorId, callback) {
    RNZohoSalesIQ.registerVisitor(visitorId, callback ? callback : () => {});
  },
  setThemeColorforAndroid: function (attribute, colorCode) {
    RNZohoSalesIQ.setThemeColorforAndroid(attribute, colorCode);
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
  unregisterVisitor: function (callback) {
    RNZohoSalesIQ.unregisterVisitor(callback ? callback : () => {});
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
  setChatActionTimeout: function (timeout) {
    RNZohoSalesIQ.setChatActionTimeout(timeout);
  },
  setVisitorLocation: function (location) {
    RNZohoSalesIQ.setVisitorLocation(location);
  },
  addEventListener: function (type, listener) {
    RNZohoSalesIQ.updateListener(type);
    listener = emitter.addListener(type, listener);
  },
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
    RNZohoSalesIQ.printDebugLogsForAndroid(value)
  },
  setThemeForAndroid: function (value) {
    RNZohoSalesIQ.setThemeForAndroid(value)
  },
  registerLocalizationFileForiOS: function (value) {
    RNZohoSalesIQ.registerLocalizationFile(value)
  },
  refreshLauncher: function() {
    RNZohoSalesIQ.refreshLauncher();
  },
  setThemeForiOS: function (value) {
    RNZohoSalesIQ.setThemeColor(value)
  },

  Chat: {
    shouldOpenUrl: function (value) {
      RNZohoSalesIQ.shouldOpenUrl(value)
    },
    showFeedbackAfterSkip: function (enable) {
      RNZohoSalesIQ.showFeedbackAfterSkip(enable)
    },
    showFeedback: function (UpToDuration) {
      RNZohoSalesIQ.showFeedbackUpToDuration(UpToDuration)
    },
    hideQueueTime: function (value) {
      RNZohoSalesIQ.hideQueueTime(value)
    },
    open: function (map) {
      RNZohoSalesIQ.showPayloadChat(map);
    },
    start: function(question, customChatId = null, departmentName = null, callback = ()=>{}) {
      RNZohoSalesIQ.startNewChat(question, customChatId, departmentName, callback);
    },
    startWithTrigger: function(customChatId = null, departmentName = null, callback = ()=>{}) {
      RNZohoSalesIQ.startNewChatWithTrigger(customChatId, departmentName, callback);
    },
    setWaitingTime: function(seconds) {
      RNZohoSalesIQ.setChatWaitingTime(seconds);
    },
    get: function(chatId, callback) {
      RNZohoSalesIQ.getChat(chatId, callback);
    }
  },
  sendEvent: function (eventName, ...values) {
    RNZohoSalesIQ.sendEvent(eventName, values)
  },

  /**
   *
   * @param  {...Tab} tabNames
   */
  setTabOrder: function (...tabNames) {
    RNZohoSalesIQ.setTabOrder(tabNames)
  },

  dismissUI: function () {
    RNZohoSalesIQ.dismissUI()
  },

  Notification: {
    setIconForAndroid: function(resourceName) {
      RNZohoSalesIQ.setNotificationIconForAndroid(resourceName)
    },
    registerPush: function(token, isTestDevice) {
      RNZohoSalesIQ.registerPush(token, isTestDevice)
    },
    isSDKMessage: function(map, callback) {
      RNZohoSalesIQ.isSDKMessage(map, callback)
    },
    process: function(map) {
      RNZohoSalesIQ.processNotificationMessage(map)
    },
    getPayload: function(map, callback) {
      RNZohoSalesIQ.getNotificationPayload(map, callback)
    },
    setActionSource: function(actionSource) {
        RNZohoSalesIQ.setNotificationActionSource(actionSource)
    }
  },

  Logger: {

    INFO: RNZohoSalesIQ.INFO_LOG,
    WARNING: RNZohoSalesIQ.WARNING_LOG,
    ERROR: RNZohoSalesIQ.ERROR_LOG,

    setEnabled: function (value) {
      RNZohoSalesIQ.setLoggerEnabled(value)
    },
    isEnabled: function (callback) {
      RNZohoSalesIQ.isLoggerEnabled(callback)
    },
    setPathForiOS: function (url) {
      RNZohoSalesIQ.setLoggerPathForiOS(url)
    },
    clearLogsForiOS: function () {
      RNZohoSalesIQ.clearLogsForiOS()
    },
    writeLogForiOS: function (log, level, callback) {
      RNZohoSalesIQ.writeLogForiOS(log, level, callback);
    }
  },

  Launcher: {
    VisibilityMode: {
      ALWAYS: RNZohoSalesIQ.LAUNCHER_VISIBILITY_MODE_ALWAYS,
      NEVER: RNZohoSalesIQ.LAUNCHER_VISIBILITY_MODE_NEVER,
      WHEN_ACTIVE_CHAT: RNZohoSalesIQ.LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT
    },
    show: function (mode) {
      RNZohoSalesIQ.showLauncher(mode)
    },
    setVisibilityModeToCustomLauncher: function (mode) {
      RNZohoSalesIQ.setVisibilityModeToCustomLauncher(mode)
    },
    enableDragToDismiss: function (enabled) {
      RNZohoSalesIQ.enableDragToDismiss(enabled)
    },
    setMinimumPressDuration: function (duration) {
      RNZohoSalesIQ.setMinimumPressDuration(duration)
    }
  },

  KnowledgeBase: {
    isEnabled: function (type, callback) {
      RNZohoSalesIQ.isKnowledgeBaseEnabled(type, callback);
    },
    setVisibility: function (type, shouldShow) {
      RNZohoSalesIQ.setKnowledgeBaseVisibility(type, shouldShow)
    },
    categorize: function (type, shouldCategorize) {
      RNZohoSalesIQ.categorizeKnowledgeBase(type, shouldCategorize)
    },
    combineDepartments: function (type, merge) {
      RNZohoSalesIQ.combineKnowledgeBaseDepartments(type, merge)
    },
    setRecentlyViewedCount: function (limit) {
      RNZohoSalesIQ.setKnowledgeBaseRecentlyViewedCount(limit)
    },
    getResourceDepartments: function (callback) {
      RNZohoSalesIQ.getKnowledgeBaseResourceDepartments(callback);
    },
    open: function (type, id, callback) {
      RNZohoSalesIQ.openKnowledgeBase(type, id, callback);
    },
    getSingleResource: function (type, id, callback) {
      RNZohoSalesIQ.getKnowledgeBaseSingleResource(type, id, callback);
    },
    getResources: function (type, departmentId = null, parentCategoryId = null, page = 1, limit = 99, searchKey = null, callback) {
      RNZohoSalesIQ.getKnowledgeBaseResources(type, departmentId, parentCategoryId, page, limit, searchKey, callback);
    },
    getCategories: function (type, departmentId = null, parentCategoryId = null, callback) {
      RNZohoSalesIQ.getKnowledgeBaseCategories(type, departmentId, parentCategoryId, callback);
    }
  }

//  MessageStatus: {
//    SENDING: RNZohoSalesIQ.SENDING,
//    UPLOADING: RNZohoSalesIQ.UPLOADING,
//    SENT: RNZohoSalesIQ.SENT,
//    FAILURE: RNZohoSalesIQ.FAILURE
//  }
}

if (Platform.OS === 'android') {
  Dimensions.addEventListener('change', ({ window: { width, height } }) => {
    RNZohoSalesIQ.refreshLauncherPropertiesForAndroid();
  });
}
