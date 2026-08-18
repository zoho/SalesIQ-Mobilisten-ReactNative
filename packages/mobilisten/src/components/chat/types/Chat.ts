import type { ZSIQNotificationTypes } from './../../notification/types/Notification';
import type { ZSIQListenerEventsType } from './../../../types/Listener';
import type { ZSIQWrapperTypes } from './../../../types/ZSIQWrapperTypes';
import type { CallbackError } from '../../../types/ZSIQWrapperTypes';
import type { SalesIQChat } from './SalesIQChat';
import type {
  ChatNotificationPayloadType,
  EndChatDetailsNotificationPayload,
  VisitorHistoryNotificationPayloadType,
  ZSIQNotificationPayloadResult,
} from '../../notification/types/Notification';
import type { ChatListenerEvent } from './Listener';
import type { ChatListeners } from './Listener';
import { EmitterSubscription } from 'react-native';

type OpenChatPayload =
  | ChatNotificationPayloadType['payload']
  | VisitorHistoryNotificationPayloadType['payload']
  | EndChatDetailsNotificationPayload['payload']
  | ZSIQNotificationPayloadResult;

/**
 * Enumerates the individual chat-window UI components (rating, feedback, file share, operator image,
 * media capture, end/reopen controls, etc.) whose visibility can be toggled via
 * {@link ChatTypes.Chat.setVisibility ZohoSalesIQ.Chat.setVisibility()}.
 */
export enum ZSIQChatComponent {
  /** The operator's profile image shown alongside their messages in the chat window. */
  OPERATOR_IMAGE = 'OPERATOR_IMAGE',
  /** The rating prompt that lets the visitor rate the chat. */
  RATING = 'RATING',
  /** The feedback card that lets the visitor leave feedback after a chat. */
  FEEDBACK = 'FEEDBACK',
  /** The screenshot-capture option in the attachment menu. */
  SCREENSHOT = 'SCREENSHOT',
  /** The pre-chat form shown to collect visitor details before the chat starts. */
  PRE_CHAT_FORM = 'PRE_CHAT_FORM',
  /** The visitor-name field within the pre-chat form. */
  VISITOR_NAME = 'VISITOR_NAME',
  /** The option to email the chat transcript to the visitor. */
  EMAIL_TRANSCRIPT = 'EMAIL_TRANSCRIPT',
  /** The file-sharing option in the attachment menu. */
  FILE_SHARE = 'FILE_SHARE',
  /**
   * The combined media-capture option (camera capture + media library) in the attachment menu.
   * @deprecated Use TAKE_PHOTO, RECORD_VIDEO, or MEDIA_LIBRARY instead
   */
  MEDIA_CAPTURE = 'MEDIA_CAPTURE',
  /** The take-photo (camera) option in the attachment menu. */
  TAKE_PHOTO = 'TAKE_PHOTO',
  /** The record-video option in the attachment menu. */
  RECORD_VIDEO = 'RECORD_VIDEO',
  /** The photo/video library (gallery) option in the attachment menu. */
  MEDIA_LIBRARY = 'MEDIA_LIBRARY',
  /** The control that lets the visitor end the chat. */
  END = 'END',
  /** The end-chat control while the chat is waiting in the queue. */
  END_WHEN_IN_QUEUE = 'END_WHEN_IN_QUEUE',
  /** The end-chat control while a bot is handling the chat. */
  END_WHEN_BOT_CONNECTED = 'END_WHEN_BOT_CONNECTED',
  /** The end-chat control while an operator is attending the chat. */
  END_WHEN_OPERATOR_CONNECTED = 'END_WHEN_OPERATOR_CONNECTED',
  /** The control that lets the visitor reopen a closed chat. */
  REOPEN = 'REOPEN',
  /** The audio/voice call option in the chat window. */
  CALL = 'CALL',
  /** The file-sharing option while a bot is handling the chat. */
  FILE_SHARING_WHEN_BOT_CONNECTED = 'FILE_SHARING_WHEN_BOT_CONNECTED',
  /** The voice-note recording option while a bot is handling the chat. */
  VOICE_NOTE_WHEN_BOT_CONNECTED = 'VOICE_NOTE_WHEN_BOT_CONNECTED',
}

export interface ChatTypes {
  /**
   * Namespace for controlling the SalesIQ chat experience — starting conversations, toggling
   * chat-window components, customizing titles and messages, handling URL clicks, and subscribing
   * to chat lifecycle events.
   */
  Chat: {
    /**
     * This API lets you toggle the function of various chat components.
     *
     * Note: The settings for the components are taken into consideration
     *       only if their function is enabled in portal settings.
     *
     * @param chatComponent - Type of the chat component (see {@link ZSIQChatComponent}).
     * @param visibility - The visibility will be applied to the chat component.
     */
    setVisibility: (
      chatComponent: (typeof ZSIQChatComponent)[keyof typeof ZSIQChatComponent],
      visibility: boolean
    ) => void;

    /**
     * Pre-selects the operator (by email) a chat should be routed to. Mirrors the native
     * `Chat.setOperatorEmail`.
     *
     * @param operatorMailID - The operator's email address.
     */
    setOperatorEmail: (operatorMailID: string) => void;

    /**
     * Controls whether the offline message form is shown when the brand is offline. Mirrors the
     * native `Chat.showOfflineMessage`.
     *
     * @param visibility - `true` to show the offline message form, `false` to hide it.
     */
    showOfflineMessage: (visibility: boolean) => void;

    /**
     * Ends a specific chat by its id. Mirrors the native `Chat.endChat`.
     *
     * @param chatID - The id of the chat to end.
     * @returns A promise that resolves once the chat has been ended.
     */
    end: (chatID: string) => Promise<void>;

    /**
     * Fetches the image of the operator who attended a chat. Mirrors the native
     * `Chat.fetchAttenderImage`.
     *
     * @param attenderId - The attender/operator id.
     * @param fetchDefaultImage - `true` to fetch the default placeholder image when the operator has no custom image.
     * @returns A promise that resolves with the operator's image data and rejects with a {@link CallbackError} on failure.
     */
    fetchAttenderImage: (
      attenderId: string,
      fetchDefaultImage: boolean
    ) => Promise<string>;

    /**
     * This API is used to handle URL-related actions inside Mobilisten.
     *
     * By default, clicking on a URL will redirect to the specific URL. But if you want further control over the URL, like sending a notification after the visitor clicks on the URL or performing any custom actions, you can use this API.
     *
     * To handle the URL behavior, the value inside the shouldOpenUrl() API must be false. i.e., ```ZohoSalesIQ.Chat.shouldOpenUrl(false)```, then the default action will not be executed. Now you can use the API {@link ZSIQWrapperTypes.sendEvent ZohoSalesIQ.sendEvent} to open the URL.
     *
     * Note:  Only when `shouldOpenUrl` is *false*, the action block in {@link ZSIQListenerEventsType.EVENT_HANDLE_URL ZohoSalesIQ.EVENT_HANDLE_URL} event listener will be executed on clicking the URL.
     * @param open - `true` to let the SDK open clicked URLs directly, `false` to handle URL clicks yourself via the event listener.
     * @returns
     *
     * @see {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-should-open-URL.html}
     */
    shouldOpenUrl: (open: boolean) => void;

    /**
     * This API allows managing the duration of the feedback card for 24 hours after the chat ends.
     * @param enable - boolean
     *
     * @see
     * - *true* - `(Default)` The feedback card will be displayed permanently.
     * - *false* - The feedback card will displayed for 24 hours until feedback is given.
     * @returns
     */
    showFeedbackAfterSkip: (enable: boolean) => void;

    /**
     * Sets how long the feedback card remains available after a chat ends.
     * @param durationInSec - The duration, in seconds, for which the feedback card is shown.
     * @returns
     */
    showFeedback: (durationInSec: number) => void;

    /**
     * This API is used to control the visibility of the estimated wait time in the chat window when connecting to an operator.  Setting it to true hides the chat queue time while setting it to false displays it.
     * @param value - `true` to hide the estimated queue/wait time, `false` to display it.
     * @returns
     */
    hideQueueTime: (value: boolean) => void;

    /**
     * This API is used to open the SDK UI based on the data provided in the notification payload.
     *
     * @param map - The data payload obtained from the {@link ZSIQNotificationTypes.Notification getPayload} API containing information required to identify and open SDK UI.
     * @returns
     *
     * @see {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-chat-open.html}
     */
    open: (map: OpenChatPayload) => void;

    /**
     * Starts a new chat.
     *
     * @param question - The initial question or message to start the chat with.
     * @param customChatId - A unique identifier for the chat session.
     * @param departmentName - The department to which the chat should be routed.
     * @param callback - Invoked with an error (if any) and the started chat, or `null`.
     */
    start: (
      question: string,
      customChatId?: string | null,
      departmentName?: string | null,
      callback?: (error: CallbackError, result: SalesIQChat | null) => void
    ) => void;

    /**
     * Starts a new chat via the configured trigger.
     *
     * @param customChatId - A unique identifier for the chat session.
     * @param departmentName - The department to which the chat should be routed.
     * @param callback - Invoked with an error (if any) and the started chat, or `null`.
     */
    startWithTrigger: (
      customChatId: string | null,
      departmentName: string | null,
      callback?: (error: CallbackError, result: SalesIQChat | null) => void
    ) => void;

    /**
     * Allows or disallows starting a chat when all operators are offline.
     *
     * Note: Android only — the iOS native SDK does not expose this API.
     * @param allow - `true` to allow visitors to start a chat while all operators are offline, `false` to disallow it.
     */
    allowChatInOfflineMode: (allow: boolean) => void;

    /**
     * Sets a custom offline message shown in the chat window when operators are unavailable.
     *
     * Note: iOS only — the Android native SDK does not expose this API.
     * @param message - The custom offline message text.
     */
    setOfflineMessage: (message: string) => void;

    //     /**
    //      *
    //      * @param customAction
    //      * @param customChatId
    //      * @param departmentName
    //      * @param secretField
    //      * @param callback
    //      * @returns
    //      */
    //     initWithTrigger: (
    //       customAction: string,
    //       chatId?: string | null,
    //       departmentName?: string | null,
    //       secretField?: Object | null,
    //       callback?: (error: CallbackError, result: SalesIQChat | null) => void
    //     ) => void;

    /**
     * Sets the waiting time, in seconds, before the visitor is shown as waiting for an operator.
     * @param seconds - The waiting time, in seconds.
     * @returns
     */
    setWaitingTime: (seconds: number) => void;

    /**
     * This API retrieves chat details for the specified chat ID.
     * @param chatId - The id of the chat whose details should be retrieved.
     * @param callback - Invoked with an error (if any) and the requested chat details, or `null`.
     * @returns
     */
    get: (
      chatId: string,
      callback: (error: CallbackError, result: SalesIQChat | null) => void
    ) => void;

    /**
     * Retrieves the list of all chats the visitor has had, each with its details.
     *
     * TODO: Re-implement against the current `SalesIQConversation` model. The legacy
     * `SalesIQChat` shape is outdated, so this API is temporarily unexposed.
     */
    // getList: () => Promise<SalesIQConversation[]>;

    /**
     * Sets the title shown at the top of the chat window for online and offline states.
     * @param online - The title to show when operators are online. Pass `null` to keep the default.
     * @param offline - The title to show when operators are offline. Pass `null` to keep the default.
     */
    setTitle: (online: string | null, offline: string | null) => void;

    /**
     * Sets a question to pre-fill in the chat input composer when the visitor opens the chat window.
     * @param question - The question to pre-fill.
     */
    setQuestion: (question: string) => void;

    // These APIs are not needed for now, will handle if it is needed in future.
    // getDepartments: (callback: (departments: string[]) => void) => void;

    /**
     * This listener provides an interface for various chat event callbacks to help developers track different chat-related actions like open, close performed by the app user. The {@link ChatTypes ZohoSalesIQ.Chat.addListener} invokes callback methods for various chat actions performed by the visitors.
     *
     * {@link SalesIQChat VisitorChat} object returned in the callback will hold the properties mentioned in the following {@link https://www.zoho.com/salesiq/help/developer-guides/android-Chat-v4-2-0.html link}. The method returns an instance of the Visitor Chat class, which contains information related to the chat.
     * @param callback - Invoked with the chat event data whenever a chat event is triggered.
     * @returns
     */
    addListener: (
      callback: (callbackData: ChatListeners) => void
    ) => EmitterSubscription;

    /** The {@link ChatListenerEvent} enum of chat lifecycle events delivered to {@link addListener} via `data.event`. */
    Event: typeof ChatListenerEvent;
  };
}

export type _ZSIQListenerEventsType = ZSIQListenerEventsType;
export type _ZSIQWrapperTypes = ZSIQWrapperTypes;
export type _ZSIQNotificationTypes = ZSIQNotificationTypes;
