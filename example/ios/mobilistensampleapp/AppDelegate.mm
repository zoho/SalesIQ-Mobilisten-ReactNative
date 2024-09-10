#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  self.moduleName = @"mobilistensampleapp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  if (@available(iOS 10.0, *)) {
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    [center requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
       center.delegate = self;
      if (granted){
        dispatch_async(dispatch_get_main_queue(), ^{
          UNNotificationCategoryOptions categoryOptions = UNNotificationCategoryOptionNone;
          UNTextInputNotificationAction *reply = [UNTextInputNotificationAction actionWithIdentifier:@"Reply" title:@"Reply" options:UNNotificationActionOptionNone textInputButtonTitle:@"Send" textInputPlaceholder:@"Message"];
          UNNotificationCategory *chatGrpMsgCategory_10 = [UNNotificationCategory categoryWithIdentifier:@"GRPCHATMSG" actions:@[reply] intentIdentifiers:@[] options:categoryOptions];
          [[UNUserNotificationCenter currentNotificationCenter] setNotificationCategories:[NSSet setWithObjects:chatGrpMsgCategory_10,chatGrpMsgCategory_10, nil]];
          [application registerForRemoteNotifications];
        });
      }
    }];
  } else {
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound) categories:nil];
    [application registerUserNotificationSettings:settings];
  }
  if(launchOptions[@"UIApplicationLaunchOptionsRemoteNotificationKey"] != nil){
    NSDictionary *notificationData = launchOptions[@"UIApplicationLaunchOptionsRemoteNotificationKey"];
    if(notificationData != nil){
      [RNZSIQNotifications processNotificationWithInfo:notificationData];
    }
  }
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  const unsigned char *dataBuffer = (const unsigned char *)[deviceToken bytes];
  NSUInteger dataLength  = [deviceToken length];
  NSMutableString *token = [NSMutableString stringWithCapacity:(dataLength * 2)];
  
  for (NSUInteger i = 0; i < dataLength; ++i) {
    [token appendFormat:@"%02X", dataBuffer[i]];
  }
  
  [RNZSIQNotifications enablePush:token isTestDevice:YES isProductionMode:NO];
  /*
   Note: isTestDevice is set to be as YES if device is being registered as a test device in sandbox mode.
   */
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  if (@available(iOS 10.0, *)) {
    NSLog(@"didReceiveNotificationResponse");
    if ([RNZSIQNotifications isMobilistenNotification:response.notification.request.content.userInfo]) {
      if ([response.actionIdentifier isEqualToString: @"Reply"]) {
        [RNZSIQNotifications handleNotificationAction:response.notification.request.content.userInfo response:((UNTextInputNotificationResponse *)response).userText];
      }
      else if([response.actionIdentifier isEqualToString: UNNotificationDefaultActionIdentifier]){
        [RNZSIQNotifications processNotificationWithInfo:response.notification.request.content.userInfo];      }
    }
    
  }
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [RNZSIQNotifications processNotificationWithInfo:userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [RNZSIQNotifications processNotificationWithInfo:notification.userInfo];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  [RNZSIQNotifications processNotificationWithInfo:notification.request.content.userInfo];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  return [self getBundleURL];
}

- (NSURL *)getBundleURL {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
