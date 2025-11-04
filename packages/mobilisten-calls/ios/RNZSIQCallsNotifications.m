//
//  RNZSIQCallsNotifications.m
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/08/25.
//

#import "RNZSIQCallsNotifications.h"

@implementation RNZSIQCallsNotifications

+ (void)enableVoIP:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode {
    if (isProductionMode) {
       [ZohoSalesIQCalls enableVoIP:token isTestDevice:isTestDevice mode:APNSModeProduction];
    } else {
       [ZohoSalesIQCalls enableVoIP:token isTestDevice:isTestDevice mode:APNSModeSandbox];
    }
}

+ (void)handleVoIPNotificationAction:(NSDictionary *)info completion:(void (^)(void))completion {
   [ZohoSalesIQCalls handleVOIPNotificationAction:info completion:completion];
}

@end
