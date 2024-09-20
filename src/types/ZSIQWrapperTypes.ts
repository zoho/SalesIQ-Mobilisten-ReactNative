import type { ZSIQLauncherTypes } from './../components/launcher/types/Launcher';
import type { ZSIQKnowledgeBaseTypes } from './../components/knowledgebase/types/KnowledgeBase';
import type { SalesIQChat } from '../components/chat/types/SalesIQChat';
import type { ListenerEvent, Listeners, LauncherProps, ZSIQTabs } from './Listener';
import ZSIQTheme from '../components/ios-theme';

export type SalesIQLanguageCodes =
  | 'fr'
  | 'de'
  | 'es'
  | 'nl'
  | 'nb'
  | 'tr'
  | 'ru'
  | 'pt'
  | 'it'
  | 'ko'
  | 'ja'
  | 'da'
  | 'pl'
  | 'ar'
  | 'hu'
  | 'zh'
  | 'he'
  | 'ga'
  | 'ro'
  | 'th'
  | 'sv'
  | 'el'
  | 'cs'
  | 'sk'
  | 'sl'
  | 'hr'
  | 'bg'
  | 'vi'
  | 'fil'
  | 'fi'
  | 'in'
  | 'zh_TW'
  | 'ka'
  | 'hy'
  | 'fa'
  | 'ta'
  | 'kn'
  | 'bn'
  | 'hi'
  | 'gu'
  | 'mr'
  | 'te'
  | 'pa'
  | 'or'
  | 'ml'
  | 'en';

export type CallbackError = {
  code?: string | number;
  message?: string;
};

type VisitorLocationType = {
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
  state?: string;
  countryCode?: string;
  zipCode?: string;
};

type ZSIQLauncherPropTypes = {
  mode?: LauncherProps.MODE_FLOATING | LauncherProps.MODE_STATIC;
  x?: number;
  y?: number;
  horizontalDirection?: LauncherProps.HORIZONTAL_LEFT | LauncherProps.HORIZONTAL_RIGHT;
  verticalDirection?: LauncherProps.VERTICAL_TOP | LauncherProps.VERTICAL_BOTTOM;
  icon?: string;
};

type SIQFontType = {
  path?: string
}

type SIQFont = {
  regular?: SIQFontType,
  medium?: SIQFontType;
};

export interface Department {
  id?: string;
  name?: string;
  available?: boolean;
}

export interface ZSIQWrapperTypes {
  /**
   * This API is used to initialize Mobilisten with an appKey and accessKey generated from the SalesIQ console for a specific bundle ID.
   * @param appKey
   * @param accessKey
   * @returns
   */
  init: (appKey: string, accessKey: string) => void;

  /**
   * This API is used to initialize Mobilisten with an appKey and accessKey generated from the SalesIQ console for a specific bundle ID.
   * @param appKey
   * @param accessKey
   * @param callback
   * @returns
   */
  initWithCallback: (
    appKey: string,
    accessKey: string,
    callback: (success: boolean) => void
  ) => void;

  /**
     * This API is used to customise the font of the SalesIQ UI.
     * @param fonts
     * @returns
     */
  setCustomFont: (
    font: SIQFont
  ) => void;

  present: (
    tab?: string | null,
    id?: string | null,
    callback?: (error: CallbackError, result: boolean) => void
  ) => void;

  /**
   * This API lets you set a title in the toolbar of the chat window.
   * @param title
   * @returns
   */
  setChatTitle: (title: string) => void;

  /**
   * This API lets you configure language preferences for the embedded chat widget in your mobile application.
   * @param languageCode
   * @returns
   */
  setLanguage: (languageCode: SalesIQLanguageCodes) => void;

  /**
   * This API lets you set a default department to which you would like to route all the chat requests placed by the visitors.
   * @param departmentName
   * @returns
   */
  setDepartment: (departmentName: string) => void;

  /**
   * This API lets you specify the email address of a particular operator, to whom you would like to route all the incoming chat requests.
   * @param operatorMailID
   * @returns
   */
  setOperatorEmail: (operatorMailID: string) => void;

  /**
   * This API lets you configure the visibility status of operator's profile picture in the chat window.
   * @param visibility
   * @returns
   */
  showOperatorImageInChat: (visibility: boolean) => void;

  /**
   * This API lets you control the visibility of the feedback form which would appear right after a chat session concludes.
   * @param visibility
   * @returns
   */
  setFeedbackVisibility: (visibility: boolean) => void;

  /**
   * This API would let you control the visibility of the rating option right after a chat session concludes.
   * @param visibility
   * @returns
   */
  setRatingVisibility: (visibility: boolean) => void;

  /**
   * This API lets you to dynamically set the profile picture of the operator to whom the chat will be routed to in the embedded chat widget icon.
   *
   * Note: By default, pictures of the operators will not be set on the chat widget icon.
   * @param visibility
   * @returns
   */
  showOperatorImageInLauncher: (visibility: boolean) => void;

  /**
   * This API is used to open a recent chat. In case there are no chats, a new chat window will be opened to initiate a new chat.
   * @returns
   */
  openChat: () => void;

  /**
   * This API is used to open a specific chat, given the chatID.
   * @param chatID
   * @returns
   */
  openChatWithID: (chatID: string) => void;

  /**
   * This API will set offline banner in chat window during the non-business hours and when the agents are busy inorder to help the visitors leave a message even when agents are unavailable.
   * @param visibility
   * @returns
   */
  showOfflineMessage: (visibility: boolean) => void;

  /**
   * This API can be used to end the specified chat if it is in an open state.
   * @param chatID - Chat ID
   * @returns
   */
  endChat: (chatID: string) => void;

  /**
   * This API is used to get a list of all the chats had by a visitor along with the details of each chat. It returns an array of VisitorChat objects.
   * @param callback - (error, chats) => void
   * @returns
   */
  getChats: (
    callback: (error: CallbackError, chats: SalesIQChat[] | null) => void
  ) => void;

  /**
   * This API lets you obtain a list of chats and additionally provides a filter parameter to let you filter out the type of chats based on their current status.
   * @param filter
   * @param callback
   * @returns
   */
  getChatsWithFilter: (
    filter: string,
    callback: (error: CallbackError, chats: SalesIQChat[] | null) => void
  ) => void;

  /**
   * @deprecated
   * This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v8.0.0 8.0.0}. Use {@link ZSIQLauncherTypes.Launcher ZohoSalesIQ.Launcher.show} instead.
   * @param visibility
   * @returns
   */
  setLauncherVisibility: (visibility: boolean) => void;

  /**
   * This API would dynamically set the names of the visitors(if known) in the chat windows on your app as well as on the pane right beside your operator's chat window. If you had disabled the name field in the chat windows, then this API would set the names of the visitors in the pane beside your operator's chat window alone.
   * @param name
   * @returns
   */
  setVisitorName: (name: string) => void;

  /**
   * This API would dynamically set the email address of the visitors(if known) in the chat windows on your app, as well as on the pane right beside your operator's chat window. If you had disabled the email address field in the chat windows, then this API would set the email address of the visitors in the pane beside your operator's chat window alone.
   * @param email
   * @returns
   */
  setVisitorEmail: (email: string) => void;

  /**
   * This API would dynamically set the contact number of the visitors(if known) in the chat windows on your app, as well as on the pane right beside your operator's chat window. If you had disabled the contact number field in the chat windows, then this API would set the contact number of the visitors in the pane beside your operator's chat window alone.
   * @param contactNumber
   * @returns
   */
  setVisitorContactNumber: (contactNumber: string) => void;

  /**
   * This API would let you add additional information about the visitors and display it to the operators of your firm in the pane right beside their chat windows while conversing with the visitors.
   * @param key
   * @param value
   * @returns
   */
  setVisitorAddInfo: (key: string, value: string) => void;

  /**
   * This API would let you auto-fill a pre-defined question in the message boxes when the visitor tries to initiate a chat with the operators of your firm.
   * @param question
   * @returns
   */
  setQuestion: (question: string) => void;

  /**
   * @deprecated
   * This API can be used to automatically initiate a chat from the visitor side with a pre-defined message which you can configure using this API, right after the visitor clicks on the chat widget to initiate a chat.
   * @param message
   * @returns
   */
  startChat: (message: string) => void;

  /**
   * You can use this API to either enable or disable the conversation history option in the visitor's chat windows.
   *
   * Note: This API will not work, if you had already disabled the conversation history configuration under the Settings tab in your portal.
   *
   * @param visibility
   * @returns
   */
  setConversationVisibility: (visibility: boolean) => void;

  /**
   * This API allows you to set the title for the conversations list screen within the Mobilisten SDK.
   * @param title
   * @returns
   */
  setConversationListTitle: (title: string) => void;

  /**
   * @deprecated This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v7.0.0 7.0.0}. Use {@link ZSIQKnowledgeBaseTypes.KnowledgeBase ZohoSalesIQ.KnowledgeBase.setVisibility()} instead.
   * @param visibility
   * @returns
   */
  setFAQVisibility: (visibility: boolean) => void;

  /**
   * @deprecated This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v7.0.0 7.0.0}. Use {@link ZSIQKnowledgeBaseTypes.KnowledgeBase ZohoSalesIQ.KnowledgeBase.getResources()} instead.
   * @see {@link ZSIQKnowledgeBaseTypes ZohoSalesIQ.KnowledgeBase}
   * @param callback
   * @returns
   */
  getArticles: (
    callback: (error: CallbackError, articlesList: any) => void
  ) => void;

  /**
   * @deprecated This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v7.0.0 7.0.0}. Use {@link ZSIQKnowledgeBaseTypes.KnowledgeBase ZohoSalesIQ.KnowledgeBase.getResources()} instead.
   * @param id
   * @param callback
   * @returns
   */
  getArticlesWithCategoryID: (
    id: string,
    callback: (error: CallbackError, articlesList: any) => void
  ) => void;

  /**
   * @deprecated This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v7.0.0 7.0.0}. Use {@link ZSIQKnowledgeBaseTypes.KnowledgeBase ZohoSalesIQ.KnowledgeBase.getCategories()} instead.
   * @param callback
   * @returns
   */
  getCategories: (
    callback: (error: CallbackError, categoryList: any) => void
  ) => void;

  /**
   * @deprecated This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v7.0.0 7.0.0}. Use {@link ZSIQKnowledgeBaseTypes.KnowledgeBase ZohoSalesIQ.KnowledgeBase.open()} instead.
   * @param id
   * @param callback
   * @returns
   */
  openArticle: (id: string, callback: (error: CallbackError) => void) => void;

  /**
   * This API can be used to fetch the image of the person who has attended the chat.
   * @param atttenderId
   * @param fetchDefaultImage
   * @param callback
   * @returns
   */
  fetchAttenderImage: (
    atttenderId: string,
    fetchDefaultImage: boolean,
    callback: (error: CallbackError, image: string) => void
  ) => void;

  /**
   * This API allows you to register a user using a unique ID with the SalesIQ SDK. If your application has login and logout life cycles, you can enroll your visitor and their activity in the SDK will be synchronized across multiple platforms.
   * @param visitorId
   * @param callback
   * @returns
   */
  registerVisitor: (
    visitorId: string,
    callback?: (error: CallbackError, result: boolean) => void
  ) => void;

  /**
   * You can change the default SDK theme color using the .setThemeColorforiOS() property. The default theme Color of the SDK is a shade of blue. Any modifications to the .setThemeColorforiOS() property will be applied across all screens in the Mobilisten UI for iOS devices.
   * @param hexcode
   * @returns
   */
  setThemeColorforiOS: (hexcode: string) => void;

  /**
   * This API allows you to display the visitor's name if available as the message sender name for all outgoing messages within the chat window.
   * @param visible
   * @returns
   */
  setVisitorNameVisibility: (visible: boolean) => void;

  /**
   * This API allows you to enable pre-chat forms before initiating a chat.
   * @returns
   */
  enablePreChatForms: () => void;

  /**
   * This API allows you to disable pre-chat forms before initiating a chat.
   * @returns
   */
  disablePreChatForms: () => void;

  /**
   * This API allows you to enable the ability to capture and send screenshots.
   *
   *
   * Note: The option to capture and send screenshots is enabled by default.
   * @returns
   */
  enableScreenshotOption: () => void;

  /**
   * This API allows you to disable the option to capture and send screenshots.
   *
   *
   * Note: The option to capture and send screenshots is enabled by default.
   * @returns
   */
  disableScreenshotOption: () => void;

  /**
   * This API can be used to enable in-app notifications for the embedded mobile SDK.
   * @returns
   */
  enableInAppNotification: () => void;

  /**
   * This API can be used to disable in-app notifications for the embedded mobile SDK.
   * @returns
   */
  disableInAppNotification: () => void;

  /**
   * This API allows you to unregister a user once they are registered using the .registerVisitor() API. If your application has login and logout life cycles, you can unregister a visitor during a session logout which would clear any data the SDK may hold such as past conversations had by the registered user.
   * @param callback
   * @returns
   */
  unregisterVisitor: (callback?: (error: CallbackError) => void) => void;

  /**
   * This API lets you set an apt title for each and every screen in your application, thus making it easy for you to track down the trail of your visitors when they navigate through the screens of your mobile app.
   * @param title
   * @returns
   */
  setPageTitle: (title: string) => void;

  /**
   * @deprecated
   * This API was deprecated. Instead use {@link performCustomAction ZohoSalesIQ.performCustomAction()}.
   * @param actionName
   * @returns
   */
  setCustomAction: (actionName: string) => void;

  /**
   * This API lets you initiate a trigger upon an action, like clicking a button in your mobile app.
   * @param actionName - Name of the action performed by the visitor.
   *
   *
   * @param shouldOpenChatWindow `(optional)`
   *
   * - *true* - When the shouldOpenChatWindow parameter is set to true, the Zoho SalesIQ chat window in the user's app will open directly when the API is triggered.
   *
   * - *false* `(Default)` - When the shouldOpenChatWindow parameter is set to false, an in-app notification will be sent to the user's mobile device when the trigger is activated.
   *
   *
   * @returns
   */
  performCustomAction: (
    actionName: string,
    shouldOpenChatWindow?: boolean
  ) => void;

  /**
   * This API allows you to register any custom action that you have created
   *
   *
   * Note: It is mandatory to register any custom actions that are used in the bot script. If an action is not registered, it cannot be used within chat.
   * @param actionName
   * @returns
   */
  registerChatAction: (actionName: string) => void;

  /**
   * This API allows you to unregister an action by using the name it is registered with.
   *
   *
   * Note: Once an action is unregistered, it will no longer be available for use in chat.
   * @param actionName
   * @returns
   */
  unregisterChatAction: (actionName: string) => void;

  /**
   * This API allows you to unregister all custom actions that have been registered using the {@link registerChatAction registerChatAction} API.
   * @returns
   */
  unregisterAllChatActions: () => void;

  // DEPRECATED
  /**
   * @deprecated - This API allows you to mark a chat action that is in progress as completed. This API takes an action's unique ID as a parameter.
   *
   * Note: This API must be called to mark an action as completed before the timeout period. If it is not called within the timeout period, an action is considered as timed out. If you wish to show a message on completion, use the {@link completeChatActionWithMessage completeChatActionWithMessage} API.
   * @param actionUUID
   * @returns
   */
  completeChatAction: (actionUUID: string) => void;

  /**
   * @deprecated
   * This API lets your mark a chat action that is in progress as completed. This API takes an action's unique ID as a parameter and an action completion message which is shown in chat after completion.
   *
   * Note: This API must be called to mark an action as completed before the set timeout period. If it is not called within the timeout period, the action will be considered as timed out.
   * @param actionUUID
   * @param completed
   * @param message
   * @returns
   */
  completeChatActionWithMessage: (
    actionUUID: string,
    completed: boolean,
    message: string
  ) => void;

  /**
   * This API lets you set the timeout for any custom action in seconds. An action is timed out if it has been in progress for a time greater than the set timeout period.
   *
   * Note: The default timeout period is 30 seconds.
   * @param timeoutInSec
   * @returns
   */
  setChatActionTimeout: (timeoutInSec: number) => void;

  /**
   * This API allows you to set a secondary location for a visitor. The secondary location set using this API will be visible within the visitor information page under the Secondary Location section.
   * The setLocation() API takes an object with specific keys representing the visitor's location as a parameter.
   *
   * Note: If the latitude and longitude of the visitor are set using this API, the visitor's device location will be overridden while showing the current location in the map for the location widget. This is applicable only if a pre-selected location is not added within the bot script.
   * @param location - {@link VisitorLocationType}
   * @returns
   */
  setVisitorLocation: (location: VisitorLocationType) => void;

  /**
   * @deprecated
   * 
   * Note: This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v9.4.0 9.4.0}. 
   * Use, 
   * - ZohoSalesIQ.addListener(),
   * - ZohoSalesIQ.Chat.addListener() for chat events,
   * - ZohoSalesIQ.KnowledgeBase.addListener() for KnowledgeBase events,
   * - ZohoSalesIQ.Notification.addListener() for Notification events,
   * - ZohoSalesIQ.Launcher.addListener() for Launcher events
   * 
   * The Mobilisten React-Native SDK provides various events that developers can use to perform customized actions.
   * @param type
   * @param listener
   * @returns
   */
  addEventListener: (
    type: string,
    listener: ({ ...params }?: any) => void
  ) => void;

  /**
   * This API allows you to sync the SalesIQ theme mode with the device's theme.
   * 
   * Note: Android only
   * @param sync
   * @returns
   */
  syncThemeWithOsForAndroid: (sync: boolean) => void;

  /**
   * This API allows you to programmatically get a list of all the departments that have been associated with the brand in which Mobilisten is configured.
   * @param callback
   * @returns
   *
   * @link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-get-departments.html
   */
  getDepartments: (
    callback: (error: CallbackError, departments: Department[]) => void
  ) => void;

  /**
   * This API is used to check if the user can maintain multiple open chats with support at the same time. The value returned by the API corresponds to the configuration under Settings → Brands → {Your_Brand} → Flow Controls → Parallel conversations.
   *
   * Note: It is required that the API must be called only after the SDK has been successfully initialized to receive the accurate configuration state
   *
   * @param callback
   * @returns
   */
  isMultipleOpenChatRestricted: (
    callback: (restricted: boolean) => void
  ) => void;

  /**
   * This method can check if a visitor can initiate a new chat. This property changes based on the business hours and hide embed when offline configurations. If an operator blocks the visitor's IP, the property will also be false. You may use this property if you have implemented a custom support UI where the {@link ZSIQWrapperTypes.openChat() ZohoSalesIQ.openChat()} API allows the visitor to start a new support conversation.
   * @param callback
   * @returns
   */
  isChatEnabled: (callback: (isEnabled: boolean) => void) => void;

  /**
   * This API can be used to get the count of unread messages.
   * @param callback
   * @returns
   */
  getChatUnreadCount: (callback: (unreadCount: number) => void) => void;

  /**
   * You can use this API to customize the position and mode of the Launcher Button. You can choose the mode of the launcher button according to your application needs.
   *
   *
   * @param launcherPropertiesMap
   * @returns
   *
   * @see {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-launcher-button-customization.html}
   */
  setLauncherPropertiesForAndroid: (
    launcherPropertiesMap: ZSIQLauncherPropTypes
  ) => void;

  /**
   * For debugging purpose only
   * @param value
   * @returns
   */
  printDebugLogsForAndroid: (value: boolean) => void;

  /**
   *
   * @param value
   * @returns
   */
  setThemeForAndroid: (value: string) => void;

  /**
   * This API is used to override the localizable strings by registering the file name of the ".xcstrings" or ".strings" file containing the custom localized strings.
   *
   *
   * @param fileName
   * @returns
   */
  registerLocalizationFileForiOS: (fileName: string) => void;

  /**
   *
   * @returns
   */
  refreshLauncher: () => void;

  /**
   * The themeColor property allows you to change the default SDK theme color to a shade of blue. Any modifications to the themeColor property will be applied across all screens in the Mobilisten UI.
   * 
   * @see {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-ui-theme-color.html}
   * @param value
   * @returns
   */
  setThemeForiOS: (value: ZSIQTheme) => void;

  /**
   * This API is used to send events to the SDK for several returning callbacks
   *
   * @param eventName
   * @param rest
   * @returns
   */
  sendEvent: (eventName: ListenerEvent.OPEN_URL | ListenerEvent.COMPLETE_CHAT_ACTION, ...rest: any[]) => void;

  /**
   * This API allows you to change the order of the tabs in the SalesIQ SDK inside your mobile app.
   *
   *
   * Note: By default, the first tab will be conversation and followed by the Knowledge Base. The enum value for the FAQ has been deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v7.0.0 7.0.0}. Instead, use KNOWLEDGE_BASE enum value.
   * @param tabNames
   * @returns
   */
  setTabOrder: (...tabNames: typeof ZSIQTabs[keyof typeof ZSIQTabs][]) => void;

  /**
   * This API allows users to navigate back to your app instantly by dismissing all Mobilisten UI elements (the launcher will not be affected).
   */
  dismissUI: () => void;

  /**
   * This listener provides an interface for various event callbacks to help developers track different actions performed by the app user. The {@link addListener ZohoSalesIQ.addListener} would invoke callback methods for various actions performed by the visitors.
   * @param type
   * @param listener
   * @returns
   */
  addListener: (callback: (callbackData: Listeners) => void) => void;

  Event: typeof ListenerEvent;
}

// Sample export for using ZSIQKnowledgeBaseTypes in this file
export type _ZSIQKnowledgeBaseTypes = ZSIQKnowledgeBaseTypes;
export type _ZSIQLauncherTypes = ZSIQLauncherTypes;