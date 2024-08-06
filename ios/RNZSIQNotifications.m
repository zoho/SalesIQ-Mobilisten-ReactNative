//
//  RNZSIQNotifications.m
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/06/24.
//

#import "RNZSIQNotifications.h"
#import "RNZohoSalesIQ.h"

@implementation RNZSIQNotifications

+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode {
    [RNZohoSalesIQ enablePush:token isTestDevice:isTestDevice isProductionMode:isProductionMode];
}

+ (void)processNotificationWithInfo:(NSDictionary *)info {
    [RNZohoSalesIQ processNotificationWithInfo:info];
}

+ (BOOL)isMobilistenNotification:(NSDictionary *)info {
    return [RNZohoSalesIQ isMobilistenNotification:info];
}

+ (void)handleNotificationAction:(NSDictionary *)info response:(NSString *)response {
    [RNZohoSalesIQ handleNotificationAction:info response:response];
}

+ (void)didReceiveNotification:(NSDictionary *)notification fetchCompletionHandler:(RNZohoSalesIQRemoteNotificationCallback)completionHandler {
    [RNZohoSalesIQ didReceiveNotification:notification fetchCompletionHandler:completionHandler];
}

@end
