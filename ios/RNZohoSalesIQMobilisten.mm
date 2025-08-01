//
//  RNZohoSalesIQMobilisten.m
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 29/01/25.
//
//

#import "RNZohoSalesIQMobilisten.h"

@interface RCT_EXTERN_MODULE(RNZohoSalesIQMobilisten, RCTEventEmitter)

RCT_EXTERN_METHOD(init:(NSString *)appKey accessKey:(NSString *)accessKey);
RCT_EXTERN_METHOD(initWithCallback:(NSString *)appKey accessKey:(NSString *)accessKey initCallback:(RCTResponseSenderBlock)initCallback);
RCT_EXTERN_METHOD(categorizeKnowledgeBase:(NSString *)type shouldCategorize:(BOOL)shouldCategorize);
RCT_EXTERN_METHOD(clearLogsForiOS);
RCT_EXTERN_METHOD(combineKnowledgeBaseDepartments:(NSString *)type merge:(BOOL)merge);
RCT_EXTERN_METHOD(completeChatAction:(NSString *)uuid);
RCT_EXTERN_METHOD(completeChatActionWithMessage:(NSString *)uuid success:(BOOL)success message:(NSString *)message);
RCT_EXTERN_METHOD(disableInAppNotification);
RCT_EXTERN_METHOD(disablePreChatForms);
RCT_EXTERN_METHOD(disableScreenshotOption);
RCT_EXTERN_METHOD(dismissUI);
RCT_EXTERN_METHOD(enableDragToDismiss:(BOOL)enabled);
RCT_EXTERN_METHOD(enableInAppNotification);
RCT_EXTERN_METHOD(enablePreChatForms);
RCT_EXTERN_METHOD(enableScreenshotOption);
RCT_EXTERN_METHOD(endChat:(NSString *)chatId);
RCT_EXTERN_METHOD(fetchAttenderImage:(NSString *)attenderId defaultImage:(BOOL)defaultImage imageCallback:(RCTResponseSenderBlock)imageCallback);
RCT_EXTERN_METHOD(getArticles:(RCTResponseSenderBlock)articlesCallback);
RCT_EXTERN_METHOD(getArticlesWithCategoryID:(NSString *)categoryId articlesCallback:(RCTResponseSenderBlock)articlesCallback);
RCT_EXTERN_METHOD(getCategories:(RCTResponseSenderBlock)categoryCallback);
RCT_EXTERN_METHOD(getChat:(NSString *)chatId callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(getChatUnreadCount:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(getChats:(RCTResponseSenderBlock)listCallback);
RCT_EXTERN_METHOD(getChatsWithFilter:(NSString *)filter listCallback:(RCTResponseSenderBlock)listCallback);
RCT_EXTERN_METHOD(getDepartments:(RCTResponseSenderBlock)departmentCallback);
RCT_EXTERN_METHOD(getKnowledgeBaseCategories:(NSString *)type departmentID:(NSString *)departmentID parentCategoryID:(NSString *)parentCategoryID callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(getKnowledgeBaseResourceDepartments:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(getKnowledgeBaseResources:(NSString *)type departmentID:(nullable NSString *)departmentID parentCategoryID:(nullable NSString *)parentCategoryID page:(double)page limit:(double)limit searchKey:(nullable NSString *)searchKey callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(getKnowledgeBaseSingleResource:(NSString *)type id:(NSString *)id callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(getNotificationPayload:(NSDictionary *)readableMap callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(hideQueueTime:(BOOL)hide);
RCT_EXTERN_METHOD(isChatEnabled:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(isKnowledgeBaseEnabled:(NSString *)type callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(isLoggerEnabled:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(isMultipleOpenChatRestricted:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(isSDKMessage:(NSDictionary *)map callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(openArticle:(NSString *)id articlesCallback:(RCTResponseSenderBlock)articlesCallback);
RCT_EXTERN_METHOD(openChat);

RCT_EXTERN_METHOD(openChatWithID:(NSString *)chatId);
RCT_EXTERN_METHOD(openKnowledgeBase:(NSString *)type id:(NSString *)id callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(performCustomAction:(NSString *)actionName shouldOpenChatWindow:(BOOL)shouldOpenChatWindow);
RCT_EXTERN_METHOD(present:(NSString *)tabString id:(NSString *)id callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(printDebugLogsForAndroid:(BOOL)value);
RCT_EXTERN_METHOD(processNotificationMessage:(NSDictionary *)extras);
RCT_EXTERN_METHOD(refreshLauncher);
RCT_EXTERN_METHOD(refreshLauncherPropertiesForAndroid);
RCT_EXTERN_METHOD(registerChatAction:(NSString *)actionName);
RCT_EXTERN_METHOD(registerPush:(NSString *)fcmToken isTestDevice:(BOOL)isTestDevice);
RCT_EXTERN_METHOD(registerVisitor:(NSString *)uniqueId callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(sendEvent:(NSString *)event objects:(NSArray *)objects);
RCT_EXTERN_METHOD(setChatActionTimeout:(double)timeout);
RCT_EXTERN_METHOD(setChatComponentVisibility:(NSString *)chatComponentName visibility:(BOOL)visibility);

RCT_EXTERN_METHOD(setChatTitle:(NSString *)title);
RCT_EXTERN_METHOD(setChatWaitingTime:(double)seconds);
RCT_EXTERN_METHOD(setConversationListTitle:(NSString *)title);
RCT_EXTERN_METHOD(setConversationVisibility:(BOOL)visible);
RCT_EXTERN_METHOD(setCustomAction:(NSString *)actionName);
RCT_EXTERN_METHOD(setCustomFont:(NSDictionary *)map);
RCT_EXTERN_METHOD(setDepartment:(NSString *)department);
RCT_EXTERN_METHOD(setDepartments:(NSArray *)department);
RCT_EXTERN_METHOD(setFAQVisibility:(BOOL)visible);
RCT_EXTERN_METHOD(setFeedbackVisibility:(BOOL)visible);
RCT_EXTERN_METHOD(setKnowledgeBaseRecentlyViewedCount:(double)limit);
RCT_EXTERN_METHOD(setKnowledgeBaseVisibility:(NSString *)type shouldShow:(BOOL)shouldShow);
RCT_EXTERN_METHOD(setLanguage:(NSString *)code);
RCT_EXTERN_METHOD(setLauncherPropertiesForAndroid:(NSDictionary *)launcherPropertiesMap);
RCT_EXTERN_METHOD(setLauncherVisibility:(BOOL)visible);
RCT_EXTERN_METHOD(setLoggerEnabled:(BOOL)value);
RCT_EXTERN_METHOD(setLoggerPathForiOS:(NSString *)value);
RCT_EXTERN_METHOD(setMinimumPressDuration:(double)duration);

RCT_EXTERN_METHOD(setNotificationActionSource:(NSString *)actionSource);
RCT_EXTERN_METHOD(setNotificationIconForAndroid:(NSString *)drawableName);
RCT_EXTERN_METHOD(setOperatorEmail:(NSString *)email);
RCT_EXTERN_METHOD(setPageTitle:(NSString *)title);
RCT_EXTERN_METHOD(setQuestion:(NSString *)question);
RCT_EXTERN_METHOD(setRatingVisibility:(BOOL)visible);
RCT_EXTERN_METHOD(setTabOrder:(NSArray *)tabNames);
RCT_EXTERN_METHOD(setThemeColor:(NSDictionary *)theme);
RCT_EXTERN_METHOD(setThemeColorforiOS:(NSString *)colorCode);
RCT_EXTERN_METHOD(setThemeForAndroid:(NSString *)name);
RCT_EXTERN_METHOD(setVisibilityModeToCustomLauncher:(NSString *)mode);
RCT_EXTERN_METHOD(setVisitorAddInfo:(NSString *)key value:(NSString *)value);
RCT_EXTERN_METHOD(setVisitorContactNumber:(NSString *)number);
RCT_EXTERN_METHOD(setVisitorEmail:(NSString *)email);
RCT_EXTERN_METHOD(setVisitorLocation:(NSDictionary *)visitorLocation);
RCT_EXTERN_METHOD(setVisitorName:(NSString *)name);
RCT_EXTERN_METHOD(setVisitorNameVisibility:(BOOL)visibility);
RCT_EXTERN_METHOD(shouldOpenUrl:(BOOL)value);
RCT_EXTERN_METHOD(showFeedbackAfterSkip:(BOOL)enable);
RCT_EXTERN_METHOD(showFeedbackUpToDuration:(double)duration);
RCT_EXTERN_METHOD(showLauncher:(NSString *)mode);
RCT_EXTERN_METHOD(showOfflineMessage:(BOOL)show);

RCT_EXTERN_METHOD(showOperatorImageInChat:(BOOL)visible);
RCT_EXTERN_METHOD(showOperatorImageInLauncher:(BOOL)show);
RCT_EXTERN_METHOD(showPayloadChat:(NSDictionary *)result);
RCT_EXTERN_METHOD(startChat:(NSString *)question);
RCT_EXTERN_METHOD(startNewChat:(NSString *)question customChatId:(NSString *)customChatId departmentName:(NSString *)departmentName callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(startNewChatWithTrigger:(NSString *)customChatId departmentName:(NSString *)departmentName callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(syncThemeWithOsForAndroid:(BOOL)sync);
RCT_EXTERN_METHOD(unregisterAllChatActions);
RCT_EXTERN_METHOD(unregisterChatAction:(NSString *)actionName);
RCT_EXTERN_METHOD(unregisterVisitor:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(updateListener:(NSString *)listener);
RCT_EXTERN_METHOD(writeLogForiOS:(NSString *)message logLevel:(NSString *)logLevel callback:(RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(registerLocalizationFile:(NSString *)name);
RCT_EXTERN_METHOD(reRegisterPush);
RCT_EXTERN_METHOD(updateConfiguration:(NSString*) key value:(BOOL)value)

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNZohoSalesIQSpecJSI>(params);
}
#endif

@end
