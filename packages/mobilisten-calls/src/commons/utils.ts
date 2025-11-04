import { Platform, NativeModules, NativeEventEmitter } from "react-native";

const LINKING_ERROR =
  `The package '@react-native-zohosalesiq/mobilisten-calls' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  `- You rebuilt the app after following installation steps in our documentation(${"https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html"}).`

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const RNZSIQCallsModule = isTurboModuleEnabled
  ? require('../NativeRNZohoSalesIQCalls').default
  : NativeModules.RNZohoSalesIQMobilistenCalls;

const RNZohoSalesIQCalls = RNZSIQCallsModule
  ? RNZSIQCallsModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const RNZohoSalesIQCallsEmitter = new NativeEventEmitter(RNZohoSalesIQCalls);

export default RNZohoSalesIQCalls;
