import { SIQProgressButtonTheme } from "./SIQProgressButtonTheme";
import { SIQReplyViewTheme } from "./SIQReplyViewTheme";

export class SIQMessageCommonTheme {
    botTypingIndicatorStyle: number | null = null; // Int
    messageSenderNameColor = "null";
    outgoingBackgroundColor = "null";
    outgoingTextColor = "null";
    outgoingBorderColor = "null";
    outgoingTimeTextColor = "null";
    outgoingTimeIconColor = "null";
    incomingBackgroundColor = "null";
    incomingTextColor = "null";
    incomingBorderColor = "null";
    incomingTimeTextColor = "null";
    incomingTimeIconColor = "null";
    incomingTextTimeColor = "null";
    outgoingTextTimeColor = "null";
    messageStatusIconColor = "null";
    incomingMessageEditedTagColor = "null";
    outgoingMessageEditedTagColor = "null";
    incomingMessageTimeStampColor = "null";
    outgoingMessageTimeStampColor = "null";
    incomingDeletedMessageColor = "null";
    outgoingDeletedMessageColor = "null";
    deletingMessageTitleColor = "null";
    deliveryStatusIconColor = "null";
    repliedMessageHighLightColor = "null";
    incomingMessageReplyIconColor = "null";
    outgoingMessageReplyIconColor = "null";
    incomingProgressButton = new SIQProgressButtonTheme();
    outgoingProgressButton = new SIQProgressButtonTheme();
    outgoingRepliedMessage = new SIQReplyViewTheme();
    incomingRepliedMessage = new SIQReplyViewTheme();
}