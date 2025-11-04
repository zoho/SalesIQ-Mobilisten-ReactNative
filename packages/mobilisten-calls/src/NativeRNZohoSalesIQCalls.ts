import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getConstants(): {
    ZSIQ_CALLS_EVENT_LISTENER: string;
  };

  initialiseForiOS: () => void;

  isEnabled: () => Promise<boolean>;

  getCurrentCallId: () => Promise<string | null>;

  getCurrentCallState: () => Promise<Object | null>;

  enterFullScreenMode: () => void;

  enterFloatingViewMode: () => void;

  setTitle: (onlineTitle: string | null, offlineTitle: string | null) => void;

  start: (
    id?: string | null,
    displayActiveCall?: boolean,
    attributes?: Object | null
  ) => Promise<Object | null>;

  end: () => Promise<Object | null>;

  setAndroidReplyMessages: (messages: string[]) => void;

  setVisibility: (component: string, isVisible: boolean) => void;

  getList: () => Promise<Object[]>;

  setCallKitIcon: (icon: string) => void;

  addListener: (eventName: string) => void;

  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNZohoSalesIQMobilistenCalls');
