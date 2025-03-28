//
//  RNZSIQNotifications.h
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/06/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RNZSIQNotifications : NSObject

typedef void (^RNZohoSalesIQRemoteNotificationCallback)(UIBackgroundFetchResult result);

+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode;
+ (void)processNotificationWithInfo: (NSDictionary *) info;
+ (BOOL)isMobilistenNotification:(NSDictionary *)info;
+ (void)handleNotificationAction: (NSDictionary *) info response:(NSString *) response;

@end

NS_ASSUME_NONNULL_END
