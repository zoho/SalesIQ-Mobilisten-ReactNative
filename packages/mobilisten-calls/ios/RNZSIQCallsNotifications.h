//
//  RNZSIQCallsNotifications.h
//  RNZohoSalesIQ
//
//  Created by Kishore Kumar A on 17/08/25.
//

#import <Foundation/Foundation.h>
#import <MobilistenCalls/MobilistenCalls.h>
#import <MobilistenCore/MobilistenCore.h>
NS_ASSUME_NONNULL_BEGIN

@interface RNZSIQCallsNotifications : NSObject

+ (void)enableVoIP:(NSString *)token isTestDevice:(BOOL)isTestDevice isProductionMode:(BOOL)isProductionMode;

+ (void)handleVoIPNotificationAction:(NSDictionary *)info completion:(void (^)(void))completion;

@end

NS_ASSUME_NONNULL_END
