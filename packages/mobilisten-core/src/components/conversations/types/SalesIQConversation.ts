/* ================================================================
 *  Zoho SalesIQ – React Native / TypeScript model layer
 * ================================================================ */

/* ----------  Enums  ---------- */
/**
 * The status of a media (voice call) session associated with a conversation.
 */
export enum MediaStatus {
  /** The media call has ended normally. */
  ENDED = 'ENDED',
  /** The media call was not answered. */
  MISSED = 'MISSED',
  /** The media call was cancelled before being answered. */
  CANCELLED = 'CANCELLED',
  /** The media call is active and both parties are connected. */
  CONNECTED = 'CONNECTED',
  /** The other party has been invited to join the media call. */
  INVITED = 'INVITED',
  /** The media call has been initiated but not yet invited or answered. */
  INITIATED = 'INITIATED',
  /** The media call invite has been accepted. */
  ACCEPTED = 'ACCEPTED',
  /** The media call was rejected. */
  REJECTED = 'REJECTED',
}

/**
 * Identifies which party performed an action on a media session or conversation.
 */
export enum UserType {
  /** The end user (visitor) in the conversation. */
  VISITOR = 'VISITOR',
  /** The support agent (operator) handling the conversation. */
  OPERATOR = 'OPERATOR',
}

/**
 * The lifecycle status of a {@link SalesIQChatConversation}.
 */
export enum ChatStatus {
  /** The chat is waiting in the queue for an operator to connect. */
  WAITING = 'WAITING',
  /** An operator is actively attending the chat. */
  CONNECTED = 'CONNECTED',
  /** No operator responded and the chat was missed. */
  MISSED = 'MISSED',
  /** The chat has been ended. */
  CLOSED = 'CLOSED',
  /** The chat was initiated by a trigger. */
  TRIGGERED = 'TRIGGERED',
  /** The chat is in a proactive, operator-initiated state. */
  PROACTIVE = 'PROACTIVE',
}

/**
 * The lifecycle status of a {@link SalesIQCallConversation}.
 */
export enum CallStatus {
  /** The call is waiting to be answered. */
  WAITING = 'WAITING',
  /** The call is currently active. */
  CONNECTED = 'CONNECTED',
  /** The call was not answered. */
  MISSED = 'MISSED',
  /** The call has ended. */
  CLOSED = 'CLOSED',
}

/**
 * The delivery status of a {@link SalesIQMessage}.
 */
export enum MessageStatus {
  /** The message is being sent to the server. */
  SENDING = 'SENDING',
  /** A file attachment is being uploaded. */
  UPLOADING = 'UPLOADING',
  /** The message was successfully delivered to the server. */
  SENT = 'SENT',
  /** The message failed to send. */
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
/**
 * A file attached to a {@link SalesIQMessage}.
 */
export class SalesIQFile {
  /** The name of the file. */
  name?: string;
  /** The type of the file. */
  type?: string;
  /** The size of the file in bytes. */
  size?: number;
  /** The comment/caption sent with the file. */
  comment?: string;
  /** The MIME type of the file. */
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
/**
 * Represents a media (voice call) session associated with a conversation.
 */
export class SalesIQMedia {
  /** The unique server-assigned ID of the media session. */
  id?: string;
  /** The time the call ended, in milliseconds since epoch. `undefined` if still active. */
  endTime?: number;
  /** Whether the call was initiated by the {@link UserType.VISITOR} or {@link UserType.OPERATOR}. */
  initiatedBy?: UserType;
  /** The time the call was picked up (answered), in milliseconds since epoch. */
  pickupTime?: number;
  /** The time the call became fully connected, in milliseconds since epoch. */
  connectedTime?: number;
  /** The current status of the media session. */
  status?: MediaStatus;
  /** Who ended the call — {@link UserType.VISITOR} or {@link UserType.OPERATOR}. */
  endedBy?: UserType;
  /** The media type (e.g. `"audio"`). */
  type?: string;
  /** The time the media session was created, in milliseconds since epoch. */
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
/**
 * Represents a single message exchanged within a conversation.
 */
export class SalesIQMessage {
  /** The display name of the message sender. */
  sender?: string;
  /** The plain text content of the message. May be empty for file-only messages. */
  text?: string;
  /** The message type identifier (e.g. `"msg"`, `"file"`). */
  type?: string;
  /** The unique ID of the sender. */
  senderId?: string;
  /** The server timestamp of the message in milliseconds since epoch. */
  time?: number;
  /** Whether the message has been read by the recipient. */
  isRead: boolean = false;
  /** Whether this message was sent by the visitor (end user). */
  sentByVisitor: boolean = false;
  /** The attached file, if this is a file message. */
  file?: SalesIQFile;
  /** The current delivery status of this message. */
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
/**
 * Base representation of a SalesIQ conversation, which may be a chat or a call.
 *
 * Instances are passed to data-provider callbacks and event listeners so the app
 * can identify which conversation an event or data request belongs to. Use
 * {@link parseConversation} to build the concrete subtype from raw data.
 *
 * @see SalesIQChatConversation
 * @see SalesIQCallConversation
 */
export class SalesIQConversation {
  /** The conversation kind, e.g. `"chat"` or `"call"`. */
  type: string;
  /** The unique server-assigned conversation ID. */
  id: string;
  /** A custom ID set by the app for this conversation. */
  customConversationId?: string;
  /** The initial question or message that started the conversation. */
  question?: string;
  /** The unique ID of the operator currently attending the conversation. */
  attenderId?: string;
  /** The display name of the attending operator. */
  attenderName?: string;
  /** The email address of the attending operator. */
  attenderEmail?: string;
  /** The name of the department this conversation is assigned to. */
  departmentName?: string;
  /** Visitor-submitted feedback text for this conversation. */
  feedback?: string;
  /** Visitor-submitted rating for this conversation. */
  rating?: string;
  /** The visitor's current position in the operator queue. `-1` if not in a queue. */
  queuePosition?: number;
  /** The media (voice call) associated with this conversation, if any. */
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
/**
 * Represents a text chat conversation.
 */
export class SalesIQChatConversation extends SalesIQConversation {
  /** Whether the conversation is currently handled by a bot. */
  isBotAttender?: boolean;
  /** The current lifecycle status of the chat. */
  status?: ChatStatus;
  /** The number of unread messages in this conversation. */
  unreadCount?: number;
  /** The most recent message in the conversation, if any. */
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
/**
 * Represents a voice call conversation.
 */
export class SalesIQCallConversation extends SalesIQConversation {
  /** The current lifecycle status of the call. */
  status?: CallStatus;

  constructor(data: any = {}) {
    super(data);
    this.status = parseEnum<CallStatus>(CallStatus, data.status);
  }
}

/* ----------  Factory  ---------- */
/**
 * Builds the concrete {@link SalesIQConversation} subtype from raw data based on its
 * `type` field, returning a {@link SalesIQChatConversation}, {@link SalesIQCallConversation},
 * or the base {@link SalesIQConversation} when the type is unrecognized.
 *
 * @param data - The raw conversation data to parse.
 * @returns The parsed conversation instance.
 */
export function parseConversation(
  data: SalesIQConversation
): SalesIQConversation {
  if (!data || !data.type) return new SalesIQConversation(data);

  switch (data.type) {
    case 'chat':
      return new SalesIQChatConversation(data);
    case 'call':
      return new SalesIQCallConversation(data);
    default:
      return new SalesIQConversation(data);
  }
}

/**
 * Parses an array of raw conversation data into {@link SalesIQConversation} instances.
 *
 * @param data - The raw conversation list to parse.
 * @returns An array of parsed conversations, or an empty array if `data` is not an array.
 */
export function parseConversationList(data: any[]): SalesIQConversation[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    return parseConversation(item);
  });
}
