#import <React/RCTBridgeModule.h>
#import <UserNotifications/UserNotifications.h>

// Small app-local native module: reports the iOS notification authorization status to JS so the
// Notifications screen can show a "notifications are off" warning + an Open-Settings button. There is no
// built-in React Native API for this on iOS (unlike Android's PermissionsAndroid.check), so we read
// UNUserNotificationCenter here. Not part of the SalesIQ SDK — purely a sample-app helper.
@interface NotificationPermission : NSObject <RCTBridgeModule>
@end

@implementation NotificationPermission

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return NO;
}

// Resolves one of: "authorized" | "provisional" | "ephemeral" | "denied" | "notDetermined" | "unknown".
RCT_EXPORT_METHOD(getStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  [[UNUserNotificationCenter currentNotificationCenter]
      getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings *_Nonnull settings) {
        NSString *status;
        switch (settings.authorizationStatus) {
          case UNAuthorizationStatusAuthorized:
            status = @"authorized";
            break;
          case UNAuthorizationStatusProvisional:
            status = @"provisional";
            break;
          case UNAuthorizationStatusDenied:
            status = @"denied";
            break;
          case UNAuthorizationStatusNotDetermined:
            status = @"notDetermined";
            break;
          default:
            // .ephemeral (App Clips) and any future cases.
            status = (settings.authorizationStatus == UNAuthorizationStatusEphemeral)
                         ? @"ephemeral"
                         : @"unknown";
            break;
        }
        resolve(status);
      }];
}

@end
