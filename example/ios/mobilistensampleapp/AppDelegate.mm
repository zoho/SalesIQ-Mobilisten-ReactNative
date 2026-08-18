#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <ReactAppDependencyProvider/RCTAppDependencyProvider.h>
#import <PushKit/PushKit.h>
// Firebase is used only by the 'js' push flow (@react-native-firebase/messaging). Because the sample links
// Firebase as a static framework ($RNFirebaseAsStaticFramework in the Podfile), rnfirebase's automatic iOS
// initialization does NOT run — so the default FIRApp must be configured explicitly (see didFinishLaunching).
#import <FirebaseCore/FirebaseCore.h>
// ObjC VoIP entry point exposed by the mobilisten-calls plugin (mirrors <RNZSIQNotifications.h> for
// push) — forwards VoIP push credentials/payloads to the Calls SDK.
#import <RNZSIQCallsNotifications.h>

// PKPushRegistryDelegate lets AppDelegate receive VoIP (PushKit) credentials + payloads for
// incoming SalesIQ calls. Requires the "voip" UIBackgroundMode + the Push Notifications capability.
@interface AppDelegate () <PKPushRegistryDelegate>
@end

// The VoIP registry must be retained for the app's lifetime, so keep a strong file-scope reference.
static PKPushRegistry *sVoIPRegistry;

// Push integration mode, read from the `SIQPushMode` Info.plist key (native | js); defaults to native.
// In 'native' mode the AppDelegate forwards incoming chat messages/taps to the SDK. In 'js' mode the
// JS layer (@react-native-firebase/messaging → ZohoSalesIQ.Notification.process) handles them instead,
// so we skip the native chat-forwarding here to avoid double-processing. Keep this in sync with
// example/config/push.ts (PUSH_MODE) and the Android product flavor. Token registration and VoIP always
// run natively regardless of mode.
static BOOL SIQNativePushMode(void) {
  NSString *mode = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"SIQPushMode"];
  return mode == nil || [mode caseInsensitiveCompare:@"js"] != NSOrderedSame;
}

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // 'js' push mode uses @react-native-firebase, which needs the default FIRApp configured. With static
  // frameworks rnfirebase can't auto-init, so do it here (requires GoogleService-Info.plist in the bundle).
  // Skipped in 'native' mode — that path never touches Firebase.
  NSLog(@"[SIQ-Push] App launching. Push mode = %@", SIQNativePushMode() ? @"native" : @"js");
  if (!SIQNativePushMode() && [FIRApp defaultApp] == nil) {
    [FIRApp configure];
    NSLog(@"[SIQ-Push] Firebase [FIRApp configure] done (js mode) — default app: %@", [FIRApp defaultApp] ? @"created" : @"still nil!");
  }

  self.moduleName = @"mobilistensampleapp";
  // Provides the autolinked third-party module/component registry required by the
  // New Architecture (RN 0.86). Must be set before -[super application:...].
  self.dependencyProvider = [RCTAppDependencyProvider new];
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
  NSDictionary *launchNotification = launchOptions[@"UIApplicationLaunchOptionsRemoteNotificationKey"];
  if (launchNotification != nil) {
    NSLog(@"[SIQ-Push] App launched from a remote notification. userInfo=%@", launchNotification);
  }
  // iOS push is always handled natively (SalesIQ delivers over APNs, which never reaches the JS layer),
  // so process regardless of SIQPushMode. The JS `Notification.process` is a no-op on iOS.
  if (launchNotification != nil) {
    [RNZSIQNotifications processNotificationWithInfo:launchNotification];
  }

  // Register for VoIP (PushKit) pushes so an incoming SalesIQ call can wake the app even when it's
  // backgrounded/terminated. The token is forwarded to the Calls SDK in the didUpdatePushCredentials
  // delegate callback below.
  sVoIPRegistry = [[PKPushRegistry alloc] initWithQueue:dispatch_get_main_queue()];
  sVoIPRegistry.delegate = self;
  sVoIPRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  const unsigned char *dataBuffer = (const unsigned char *)[deviceToken bytes];
  NSUInteger dataLength  = [deviceToken length];
  NSMutableString *token = [NSMutableString stringWithCapacity:(dataLength * 2)];
  
  for (NSUInteger i = 0; i < dataLength; ++i) {
    [token appendFormat:@"%02X", dataBuffer[i]];
  }

  NSLog(@"[SIQ-Push] APNs device token received (mode=%@): %@", SIQNativePushMode() ? @"native" : @"js", token);
  [RNZSIQNotifications enablePush:token isTestDevice:YES isProductionMode:NO];
  NSLog(@"[SIQ-Push] enablePush called with APNs token (native chat registration).");
  /*
   Note: isTestDevice is set to be as YES if device is being registered as a test device in sandbox mode.
   */
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  if (@available(iOS 10.0, *)) {
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    NSLog(@"[SIQ-Push] Notification tapped (action=%@). userInfo=%@", response.actionIdentifier, userInfo);
    // Handled natively regardless of SIQPushMode (iOS push never reaches JS).
    if ([RNZSIQNotifications isMobilistenNotification:userInfo]) {
      if ([response.actionIdentifier isEqualToString: @"Reply"]) {
        NSString *reply = ((UNTextInputNotificationResponse *)response).userText;
        NSLog(@"[SIQ-Push] SalesIQ notification — inline Reply: %@", reply);
        [RNZSIQNotifications handleNotificationAction:userInfo response:reply];
      }
      else if([response.actionIdentifier isEqualToString: UNNotificationDefaultActionIdentifier]){
        NSLog(@"[SIQ-Push] SalesIQ notification — default open → processNotificationWithInfo.");
        [RNZSIQNotifications processNotificationWithInfo:userInfo];      }
    }
  }
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  NSLog(@"[SIQ-Push] didReceiveRemoteNotification. userInfo=%@", userInfo);
  [RNZSIQNotifications processNotificationWithInfo:userInfo];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  NSLog(@"[SIQ-Push] didReceiveRemoteNotification:fetchCompletionHandler: (background). userInfo=%@", userInfo);
  completionHandler(UIBackgroundFetchResultNoData);
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  NSLog(@"[SIQ-Push] didReceiveLocalNotification. userInfo=%@", notification.userInfo);
  [RNZSIQNotifications processNotificationWithInfo:notification.userInfo];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
  NSLog(@"[SIQ-Push] willPresentNotification (foreground). userInfo=%@", notification.request.content.userInfo);
  [RNZSIQNotifications processNotificationWithInfo:notification.request.content.userInfo];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"[SIQ-Push] Failed to register for remote (APNs) notifications: %@", error);
}

#pragma mark - VoIP (PushKit)

// The VoIP push token was issued/updated — hand it to the Calls SDK so the backend can route
// incoming calls to this device. isProductionMode:NO uses the APNs sandbox; flip it for release.
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
  if (![type isEqualToString:PKPushTypeVoIP]) { return; }
  const unsigned char *bytes = (const unsigned char *)credentials.token.bytes;
  NSMutableString *token = [NSMutableString stringWithCapacity:credentials.token.length * 2];
  for (NSUInteger i = 0; i < credentials.token.length; i++) { [token appendFormat:@"%02x", bytes[i]]; }
  NSLog(@"[SIQ-Push] VoIP (PushKit) token received: %@", token);
  [RNZSIQCallsNotifications enableVoIP:token isTestDevice:YES isProductionMode:NO];
  NSLog(@"[SIQ-Push] enableVoIP called with PushKit token (calls registration).");
}

// An incoming VoIP push arrived — forward the payload to the Calls SDK, which presents the call
// (CallKit) and invokes the completion handler once handled.
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
  NSLog(@"[SIQ-Push] Incoming VoIP push received. payload=%@", payload.dictionaryPayload);
  [RNZSIQCallsNotifications handleVoIPNotificationAction:payload.dictionaryPayload completion:completion];
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  return [self getBundleURL];
}

// RN 0.86's RCTAppDelegate (RCTReactNativeFactory) requires this override to locate the JS bundle
// (Metro in DEBUG, the packaged main.jsbundle in release). Without it the app throws
// 'RCTAppDelegate::bundleURL not implemented' at launch.
- (NSURL *)bundleURL {
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
