import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from '../../commons/utils';
import type { ChatTypes } from './types/Chat';
import { ChatListenerEvent } from './types/Listener';

export const ZSIQChats = {
  Chat: {
    setVisibility: function (chatComponent, visibility) {
      RNZohoSalesIQ.setChatComponentVisibility(chatComponent, visibility);
    },
    setOperatorEmail: function (operatorMailID) {
      RNZohoSalesIQ.setOperatorEmail(operatorMailID);
    },
    showOfflineMessage: function (show) {
      RNZohoSalesIQ.showOfflineMessage(show);
    },
    end: function (id) {
      return RNZohoSalesIQ.end(id);
    },
    fetchAttenderImage: function (attenderId, fetchDefaultImage) {
      return new Promise((resolve, reject) => {
        RNZohoSalesIQ.fetchAttenderImage(attenderId, fetchDefaultImage, ((
          error: any,
          image: any
        ) => {
          if (error) {
            reject(error);
          } else {
            resolve(image);
          }
        }) as any);
      });
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
    start: function (
      question,
      customChatId = null,
      departmentName = null,
      callback = undefined
    ) {
      const cb = typeof callback === 'function' ? callback : () => {};
      RNZohoSalesIQ.startNewChat(question, customChatId, departmentName, cb);
    },
    startWithTrigger: function (
      customChatId = null,
      departmentName = null,
      callback = undefined
    ) {
      const cb = typeof callback === 'function' ? callback : () => {};
      RNZohoSalesIQ.startNewChatWithTrigger(customChatId, departmentName, cb);
    },
    allowChatInOfflineMode: function (allow) {
      RNZohoSalesIQ.allowChatInOfflineMode(allow);
    },
    setOfflineMessage: function (message) {
      RNZohoSalesIQ.setChatOfflineMessage(message);
    },
    setWaitingTime: function (seconds) {
      RNZohoSalesIQ.setChatWaitingTime(seconds);
    },
    get: function (chatId, callback) {
      RNZohoSalesIQ.getChat(chatId, callback);
    },
    // TODO: Re-implement against the current `SalesIQConversation` model — the legacy
    // `SalesIQChat` shape is outdated. Temporarily unexposed (see types/Chat.ts).
    // getList: function () {
    //   return RNZohoSalesIQ.getChatsList();
    // },
    setTitle: function (online, offline) {
      RNZohoSalesIQ.setChatConversationTitle(online, offline);
    },
    setQuestion: function (question) {
      RNZohoSalesIQ.setQuestion(question);
    },
    // These APIs are not needed for now, will handle if it is needed in future.
    // getDepartments: function (callback) {
    //   RNZohoSalesIQ.getChatDepartments(callback);
    // },
    addListener: function (callback) {
      return RNZohoSalesIQEmitter.addListener('CHAT_EVENT_LISTENER', callback);
    },
    Event: ChatListenerEvent,
  },
} as ChatTypes;
