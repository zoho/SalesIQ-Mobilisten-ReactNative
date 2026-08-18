import RNZohoSalesIQ from '../../commons/utils';
import { type ZSIQHomepageTypes, SIQWidget } from './types/Homepage';

export { SIQWidget };

export const ZSIQHomepage = {
  Homepage: {
    Widget: SIQWidget,
    setVisibility: function (widget: SIQWidget, visible: boolean) {
      RNZohoSalesIQ.setHomepageWidgetVisibility(widget, visible);
    },
    setEnabled: function (enabled: boolean) {
      RNZohoSalesIQ.setHomepageEnabled(enabled);
    },
  },
} as ZSIQHomepageTypes;
