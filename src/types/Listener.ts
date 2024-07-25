import type { SalesIQChat } from '../components/chat/types/SalesIQChat';
import type { ResourceType } from '../components/knowledgebase/types/KnowledgeBase';

export enum ListenerEvent {
  /**
   * Invoked when the user opens the SDK.
   */
  SUPPORT_OPENED = 'EVENT_SUPPORT_OPENED',

  /**
   * Invoked when the user closes the SDK.
   */
  SUPPORT_CLOSED = 'EVENT_SUPPORT_CLOSED',

  /**
   * Invoked when any of the operators are online.
   */
  OPERATORS_ONLINE = 'EVENT_OPERATORS_ONLINE',

  /**
   * Invoked when all the operators are offline.
   */
  OPERATORS_OFFLINE = 'EVENT_OPERATORS_OFFLINE',

  /**
   * Invoked when the visitor's IP is blocked.
   */
  VISITOR_IPBLOCKED = 'EVENT_VISITOR_IPBLOCKED',

  /**
   * This event allows you to open a URL when invoked. When using this event followed by a URL, this will open the mentioned URL.
   */
  OPEN_URL = 'EVENT_OPEN_URL',

  /**
   * This event will complete the chat action as a success or failure, with or without a message
   */
  COMPLETE_CHAT_ACTION = 'EVENT_COMPLETE_CHAT_ACTION',
}

export type Listeners = {
  event: ListenerEvent.SUPPORT_OPENED | ListenerEvent.SUPPORT_CLOSED | ListenerEvent.OPERATORS_ONLINE | ListenerEvent.OPERATORS_OFFLINE | ListenerEvent.VISITOR_IPBLOCKED,
  body?: null
}

export type ZSIQListenerEventsType = {
  /**
   * @deprecated
   * Invoked when the user opens the SDK.
   */
  EVENT_SUPPORT_OPENED: string;

  /**
   * @deprecated
   * Invoked when the user closes the SDK.
   */
  EVENT_SUPPORT_CLOSED: string;

  /**
   * @deprecated
   * Invoked when the visitor's IP is blocked.
   */
  EVENT_VISITOR_IPBLOCKED: string;

  /**
   * @deprecated
   * Invoked when any of the operators are online.
   */
  EVENT_OPERATORS_ONLINE: string;

  /**
   * @deprecated
   * Invoked when all the operators are offline.
   */
  EVENT_OPERATORS_OFFLINE: string;

  /**
   * @deprecated
   * Invoked when a chat window is opened.
   */
  EVENT_CHATVIEW_OPENED: string;

  /**
   * @deprecated
   * Invoked when a chat window is closed.
   */
  EVENT_CHATVIEW_CLOSED: string;

  /**
   * @deprecated
   * Invoked when a chat is initiated.
   * @param visitorChat - {@link SalesIQChat}
   */
  EVENT_CHAT_OPENED: string;

  /**
   * @deprecated
   * Invoked when a chat is ended.
   * @param visitorChat - {@link SalesIQChat}
   */
  EVENT_CHAT_CLOSED: string;

  /**
   * @deprecated
   * Invoked when a chat is reopened.
   * @param visitorChat - {@link SalesIQChat}
   */
  EVENT_CHAT_REOPENED: string;

  /**
   * @deprecated
   * Invoked when a chat is picked up.
   * @param visitorChat - {@link SalesIQChat} 
   */
  EVENT_CHAT_ATTENDED: string;

  /**
   * @deprecated
   * Invoked when a chat is missed.
   * @param visitorChat - {@link SalesIQChat}
   */
  EVENT_CHAT_MISSED: string;

  /**
   * @deprecated
   * Invoked when the position in the queue of a queued chat changes.
   * @param visitorChat - {@link SalesIQChat} 
  */
  EVENT_CHAT_QUEUE_POSITION_CHANGED: string;

  /**
   * @deprecated
   * Invoked when the unread count is changed.
   */
  EVENT_CHAT_UNREAD_COUNT_CHANGED: string;

  /**
   * @deprecated
   * Invoked when feedback is given by the visitor.
   * @param visitorChat - {@link SalesIQChat SalesIQChat}
   */
  EVENT_FEEDBACK_RECEIVED: string;

  /**
   * @deprecated
   * Invoked when a chat is rated by the visitor.
   * @param visitorChat - {@link SalesIQChat SalesIQChat}
   */
  EVENT_RATING_RECEIVED: string;

  /**
   * @deprecated
   * Invoked when an article is liked.
   */
  EVENT_ARTICLE_LIKED: string;

  /**
   * @deprecated
   * Invoked when an article is disliked.
   */
  EVENT_ARTICLE_DISLIKED: string;

  /**
   * @deprecated
   * Invoked when an article is opened.
   */
  EVENT_ARTICLE_OPENED: string;

  /**
   * @deprecated
   * Invoked when an article is closed.
   */
  EVENT_ARTICLE_CLOSED: string;

  /**
   * @deprecated
   * Invoked when a chat action is to be executed. {@link https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-chatactions-v2.html Learn More}
   */
  EVENT_PERFORM_CHATACTION: string;

  /**
   * @deprecated
   * Invoked when a custom trigger is executed. {@link http://www.zoho.com/salesiq/help/developer-section/react-native-sdk-custom-trigger.html Learn More}
   */
  EVENT_CUSTOMTRIGGER: string;
  /**
   * @deprecated
   * Invoked when a bot has been triggered.
   * 
   * Note: Android only
   */
  EVENT_BOT_TRIGGER: string;

  /**
   * @deprecated
   * Invoked when a URL in the chat is clicked.
   * @param chat - {@link SalesIQChat}
   */
  EVENT_HANDLE_URL: string;

  /**
   * @deprecated
   * Invoked when a resource is opened.
   */
  EVENT_RESOURCE_OPENED: string;

  /**
   * @deprecated
   * Invoked when a resource is closed.
   */
  EVENT_RESOURCE_CLOSED: string;

  /**
   * @deprecated
   * Invoked when a resource is liked.
   */
  EVENT_RESOURCE_LIKED: string;

  /**
   * @deprecated
   * Invoked when a resource is disliked.
   */
  EVENT_RESOURCE_DISLIKED: string;

  /**
   * @deprecated
   * Show/hide your custom launcher with the triggered boolean value.
   */
  EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY: string;

  /**
   * @deprecated
   * Invoked when the notification clicked.
   */
  EVENT_NOTIFICATION_CLICKED: string;
};

export enum ZSIQTabs {
  CONVERSATIONS = 'TAB_CONVERSATIONS',
  KNOWLEDGE_BASE = 'TAB_KNOWLEDGE_BASE',
  /**
   * @deprecated
   */
  FAQ = 'TAB_FAQ',
}

export enum LauncherProps {
  MODE_STATIC = 1,
  MODE_FLOATING = 2,
  HORIZONTAL_LEFT = 'LAUNCHER_HORIZONTAL_LEFT',
  HORIZONTAL_RIGHT = 'LAUNCHER_HORIZONTAL_RIGHT',
  VERTICAL_TOP = 'LAUNCHER_VERTICAL_TOP',
  VERTICAL_BOTTOM = 'LAUNCHER_VERTICAL_BOTTOM',
}

export interface ZSIQConstantsTypes {
  Tab: typeof ZSIQTabs;
  TYPE_OPEN: string;
  TYPE_WAITING: string;
  TYPE_CONNECTED: string;
  TYPE_ENDED: string;
  TYPE_CLOSED: string;
  TYPE_MISSED: string;

  /**
   * @deprecated
   */
  LAUNCHER_MODE_STATIC: string;

  /**
   * @deprecated
   */
  LAUNCHER_MODE_FLOATING: string;
  ActionSource: {
    /**
     * Source of action will be managed by the App.
     */
    APP: string;
    /**
     * Source of action will be managed by the Mobilisten SDK.
     */
    SDK: string;
  };

  Resource: typeof ResourceType;
}

export type _SalesIQChat = SalesIQChat