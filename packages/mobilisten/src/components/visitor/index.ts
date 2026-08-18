import RNZohoSalesIQ from '../../commons/utils';
import type { ZSIQVisitorTypes } from './types/Visitor';

export const ZSIQVisitor = {
  Visitor: {
    updateProfile: function (profile) {
      return RNZohoSalesIQ.updateProfile(profile);
    },
    performCustomAction: function (actionName) {
      return RNZohoSalesIQ.visitorPerformCustomAction(actionName);
    },
  },
} as ZSIQVisitorTypes;
