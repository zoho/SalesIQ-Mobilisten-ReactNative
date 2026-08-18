/**
 * Identifies a component of the call UI whose visibility can be toggled via the
 * calls `setVisibility` API.
 */
export enum CallComponent {
  /** The operator's profile image shown on the call screen. */
  OPERATOR_IMAGE = 'OPERATOR_IMAGE',
  /** The operator's name shown on the call screen. */
  OPERATOR_NAME = 'OPERATOR_NAME',
  /** The pre-chat form shown before a call connects. */
  PRE_CHAT_FORM = 'PRE_CHAT_FORM',
  /** The visitor's position while waiting in the call queue. */
  QUEUE_POSITION = 'QUEUE_POSITION',
}

/**
 * The current stage of a call in its lifecycle.
 */
export enum SalesIQCallStatus {
  /** No call is in progress. */
  NONE = 'NONE',
  /** An outgoing call is being placed. */
  CALLING = 'CALLING',
  /** The call is ringing and waiting to be answered. */
  RINGING = 'RINGING',
  /** The call is establishing a connection. */
  CONNECTING = 'CONNECTING',
  /** The call is connected and both parties are on the line. */
  CONNECTED = 'CONNECTED',
  /** The call is on hold. Android only — the iOS SDK does not report this status. */
  ON_HOLD = 'ON_HOLD',
  /** The connection dropped and the call is attempting to reconnect. */
  RECONNECTING = 'RECONNECTING',
  /** The call has ended. */
  ENDED = 'ENDED',
  /** The call was not answered. */
  MISSED = 'MISSED',
  /** The call was cancelled before being answered. */
  CANCELLED = 'CANCELLED',
  /** The call was declined by the other party. */
  DECLINED = 'DECLINED',
  /** The call failed to connect. */
  FAILED = 'FAILED',
  /** The visitor is waiting in the operator queue for the call to be attended. */
  QUEUE = 'QUEUE',
  /** The status could not be determined or is not recognized. */
  INVALID = 'INVALID',
}

/**
 * Returns whether the given call status represents an in-progress call — one that
 * is connecting, ringing, connected, on hold, reconnecting, or queued.
 *
 * @param status - The call status to check.
 * @returns `true` if the status is an active call state, otherwise `false`.
 */
export function isCallActive(status?: SalesIQCallStatus): boolean {
  const activeStatuses = new Set<SalesIQCallStatus>([
    SalesIQCallStatus.CALLING,
    SalesIQCallStatus.RINGING,
    SalesIQCallStatus.CONNECTING,
    SalesIQCallStatus.CONNECTED,
    SalesIQCallStatus.ON_HOLD,
    SalesIQCallStatus.RECONNECTING,
    SalesIQCallStatus.QUEUE,
  ]);

  return status ? activeStatuses.has(status) : false;
}

/**
 * Converts a raw status string into a {@link SalesIQCallStatus}, matching
 * case-insensitively. The deprecated native value `call_failed` is mapped to
 * {@link SalesIQCallStatus.FAILED}, and any unrecognized value returns
 * {@link SalesIQCallStatus.INVALID}.
 *
 * @param status - The raw status string to convert.
 * @returns The matching call status, or {@link SalesIQCallStatus.INVALID} if none matches.
 */
export function salesIQCallStatusFromString(status: string): SalesIQCallStatus {
  const normalizedStatus = status.toLowerCase();
  // The Android native SDK deprecates CALL_FAILED in favour of FAILED.
  if (normalizedStatus === 'call_failed') {
    return SalesIQCallStatus.FAILED;
  }
  const match = Object.values(SalesIQCallStatus).find(
    (s) => s.toLowerCase() === normalizedStatus
  );
  return (match as SalesIQCallStatus) ?? SalesIQCallStatus.INVALID;
}

/**
 * Represents the current state of a call, combining its {@link SalesIQCallStatus}
 * with whether it is an incoming call.
 */
export class SalesIQCallState {
  /** The current status of the call. */
  readonly status: SalesIQCallStatus;
  /**
   * Whether the call is incoming (`true`) or outgoing (`false`), or `null` when
   * the direction is unknown.
   */
  readonly isIncomingCall: boolean | null;

  constructor(params: {
    status: SalesIQCallStatus;
    isIncomingCall?: boolean | null;
  }) {
    this.status = params.status;
    this.isIncomingCall = params.isIncomingCall ?? null;
  }

  /**
   * Builds a {@link SalesIQCallState} from a raw map (e.g. a native event payload).
   * Returns a state with {@link SalesIQCallStatus.INVALID} and no direction when
   * `map` is `null` or `undefined`.
   *
   * @param map - The raw state map, typically `{ status, isIncomingCall }`.
   * @returns The parsed call state.
   */
  static fromMap(
    map: Record<string, any> | null | undefined
  ): SalesIQCallState {
    if (map == null) {
      return new SalesIQCallState({
        status: SalesIQCallStatus.INVALID,
        isIncomingCall: null,
      });
    }
    return new SalesIQCallState({
      status: salesIQCallStatusFromString(map['status']),
      isIncomingCall: map['isIncomingCall'] ?? null,
    });
  }
}
