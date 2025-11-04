/* ================================================================
 *  Zoho SalesIQ – React Native / TypeScript model layer
 * ================================================================ */

/* ----------  Enums  ---------- */
export enum MediaStatus {
    ENDED = 'ENDED',
    MISSED = 'MISSED',
    CANCELLED = 'CANCELLED',
    CONNECTED = 'CONNECTED',
    INVITED = 'INVITED',
    INITIATED = 'INITIATED',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export enum UserType {
    VISITOR = 'VISITOR',
    OPERATOR = 'OPERATOR',
}

export enum ChatStatus {
    WAITING = 'WAITING',
    CONNECTED = 'CONNECTED',
    MISSED = 'MISSED',
    CLOSED = 'CLOSED',
    TRIGGERED = 'TRIGGERED',
    PROACTIVE = 'PROACTIVE',
}

export enum CallStatus {
    WAITING = 'WAITING',
    CONNECTED = 'CONNECTED',
    MISSED = 'MISSED',
    CLOSED = 'CLOSED',
}

export enum MessageStatus {
    SENDING = 'SENDING',
    UPLOADING = 'UPLOADING',
    SENT = 'SENT',
    FAILED = 'FAILED',
}

/* ----------  Helpers  ---------- */
function parseEnum<T>(enumObj: any, value: any): T | undefined {
    if (value && Object.values(enumObj).includes(value)) {
        return value as T;
    }
    return undefined;
}

/* ----------  File  ---------- */
export class SalesIQFile {
    name?: string;
    type?: string;
    size?: number;
    comment?: string;
    contentType?: string;

    constructor(data: any = {}) {
        this.name = data.name;
        this.type = data.type;
        this.size = data.size;
        this.comment = data.comment;
        this.contentType = data.contentType;
    }
}

/* ----------  Media  ---------- */
export class SalesIQMedia {
    id?: string;
    endTime?: number;
    initiatedBy?: UserType;    
    pickupTime?: number;
    connectedTime?: number;
    status?: MediaStatus;         
    endedBy?: UserType;         
    type?: string;
    createdTime?: number;

    constructor(data: any = {}) {
        this.id = data.id;
        this.endTime = data.endTime;
        this.initiatedBy = parseEnum<UserType>(UserType, data.initiatedBy);
        this.pickupTime = data.pickupTime;
        this.connectedTime = data.connectedTime;
        this.status = parseEnum<MediaStatus>(MediaStatus, data.status);
        this.endedBy = parseEnum<UserType>(UserType, data.endedBy);
        this.type = data.type;
        this.createdTime = data.createdTime;
    }
}

/* ----------  Message  ---------- */
export class SalesIQMessage {
    sender?: string;
    text?: string;
    type?: string;
    senderId?: string; 
    time?: number;
    isRead: boolean = false;
    sentByVisitor: boolean = false;
    file?: SalesIQFile;
    status?: MessageStatus;
  
    constructor(data: any = {}) {
        this.sender = data.sender;
        this.text = data.text;
        this.type = data.type;
        this.senderId = data.senderId ?? data._senderId; // handle both
        this.time = data.time;
        this.isRead = data.isRead ?? false;
        this.sentByVisitor = data.sentByVisitor ?? false;
        this.file = data.file ? new SalesIQFile(data.file) : undefined;
        this.status = parseEnum<MessageStatus>(MessageStatus, data.status);
    }
}

/* ----------  Abstract conversation  ---------- */
export class SalesIQConversation {
    type: string;
    id: string;
    customConversationId?: string;
    question?: string;
    attenderId?: string;
    attenderName?: string;
    attenderEmail?: string;
    departmentName?: string;
    feedback?: string;
    rating?: string;
    queuePosition?: number;
    media?: SalesIQMedia;

    constructor(data: any = {}) {
        this.type = data.type;
        this.id = data.id;
        this.customConversationId = data.customConversationId;
        this.question = data.question;
        this.attenderId = data.attenderId;
        this.attenderName = data.attenderName;
        this.attenderEmail = data.attenderEmail;
        this.departmentName = data.departmentName;
        this.feedback = data.feedback;
        this.rating = data.rating;
        this.queuePosition = data.queuePosition;
        if (data.media) this.media = new SalesIQMedia(data.media);
    }
}

/* ----------  Chat conversation  ---------- */
export class SalesIQChatConversation extends SalesIQConversation {
    isBotAttender?: boolean;
    status?: ChatStatus;
    unreadCount?: number;
    lastSalesIQMessage?: SalesIQMessage;

    constructor(data: any = {}) {
        super(data);
        this.isBotAttender = data.isBotAttender;
        this.status = parseEnum<ChatStatus>(ChatStatus, data.status);
        this.unreadCount = data.unreadCount;
        if (data.lastSalesIQMessage) {
            this.lastSalesIQMessage = new SalesIQMessage(data.lastSalesIQMessage);
        }
    }
}

/* ----------  Call conversation  ---------- */
export class SalesIQCallConversation extends SalesIQConversation {
    status?: CallStatus;

    constructor(data: any = {}) {
        super(data);
        this.status = parseEnum<CallStatus>(CallStatus, data.status);
    }
}

/* ----------  Factory  ---------- */
export function parseConversation(data: SalesIQConversation): SalesIQConversation {
    if (!data || !data.type) return new SalesIQConversation(data);

    switch (data.type) {
        case "chat":
            return new SalesIQChatConversation(data);
        case "call":
            return new SalesIQCallConversation(data);
        default:
            return new SalesIQConversation(data);
    }
}

export function parseConversationList(data: any[]): SalesIQConversation[] {
    if (!Array.isArray(data)) {
        return [];
    }

    return data.map((item, index) => {
        return parseConversation(item);
    });
}
