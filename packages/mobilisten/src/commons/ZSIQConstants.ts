import { Platform } from 'react-native';
import { ResourceType } from '../components/knowledgebase/types/KnowledgeBase';
import RNZohoSalesIQ from './utils';

const ZohoSalesIQConstants =
  Platform.OS == 'android' ? RNZohoSalesIQ.getConstants() : RNZohoSalesIQ;

/**
 * Native event-name string constants used to identify each SalesIQ SDK event when
 * subscribing to and dispatching callbacks. The value of each entry is the raw event
 * name resolved from the underlying native Mobilisten module.
 */
export const ZSIQListenerEvents = {
  /** Event emitted when the user opens the SDK. */
  EVENT_SUPPORT_OPENED: ZohoSalesIQConstants.SUPPORT_OPENED,
  /** Event emitted when the user closes the SDK. */
  EVENT_SUPPORT_CLOSED: ZohoSalesIQConstants.SUPPORT_CLOSED,
  /** Event emitted when the visitor's IP address is blocked. */
  EVENT_VISITOR_IPBLOCKED: ZohoSalesIQConstants.VISITOR_IPBLOCKED,
  /** Event emitted when one or more operators come online. */
  EVENT_OPERATORS_ONLINE: ZohoSalesIQConstants.OPERATORS_ONLINE,
  /** Event emitted when all operators go offline. */
  EVENT_OPERATORS_OFFLINE: ZohoSalesIQConstants.OPERATORS_OFFLINE,

  /** Event emitted when a chat window is opened. */
  EVENT_CHATVIEW_OPENED: ZohoSalesIQConstants.CHATVIEW_OPENED,
  /** Event emitted when a chat window is closed. */
  EVENT_CHATVIEW_CLOSED: ZohoSalesIQConstants.CHATVIEW_CLOSED,
  /** Event emitted when a chat is initiated. */
  EVENT_CHAT_OPENED: ZohoSalesIQConstants.CHAT_OPENED,
  /** Event emitted when a chat is ended. */
  EVENT_CHAT_CLOSED: ZohoSalesIQConstants.CHAT_CLOSED,
  /** Event emitted when a chat is reopened. */
  EVENT_CHAT_REOPENED: ZohoSalesIQConstants.CHAT_REOPENED,
  /** Event emitted when a chat is picked up (attended) by an operator. */
  EVENT_CHAT_ATTENDED: ZohoSalesIQConstants.CHAT_ATTENDED,
  /** Event emitted when a chat is missed. */
  EVENT_CHAT_MISSED: ZohoSalesIQConstants.CHAT_MISSED,
  /** Event emitted when a queued chat's position in the queue changes. */
  EVENT_CHAT_QUEUE_POSITION_CHANGED:
    ZohoSalesIQConstants.CHAT_QUEUE_POSITION_CHANGED,
  /** Event emitted when the unread message count changes. */
  EVENT_CHAT_UNREAD_COUNT_CHANGED:
    ZohoSalesIQConstants.CHAT_UNREAD_COUNT_CHANGED,
  /** Event emitted when the visitor submits feedback for a chat. */
  EVENT_FEEDBACK_RECEIVED: ZohoSalesIQConstants.FEEDBACK_RECEIVED,
  /** Event emitted when the visitor rates a chat. */
  EVENT_RATING_RECEIVED: ZohoSalesIQConstants.RATING_RECEIVED,

  /** Event emitted when a custom chat action registered by the app should be performed. */
  EVENT_PERFORM_CHATACTION: ZohoSalesIQConstants.PERFORM_CHATACTION,
  /** Event emitted when a custom trigger fires. */
  EVENT_CUSTOMTRIGGER: ZohoSalesIQConstants.CUSTOMTRIGGER,
  /** Event emitted when a bot is triggered (Android only). */
  EVENT_BOT_TRIGGER: ZohoSalesIQConstants.BOT_TRIGGER,
  /** Event emitted when a URL inside a chat is clicked. */
  EVENT_HANDLE_URL: ZohoSalesIQConstants.EVENT_HANDLE_URL,
  /** Event emitted when the app should re-register its push notification token. */
  RE_REGISTER_PUSH: ZohoSalesIQConstants.RE_REGISTER_PUSH,

  /** Event emitted when a knowledge base resource is opened. */
  EVENT_RESOURCE_OPENED: ZohoSalesIQConstants.EVENT_RESOURCE_OPENED,
  /** Event emitted when a knowledge base resource is closed. */
  EVENT_RESOURCE_CLOSED: ZohoSalesIQConstants.EVENT_RESOURCE_CLOSED,
  /** Event emitted when a knowledge base resource is liked. */
  EVENT_RESOURCE_LIKED: ZohoSalesIQConstants.EVENT_RESOURCE_LIKED,
  /** Event emitted when a knowledge base resource is disliked. */
  EVENT_RESOURCE_DISLIKED: ZohoSalesIQConstants.EVENT_RESOURCE_DISLIKED,

  /** Event emitted when the SDK requests the app to show or hide its custom launcher. */
  EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY:
    ZohoSalesIQConstants.EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY,
  /** Event emitted when visitor registration fails. */
  EVENT_VISITOR_REGISTRATION_FAILURE:
    ZohoSalesIQConstants.EVENT_VISITOR_REGISTRATION_FAILURE,

  /** Event emitted when a SalesIQ notification is clicked. */
  EVENT_NOTIFICATION_CLICKED: ZohoSalesIQConstants.EVENT_NOTIFICATION_CLICKED,
};

/**
 * The aggregate set of SalesIQ constants exposed on the `ZohoSalesIQ` object — all the
 * listener event names (via {@link ZSIQListenerEvents}) plus the chat status constants,
 * launcher modes, action sources, and knowledge base resource types.
 */
export const ZSIQConstants = {
  ...ZSIQListenerEvents,

  /** Chat status indicating the chat is open but not yet answered by an operator. */
  TYPE_OPEN: ZohoSalesIQConstants.TYPE_OPEN,
  /** Chat status indicating the chat is waiting in the queue for an operator. */
  TYPE_WAITING: ZohoSalesIQConstants.TYPE_WAITING,
  /** Chat status indicating the visitor is connected to an operator. */
  TYPE_CONNECTED: ZohoSalesIQConstants.TYPE_CONNECTED,
  /** Chat status indicating the chat conversation has ended. */
  TYPE_ENDED: ZohoSalesIQConstants.TYPE_ENDED,
  /** Chat status indicating the chat has been closed. */
  TYPE_CLOSED: ZohoSalesIQConstants.TYPE_CLOSED,
  /** Chat status indicating the chat was missed (never attended by an operator). */
  TYPE_MISSED: ZohoSalesIQConstants.TYPE_MISSED,
  /**
   * @deprecated
   * Launcher mode constant for a static (fixed-position) launcher button.
   */
  LAUNCHER_MODE_STATIC: ZohoSalesIQConstants.LAUNCHER_MODE_STATIC,
  /**
   * @deprecated
   * Launcher mode constant for a floating (draggable) launcher button.
   */
  LAUNCHER_MODE_FLOATING: ZohoSalesIQConstants.LAUNCHER_MODE_FLOATING,
  /** Identifies the origin of an action — whether it is handled by the App or by the SDK. */
  ActionSource: {
    /** The action is handled by the App. */
    APP: ZohoSalesIQConstants.ACTION_SOURCE_APP,
    /** The action is handled by the Mobilisten SDK. */
    SDK: ZohoSalesIQConstants.ACTION_SOURCE_SDK,
  },
  /** The set of knowledge base resource types (see {@link ResourceType}). */
  Resource: ResourceType,
};
