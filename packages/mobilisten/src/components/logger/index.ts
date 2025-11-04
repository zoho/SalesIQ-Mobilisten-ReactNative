import RNZohoSalesIQ from '../../commons/utils';
import type { ZSIQLoggerTypes } from './types/Logger';

export const ZSIQLogger = {
  Logger: {
    INFO: RNZohoSalesIQ.INFO_LOG,
    WARNING: RNZohoSalesIQ.WARNING_LOG,
    ERROR: RNZohoSalesIQ.ERROR_LOG,

    setEnabled: function (value) {
      RNZohoSalesIQ.setLoggerEnabled(value);
    },
    isEnabled: function (callback) {
      RNZohoSalesIQ.isLoggerEnabled(callback);
    },
    setPathForiOS: function (url) {
      RNZohoSalesIQ.setLoggerPathForiOS(url);
    },
    clearLogsForiOS: function () {
      RNZohoSalesIQ.clearLogsForiOS();
    },
    writeLogForiOS: function (log, level, callback = () => {}) {
      RNZohoSalesIQ.writeLogForiOS(log, level, callback);
    },
  },
} as ZSIQLoggerTypes;
