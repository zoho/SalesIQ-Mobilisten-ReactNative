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

@interface RNZohoSalesIQ : RCTEventEmitter <RCTBridgeModule, ZohoSalesIQDelegate, ZohoSalesIQChatDelegate, ZohoSalesIQFAQDelegate>

+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode;
+ (void)processNotificationWithInfo: (NSDictionary *) info;
+ (BOOL)isMobilistenNotification:(NSDictionary *)info;
+ (void)handleNotificationAction: (NSDictionary *) info response:(NSString *) response;
+ (NSMutableDictionary *)getFAQCategoryObject: (SIQFAQCategory*) category;
+ (NSMutableDictionary *)getFAQArticleObject: (SIQFAQArticle*) article;
+ (NSMutableDictionary *)getChatObject: (SIQVisitorChat*) chat;

@end
