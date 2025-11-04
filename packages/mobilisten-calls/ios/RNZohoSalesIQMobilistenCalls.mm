//
//  RNZohoSalesIQMobilistenCalls.m
//  RNZohoSalesIQ
//
//  Created by venkat-12517 on 29/01/25.
//
//

#import "RNZohoSalesIQMobilistenCalls.h"

@interface RCT_EXTERN_MODULE (RNZohoSalesIQMobilistenCalls, RCTEventEmitter)

RCT_EXTERN_METHOD(initialiseForiOS);

RCT_EXTERN_METHOD(isEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getCurrentCallId:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(getCurrentCallState:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);

RCT_EXTERN_METHOD(enterFullScreenMode);

RCT_EXTERN_METHOD(enterFloatingViewMode);

RCT_EXTERN_METHOD(setTitle:(NSString *)online offline:(NSString *)offline);

RCT_EXTERN_METHOD(setVisibility:(NSString *)component visible:(BOOL)visible);

RCT_EXTERN_METHOD(end:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getList:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(start:(NSString *)id displayActiveCall:(BOOL)displayActiveCall attributes:(NSDictionary *)attributes resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(setCallKitIcon:(NSString *)icon);

RCT_EXTERN_METHOD(setAndroidReplyMessages:(NSArray<NSString *> *)messages);


#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeRNZohoSalesIQCallsSpecJSI>(params);
}
#endif

@end
