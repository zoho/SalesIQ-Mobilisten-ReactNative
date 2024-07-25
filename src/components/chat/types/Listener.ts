import type { SalesIQChat } from './SalesIQChat';

interface ChatAction {
  uuid: string;
  elementID: string;
  label: string;
  name: string;
  clientActionName: string;
}

interface CommonChatEventPayload {
  event:
    | ChatListenerEvent.CHAT_OPENED
    | ChatListenerEvent.CHAT_ATTENDED
    | ChatListenerEvent.CHAT_CLOSED
    | ChatListenerEvent.FEEDBACK_RECEIVED
    | ChatListenerEvent.CHAT_MISSED
    | ChatListenerEvent.CHAT_QUEUE_POSITION_CHANGED
    | ChatListenerEvent.RATING_RECEIVED
    | ChatListenerEvent.CHAT_REOPENED;
  body: SalesIQChat;
}

interface ChatViewEventPayload {
  event: ChatListenerEvent.CHAT_VIEW_CLOSED | ChatListenerEvent.CHAT_VIEW_OPENED;
  body: { id?: string };
}

export type ChatListeners =
  | CommonChatEventPayload
  | {
      event: ChatListenerEvent.CHAT_UNREAD_COUNT_CHANGED;
      body: { count: number };
    }
  | { event: ChatListenerEvent.PERFORM_CHATACTION; body: ChatAction }
  | {
      event: ChatListenerEvent.CUSTOM_TRIGGER;
      body: {
        triggerName: string;
        visitorInformation: SalesIQChat;
      };
    }
  | {
      event: ChatListenerEvent.BOT_TRIGGER;
      body?: null;
    }
  | ChatViewEventPayload
  | {
      event: ChatListenerEvent.HANDLE_URL;
      body: {
        url: string;
        chat: SalesIQChat;
      };
    };

export enum ChatListenerEvent {
  /**
   * Invoked when a chat is picked up.
   */
  CHAT_ATTENDED = 'EVENT_CHAT_ATTENDED',

  /**
   * Invoked when a chat is ended.
   */
  CHAT_CLOSED = 'EVENT_CHAT_CLOSED',

  /**
   * Invoked when feedback is given by the visitor.
   */
  FEEDBACK_RECEIVED = 'EVENT_FEEDBACK_RECEIVED',

  /**
   * Invoked when a chat is missed.
   */
  CHAT_MISSED = 'EVENT_CHAT_MISSED',

  /**
   * Invoked when a chat is initiated.
   */
  CHAT_OPENED = 'EVENT_CHAT_OPENED',

  /**
   * Invoked when the position in the queue of a queued chat changes.
   */
  CHAT_QUEUE_POSITION_CHANGED = 'EVENT_CHAT_QUEUE_POSITION_CHANGED',

  /**
   * Invoked when a chat is rated by the visitor.
   */
  RATING_RECEIVED = 'EVENT_RATING_RECEIVED',

  /**
   * Invoked when a chat is reopened.
   */
  CHAT_REOPENED = 'EVENT_CHAT_REOPENED',

  /**
   * Invoked when the unread count is changed.
   */
  CHAT_UNREAD_COUNT_CHANGED = 'EVENT_CHAT_UNREAD_COUNT_CHANGED',

  /**
   * Invoked when a URL in the chat is clicked.
   */
  HANDLE_URL = 'EVENT_HANDLE_URL',

  /**
   * Invoked when a chat action is to be executed. {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-chatactions-v2.html Learn More}
   */
  PERFORM_CHATACTION = 'EVENT_PERFORM_CHATACTION',

  /**
   * Invoked when a chat window is closed.
   */
  CHAT_VIEW_CLOSED = 'EVENT_CHATVIEW_CLOSED',

  /**
   * Invoked when a chat window is opened.
   */
  CHAT_VIEW_OPENED = 'EVENT_CHATVIEW_OPENED',

  /**
   * Invoked when a custom trigger is executed. {@link http://www.zoho.com/salesiq/help/developer-section/react-native-sdk-custom-trigger.html Learn More}
   */
  CUSTOM_TRIGGER = 'EVENT_CUSTOMTRIGGER',

  /**
   * Invoked when a bot has been triggered.
   * 
   * Note: Android only
   */
  BOT_TRIGGER = 'EVENT_BOT_TRIGGER',
}