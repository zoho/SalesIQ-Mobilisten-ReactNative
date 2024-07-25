import { type LauncherProps, type ZSIQListenerEventsType } from '../../../types/Listener';
import type { LauncherEvent, LauncherListeners } from './Listener';
export enum ZSIQLauncherModes {
  ALWAYS = 'LAUNCHER_VISIBILITY_MODE_ALWAYS',
  NEVER = 'LAUNCHER_VISIBILITY_MODE_NEVER',
  WHEN_ACTIVE_CHAT = 'LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT',
}

export interface ZSIQLauncherTypes {
  Launcher: {
    VisibilityMode: typeof ZSIQLauncherModes;
    /**
     * This API allows managing the visibility of the mobilisten launcher according to your {@link ZSIQLauncherTypes.Launcher visibility} mode.
     *
     * @param mode
     * @returns
     */
    show: (mode: ZSIQLauncherModes) => void;

    /**
     * This API allows managing the visibility of the custom launcher. This will subsequently emit the {@link ZSIQListenerEventsType.EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY} event, allowing you to display your customized launcher as required.
     * @param mode
     * @returns
     */
    setVisibilityModeToCustomLauncher: (mode: ZSIQLauncherModes) => void;

    /**
     * This API allows to close the mobilisten launcher by dragging and dropping on the close button.
     *
     * @param enabled
     * @returns
     */
    enableDragToDismiss: (enabled: boolean) => void;

    /**
     *
     * @param duration
     * @returns
     */
    setMinimumPressDuration: (duration: number) => void;

    /**
     * This listener allows you to register a callback that is to be invoked whenever an event is triggered regarding the launcher.
     * @param type
     * @param listener
     * @returns
     */
    addListener: (callback: (callbackData: LauncherListeners) => void) => void;

    Event: typeof LauncherEvent;
  } & {
    [key in keyof typeof LauncherProps]: (typeof LauncherProps)[key]
  };
}

export type _ZSIQListenerEventsType = ZSIQListenerEventsType;
