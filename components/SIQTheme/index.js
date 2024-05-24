import { SIQChatFormTheme } from "./SIQChatFormTheme";
import { SIQChatWindowTheme } from "./SIQChatWindowTheme";
import { SIQConversationTheme } from "./SIQConversationTheme";
import { SIQEmptyViewTheme } from "./SIQEmptyViewTheme";
import { SIQFAQTheme } from "./SIQFAQTheme";
import { SIQFeedbackTheme } from "./SIQFeedbackTheme";
import { SIQInAppNotificationTheme } from "./SIQInAppNotificationTheme";
import { SIQLauncherTheme } from "./SIQLauncherTheme";
import { SIQNavigationTheme } from "./SIQNavigationTheme";
import { SIQNoNetworkBannnerTheme } from "./SIQNoNetworkBannnerTheme";
import { SIQOfflineBannerTheme } from "./SIQOfflineBannerTheme";
import { SIQTabBarTheme } from "./SIQTabBarTheme";

class SIQTheme {
    themeColor = "null"; //No I18N
    Launcher = new SIQLauncherTheme();
    TabBar = new SIQTabBarTheme();;
    Navigation = new SIQNavigationTheme();
    EmptyView = new SIQEmptyViewTheme();
    OfflineBanner = new SIQOfflineBannerTheme();
    NetworkWaitingBanner = new SIQNoNetworkBannnerTheme();
    Conversation = new SIQConversationTheme();
    FAQ = new SIQFAQTheme();
    Chat = new SIQChatWindowTheme();
    Form = new SIQChatFormTheme();
    Feedback = new SIQFeedbackTheme();
    InAppNotification = new SIQInAppNotificationTheme();
}

export default SIQTheme
