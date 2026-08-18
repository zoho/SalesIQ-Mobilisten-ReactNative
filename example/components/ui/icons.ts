/**
 * One icon vocabulary across all sample apps (DESIGN_SYSTEM rule 4),
 * mapped onto MaterialCommunityIcons glyph names.
 */
export const AppIcons = {
  chat: 'message-outline',
  calls: 'phone-outline',
  launcher: 'target',
  visitor: 'account-outline',
  knowledgeBase: 'book-open-outline',
  homepage: 'view-grid-outline',
  help: 'help-circle-outline',
  core: 'lightning-bolt-outline',
  notifications: 'bell-outline',
  events: 'pulse',
  settings: 'cog-outline',
  logs: 'file-document-outline',
  globe: 'web',
  key: 'key-outline',
  search: 'magnify',
  check: 'check',
  close: 'close',
  chevronRight: 'chevron-right',
  back: 'chevron-left',
  plus: 'plus',
  sun: 'white-balance-sunny',
  moon: 'moon-waning-crescent',
  article: 'file-document-outline',
  department: 'account-group-outline',
  timer: 'timer-outline',
  refresh: 'refresh',
  send: 'send-outline',
  eye: 'eye-outline',
  history: 'history',
  info: 'information-outline',
  alert: 'alert-circle-outline',
  nav: 'format-list-bulleted',
  shield: 'shield-check-outline',
  gear: 'cog-outline',
  link: 'link-variant',
  bolt: 'lightning-bolt-outline',
  clock: 'clock-outline',
  grid: 'view-grid-outline',
  book: 'book-open-outline',
  copy: 'content-copy',
  message: 'message-outline',
  phone: 'phone-outline',
} as const;

export type AppIconName = keyof typeof AppIcons;

/** Tint variants for the 34×34 list-row icon box. */
export type IconTint = 'primary' | 'secondary' | 'accent' | 'danger';
