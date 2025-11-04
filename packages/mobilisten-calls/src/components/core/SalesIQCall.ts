export enum CallComponent {
    OPERATOR_IMAGE = "OPERATOR_IMAGE",
    OPERATOR_NAME = "OPERATOR_NAME",
    PRE_CHAT_FORM = "PRE_CHAT_FORM",
    QUEUE_POSITION = "QUEUE_POSITION"
}

export enum SalesIQCallStatus {
    NONE = 'NONE',
    CALLING = 'CALLING',
    RINGING = 'RINGING',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    // ON_HOLD = 'ONHold', // Commented out, as in Dart
    RECONNECTING = 'RECONNECTING',
    ENDED = 'ENDED',
    MISSED = 'MISSED',
    CANCELLED = 'CANCELLED',
    DECLINED = 'DECLINED',
    FAILED = 'FAILED',
    QUEUE = 'QUEUE',
    INVALID = 'INVALID',
}

export function isCallActive(status?: SalesIQCallStatus): boolean {
    const activeStatuses = new Set<SalesIQCallStatus>([
        SalesIQCallStatus.CALLING,
        SalesIQCallStatus.RINGING,
        SalesIQCallStatus.CONNECTING,
        SalesIQCallStatus.CONNECTED,
        // SalesIQCallStatus.ON_HOLD, // Uncomment if needed
        SalesIQCallStatus.RECONNECTING,
        SalesIQCallStatus.QUEUE,
    ]);
    
    return status ? activeStatuses.has(status) : false;
}

// Utility to convert string to SalesIQCallStatus
export function salesIQCallStatusFromString(status: string): SalesIQCallStatus {
    const normalizedStatus = status.toLowerCase();
    const match = Object.values(SalesIQCallStatus).find(
        s => s.toLowerCase() === normalizedStatus
    );
    return (match as SalesIQCallStatus) ?? SalesIQCallStatus.INVALID;
}

export class SalesIQCallState {
    readonly status: SalesIQCallStatus;
    readonly isIncomingCall: boolean | null;

    constructor(params: { status: SalesIQCallStatus; isIncomingCall?: boolean | null }) {
        this.status = params.status;
        this.isIncomingCall = params.isIncomingCall ?? null;
    }

    static fromMap(map: Record<string, any> | null | undefined): SalesIQCallState {
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