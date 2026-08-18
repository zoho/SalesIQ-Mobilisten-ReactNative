import type { SalesIQChat } from './SalesIQChat';

interface ChatAction {
  /** Unique identifier of the chat action instance. */
  uuid: string;
  /** Identifier of the message element that carries the action. */
  elementID: string;
  /** Display label shown for the action. */
  label: string;
  /** Internal name of the chat action. */
  name: string;
  /** Name of the client-side action to invoke when the action is performed. */
  clientActionName: string;
}

interface CommonChatEventPayload {
  /** The chat lifecycle event this payload represents. */
  event:
    | ChatListenerEvent.CHAT_OPENED
    | ChatListenerEvent.CHAT_ATTENDED
    | ChatListenerEvent.CHAT_CLOSED
    | ChatListenerEvent.FEEDBACK_RECEIVED
    | ChatListenerEvent.CHAT_MISSED
    | ChatListenerEvent.CHAT_QUEUE_POSITION_CHANGED
    | ChatListenerEvent.RATING_RECEIVED
    | ChatListenerEvent.CHAT_REOPENED
    | ChatListenerEvent.CHAT_EXPIRED;
  /** The chat the event relates to. */
  body: SalesIQChat;
}

interface ChatViewEventPayload {
  /** Whether the chat window was opened or closed. */
  event:
    | ChatListenerEvent.CHAT_VIEW_CLOSED
    | ChatListenerEvent.CHAT_VIEW_OPENED;
  /** The affected chat window, identified by its optional chat id. */
  body: { id?: string };
}

/**
 * The payload delivered to `ZohoSalesIQ.Chat.addListener()`: a discriminated union whose `event`
 * identifies the {@link ChatListenerEvent} and whose `body` carries the data for that event.
 */
export type ChatListeners =
  | CommonChatEventPayload
  | {
      /** Fired when the visitor's unread message count changes. */
      event: ChatListenerEvent.CHAT_UNREAD_COUNT_CHANGED;
      /** The updated unread message count. */
      body: { count: number };
    }
  | {
      /** Fired when a chat action needs to be performed. */
      event: ChatListenerEvent.PERFORM_CHATACTION;
      /** The chat action to perform. */
      body: ChatAction;
    }
  | {
      /** Fired when a custom trigger is executed. */
      event: ChatListenerEvent.CUSTOM_TRIGGER;
      /** The name of the executed trigger and the visitor's chat information. */
      body: {
        /** The name of the executed custom trigger. */
        triggerName: string;
        /** Information about the visitor that fired the trigger. */
        visitorInformation: SalesIQChat;
      };
    }
  | {
      /** Fired when a bot is triggered (Android only). */
      event: ChatListenerEvent.BOT_TRIGGER;
      /** No payload accompanies this event. */
      body?: null;
    }
  | ChatViewEventPayload
  | {
      /** Fired when a URL in the chat is clicked and you have opted to handle it yourself. */
      event: ChatListenerEvent.HANDLE_URL;
      /** The clicked URL and the chat it originated from. */
      body: {
        /** The URL that was clicked. */
        url: string;
        /** The chat in which the URL was clicked. */
        chat: SalesIQChat;
      };
    };

/**
 * Enumerates the chat lifecycle events delivered to `ZohoSalesIQ.Chat.addListener()` via the
 * payload's `event` field.
 */
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

  /**
   * Invoked when a trigger chat has expired.
   */
  CHAT_EXPIRED = 'EVENT_CHAT_EXPIRED',
}
