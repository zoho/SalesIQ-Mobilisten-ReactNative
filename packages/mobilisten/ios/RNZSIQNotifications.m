//
//  RNZSIQNotifications.m
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/06/24.
//

#import "RNZSIQNotifications.h"

@implementation RNZSIQNotifications

+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode {

    if (isProductionMode) {
        [ZohoSalesIQ enablePush:token isTestDevice:isTestDevice mode: APNSModeProduction];
    } else {
        [ZohoSalesIQ enablePush:token isTestDevice:isTestDevice mode: APNSModeSandbox];
    }
}

+ (void)processNotificationWithInfo:(NSDictionary *)info {
    [ZohoSalesIQ processNotificationWithInfo:info];
}

+ (BOOL)isMobilistenNotification:(NSDictionary *)info {
    return [ZohoSalesIQ isMobilistenNotification:info];
}

+ (void)handleNotificationAction:(NSDictionary *)info response:(NSString *)response {
    [ZohoSalesIQ handleNotificationAction:info response:response];
}

+ (void)handlePushNotificationActionWithActionIdentifier:(NSString * _Nullable)actionIdentifier
                                                 userInfo:(NSDictionary *)userInfo
                                             responseText:(NSString * _Nullable)responseText
                                                completion:(void(^)(void))completion
{
    [ZohoSalesIQ handlePushNotificationActionWithActionIdentifier:actionIdentifier
                                                          userInfo:userInfo
                                                      responseText:responseText
                                                         completion:completion];
}

@end
