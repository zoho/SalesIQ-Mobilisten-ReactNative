/**
 * Launcher events emitted to `ZohoSalesIQ.Launcher.addListener()` callbacks.
 */
export enum LauncherEvent {
  /**
   * Show/hide your custom launcher with the triggered boolean value.
   */
  HANDLE_CUSTOM_LAUNCHER_VISIBILITY = 'EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY',
}

/**
 * The payload delivered to `ZohoSalesIQ.Launcher.addListener()`, carrying the launcher `event`
 * and its `body` — for `HANDLE_CUSTOM_LAUNCHER_VISIBILITY`, whether the custom launcher should be visible.
 */
export type LauncherListeners = {
  /** The launcher event that was triggered. */
  event: LauncherEvent.HANDLE_CUSTOM_LAUNCHER_VISIBILITY;
  /** Event payload describing the requested custom-launcher visibility. */
  body: {
    /** Whether the custom launcher should be shown (`true`) or hidden (`false`). */
    visible: boolean;
  };
};
