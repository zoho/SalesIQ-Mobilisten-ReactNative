// ─── Enums ───────────────────────────────────────────────────────────────────

/** The session type used for a conversation (chat or call). */
export enum SIQSessionType {
  /** A chat session. */
  CHAT = 'chat',
  /** A call session. */
  CALL = 'call',
}

/** The type of conversations to display in the conversation list. */
export enum SIQConversationType {
  /** Show chat conversations only. */
  CHAT = 'chat',
  /** Show call conversations only. */
  CALL = 'call',
  /** Show both chat and call conversations. */
  ALL = 'all',
  /** Show no existing conversations. */
  NONE = 'none',
}

/** Filter applied to the conversation list. */
export enum SIQConversationFilter {
  /** Only ongoing (open) conversations. */
  ONGOING = 'ongoing',
  /** Only ended (closed) conversations. */
  ENDED = 'ended',
  /** All conversations regardless of status. */
  ALL = 'all',
}

/** The behavior to apply when starting a new session. */
export enum SIQSessionBehaviorType {
  /** Do not start a new session automatically. */
  NONE = 'none',
  /** Always start a new session. */
  ALWAYS_NEW = 'alwaysNew',
  /** Continue an existing session if available, otherwise start a new one. */
  CONTINUE_OR_NEW = 'continueOrNew',
}

// ─── Data Shapes (serializable plain objects) ─────────────────────────────────

/** A serializable conversation-list configuration, built via the {@link SIQConversationList} factory. */
export type SIQConversationListData = {
  /** The type of conversations the list displays. */
  type: SIQConversationType;
  /** The status filter applied to the list. */
  filter: SIQConversationFilter;
};

/** A serializable session-behavior configuration, built via the {@link SIQSessionBehavior} factory. */
export type SIQSessionBehaviorData = {
  /** The session behavior to apply. */
  type: SIQSessionBehaviorType;
  /** The session type the behavior applies to, or `null` when not applicable. */
  sessionType: SIQSessionType | null;
};

// ─── SIQConversationList factory ─────────────────────────────────────────────

/**
 * Factory for building a conversation list configuration, mirroring
 * `ZSIQConversationList` on iOS.
 *
 * @example
 * ```ts
 * SIQConversationList.all()
 * SIQConversationList.chat(SIQConversationFilter.ONGOING)
 * ```
 */
export const SIQConversationList = {
  /**
   * Builds a chat-only conversation list.
   * @param filter - Which conversations to include by status (defaults to {@link SIQConversationFilter.ALL}).
   */
  chat: (
    filter: SIQConversationFilter = SIQConversationFilter.ALL
  ): SIQConversationListData => ({
    type: SIQConversationType.CHAT,
    filter,
  }),
  /**
   * Builds a call-only conversation list.
   * @param filter - Which conversations to include by status (defaults to {@link SIQConversationFilter.ALL}).
   */
  call: (
    filter: SIQConversationFilter = SIQConversationFilter.ALL
  ): SIQConversationListData => ({
    type: SIQConversationType.CALL,
    filter,
  }),
  /**
   * Builds a conversation list containing both chats and calls.
   * @param filter - Which conversations to include by status (defaults to {@link SIQConversationFilter.ALL}).
   */
  all: (
    filter: SIQConversationFilter = SIQConversationFilter.ALL
  ): SIQConversationListData => ({
    type: SIQConversationType.ALL,
    filter,
  }),
  /**
   * Builds a conversation list that shows no existing conversations.
   * @param filter - Which conversations to include by status (defaults to {@link SIQConversationFilter.ALL}).
   */
  none: (
    filter: SIQConversationFilter = SIQConversationFilter.ALL
  ): SIQConversationListData => ({
    type: SIQConversationType.NONE,
    filter,
  }),
};

// ─── SIQSessionBehavior factory ──────────────────────────────────────────────

/**
 * Factory for building a session behavior configuration, mirroring
 * `ZSIQSessionBehavior` on iOS.
 *
 * @example
 * ```ts
 * SIQSessionBehavior.none
 * SIQSessionBehavior.alwaysNew(SIQSessionType.CHAT)
 * SIQSessionBehavior.continueOrNew(SIQSessionType.CALL)
 * ```
 */
export const SIQSessionBehavior = {
  /** Does not start a new session. */
  none: {
    type: SIQSessionBehaviorType.NONE,
    sessionType: null,
  } as SIQSessionBehaviorData,
  /**
   * Always starts a new session of the given type.
   * @param sessionType - The session type to start (`chat` or `call`).
   */
  alwaysNew: (sessionType: SIQSessionType): SIQSessionBehaviorData => ({
    type: SIQSessionBehaviorType.ALWAYS_NEW,
    sessionType,
  }),
  /**
   * Continues an existing session of the given type if available, otherwise starts a new one.
   * @param sessionType - The session type to continue or start (`chat` or `call`).
   */
  continueOrNew: (sessionType: SIQSessionType): SIQSessionBehaviorData => ({
    type: SIQSessionBehaviorType.CONTINUE_OR_NEW,
    sessionType,
  }),
};

// ─── Screen data shapes ───────────────────────────────────────────────────────

/** A serializable conversation-screen configuration, built via the {@link SIQConversationScreen} factory. */
export type SIQConversationScreenData = {
  /** Discriminator identifying a conversation screen. */
  screenType: 'conversation';
  /** Present when opening an existing conversation by ID. */
  id?: string;
  /** The conversation list configuration for the screen. */
  list: SIQConversationListData;
  /** The session type of the screen. */
  sessionType: SIQSessionType;
  /** The session behavior applied when presenting the screen. */
  sessionBehavior: SIQSessionBehaviorData;
};

/** A serializable knowledge-base-screen configuration, built via the {@link SIQKnowledgeBaseScreen} factory. */
export type SIQKnowledgeBaseScreenData = {
  /** Discriminator identifying a knowledge base screen. */
  screenType: 'knowledgeBase';
  /** The knowledge base resource type shown by the screen. */
  resourceType: 'articles';
  /** Present when navigating directly to a specific resource. */
  id?: string;
};

/** A screen configuration passed to {@link ZSIQPresentSDKTypes.presentSDK ZohoSalesIQ.presentSDK()} — either a conversation or a knowledge base screen. */
export type SIQScreen = SIQConversationScreenData | SIQKnowledgeBaseScreenData;

// ─── SIQConversationScreen factory ────────────────────────────────────────────

/**
 * Factory for building a `ZSIQConversation` screen, mirroring the
 * two designated initializers of `ZSIQConversation` on iOS.
 *
 * @example
 * ```ts
 * // Open an existing conversation by ID
 * SIQConversationScreen.withId('chatId', SIQSessionType.CHAT)
 *
 * // Start or resume a conversation
 * SIQConversationScreen.withList(
 *   SIQConversationList.all(),
 *   SIQSessionBehavior.alwaysNew(SIQSessionType.CHAT)
 * )
 * ```
 */
export const SIQConversationScreen = {
  /**
   * Open an existing conversation by its ID (mirrors iOS Init 1).
   *
   * @param id - The conversation/chat reference ID.
   * @param sessionType - The session type (`chat` or `call`).
   * @param list - Which conversations to show in the list (defaults to all).
   */
  withId: (
    id: string,
    sessionType: SIQSessionType,
    list: SIQConversationListData = SIQConversationList.all()
  ): SIQConversationScreenData => ({
    screenType: 'conversation',
    id,
    list,
    sessionType,
    sessionBehavior: SIQSessionBehavior.none,
  }),

  /**
   * Start or resume a conversation (mirrors iOS Init 2).
   *
   * @param list - Which conversations to show in the list.
   * @param sessionBehavior - How to behave when starting a new session (defaults to none).
   */
  withList: (
    list: SIQConversationListData,
    sessionBehavior: SIQSessionBehaviorData = SIQSessionBehavior.none
  ): SIQConversationScreenData => ({
    screenType: 'conversation',
    list,
    sessionType: sessionBehavior.sessionType ?? SIQSessionType.CHAT,
    sessionBehavior,
  }),
};

// ─── SIQKnowledgeBaseScreen factory ───────────────────────────────────────────

/**
 * Factory for building a `ZSIQKnowledgeBase` screen, mirroring
 * `ZSIQKnowledgeBase` on iOS.
 *
 * @example
 * ```ts
 * SIQKnowledgeBaseScreen.articles()
 * SIQKnowledgeBaseScreen.articles('articleId')
 * ```
 */
export const SIQKnowledgeBaseScreen = {
  /**
   * Open the articles knowledge base screen.
   *
   * @param id - Optional article ID to open directly.
   */
  articles: (id?: string): SIQKnowledgeBaseScreenData => ({
    screenType: 'knowledgeBase',
    resourceType: 'articles',
    id,
  }),
};

// ─── ZSIQPresentSDKTypes interface ────────────────────────────────────────────

export interface ZSIQPresentSDKTypes {
  /**
   * Presents a SalesIQ screen using a structured screen configuration.
   *
   * Mirrors `ZohoSalesIQ.present(_ screen: ZSIQScreen, showHomepage: Bool, completion:)`
   * on iOS.
   *
   * @param screen - The screen to present. Build using {@link SIQConversationScreen}
   *   or {@link SIQKnowledgeBaseScreen} factory methods.
   * @param showHomepage - Whether to show the SalesIQ homepage behind the screen.
   * @returns A Promise resolving to `true` when the screen is presented successfully.
   *
   * @example
   * ```ts
   * // Start a new chat and show the homepage
   * ZohoSalesIQ.presentSDK(
   *   SIQConversationScreen.withList(
   *     SIQConversationList.all(),
   *     SIQSessionBehavior.alwaysNew(SIQSessionType.CHAT)
   *   ),
   *   true
   * );
   *
   * // Open the articles knowledge base without homepage
   * ZohoSalesIQ.presentSDK(SIQKnowledgeBaseScreen.articles(), false);
   *
   * // Open an existing conversation by ID
   * ZohoSalesIQ.presentSDK(
   *   SIQConversationScreen.withId('chatRefId', SIQSessionType.CHAT),
   *   false,
   * ).then(success => { console.log(success); });
   * ```
   */
  presentSDK: (screen: SIQScreen, showHomepage?: boolean) => Promise<boolean>;
}
