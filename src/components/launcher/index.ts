import RNZohoSalesIQ, { RNZohoSalesIQEmitter } from "../../commons/utils";
import { LauncherProps } from "../../types/Listener";
import { type ZSIQLauncherTypes, ZSIQLauncherModes } from "./types/Launcher";
import { LauncherEvent } from "./types/Listener";

export const ZSIQLauncher = {
  Launcher: {
    VisibilityMode: ZSIQLauncherModes,
    show: function (mode) {
      RNZohoSalesIQ.showLauncher(mode);
    },
    setVisibilityModeToCustomLauncher: function (mode) {
      RNZohoSalesIQ.setVisibilityModeToCustomLauncher(mode);
    },
    enableDragToDismiss: function (enabled) {
      RNZohoSalesIQ.enableDragToDismiss(enabled);
    },
    setMinimumPressDuration: function (duration) {
      RNZohoSalesIQ.setMinimumPressDuration(duration);
    },
    addListener: function (callback) {
      RNZohoSalesIQEmitter.addListener("LAUNCHER_EVENT_LISTENER", callback);
    },
    Event: LauncherEvent,
    ...LauncherProps
  },
} as ZSIQLauncherTypes;