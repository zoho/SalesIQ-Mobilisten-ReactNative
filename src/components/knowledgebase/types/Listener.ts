import type { Resource } from './Resource';
import type { ResourceType } from './KnowledgeBase';

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

export type knowledgeBaseListeners = {
  event: typeof KnowledgeBaseListenerEvent[keyof typeof KnowledgeBaseListenerEvent];
  body: {
    type?: ResourceType;
    resource?: Resource;
  };
};
