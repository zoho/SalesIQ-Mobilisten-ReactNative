// import type { ListenerEvent, Listeners, } from './Listener';

/**
 * Represents an error returned by a callback.
 */
export type CallbackError = {
  /** Error code, if available. */
  code?: string | number;
  /** Error message describing the issue. */
  message?: string;
};

/**
 * The public surface of the core wrapper. Currently empty; reserved for future
 * core-module APIs.
 */
export interface ZSIQCoreWrapperTypes {}
