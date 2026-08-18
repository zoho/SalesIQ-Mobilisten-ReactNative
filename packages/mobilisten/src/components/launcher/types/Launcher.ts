import { EmitterSubscription } from 'react-native';
import {
  type LauncherProps,
  type ZSIQListenerEventsType,
} from '../../../types/Listener';
import type { LauncherEvent, LauncherListeners } from './Listener';
/** Controls when the SalesIQ launcher button is shown. */
export enum ZSIQLauncherModes {
  /** Always show the launcher. */
  ALWAYS = 'LAUNCHER_VISIBILITY_MODE_ALWAYS',
  /** Never show the launcher. */
  NEVER = 'LAUNCHER_VISIBILITY_MODE_NEVER',
  /** Show the launcher only while there is an active chat. */
  WHEN_ACTIVE_CHAT = 'LAUNCHER_VISIBILITY_MODE_WHEN_ACTIVE_CHAT',
}

export interface ZSIQLauncherTypes {
  /** Namespace for controlling the SalesIQ launcher button — its visibility mode and drag behavior. */
  Launcher: {
    /** The {@link ZSIQLauncherModes} enum of launcher visibility modes. */
    VisibilityMode: typeof ZSIQLauncherModes;
    /**
     * This API allows managing the visibility of the mobilisten launcher according to your {@link ZSIQLauncherTypes.Launcher visibility} mode.
     *
     * @param mode - The launcher visibility mode to apply (see {@link ZSIQLauncherModes}).
     * @returns
     */
    show: (mode: ZSIQLauncherModes) => void;

    /**
     * This API allows managing the visibility of the custom launcher. This will subsequently emit the {@link ZSIQListenerEventsType.EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY} event, allowing you to display your customized launcher as required.
     * @param mode - The visibility mode that determines when the custom launcher event is emitted (see {@link ZSIQLauncherModes}).
     * @returns
     */
    setVisibilityModeToCustomLauncher: (mode: ZSIQLauncherModes) => void;

    /**
     * This API allows to close the mobilisten launcher by dragging and dropping on the close button.
     *
     * @param enabled - `true` to allow dismissing the launcher by dragging it to the close button, `false` to disable it.
     * @returns
     */
    enableDragToDismiss: (enabled: boolean) => void;

    /**
     * Sets the minimum press duration, in seconds, required before the launcher can be dragged.
     * @param duration - The minimum press duration, in seconds, before a drag gesture is recognized.
     * @returns
     */
    setMinimumPressDuration: (duration: number) => void;

    /**
     * Controls whether the operator's photo is shown on the launcher during an active chat.
     * Mirrors the native `showOperatorImageInLauncher` bridge method.
     *
     * @param show - `true` to show the operator image on the launcher, `false` to hide it.
     */
    showOperatorImage: (show: boolean) => void;

    /**
     * This listener allows you to register a callback that is to be invoked whenever an event is triggered regarding the launcher.
     * @param callback - Invoked with the launcher event data whenever a launcher event is triggered.
     * @returns
     */
    addListener: (
      callback: (callbackData: LauncherListeners) => void
    ) => EmitterSubscription;

    /** The {@link LauncherEvent} enum of launcher events delivered to {@link addListener}. */
    Event: typeof LauncherEvent;
  } & {
    [key in keyof typeof LauncherProps]: (typeof LauncherProps)[key];
  };
}

export type _ZSIQListenerEventsType = ZSIQListenerEventsType;
