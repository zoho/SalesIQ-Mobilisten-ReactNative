import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from '../../commons/utils';
import type { ChatTypes } from './types/Chat';
import {ChatListenerEvent} from './types/Listener';

export const ZSIQChats = {
  Chat: {
    setVisibility: function (chatComponent, visibility) {
      RNZohoSalesIQ.setChatComponentVisibility(chatComponent, visibility);
    },
    shouldOpenUrl: function (value) {
      RNZohoSalesIQ.shouldOpenUrl(value);
    },
    showFeedbackAfterSkip: function (enable) {
      RNZohoSalesIQ.showFeedbackAfterSkip(enable);
    },
    showFeedback: function (durationInSec) {
      RNZohoSalesIQ.showFeedbackUpToDuration(durationInSec);
    },
    hideQueueTime: function (value) {
      RNZohoSalesIQ.hideQueueTime(value);
    },
    open: function (map = {}) {
      RNZohoSalesIQ.showPayloadChat(map);
    },
    start: function (question, customChatId = null, departmentName = null, callback = () => { }) {
      RNZohoSalesIQ.startNewChat(question, customChatId, departmentName, callback);
    },
    startWithTrigger: function (customChatId = null, departmentName = null, callback = () => { }) {
      RNZohoSalesIQ.startNewChatWithTrigger(customChatId, departmentName, callback);
    },
    setWaitingTime: function (seconds) {
      RNZohoSalesIQ.setChatWaitingTime(seconds);
    },
    get: function (chatId, callback) {
      RNZohoSalesIQ.getChat(chatId, callback);
    },
    addListener: function (callback) {
      RNZohoSalesIQEmitter.addListener("CHAT_EVENT_LISTENER", callback);
    },
    Event: ChatListenerEvent
  },
} as ChatTypes;
