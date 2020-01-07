#import "RNZohoSalesIQ.h"
#import <Mobilisten/Mobilisten.h>

@implementation RNZohoSalesIQ

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (void)enablePush: (NSMutableString *)token isTestDevice:(BOOL) isTestDevice isProductionMode:(BOOL)isProductionMode
{
    if(isProductionMode){
        [ZohoSalesIQ enablePush:token isTestDevice:isTestDevice mode:APNSModeProduction];
    }else{
        [ZohoSalesIQ enablePush:token isTestDevice:isTestDevice mode:APNSModeSandbox];
    }
}

+ (void)processNotificationWithInfo: (NSDictionary *) info
{
    [ZohoSalesIQ processNotificationWithInfo:info];
}

+ (BOOL)isMobilistenNotification: (NSDictionary *) info
{
    return [ZohoSalesIQ isMobilistenNotification:info];
}

+ (void)handleNotificationAction: (NSDictionary *) info response:(NSString *) response
{
    [ZohoSalesIQ handleNotificationAction:info response:response];
}


RCT_EXPORT_METHOD(init:(NSString *)appKey accessKey:(NSString *)accessKey)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [ZohoSalesIQ initWithAppKey:appKey accessKey:accessKey completion:nil];
    });
}
RCT_EXPORT_METHOD(setChatTitle: (NSString *)chattitle){
    [[ZohoSalesIQ Chat] setTitle:chattitle];
}
RCT_EXPORT_METHOD(setLanguage: (NSString *)language_code){
    if([language_code isEqualToString:@"en"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageEnglish];
    }else if([language_code isEqualToString:@"fr"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageFrench];
    }else if([language_code isEqualToString:@"de"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageGerman];
    }else if([language_code isEqualToString:@"es"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageSpanish];
    }else if([language_code isEqualToString:@"nl"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageDutch];
    }else if([language_code isEqualToString:@"no"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageNorwegian];
    }else if([language_code isEqualToString:@"tr"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageTurkish];
    }else if([language_code isEqualToString:@"ru"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageRussian];
    }else if([language_code isEqualToString:@"it"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageItalian];
    }else if([language_code isEqualToString:@"pt"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguagePortuguese];
    }else if([language_code isEqualToString:@"ko"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageKorean];
    }else if([language_code isEqualToString:@"ja"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageJapanese];
    }else if([language_code isEqualToString:@"da"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageDanish];
    }else if([language_code isEqualToString:@"pl"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguagePolish];
    }else if([language_code isEqualToString:@"ar"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageArabic];
    }else if([language_code isEqualToString:@"hu"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageHungarian];
    }else if([language_code isEqualToString:@"zh"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageChinese];
    }else if([language_code isEqualToString:@"ha"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageHebrew];
    }else if([language_code isEqualToString:@"ga"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageIrish];
    }else if([language_code isEqualToString:@"ro"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageRomanian];
    }else if([language_code isEqualToString:@"th"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageThai];
    }else if([language_code isEqualToString:@"sv"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageSwedish];
    }else if([language_code isEqualToString:@"el"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageGreek];
    }else if([language_code isEqualToString:@"cs"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageCzech];
    }else if([language_code isEqualToString:@"sk"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageSlovak];
    }else if([language_code isEqualToString:@"sl"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageSlovenian];
    }else if([language_code isEqualToString:@"hr"]){
       [[ZohoSalesIQ Chat] setLanguage:LanguageCroatian];
    }else{
       [[ZohoSalesIQ Chat] setLanguage:LanguageEnglish];
    }
}
RCT_EXPORT_METHOD(setDepartment: (NSString *)department)
{
    [[ZohoSalesIQ Chat] setDepartment:(department)];
}
RCT_EXPORT_METHOD(setOperatorEmail: (NSString *)email){
    [[ZohoSalesIQ Chat] setAgentEmail:email];
}
RCT_EXPORT_METHOD(setThemeColorforAndroid: (NSString *)attribute color_code:(NSString *)color_code){

}
RCT_EXPORT_METHOD(setThemeColorforiOS: (NSString *)color_code){
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:color_code];
    [scanner setScanLocation:1];
    [scanner scanHexInt:&rgbValue];
    UIColor *themeColor = [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
    [[ZohoSalesIQ Chat] setThemeColor: themeColor];
}
RCT_EXPORT_METHOD(showOperatorImageinLauncher: (BOOL)show){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentAgentPhotoOnChatIcon visible:show];
}
RCT_EXPORT_METHOD(openChat){
    [[ZohoSalesIQ Chat] show:true];
}
RCT_EXPORT_METHOD(endChat){
    [[ZohoSalesIQ Chat] endSession];
}
RCT_EXPORT_METHOD(showOperatorImageInChat: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentAgent visible:visibility];
}
RCT_EXPORT_METHOD(setLauncherVisibility : (BOOL)show){
  dispatch_async(dispatch_get_main_queue(), ^{
    [ZohoSalesIQ showLiveChat:show];
  });
}
RCT_EXPORT_METHOD(showOfflineMessage: (BOOL)visibility){
    [[ZohoSalesIQ Chat] showOfflineMessage:visibility];
}
RCT_EXPORT_METHOD(setRatingVisibility: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentRating visible:visibility];
}
RCT_EXPORT_METHOD(setFeedbackVisibility: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentFeedback visible:visibility];
}
RCT_EXPORT_METHOD(setVisitorName: (NSString *)name){
    [[ZohoSalesIQ Visitor] setName:name];
}
RCT_EXPORT_METHOD(setVisitorEmail: (NSString *)email){
    [[ZohoSalesIQ Visitor] setEmail:email];
}
RCT_EXPORT_METHOD(setVisitorContactNumber: (NSString *)number){
    [[ZohoSalesIQ Visitor] setContactNumber:number];
}
RCT_EXPORT_METHOD(setVisitorAddInfo: (NSString *)key value:(NSString *)value){
    [[ZohoSalesIQ Visitor] addInfo:key value:value];
}
RCT_EXPORT_METHOD(setQuestion: (NSString *)question){
    [[ZohoSalesIQ Visitor] setQuestion:question];
}
RCT_EXPORT_METHOD(startChat: (NSString *)message){
    [[ZohoSalesIQ Chat] startChatWithQuestion:(message)];
}
RCT_EXPORT_METHOD(registerVisitor: (NSString *)uniqueid){
    [ZohoSalesIQ registerVisitor:uniqueid];
}
RCT_EXPORT_METHOD(unregisterVisitor){
    [ZohoSalesIQ unregisterVisitor];
}
RCT_EXPORT_METHOD(setPageTitle: (NSString *)pagetitle){
    [[ZohoSalesIQ Tracking] setPageTitle:pagetitle];
}
RCT_EXPORT_METHOD(setCustomAction: (NSString *)action_name){
    [[ZohoSalesIQ Tracking] setCustomAction:action_name];
}
RCT_EXPORT_METHOD(enableInAppNotification){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentInappnotifications visible:YES];
}
RCT_EXPORT_METHOD(disableInAppNotification){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentInappnotifications visible:NO];
}
RCT_EXPORT_METHOD(setConversationVisibility: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentConversations visible:visibility];
}
RCT_EXPORT_METHOD(setFAQVisibility: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentFaq visible:visibility];
}

@end
