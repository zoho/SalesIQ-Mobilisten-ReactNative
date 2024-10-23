import type { ZSIQNotificationTypes } from './../../notification/types/Notification';
import type { ZSIQListenerEventsType } from './../../../types/Listener';
import type { ZSIQWrapperTypes } from './../../../types/ZSIQWrapperTypes';
import type { CallbackError } from '../../../types/ZSIQWrapperTypes';
import type { SalesIQChat } from './SalesIQChat';
import type { ChatNotificationPayloadType, EndChatDetailsNotificationPayload, VisitorHistoryNotificationPayloadType, ZSIQNotificationPayloadResult } from '../../notification/types/Notification';
import type { ChatListenerEvent } from './Listener';
import type { ChatListeners } from './Listener';

type OpenChatPayload =
  | ChatNotificationPayloadType["payload"]
  | VisitorHistoryNotificationPayloadType["payload"]
  | EndChatDetailsNotificationPayload["payload"] | ZSIQNotificationPayloadResult;

export enum ZSIQChatComponent {
  OPERATOR_IMAGE = "OPERATOR_IMAGE",
  RATING = "RATING",
  FEEDBACK = "FEEDBACK",
  SCREENSHOT = "SCREENSHOT",
  PRE_CHAT_FORM = "PRE_CHAT_FORM",
  VISITOR_NAME = "VISITOR_NAME",
  EMAIL_TRANSCRIPT = "EMAIL_TRANSCRIPT",
  FILE_SHARE = "FILE_SHARE",
  MEDIA_CAPTURE = "MEDIA_CAPTURE",
  END = "END",
  END_WHEN_IN_QUEUE = "END_WHEN_IN_QUEUE",
  END_WHEN_BOT_CONNECTED = "END_WHEN_BOT_CONNECTED",
  END_WHEN_OPERATOR_CONNECTED = "END_WHEN_OPERATOR_CONNECTED",
  REOPEN = "REOPEN"
}

export interface ChatTypes {
  Chat: {
    /**
     * This API lets you toggle the function of various chat components.
     * 
     * Note: The settings for the components are taken into consideration 
     *       only if their function is enabled in portal settings.
     * 
     * @param ZSIQChatComponent - Type of the chat component.
     * @param visibility - The visibility will be applied to the chat component.    
     */
    setVisibility: (chatComponent: (typeof ZSIQChatComponent)[keyof typeof ZSIQChatComponent], visibility: boolean) => void;

    /**
     * This API is used to handle URL-related actions inside Mobilisten.
     *
     * By default, clicking on a URL will redirect to the specific URL. But if you want further control over the URL, like sending a notification after the visitor clicks on the URL or performing any custom actions, you can use this API.
     *
     * To handle the URL behavior, the value inside the shouldOpenUrl() API must be false. i.e., ```ZohoSalesIQ.Chat.shouldOpenUrl(false)```, then the default action will not be executed. Now you can use the API {@link ZSIQWrapperTypes.sendEvent ZohoSalesIQ.sendEvent} to open the URL.
     *
     * Note:  Only when `shouldOpenUrl` is *false*, the action block in {@link ZSIQListenerEventsType.EVENT_HANDLE_URL ZohoSalesIQ.EVENT_HANDLE_URL} event listener will be executed on clicking the URL.
     * @param open
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
     *
     * @param durationInSec
     * @returns
     */
    showFeedback: (durationInSec: number) => void;

    /**
     * This API is used to control the visibility of the estimated wait time in the chat window when connecting to an operator.  Setting it to true hides the chat queue time while setting it to false displays it.
     * @param value
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
     *
     * @param question
     * @param customChatId
     * @param departmentName
     * @param callback
     * @returns
     */
    start: (
      question: string,
      customChatId: string | null,
      departmentName: string | null,
      callback?: (error: CallbackError, result: SalesIQChat | null) => void
    ) => void;

    /**
     *
     * @param customChatId
     * @param departmentName
     * @param callback
     * @returns
     */
    startWithTrigger: (
      customChatId: string | null,
      departmentName: string | null,
      callback?: (error: CallbackError, result: SalesIQChat | null) => void
    ) => void;

    /**
     *
     * @param seconds
     * @returns
     */
    setWaitingTime: (seconds: number) => void;

    /**
     * This API retrieves chat details for the specified chat ID.
     * @param chatId
     * @param callback
     * @returns
     */
    get: (
      chatId: string,
      callback: (error: CallbackError, result: SalesIQChat | null) => void
    ) => void;

    /**
     * This listener provides an interface for various chat event callbacks to help developers track different chat-related actions like open, close performed by the app user. The {@link ChatTypes ZohoSalesIQ.Chat.addListener} invokes callback methods for various chat actions performed by the visitors.
     * 
     * {@link SalesIQChat VisitorChat} object returned in the callback will hold the properties mentioned in the following {@link https://www.zoho.com/salesiq/help/developer-guides/android-Chat-v4-2-0.html link}. The method returns an instance of the Visitor Chat class, which contains information related to the chat.
     * @param callback 
     * @returns 
     */
    addListener: (
      callback: (callbackData: ChatListeners) => void
    ) => void;
    Event: typeof ChatListenerEvent
  };
}

export type _ZSIQListenerEventsType = ZSIQListenerEventsType;
export type _ZSIQWrapperTypes = ZSIQWrapperTypes;
export type _ZSIQNotificationTypes = ZSIQNotificationTypes;