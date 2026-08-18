import { SalesIQDepartment } from './SalesIQDepartment';

/**
 * Attributes describing a conversation, passed to the chat/call start APIs to
 * configure how it is presented and routed.
 */
export interface SalesIQConversationAttributes {
  /**
   * Display name for the conversation. This is not the visitor's name — use it to
   * show the agent, department, or any custom label for your business support.
   */
  name?: string | null;
  /** Any extra information to display for the conversation. */
  additionalInfo?: string | null;
  /** The display picture for the conversation — a URL, image, or drawable resource. */
  displayPicture?: any | null;
  /**
   * The departments the conversation may be routed to. When used with start APIs,
   * at least one valid department is required; invalid departments are ignored.
   */
  departments?: SalesIQDepartment[] | null;
}
