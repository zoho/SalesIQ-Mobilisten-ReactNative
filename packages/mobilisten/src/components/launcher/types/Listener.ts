export enum LauncherEvent {
  /**
   * Show/hide your custom launcher with the triggered boolean value.
   */
  HANDLE_CUSTOM_LAUNCHER_VISIBILITY = 'EVENT_HANDLE_CUSTOM_LAUNCHER_VISIBILITY',
}

export type LauncherListeners = {
	event: LauncherEvent.HANDLE_CUSTOM_LAUNCHER_VISIBILITY;
	body: {
		visible: boolean
	}
}