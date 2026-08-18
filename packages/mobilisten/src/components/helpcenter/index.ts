import RNZohoSalesIQ from '../../commons/utils';
import type { ZSIQHelpCenterTypes } from './types/HelpCenter';

export const ZSIQHelpCenter = {
  HelpCenter: {
    ask: function (question?) {
      return RNZohoSalesIQ.helpCenterAsk(question ?? null);
    },
  },
} as ZSIQHelpCenterTypes;
