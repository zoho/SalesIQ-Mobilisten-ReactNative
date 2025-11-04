export enum ListenerEvent {
  /**
   * Invoked when the call state changes.
   */
  STATE_CHANGED = "EVENT_STATE_CHANGED",
  /**
   * Invoked when the queue position of the call changes.
   */
  QUEUE_POSITION_CHANGED = "EVENT_QUEUE_POSITION_CHANGED",
};

export type Listeners = {
  event: ListenerEvent.STATE_CHANGED | ListenerEvent.QUEUE_POSITION_CHANGED
  body?: any
}