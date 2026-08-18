import type { Resource } from './Resource';
import type { ResourceType } from './KnowledgeBase';

/**
 * Knowledge Base events emitted to `ZohoSalesIQ.KnowledgeBase.addListener()` callbacks.
 */
export enum KnowledgeBaseListenerEvent {
  /**
   * Invoked when a resource is opened.
   */
  RESOURCE_OPENED = 'EVENT_RESOURCE_OPENED',

  /**
   * Invoked when a resource is closed.
   */
  RESOURCE_CLOSED = 'EVENT_RESOURCE_CLOSED',

  /**
   * Invoked when a resource is liked.
   */
  RESOURCE_LIKED = 'EVENT_RESOURCE_LIKED',

  /**
   * Invoked when a resource is disliked.
   */
  RESOURCE_DISLIKED = 'EVENT_RESOURCE_DISLIKED',
}

/**
 * The payload delivered to `ZohoSalesIQ.KnowledgeBase.addListener()`, carrying the resource
 * `event` and, in its `body`, the resource type and the affected {@link Resource}.
 */
export type knowledgeBaseListeners = {
  /** The Knowledge Base event that occurred. */
  event: (typeof KnowledgeBaseListenerEvent)[keyof typeof KnowledgeBaseListenerEvent];
  /** Event payload describing the affected resource. */
  body: {
    /** The type of the affected resource. */
    type?: ResourceType;
    /** The affected resource. */
    resource?: Resource;
  };
};
