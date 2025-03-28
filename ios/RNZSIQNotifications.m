//
//  RNZSIQNotifications.m
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/06/24.
//

#import "RNZSIQNotifications.h"
#import "RNZohoSalesIQ-Swift.h"

@implementation RNZSIQNotifications

+ (void)enablePush:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode {
    [RNZSIQNotificationService enablePush:token isTestDevice:isTestDevice isProductionMode:isProductionMode
    ];
}

+ (void)processNotificationWithInfo:(NSDictionary *)info {
    [RNZSIQNotificationService processNotificationWithInfo:info];
}

+ (BOOL)isMobilistenNotification:(NSDictionary *)info {
    return [RNZSIQNotificationService isMobilistenNotification:info];
}

+ (void)handleNotificationAction:(NSDictionary *)info response:(NSString *)response {
    [RNZSIQNotificationService handleNotificationAction:info response:response];
}

@end
