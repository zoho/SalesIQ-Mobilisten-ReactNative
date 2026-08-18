import { CommunicationMode } from '@react-native-zohosalesiq/mobilisten-core';
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getConstants(): {
    TYPE_CONNECTED: string;
    EVENT_OPEN_URL: string;
    TYPE_ENDED: string;
    SUPPORT_CLOSED: string;
    CHATVIEW_OPENED: string;
    PERFORM_CHATACTION: string;
    CHAT_ATTENDED: string;
    LAUNCHER_HORIZONTAL_RIGHT: string;
    EVENT_RESOURCE_CLOSED: string;
    CHAT_MISSED: string;
    OPERATORS_OFFLINE: string;
    ACTION_SOURCE_SDK: string;
    TYPE_CLOSED: string;
    ACTION_SOURCE_APP: string;
    FEEDBACK_RECEIVED: string;
    CHAT_REOPENED: string;
    CHAT_OPENED: string;
    CHAT_EXPIRED: string;
    KNOWLEDGEBASE_EVENT_LISTENER: string;
    TYPE_WAITING: string;
    LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT: string;
    BOT_TRIGGER: string;
    EVENT_NOTIFICATION_CLICKED: string;
    ZSIQ_EVENT_LISTENER: string;
    NOTIFICATION_EVENT_LISTENER: string;
    LAUNCHER_EVENT_LISTENER: string;
    EVENT_HANDLE_URL: string;
    LAUNCHER_VISIBILITY_MODE_ALWAYS: string;
    EVENT_COMPLETE_CHAT_ACTION: string;
    LAUNCHER_VISIBILITY_MODE_NEVER: string;
    VISITOR_IPBLOCKED: string;
    LAUNCHER_VERTICAL_BOTTOM: string;
    SUPPORT_OPENED: string;
    LAUNCHER_MODE_STATIC: string;
    CHAT_UNREAD_COUNT_CHANGED: string;
    CHATVIEW_CLOSED: string;
    OPERATORS_ONLINE: string;
    EVENT_RESOURCE_DISLIKED: string;
    RATING_RECEIVED: string;
    TYPE_OPEN: string;
    RESOURCE_ARTICLES: string;
    CHAT_EVENT_LISTENER: string;
    TYPE_MISSED: string;
    LAUNCHER_HORIZONTAL_LEFT: string;
    CHAT_CLOSED: string;
    LAUNCHER_MODE_FLOATING: string;
    LAUNCHER_VERTICAL_TOP: string;
    CHAT_QUEUE_POSITION_CHANGED: string;
    EVENT_RESOURCE_LIKED: string;
    CUSTOMTRIGGER: string;
    EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY: string;
    EVENT_RESOURCE_OPENED: string;
    EVENT_VISITOR_REGISTRATION_FAILURE: string;
    RE_REGISTER_PUSH: string;
  };
  initialize(configuration: Object): Promise<void>;
  fetchAttenderImage(
    attenderId: string,
    defaultImage: boolean,
    imageCallback: () => void
  ): void;
  getChats(listCallback: () => void): void;
  getChatsWithFilter(filter: string, listCallback: () => void): void;
  getChatsList(): Promise<Object[]>;
  getDepartments(departmentCallback: () => void): void;
  isMultipleOpenChatRestricted(callback: () => void): void;
  init(appKey: string, accessKey: string): void;
  initWithCallback(
    appKey: string,
    accessKey: string,
    initCallback: () => void
  ): void;
  showLauncher(mode: string): void;
  updateListener(listener: string): void;
  setVisibilityModeToCustomLauncher(mode: string): void;
  enableDragToDismiss(enabled: boolean): void;
  setMinimumPressDuration(duration: number): void;
  hideQueueTime(hide: boolean): void;
  setLanguage(code: string): void;
  setDepartment(department: string): void;
  setDepartments(department: Array<any>): void;
  setOperatorEmail(email: string): void;
  showOperatorImageInLauncher(show: boolean): void;

  showPayloadChat(result: Object): void;
  showOfflineMessage(show: boolean): void;
  end(chatId: string): Promise<void>;
  setVisitorName(name: string): void;
  setVisitorEmail(email: string): void;
  setVisitorContactNumber(number: string): void;
  setVisitorAddInfo(key: string, value: string): void;
  setQuestion(question: string): void;
  setConversationListTitle(title: string): void;
  setConversationVisibility(visible: boolean): void;
  registerVisitor(uniqueId: string, callback?: () => void): void;
  unregisterVisitor(callback?: () => void): void;
  setPageTitle(title: string): void;
  enableInAppNotification(enabled: boolean): void;
  setThemeColorforiOS(colorCode: string): void;
  setThemeColor(theme: Object | null): void;
  setChatComponentVisibility(
    chatComponentName: string,
    visibility: boolean
  ): void;
  registerChatAction(actionName: string): void;
  unregisterChatAction(actionName: string): void;
  unregisterAllChatActions(): void;
  setChatActionTimeout(timeout: number): void;
  setVisitorLocation(visitorLocation: Object): void;
  syncThemeWithOsForAndroid(sync: boolean): void;
  isChatEnabled(callback: () => void): void;
  getChatUnreadCount(callback: () => void): void;
  setLauncherPropertiesForAndroid(launcherPropertiesMap: Object): void;
  refreshLauncherPropertiesForAndroid(): void;
  refreshLauncher(): void;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  processNotificationMessage(extras: Object): void;
  isSDKMessage(map: Object, callback: () => void): void;
  registerPush(fcmToken: string, isTestDevice: boolean): void;
  getNotificationPayload(readableMap: Object, callback: () => void): void;
  setNotificationActionSource(actionSource: string): void;
  setCustomFont(map: Object): void;
  sendEvent(event: string, objects: Array<any>): void;
  shouldOpenUrl(value: boolean): void;
  setThemeForAndroid(name: string): void;
  setLoggerEnabled(value: boolean): void;
  isLoggerEnabled(callback: () => void): void;
  clearLogsForiOS(): void;
  setLoggerPathForiOS(value: string): void;
  writeLogForiOS(
    message: string,
    logLevel: string,
    callback?: () => void
  ): void;
  dismissUI(): void;
  showFeedbackAfterSkip(enable: boolean): void;
  showFeedbackUpToDuration(duration: number): void;
  startNewChat(
    question: string,
    customChatId: string | null,
    departmentName: string | null,
    callback: () => void
  ): void;
  startNewChatWithTrigger(
    customChatId: string | null,
    departmentName: string | null,
    callback: () => void
  ): void;
  getChat(chatId: string, callback: () => void): void;
  setChatWaitingTime(seconds: number): void;
  isKnowledgeBaseEnabled(type: string, callback: () => void): void;
  setKnowledgeBaseRecentlyViewedCount(limit: number): void;
  setKnowledgeBaseVisibility(type: string, shouldShow: boolean): void;
  categorizeKnowledgeBase(type: string, shouldCategorize: boolean): void;
  combineKnowledgeBaseDepartments(type: string, merge: boolean): void;
  getKnowledgeBaseResourceDepartments(callback: () => void): void;
  openKnowledgeBase(type: string, id: string, callback: () => void): void;
  getKnowledgeBaseSingleResource(
    type: string,
    id: string,
    callback: () => void
  ): void;
  getKnowledgeBaseResources(
    type: string,
    departmentID: string,
    parentCategoryID: string,
    page: number,
    limit: number,
    searchKey: string,
    callback: () => void
  ): void;
  getKnowledgeBaseCategories(
    type: string,
    departmentID: string | null,
    parentCategoryID: string | null,
    callback: () => void
  ): void;
  updateConfiguration(key: string, value: Object): void;
  registerLocalizationFile(fileName: string): void;
  reRegisterPush(): void;
  getCommunicationMode(): Promise<CommunicationMode | null>;
  setChatConversationTitle(online?: string, offline?: string): void;
  setAttributes(attributes: Object): Promise<void>;
  fetchDepartments(): Promise<Object[]>;
  setHomepageEnabled(enabled: boolean): void;
  setHomepageWidgetVisibility(widget: string, visible: boolean): void;
  presentSDK(screen: Object, showHomepage: boolean): Promise<boolean>;
  updateProfile(profile: Object): Promise<void>;
  helpCenterAsk(question: string | null): Promise<boolean>;
  disablePush(): Promise<void>;
  refreshData(data: Object): Promise<void>;
  setDataProvider(config: Object): void;
  setUriScheme(scheme: Object): void;
  allowChatInOfflineMode(allow: boolean): void;
  setChatOfflineMessage(message: string): void;
  getBadgeCount(): Promise<number>;
  // These APIs are not needed for now, will handle if it is needed in future.
  // isLiveChatAvailable(callback: () => void): void;
  // isBrandOnline(callback: () => void): void;

  setThemeSource(source: string): void;
  // getChatDepartments(callback: () => void): void;
  visitorPerformCustomAction(actionName: string): Promise<void>;
  setSessionId(id: string): void;
  getKnowledgeBaseSingleResourceWithLanguageFallback(
    type: string,
    id: string,
    shouldFallbackToDefaultLanguage: boolean
  ): Promise<Object>;
  getKnowledgeBaseResourcesWithChildCategories(
    type: string,
    departmentID: string,
    parentCategoryID: string,
    page: number,
    limit: number,
    searchKey: string,
    includeChildCategoryResources: boolean
  ): Promise<Object>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'RNZohoSalesIQMobilisten'
);
