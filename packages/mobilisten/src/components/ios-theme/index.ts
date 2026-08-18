import { SIQChatFormTheme } from './SIQChatFormTheme';
import { SIQChatWindowTheme } from './SIQChatWindowTheme';
import { SIQConversationTheme } from './SIQConversationTheme';
import { SIQEmptyViewTheme } from './SIQEmptyViewTheme';
import { SIQFAQTheme } from './SIQFAQTheme';
import { SIQFeedbackTheme } from './SIQFeedbackTheme';
import { SIQInAppNotificationTheme } from './SIQInAppNotificationTheme';
import { SIQLauncherTheme } from './SIQLauncherTheme';
import { SIQNavigationTheme } from './SIQNavigationTheme';
import { SIQNoNetworkBannnerTheme } from './SIQNoNetworkBannnerTheme';
import { SIQOfflineBannerTheme } from './SIQOfflineBannerTheme';
import { SIQTabBarTheme } from './SIQTabBarTheme';

/**
 * Aggregates the appearance customization options for the iOS SalesIQ SDK. Set a global
 * {@link ZSIQTheme.themeColor themeColor} and fine-tune each screen through its dedicated
 * sub-theme, then apply it via the SDK's theme API.
 */
export default class ZSIQTheme {
  /** The global accent/theme color applied across the SDK UI. */
  themeColor = 'null'; //No I18N
  /** Appearance customization for the chat launcher (the floating launcher button and its unread badge). */
  Launcher = new SIQLauncherTheme();
  /** Appearance customization for the tab bar (background and active/inactive tab colors). */
  TabBar = new SIQTabBarTheme();
  /** Appearance customization for the navigation bar (background, title, and tint colors). */
  Navigation = new SIQNavigationTheme();
  /** Appearance customization for the empty-state view (background, text, and start-chat button). */
  EmptyView = new SIQEmptyViewTheme();
  /** Appearance customization for the offline banner shown when the brand is offline. */
  OfflineBanner = new SIQOfflineBannerTheme();
  /** Appearance customization for the no-network / waiting-for-network banner. */
  NetworkWaitingBanner = new SIQNoNetworkBannnerTheme();
  /** Appearance customization for the conversations list (background and list items). */
  Conversation = new SIQConversationTheme();
  /** Appearance customization for the FAQ / articles screens (header, list items, and article view). */
  FAQ = new SIQFAQTheme();
  /** Appearance customization for the chat window (messages, banners, input, attachments, etc.). */
  Chat = new SIQChatWindowTheme();
  /** Appearance customization for the pre-chat / offline form (fields, buttons, and checkboxes). */
  Form = new SIQChatFormTheme();
  /** Appearance customization for the feedback screen (text, skip/submit buttons, and input field). */
  Feedback = new SIQFeedbackTheme();
  /** Appearance customization for the in-app notification banner (title, subtitle, background, and corners). */
  InAppNotification = new SIQInAppNotificationTheme();
}
