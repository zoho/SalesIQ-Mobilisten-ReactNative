/**
 * The lifecycle status of a chat.
 *
 * - `WAITING`   — The chat is waiting in the queue for an operator to connect.
 * - `CONNECTED` — An operator is actively attending the chat.
 * - `MISSED`    — No operator responded and the chat was missed.
 * - `CLOSED`    — The chat has been ended.
 * - `TRIGGERED` — The chat was initiated by a trigger (proactive chat).
 * - `PROACTIVE` — The chat is in a proactive, operator-initiated state.
 */
type ChatStatus =
  | 'WAITING'
  | 'CONNECTED'
  | 'MISSED'
  | 'CLOSED'
  | 'WAITING'
  | 'TRIGGERED'
  | 'PROACTIVE';

/**
 * Represents an active or historical visitor chat and its latest state.
 *
 * Mirrors the native `VisitorChat` model on Android.
 */
export interface SalesIQChat {
  /** The unique identifier of the chat. */
  id?: string;
  /** The custom conversation id supplied at chat start (e.g. an order id), if available. */
  customConversationId?: string;
  /** The number of unread messages in the chat. */
  unreadCount?: number;
  /** Whether the current attender handling the chat is a bot. */
  isBotAttender?: boolean;
  /** The chat's current position while waiting in the operator queue. */
  queuePosition?: number;
  /** The visitor's initial question that started the chat. */
  question?: string;
  /** The name of the department handling the chat. */
  departmentName?: string;
  /** The current lifecycle status of the chat. */
  status?: ChatStatus;
  /** The text of the most recent message in the chat. */
  lastMessage?: string;
  /** The display name of the sender of the most recent message. */
  lastMessageSender?: string;
  /** The time of the most recent message. */
  lastMessageTime?: string;
  /** The most recent message in the chat, with full detail. */
  recentMessage?: {
    /** The text content of the message. */
    text?: string;
    /** The display name of the message sender. */
    sender?: string;
    /** The time the message was sent. */
    time?: string;
    /** Whether the message has been read. */
    is_read?: string;
    /** The file attached to the message, if any. */
    file?: {
      /** The name of the file. */
      name?: string;
      /** The MIME type of the file. */
      content_type?: string;
      /** The comment/caption associated with the file. */
      comment?: string;
      /** The size of the file in bytes. */
      size?: string;
    };
  };
  /** The display name of the operator or agent handling the chat. */
  attenderName?: string;
  /** The unique identifier of the operator or agent handling the chat. */
  attenderID?: string;
  /** The email address of the operator or agent handling the chat. */
  attenderEmail?: string;
  /** The feedback message left by the visitor for the chat. */
  feedback?: string;
  /** The visitor's feedback rating for the chat (e.g. `"sad"`, `"neutral"`, `"happy"`). */
  rating?: string;
}
