/**
 * The mode(s) of communication supported by a brand or department.
 */
export enum CommunicationMode {
  /** Only text chat is supported. */
  CHAT = 'CHAT',
  /** Only calls are supported. */
  CALL = 'CALL',
  /** Both chat and calls are supported. */
  CHAT_AND_CALL = 'CHAT_AND_CALL',
}
