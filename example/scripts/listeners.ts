import {ZohoSalesIQ} from '@react-native-zohosalesiq/mobilisten';
import {ZohoSalesIQCalls} from '@react-native-zohosalesiq/mobilisten-calls';
import {pushEvent} from '../state/events';

/**
 * Wires every current SDK listener into the in-memory event store that backs the
 * Events Console screen. Uses only the namespaced `addListener` APIs (Chat, Calls,
 * KnowledgeBase, Launcher, Notification, top-level) — the deprecated
 * `ZohoSalesIQ.addEventListener(EVENT_*)` surface is intentionally not used.
 */
export const addListeners = () => {
  const {Chat, KnowledgeBase, Launcher, Notification} = ZohoSalesIQ;

  // Listen for top-level/system SDK events (init, session, etc.).
  ZohoSalesIQ.addListener(({event, body}) => {
    pushEvent(event, body ?? null, 'system');
  });

  // Listen for chat lifecycle events (opened, closed, message received…).
  Chat.addListener(({event, body}) => {
    pushEvent(event, body ?? null, 'chat');
  });

  // Listen for audio/video call events.
  ZohoSalesIQCalls.addListener(({event, body}) => {
    pushEvent(event, body ?? null, 'calls');
  });

  // Listen for launcher visibility/interaction events.
  Launcher.addListener(({event, body}) => {
    pushEvent(event, body ?? null, 'launcher');
  });

  // Listen for knowledge base (articles/FAQ) events.
  KnowledgeBase.addListener(({event, body}) => {
    pushEvent(event, body ?? null, 'knowledgeBase');
  });

  // Listen for push-notification events.
  Notification.addListener(({event, body}) => {
    pushEvent(event, body ?? null, 'notification');
    if (event === Notification.Event.NOTIFICATION_CLICKED) {
      // Open the chat referenced by the tapped notification.
      Chat.open(body);
    }
  });
};
