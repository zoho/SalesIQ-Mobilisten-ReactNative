import type { ZSIQLauncherTypes } from './../components/launcher/types/Launcher';
import type { ZSIQKnowledgeBaseTypes } from './../components/knowledgebase/types/KnowledgeBase';
import type { SIQScreen } from '../components/screen/types/Screen';
import type { ChatTypes } from './../components/chat/types/Chat';
import type { SalesIQChat } from '../components/chat/types/SalesIQChat';
import type { ListenerEvent, Listeners, LauncherProps } from './Listener';
import ZSIQTheme from '../components/ios-theme';
import {
  CommunicationMode,
  SalesIQConfiguration,
  SalesIQDepartment,
} from '@react-native-zohosalesiq/mobilisten-core';
import { EmitterSubscription } from 'react-native';

/**
 * The set of language codes accepted by {@link ZSIQWrapperTypes.setLanguage ZohoSalesIQ.setLanguage()}
 * to override the language of the SalesIQ chat UI (for example `fr`, `de`, `ja`, `zh_TW`).
 */
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
  | 'en'
  | 'ca';

/** An error passed to SDK callbacks, carrying an optional error code and message. */
export type CallbackError = {
  /** The error code, when the SDK provides one. */
  code?: string | number;
  /** A human-readable description of the error. */
  message?: string;
};

/** Discriminates the two kinds of conversation provider data — secret fields or display fields. */
export type SalesIQDataType = 'secretFields' | 'displayFields';

/** Base type for the conversation provider data payloads passed to {@link ZSIQWrapperTypes.refreshData ZohoSalesIQ.refreshData()}. */
export type SalesIQBaseData = {};

/** Refreshes the secret fields for a conversation via {@link ZSIQWrapperTypes.refreshData ZohoSalesIQ.refreshData()}. */
export type SecretFieldsSalesIQData = SalesIQBaseData & {
  /** Marks this payload as the secret-fields type. */
  type: 'secretFields';
  /** Conversation identifier. */
  conversationId: string;
};

/** Refreshes the display fields for a conversation via {@link ZSIQWrapperTypes.refreshData ZohoSalesIQ.refreshData()}. */
export type DisplayFieldsSalesIQData = SalesIQBaseData & {
  /** Marks this payload as the display-fields type. */
  type: 'displayFields';
  /** Conversation identifier. */
  conversationId: string;
};

/**
 * Identifies which conversation data to refresh via {@link ZSIQWrapperTypes.refreshData ZohoSalesIQ.refreshData()}:
 * the type (`'displayFields'` or `'secretFields'`) and the conversation it applies to.
 */
export type SalesIQData = SecretFieldsSalesIQData | DisplayFieldsSalesIQData;

/** Basic visitor information (name, email, phone, and custom key-value fields). */
export type ZSIQVisitorInfo = {
  /** The visitor's name. */
  name?: string;
  /** The visitor's email address. */
  email?: string;
  /** The visitor's phone/contact number. */
  phone?: string;
  /** Additional custom key-value information to associate with the visitor. */
  customInfo?: Record<string, string>;
};

/**
 * A path matching rule for {@link SalesIQUriScheme}, mirroring Android IntentFilter path attributes.
 */
export type SalesIQUriSchemePath = {
  /** The kind of path match to perform — exact match, prefix, suffix, or a pattern. */
  type: 'exact' | 'prefix' | 'suffix' | 'pattern';
  /** The path string (or pattern) to match against, interpreted per {@link SalesIQUriSchemePath.type type}. */
  value: string;
};

/**
 * Models the `<data>` element of an Android intent filter for URI matching.
 * Mirrors the native Android `SalesIQUriScheme` class.
 */
export type SalesIQUriScheme = {
  /** The URI scheme (e.g., "http", "https", "myapp"). Required. */
  scheme: string;
  /** Hostnames to match (e.g., "example.com"). */
  hosts?: string[];
  /** Path matching rules. */
  paths?: SalesIQUriSchemePath[];
};

/**
 * The set of runtime configuration flags that can be toggled with
 * {@link ZSIQWrapperTypes.updateConfiguration ZohoSalesIQ.updateConfiguration()} — for example disabling
 * neutral chat ratings, tracking storage usage or app install/update times, and skipping the
 * homepage in the chat start flow.
 */
export type Configuration =
  | 'NeutralRatingDisabled'
  | 'TrackStorageSpace'
  | 'TrackAppInstalledTime'
  | 'TrackAppUpdatedTime'
  | 'ShowEndSessionInInAppNotification'
  | 'ChatBotCarousalCardPropertiesOrientation'
  | 'ChatBotCarousalCardImageVisibility'
  | 'HideCreditCardMaskingConsentAlert'
  | 'DontNeedHomePageInStartFlow'
  | 'ChatFallbackDepartmentsOnReopenIfOffline';

/** A visitor location passed to {@link ZSIQWrapperTypes.setVisitorLocation ZohoSalesIQ.setVisitorLocation()}. */
type VisitorLocationType = {
  /** The location's latitude. */
  latitude?: number;
  /** The location's longitude. */
  longitude?: number;
  /** The country name. */
  country?: string;
  /** The city name. */
  city?: string;
  /** The state or province name. */
  state?: string;
  /** The ISO country code. */
  countryCode?: string;
  /** The postal/ZIP code. */
  zipCode?: string;
};

/** Launcher button properties passed to {@link ZSIQWrapperTypes.setLauncherPropertiesForAndroid ZohoSalesIQ.setLauncherPropertiesForAndroid()} (Android only). */
type ZSIQLauncherPropTypes = {
  /** The launcher positioning mode — floating or static. */
  mode?: LauncherProps.MODE_FLOATING | LauncherProps.MODE_STATIC;
  /** Horizontal offset, in pixels. */
  x?: number;
  /**
   * Vertical offset, in pixels, measured from the **bottom** of the screen (Android only).
   * Mirrors the native Android `LauncherProperties.setYFromBottom()`.
   */
  yFromBottom?: number;
  /** The horizontal edge the launcher is anchored to (left or right). */
  horizontalDirection?:
    | LauncherProps.HORIZONTAL_LEFT
    | LauncherProps.HORIZONTAL_RIGHT;
  /** The vertical edge the launcher is anchored to (top or bottom). */
  verticalDirection?:
    | LauncherProps.VERTICAL_TOP
    | LauncherProps.VERTICAL_BOTTOM;
  /** Custom icon (resource name) for the launcher's default state. */
  icon?: string;
  /** Custom icon (resource name) for the launcher's chat state. */
  chatIcon?: string;
  /** Custom icon (resource name) for the launcher's call state. */
  callIcon?: string;
  /** Custom icon (resource name) for the launcher's create state. */
  createIcon?: string;
  /** Custom icon (resource name) for the launcher's close/dismiss control. */
  closeIcon?: string;
};

/** A single font face used within {@link SIQFont}. */
type SIQFontType = {
  /** The file path to the font file. */
  path?: string;
};

/** A custom font family passed to {@link ZSIQWrapperTypes.setCustomFont ZohoSalesIQ.setCustomFont()}. */
type SIQFont = {
  /** The regular-weight font face. */
  regular?: SIQFontType;
  /** The medium-weight font face. */
  medium?: SIQFontType;
};

/** A department associated with the SalesIQ brand. */
export interface Department {
  /** The department's unique identifier. */
  id?: string;
  /** The department's name. */
  name?: string;
  /** Whether the department is currently available. */
  available?: boolean;
}

/**
 * Presents the SalesIQ SDK UI, optionally showing the homepage first.
 * @param screen - The SDK screen to present (see {@link SIQScreen}). When
 * omitted, the SDK's default UI is opened.
 * @param showHomepage - Whether to show the homepage before the requested screen.
 * @returns A Promise resolving to `true` when the UI is presented successfully.
 */
export type PresentFunction = (
  screen?: SIQScreen | null,
  showHomepage?: boolean
) => Promise<boolean>;

/**
 * The main Mobilisten SDK surface, exposed as the `ZohoSalesIQ` object. It provides the
 * top-level APIs to initialize the SDK, present its screens, manage visitors and chats,
 * customise the UI, and subscribe to SDK events.
 */
export interface ZSIQWrapperTypes {
  /**
   * This API is used to initialize Mobilisten with an appKey and accessKey generated from the SalesIQ console for a specific bundle ID.
   * @param configuration - The SalesIQ configuration (app key, access key, and optional visitor authentication) used to initialize Mobilisten.
   * @returns
   */
  initialize: (configuration: SalesIQConfiguration) => Promise<void>;

  /**
   * This API is used to initialize Mobilisten with an appKey and accessKey generated from the SalesIQ console for a specific bundle ID.
   * @param appKey - The app key generated from the SalesIQ console for your app's bundle ID.
   * @param accessKey - The access key generated from the SalesIQ console for your app's bundle ID.
   * @returns
   * @deprecated Use {@link initialize ZohoSalesIQ.initialize()} instead.
   */
  init: (appKey: string, accessKey: string) => void;

  /**
   * This API is used to initialize Mobilisten with an appKey and accessKey generated from the SalesIQ console for a specific bundle ID, invoking a callback once initialization completes.
   * @param appKey - The app key generated from the SalesIQ console for your app's bundle ID.
   * @param accessKey - The access key generated from the SalesIQ console for your app's bundle ID.
   * @param callback - Invoked with `true` when initialization succeeds, `false` otherwise.
   * @returns
   * @deprecated Use {@link initialize ZohoSalesIQ.initialize()} instead.
   */
  initWithCallback: (
    appKey: string,
    accessKey: string,
    callback: (success: boolean) => void
  ) => void;

  /**
   * This API is used to customise the font of the SalesIQ UI.
   * @param font - The custom font family to apply, providing the `regular` and `medium` font file paths.
   * @returns
   */
  setCustomFont: (font: SIQFont) => void;

  /**
   * Presents the SalesIQ SDK on a specific screen.
   * @param screen - Which screen to open (see {@link SIQScreen}).
   * @param showHomepage - Whether to show the homepage first.
   * @returns A Promise resolving to `true` when the SDK is presented successfully.
   */
  present: PresentFunction;

  /**
   * This API lets you configure language preferences for the embedded chat widget in your mobile application.
   * @param languageCode - The language to apply to the chat widget (see {@link SalesIQLanguageCodes}).
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
   * @param operatorMailID - The email address of the operator to route incoming chat requests to.
   * @returns
   * @deprecated Use {@link ChatTypes.Chat.setOperatorEmail ZohoSalesIQ.Chat.setOperatorEmail} instead.
   */
  setOperatorEmail: (operatorMailID: string) => void;

  /**
   * This API lets you to dynamically set the profile picture of the operator to whom the chat will be routed to in the embedded chat widget icon.
   *
   * Note: By default, pictures of the operators will not be set on the chat widget icon.
   * @param visibility - `true` to show the operator's picture on the chat widget icon, `false` to hide it.
   * @returns
   * @deprecated Use {@link ZSIQLauncherTypes.Launcher.showOperatorImage ZohoSalesIQ.Launcher.showOperatorImage} instead.
   */
  showOperatorImageInLauncher: (visibility: boolean) => void;

  /**
   * This API will set offline banner in chat window during the non-business hours and when the agents are busy inorder to help the visitors leave a message even when agents are unavailable.
   * @param visibility - `true` to show the offline message banner, `false` to hide it.
   * @returns
   * @deprecated Use {@link ChatTypes.Chat.showOfflineMessage ZohoSalesIQ.Chat.showOfflineMessage} instead.
   */
  showOfflineMessage: (visibility: boolean) => void;

  /**
   * This API can be used to end the specified chat if it is in an open state.
   * @param chatID - Chat ID
   * @returns
   * @deprecated Use {@link ChatTypes.Chat.end ZohoSalesIQ.Chat.end} instead.
   */
  endChat: (chatID: string) => void;

  /**
   * This API is used to get a list of all the chats had by a visitor along with the details of each chat. It returns an array of VisitorChat objects.
   * @param callback - (error, chats) => void
   * @returns
   *
   * Note: A Promise-based `Chat.getList` is planned as the replacement, re-modelled
   * around `SalesIQConversation`; until that lands, use this callback-based API.
   */
  getChats: (
    callback: (error: CallbackError, chats: SalesIQChat[] | null) => void
  ) => void;

  /**
   * This API lets you obtain a list of chats and additionally provides a filter parameter to let you filter out the type of chats based on their current status.
   * @param filter - The chat status to filter by (e.g. open, closed, waiting).
   * @param callback - Invoked with an error (if any) and the filtered array of chats, or `null`.
   * @returns
   */
  getChatsWithFilter: (
    filter: string,
    callback: (error: CallbackError, chats: SalesIQChat[] | null) => void
  ) => void;

  /**
   * Sets the visitor's name.
   *
   * @example
   * ```ts
   * // Before
   * ZohoSalesIQ.setVisitorName('Jane Doe');
   *
   * // After
   * ZohoSalesIQ.Visitor.updateProfile({ firstName: 'Jane', lastName: 'Doe' });
   * ```
   *
   * @param name - The visitor's name.
   * @deprecated Use `ZohoSalesIQ.Visitor.updateProfile()` instead.
   */
  setVisitorName: (name: string) => void;

  /**
   * Sets the visitor's email address.
   *
   * @example
   * ```ts
   * // Before
   * ZohoSalesIQ.setVisitorEmail('jane@example.com');
   *
   * // After
   * ZohoSalesIQ.Visitor.updateProfile({ emailID: 'jane@example.com' });
   * ```
   *
   * @param email - The visitor's email address.
   * @deprecated Use `ZohoSalesIQ.Visitor.updateProfile()` instead.
   */
  setVisitorEmail: (email: string) => void;

  /**
   * Sets the visitor's contact number.
   *
   * @example
   * ```ts
   * // Before
   * ZohoSalesIQ.setVisitorContactNumber('+15550001234');
   *
   * // After
   * ZohoSalesIQ.Visitor.updateProfile({ phone: { code: '+1', number: '5550001234' } });
   * ```
   *
   * @param contactNumber - The visitor's contact number.
   * @deprecated Use `ZohoSalesIQ.Visitor.updateProfile()` instead.
   */
  setVisitorContactNumber: (contactNumber: string) => void;

  /**
   * This API would let you add additional information about the visitors and display it to the operators of your firm in the pane right beside their chat windows while conversing with the visitors.
   * @param key
   * @param value
   * @returns
   * @deprecated Use `ZohoSalesIQ.Visitor.updateProfile()` instead.
   */
  setVisitorAddInfo: (key: string, value: string) => void;

  /**
   * This API would let you auto-fill a pre-defined question in the message boxes when the visitor tries to initiate a chat with the operators of your firm.
   * @param question - The pre-defined question to auto-fill in the message box.
   * @returns
   * @deprecated Use {@link ChatTypes.Chat.setQuestion ZohoSalesIQ.Chat.setQuestion} instead.
   */
  setQuestion: (question: string) => void;

  /**
   * This API allows you to set the title for the conversations list screen within the Mobilisten SDK.
   * @param title
   * @returns
   */
  setConversationListTitle: (title: string) => void;

  /**
   * This API can be used to fetch the image of the person who has attended the chat.
   * @param attenderId - The id of the attender/operator whose image should be fetched.
   * @param fetchDefaultImage - `true` to return the default placeholder image when the attender has no custom image.
   * @param callback - Invoked with an error (if any) and the fetched image data.
   * @returns
   * @deprecated Use {@link ChatTypes.Chat.fetchAttenderImage ZohoSalesIQ.Chat.fetchAttenderImage} instead.
   */
  fetchAttenderImage: (
    attenderId: string,
    fetchDefaultImage: boolean,
    callback: (error: CallbackError, image: string) => void
  ) => void;

  /**
   * This API allows you to register a user using a unique ID with the SalesIQ SDK. If your application has login and logout life cycles, you can enroll your visitor and their activity in the SDK will be synchronized across multiple platforms.
   *
   * @param visitorId - The unique ID identifying the visitor to register.
   * @param callback - Invoked with an error (if any) and a boolean result indicating whether registration succeeded.
   * @returns
   */
  registerVisitor: {
    (
      visitorId: string,
      callback?: (error: CallbackError, result: boolean) => void
    ): void;
  };

  /**
   * You can change the default SDK theme color using the .setThemeColorforiOS() property. The default theme Color of the SDK is a shade of blue. Any modifications to the .setThemeColorforiOS() property will be applied across all screens in the Mobilisten UI for iOS devices.
   * @param hexcode - The hex color code (e.g. `"#RRGGBB"`) to apply as the SDK theme color on iOS.
   * @returns
   */
  setThemeColorforiOS: (hexcode: string) => void;

  /**
   * This API can be used to enable in-app notifications for the embedded mobile SDK.
   * @returns
   * @deprecated Use {@link ZSIQNotificationTypes.Notification.enableInAppNotification ZohoSalesIQ.Notification.enableInAppNotification(true)} instead.
   */
  enableInAppNotification: () => void;

  /**
   * This API can be used to disable in-app notifications for the embedded mobile SDK.
   * @returns
   * @deprecated Use {@link ZSIQNotificationTypes.Notification.enableInAppNotification ZohoSalesIQ.Notification.enableInAppNotification(false)} instead.
   */
  disableInAppNotification: () => void;

  /**
   * This API allows you to unregister a user once they are registered using the .registerVisitor() API. If your application has login and logout life cycles, you can unregister a visitor during a session logout which would clear any data the SDK may hold such as past conversations had by the registered user.
   *
   * @param callback - Invoked with an error (if any) when the visitor is unregistered.
   * @returns
   */
  unregisterVisitor: {
    (callback?: (error: CallbackError) => void): void;
  };

  /**
   * This API lets you set an apt title for each and every screen in your application, thus making it easy for you to track down the trail of your visitors when they navigate through the screens of your mobile app.
   * @param title - The page title to associate with the current screen for visitor tracking.
   * @returns
   * @deprecated Use {@link ZSIQTrackingTypes.Tracking.setPageTitle ZohoSalesIQ.Tracking.setPageTitle} instead.
   */
  setPageTitle: (title: string) => void;

  /**
   * This API allows you to register any custom action that you have created
   *
   *
   * Note: It is mandatory to register any custom actions that are used in the bot script. If an action is not registered, it cannot be used within chat.
   * @param actionName - The name of the custom action to register.
   * @returns
   * @deprecated Use {@link ZSIQChatActionsTypes.ChatActions.register ZohoSalesIQ.ChatActions.register} instead.
   */
  registerChatAction: (actionName: string) => void;

  /**
   * This API allows you to unregister an action by using the name it is registered with.
   *
   *
   * Note: Once an action is unregistered, it will no longer be available for use in chat.
   * @param actionName - The name of the custom action to unregister.
   * @returns
   * @deprecated Use {@link ZSIQChatActionsTypes.ChatActions.unregister ZohoSalesIQ.ChatActions.unregister} instead.
   */
  unregisterChatAction: (actionName: string) => void;

  /**
   * This API allows you to unregister all custom actions that have been registered using the {@link registerChatAction registerChatAction} API.
   * @returns
   * @deprecated Use {@link ZSIQChatActionsTypes.ChatActions.unregisterAll ZohoSalesIQ.ChatActions.unregisterAll} instead.
   */
  unregisterAllChatActions: () => void;

  /**
   * This API lets you set the timeout for any custom action in seconds. An action is timed out if it has been in progress for a time greater than the set timeout period.
   *
   * Note: The default timeout period is 30 seconds.
   * @param timeoutInSec - The custom action timeout duration, in seconds.
   * @returns
   * @deprecated Use {@link ZSIQChatActionsTypes.ChatActions.setTimeout ZohoSalesIQ.ChatActions.setTimeout} instead.
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
   *
   * Note: This API was deprecated in version {@link https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/releases/tag/v9.4.0}.
   * Use,
   * - ZohoSalesIQ.addListener(),
   * - ZohoSalesIQ.Chat.addListener() for chat events,
   * - ZohoSalesIQ.KnowledgeBase.addListener() for KnowledgeBase events,
   * - ZohoSalesIQ.Notification.addListener() for Notification events,
   * - ZohoSalesIQ.Launcher.addListener() for Launcher events
   *
   * The Mobilisten React-Native SDK provides various events that developers can use to perform customized actions.
   * @param type - The name of the event to listen for.
   * @param listener - Invoked with the event's payload whenever the event is triggered.
   * @returns
   * @deprecated
   */
  addEventListener: (
    type: string,
    listener: ({ ...params }?: any) => void
  ) => void;

  /**
   * This API allows you to sync the SalesIQ theme mode with the device's theme.
   *
   * Note: Android only
   * @param sync - `true` to keep the SalesIQ theme mode in sync with the device's light/dark theme, `false` to disable syncing.
   * @returns
   */
  syncThemeWithOsForAndroid: (sync: boolean) => void;

  /**
   * This API allows you to programmatically get a list of all the departments that have been associated with the brand in which Mobilisten is configured.
   * @param callback - Invoked with an error (if any) and the array of departments associated with the brand.
   * @returns
   *
   * @link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-get-departments.html
   * @deprecated Use {@link ZSIQConversationTypes.Conversation.getDepartments ZohoSalesIQ.Conversation.getDepartments} instead.
   */
  getDepartments: (
    callback: (error: CallbackError, departments: Department[]) => void
  ) => void;

  /**
   * This API is used to check if the user can maintain multiple open chats with support at the same time. The value returned by the API corresponds to the configuration under Settings → Brands → {Your_Brand} → Flow Controls → Parallel conversations.
   *
   * Note: It is required that the API must be called only after the SDK has been successfully initialized to receive the accurate configuration state
   *
   * @param callback - Invoked with `true` if the visitor is restricted from maintaining multiple open chats, `false` otherwise.
   * @returns
   */
  isMultipleOpenChatRestricted: (
    callback: (restricted: boolean) => void
  ) => void;

  /**
   * This method can check if a visitor can initiate a new chat. This property changes based on the business hours and hide embed when offline configurations. If an operator blocks the visitor's IP, the property will also be false. You may use this property if you have implemented a custom support UI where the {@link ZSIQWrapperTypes.openChat() ZohoSalesIQ.openChat()} API allows the visitor to start a new support conversation.
   * @param callback - Invoked with `true` if the visitor can start a new chat, `false` otherwise.
   * @returns
   */
  isChatEnabled: (callback: (isEnabled: boolean) => void) => void;

  /**
   * This API can be used to get the count of unread messages.
   * @param callback - Invoked with the number of unread messages.
   * @returns
   */
  getChatUnreadCount: (callback: (unreadCount: number) => void) => void;

  /**
   * You can use this API to customize the position and mode of the Launcher Button. You can choose the mode of the launcher button according to your application needs.
   *
   *
   * @param launcherPropertiesMap - The launcher properties (mode, position, direction, and icon overrides) to apply on Android.
   * @returns
   *
   * @see {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-launcher-button-customization.html}
   */
  setLauncherPropertiesForAndroid: (
    launcherPropertiesMap: ZSIQLauncherPropTypes
  ) => void;

  /**
   * Applies a SalesIQ theme on Android using the name of a style resource defined in your app.
   * @param value - The name of the Android style resource to apply as the SalesIQ theme.
   * @returns
   */
  setThemeForAndroid: (value: string) => void;

  /**
   * This API is used to override the localizable strings by registering the file name of the ".xcstrings" or ".strings" file containing the custom localized strings.
   *
   *
   * @param fileName - The name of the `.xcstrings` or `.strings` file containing the custom localized strings.
   * @returns
   */
  registerLocalizationFileForiOS: (fileName: string) => void;

  /**
   * This API is used to reregister the push notification.
   *
   * @platform iOS only. There is no equivalent public API on the native Android SDK to
   * re-register an already-issued push token — this is a no-op on Android.
   */
  reRegisterPush: () => void;

  /**
   * Redraws the launcher button so recent property or state changes are reflected immediately.
   * @returns
   */
  refreshLauncher: () => void;

  /**
   * The themeColor property allows you to change the default SDK theme color to a shade of blue. Any modifications to the themeColor property will be applied across all screens in the Mobilisten UI.
   *
   * @platform iOS only. Android has no equivalent runtime color-map API (Android theming is
   * done via style resources — see {@link setThemeForAndroid}); calling this on Android is a no-op.
   * @see {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-ui-theme-color.html}
   * @param value - The theme configuration to apply across all screens of the Mobilisten UI on iOS.
   * @returns
   */
  setThemeForiOS: (value: ZSIQTheme) => void;

  /**
   * This API is used to send events to the SDK for several returning callbacks.
   *
   * Use `COMPLETE_CHAT_ACTION` to complete a chat action (replaces the removed `completeChatAction` and `completeChatActionWithMessage` APIs).
   *
   * @example
   * ```ts
   * // Complete a chat action with success
   * ZohoSalesIQ.sendEvent(ZohoSalesIQ.Event.COMPLETE_CHAT_ACTION, uuid, true, 'Done!');
   *
   * // Complete a chat action with failure
   * ZohoSalesIQ.sendEvent(ZohoSalesIQ.Event.COMPLETE_CHAT_ACTION, uuid, false, 'Failed');
   * ```
   *
   * @param eventName - The event type to send.
   * @param rest - Additional arguments depending on the event type.
   */
  sendEvent: (
    eventName:
      | ListenerEvent.OPEN_URL
      | ListenerEvent.COMPLETE_CHAT_ACTION
      | ListenerEvent.VISITOR_REGISTRATION_FAILURE,
    ...rest: any[]
  ) => void;

  /**
   * This API allows users to navigate back to your app instantly by dismissing all Mobilisten UI elements (the launcher will not be affected).
   */
  dismissUI: () => void;

  /**
   * Configures the scheme, host, and path matching criteria for incoming URIs that the SDK
   * should respond to (deep-linking support).
   *
   * Note: Android only. This API has no effect on iOS.
   * @param scheme - The URI scheme configuration (see {@link SalesIQUriScheme}).
   */
  setUriScheme: (scheme: SalesIQUriScheme) => void;

  // These APIs are not needed for now, will handle if it is needed in future.
  // isLiveChatAvailable: (callback: (isAvailable: boolean) => void) => void;
  // isBrandOnline: (callback: (isOnline: boolean) => void) => void;

  /**
   * Sets the source from which the SDK theme configuration should be applied.
   * @param source - Either "portal" (SalesIQ portal configuration) or "sdk" (SDK configuration).
   */
  setThemeSource: (source: 'portal' | 'sdk') => void;

  /**
   * This listener provides an interface for various event callbacks to help developers track different actions performed by the app user. The {@link addListener ZohoSalesIQ.addListener} would invoke callback methods for various actions performed by the visitors.
   * @param callback - Invoked with the event data whenever a SalesIQ event is triggered.
   * @returns
   */
  addListener: (
    callback: (callbackData: Listeners) => void
  ) => EmitterSubscription;

  /**
   * Updates a specific SDK configuration flag at runtime.
   * @param configuration - The configuration option to update (see {@link Configuration}).
   * @param value - The value to set for the given configuration option.
   * @returns
   */
  updateConfiguration: (
    configuration: Configuration,
    value: string | number | boolean
  ) => void;

  /**
   * This API is used to refresh the provider data (secret fields or display fields) for a specific conversation.
   *
   * @param data - {@link SalesIQData} describing the data type and conversation to refresh.
   * @returns A promise that resolves once the data is refreshed and rejects with a {@link CallbackError} on failure.
   */
  refreshData: (data: SalesIQData) => Promise<void>;

  /**
   * Retrieves the communication mode currently configured for the SDK.
   * @returns A promise resolving to the current {@link CommunicationMode}, or `null` if none is set.
   */
  getCommunicationMode: () => Promise<CommunicationMode | null>;

  /**
   * Sets a custom session ID for the current visitor session.
   * @param id - The session identifier string.
   */
  setSessionId: (id: string) => void;

  /** The {@link ListenerEvent} enum of event types used with {@link sendEvent} and the SDK event listeners. */
  Event: typeof ListenerEvent;
}

// Sample export for using ZSIQKnowledgeBaseTypes in this file
/** Internal re-export alias that surfaces {@link ZSIQKnowledgeBaseTypes} within this module. */
export type _ZSIQKnowledgeBaseTypes = ZSIQKnowledgeBaseTypes;
/** Internal re-export alias that surfaces {@link ZSIQLauncherTypes} within this module. */
export type _ZSIQLauncherTypes = ZSIQLauncherTypes;
/** Internal re-export alias that surfaces {@link ChatTypes} within this module. */
export type _ZSIQChatTypes = ChatTypes;
