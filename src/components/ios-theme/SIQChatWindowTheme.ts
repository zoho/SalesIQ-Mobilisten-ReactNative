import { SIQAttachmentSheetTheme } from "./SIQAttachmentSheetTheme";
import { SIQBannerTheme } from "./SIQBannerTheme";
import { SIQChatInputTheme } from "./SIQChatInputTheme";
import { SIQChatScrollButtonTheme } from "./SIQChatScrollButtonTheme";
import { SIQEmailTranscriptTheme } from "./SIQEmailTranscriptTheme";
import { SIQHandOffBannerTheme } from "./SIQHandOffBannerTheme";
import { SIQLogViewTheme } from "./SIQLogViewTheme";
import { SIQMessageTheme } from "./SIQMessageTheme";
import { SIQQueueBannerTheme } from "./SIQQueueBannerTheme";

export class SIQChatWindowTheme {
    backgroundColor = "null";
    Message = new SIQMessageTheme();
    HandOffBanner = new SIQHandOffBannerTheme();
    Banner = new SIQBannerTheme();
    QueueBanner = new SIQQueueBannerTheme();
    Input = new SIQChatInputTheme();
    AttachmentsSheet = new SIQAttachmentSheetTheme();
    ScrollButton = new SIQChatScrollButtonTheme();
    EmailTranscript = new SIQEmailTranscriptTheme();
    DebugLog = new SIQLogViewTheme();
}