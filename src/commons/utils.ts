import { Platform, NativeModules, NativeEventEmitter } from "react-native";

const LINKING_ERROR =
  `The package 'react-native-zohosalesiq-mobilisten' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  `- You rebuilt the app after following installation steps in our documentation(${"https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html"}).`

const RNZohoSalesIQ = NativeModules.RNZohoSalesIQ
  ? NativeModules.RNZohoSalesIQ
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const RNZohoSalesIQEmitter = new NativeEventEmitter(RNZohoSalesIQ);

export default RNZohoSalesIQ;