#import <Mobilisten/Mobilisten.h>

#if __has_include("RCTEventEmitter.h")
#import "RCTEventEmitter.h"
#else
#import <React/RCTEventEmitter.h>
#endif

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RNZohoSalesIQ : RCTEventEmitter <RCTBridgeModule, ZohoSalesIQDelegate, ZohoSalesIQChatDelegate, ZohoSalesIQFAQDelegate, ZohoSalesIQKnowledgeBaseDelegate>

@property (nonatomic, strong) NSMutableDictionary *remoteNotificationCallbacks;

typedef void (^RNZohoSalesIQRemoteNotificationCallback)(UIBackgroundFetchResult result);


+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice  isProductionMode:(BOOL)isProductionMode __attribute__ ((deprecated("This method is deprecated. Use [RNZSIQNotifications enablePush] instead.")));
+ (void)processNotificationWithInfo: (NSDictionary *) info __attribute__ ((deprecated("This method is deprecated. Use [RNZSIQNotifications processNotificationWithInfo] instead.")));
+ (BOOL)isMobilistenNotification:(NSDictionary *)info __attribute__ ((deprecated("This method is deprecated. Use [RNZSIQNotifications isMobilistenNotification] instead.")));
+ (void)handleNotificationAction: (NSDictionary *) info response:(NSString *) response __attribute__ ((deprecated("This method is deprecated. Use [RNZSIQNotifications handleNotificationAction] instead.")));
+ (NSMutableDictionary *)getFAQCategoryObject: (SIQFAQCategory*) category;
+ (NSMutableDictionary *)getFAQArticleObject: (SIQFAQArticle*) article;
+ (NSMutableDictionary *)getChatObject: (SIQVisitorChat*) chat;
+ (void)didReceiveNotification:(NSDictionary *)notification fetchCompletionHandler:(RNZohoSalesIQRemoteNotificationCallback)completionHandler __attribute__ ((deprecated("This method is deprecated. Use [RNZSIQNotifications didReceiveNotification] instead.")));
@end
