import { Platform } from 'react-native';
import RNZohoSalesIQCalls from './utils';

const ZohoSalesIQCallsConstants = Platform.OS == 'android' ? RNZohoSalesIQCalls.getConstants() : RNZohoSalesIQCalls

export const ZSIQCallsListenerEvents = {
  ZSIQ_CALLS_EVENT_LISTENER: ZohoSalesIQCallsConstants.ZSIQ_CALLS_EVENT_LISTENER
};

export const ZSIQCallsConstants = {
  ...ZSIQCallsListenerEvents
};
