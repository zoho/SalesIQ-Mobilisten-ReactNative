import RNZohoSalesIQ from '../../commons/utils';
import type { ZSIQChatActionsTypes } from './types/ChatActions';

/**
 * `ChatActions` namespace — custom chat actions. Mirrors native `ZohoSalesIQ.ChatActions`.
 * Reuses the existing name-based bridge; object-based registration (label/type) is pending a
 * native-bridge addition.
 */
export const ZSIQChatActions = {
  ChatActions: {
    register: function (actionName: string) {
      RNZohoSalesIQ.registerChatAction(actionName);
    },
    unregister: function (actionName: string) {
      RNZohoSalesIQ.unregisterChatAction(actionName);
    },
    unregisterAll: function () {
      RNZohoSalesIQ.unregisterAllChatActions();
    },
    setTimeout: function (timeoutInSec: number) {
      RNZohoSalesIQ.setChatActionTimeout(timeoutInSec);
    },
  },
} as ZSIQChatActionsTypes;
