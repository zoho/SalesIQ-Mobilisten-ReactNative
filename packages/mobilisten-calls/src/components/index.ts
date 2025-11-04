import type { ZSIQCallsWrapperTypes } from '../types/ZSIQCallsWrapperTypes';
import RNZohoSalesIQCalls, { RNZohoSalesIQCallsEmitter } from '../commons/utils';
import { ZSIQCallsConstants, ZSIQCallsListenerEvents } from '../commons/ZSIQCallsConstants';
import { getBase64EncodedImage, SalesIQConversation, parseConversation } from '@react-native-zohosalesiq/mobilisten-core';
import { ListenerEvent } from '../types/Listener';

export const ZSIQCallsWrapper = {
  ...ZSIQCallsConstants,

  initialiseForiOS: function () {
    RNZohoSalesIQCalls.initialiseForiOS();
  },

  isEnabled: function () {
    return RNZohoSalesIQCalls.isEnabled();
  },

  getCurrentCallId: function () {
    return RNZohoSalesIQCalls.getCurrentCallId();
  },

  getCurrentCallState: function () {
    return RNZohoSalesIQCalls.getCurrentCallState();
  },

  enterFullScreenMode: function () {
    RNZohoSalesIQCalls.enterFullScreenMode();
  },

  enterFloatingViewMode: function () {
    RNZohoSalesIQCalls.enterFloatingViewMode();
  },

  setTitle: function (onlineTitle, offlineTitle) {
    RNZohoSalesIQCalls.setTitle(onlineTitle, offlineTitle);
  },

  start: async function (id, displayActiveCall, attributes) {
    let dp = attributes?.displayPicture;
    let base64Image = await getBase64EncodedImage(dp);
    let finalAttributes = {
      ...attributes,
      displayPicture: base64Image
    };
    return RNZohoSalesIQCalls.start(id, displayActiveCall, finalAttributes);
  },

  end: function () {
    return RNZohoSalesIQCalls.end();
  },

  setAndroidReplyMessages: function (messages) {
    RNZohoSalesIQCalls.setAndroidReplyMessages(messages);
  },

  setVisibility: function (component, isVisible) {
    RNZohoSalesIQCalls.setVisibility(component, isVisible);
  },

  getList: async function () {
    try {
      const conversationsArray = await RNZohoSalesIQCalls.getList();

      const parsedConversations = conversationsArray.map((conversation: SalesIQConversation) => {      
        return parseConversation(conversation);
      });

      return parsedConversations;

    } catch (error) {
      console.error("Failed to get conversation list:", error);
      throw error;
    }
  },

  setCallKitIcon: async function (icon) {
    let base64Image = await getBase64EncodedImage(icon);
    RNZohoSalesIQCalls.setCallKitIcon(base64Image);
  },

  addListener: function (callback) {
    return RNZohoSalesIQCallsEmitter.addListener(ZSIQCallsListenerEvents.ZSIQ_CALLS_EVENT_LISTENER, callback);
  },

  Event: ListenerEvent,
} as ZSIQCallsWrapperTypes;