
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif


@interface RNZohoSalesIQ : NSObject <RCTBridgeModule>

+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode;
+ (void)processNotificationWithInfo: (NSDictionary *) info;
+ (BOOL)isMobilistenNotification:(NSDictionary *)info;
+ (void)handleNotificationAction: (NSDictionary *) info response:(NSString *) response;
@end
