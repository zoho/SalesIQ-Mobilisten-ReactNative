import RNZohoSalesIQ from '../../commons/utils';
import type { ZSIQTrackingTypes } from './types/Tracking';

/**
 * `Tracking` namespace — visitor footpath. Mirrors native `ZohoSalesIQ.Tracking`.
 * (`enable` / `disable` require a native-bridge addition and are tracked separately.)
 */
export const ZSIQTracking = {
  Tracking: {
    setPageTitle: function (title: string) {
      RNZohoSalesIQ.setPageTitle(title);
    },
  },
} as ZSIQTrackingTypes;
