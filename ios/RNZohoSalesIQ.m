#import "RNZohoSalesIQ.h"
#import <UIKit/UIKit.h>
#import <React/RCTConvert.h>

@implementation RNZohoSalesIQ

RCT_EXPORT_MODULE();

- (void)performAdditionalSetup{
    //MARK:- PERFORM ADDITIONAL SETUP HERE
    
    //Add calls to any native code/native Mobilisten API here.
    
}

RCT_EXPORT_METHOD(init:(NSString *)appKey accessKey:(NSString *)accessKey){
    [ZohoSalesIQ setPlatformWithPlatform:@"ReactNative"];
    [ZohoSalesIQ initWithAppKey:appKey accessKey:accessKey completion:^(BOOL complete) {
        
    }];
    ZohoSalesIQ.delegate = self;
    [ZohoSalesIQ Chat].delegate = self;
    [ZohoSalesIQ FAQ].delegate = self;
    [ZohoSalesIQ KnowledgeBase].delegate = self;
    if(actionDictionary == nil){
        actionDictionary = [[NSMutableDictionary<NSString *, SIQActionHandler *> alloc] init];
    }
    [self performAdditionalSetup];
}

RCT_EXPORT_METHOD(initWithCallback:(NSString *)appKey accessKey:(NSString *)accessKey callback:(RCTResponseSenderBlock)callback){
    __block BOOL _initComplete = false;
    [ZohoSalesIQ setPlatformWithPlatform:@"ReactNative"];
    [ZohoSalesIQ initWithAppKey:appKey accessKey:accessKey completion:^(BOOL complete) {
        NSNumber *success = [NSNumber numberWithBool:complete];
        if(_initComplete == false){
            _initComplete = true;
            callback(@[success]);
        }
        if(success){
            
        }else{
            
        }
    }];
    ZohoSalesIQ.delegate = self;
    [ZohoSalesIQ Chat].delegate = self;
    [ZohoSalesIQ FAQ].delegate = self;
    [ZohoSalesIQ KnowledgeBase].delegate = self;
    
    if(actionDictionary == nil){
        actionDictionary = [[NSMutableDictionary<NSString *, SIQActionHandler *> alloc] init];
    }
    [self performAdditionalSetup];
}

bool hasListeners;
bool handleURI = YES;

-(void)startObserving {
    hasListeners = YES;
}

-(void)stopObserving {
    hasListeners = NO;
}

//MARK:- EVENT TYPES
NSMutableDictionary<NSString *, SIQActionHandler *> *actionDictionary;

NSString *OPERATORS_OFFLINE = @"OPERATORS_OFFLINE";
NSString *OPERATORS_ONLINE = @"OPERATORS_ONLINE";
NSString *CHATVIEW_CLOSED = @"CHATVIEW_CLOSED";
NSString *CHATVIEW_OPENED = @"CHATVIEW_OPENED";
NSString *HOMEVIEW_CLOSED = @"HOMEVIEW_CLOSED";
NSString *HOMEVIEW_OPENED = @"HOMEVIEW_OPENED";
NSString *SUPPORT_OPENED = @"SUPPORT_OPENED";
NSString *SUPPORT_CLOSED = @"SUPPORT_CLOSED";

NSString *ARTICLE_OPENED = @"ARTICLE_OPENED";
NSString *ARTICLE_CLOSED = @"ARTICLE_CLOSED";
NSString *ARTICLE_LIKED = @"ARTICLE_LIKED";
NSString *ARTICLE_DISLIKED = @"ARTICLE_DISLIKED";

NSString *CHAT_ATTENDED = @"CHAT_ATTENDED";
NSString *CHAT_CLOSED = @"CHAT_CLOSED";
NSString *FEEDBACK_RECEIVED = @"FEEDBACK_RECEIVED";
NSString *CHAT_MISSED = @"CHAT_MISSED";
NSString *CHAT_OPENED = @"CHAT_OPENED";
NSString *RATING_RECEIVED = @"RATING_RECEIVED";
NSString *CHAT_REOPENED = @"CHAT_REOPENED";
NSString *CHAT_QUEUE_POSITION_CHANGED = @"CHAT_QUEUE_POSITION_CHANGED";
NSString *CHAT_UNREAD_COUNT_CHANGED = @"CHAT_UNREAD_COUNT_CHANGED";
NSString *PERFORM_CHATACTION = @"PERFORM_CHATACTION";

NSString *VISITOR_IPBLOCKED = @"VISITOR_IPBLOCKED";
NSString *CUSTOMTRIGGER = @"CUSTOMTRIGGER";
NSString *BOT_TRIGGER = @"BOT_TRIGGER";

//MARK:- CHAT TYPES
NSString *TYPE_OPEN = @"OPEN";
NSString *TYPE_TRIGGERED = @"TRIGGERED";
NSString *TYPE_PROACTIVE = @"PROACTIVE";
NSString *TYPE_WAITING = @"WAITING";
NSString *TYPE_CONNECTED = @"CONNECTED";
NSString *TYPE_MISSED = @"MISSED";
NSString *TYPE_CLOSED = @"CLOSED";
NSString *TYPE_ENDED = @"ENDED";

NSString *INFO_LOG = @"INFO_LOG";
NSString *WARNING_LOG = @"WARNING_LOG";
NSString *ERROR_LOG = @"ERROR_LOG";

NSString *TAB_CONVERSATIONS = @"TAB_CONVERSATIONS";
NSString *TAB_FAQ = @"TAB_FAQ";
NSString *TAB_KNOWLEDGE_BASE = @"TAB_KNOWLEDGE_BASE";

NSString *EVENT_HANDLE_URL = @"EVENT_HANDLE_URL";
NSString *EVENT_OPEN_URL = @"EVENT_OPEN_URL";
NSString *EVENT_COMPLETE_CHAT_ACTION = @"EVENT_COMPLETE_CHAT_ACTION";
NSString *RESOURCE_ARTICLES = @"RESOURCE_ARTICLES";

// ---------------------------------------------------------
NSString *EVENT_RESOURCE_OPENED = @"EVENT_RESOURCE_OPENED";
NSString *EVENT_RESOURCE_CLOSED = @"EVENT_RESOURCE_CLOSED";
NSString *EVENT_RESOURCE_LIKED = @"EVENT_RESOURCE_LIKED";
NSString *EVENT_RESOURCE_DISLIKED = @"EVENT_RESOURCE_DISLIKED";

- (NSArray<NSString *> *)supportedEvents {
    return @[OPERATORS_OFFLINE,
             OPERATORS_ONLINE,
             CHATVIEW_CLOSED,
             CHATVIEW_OPENED,
             HOMEVIEW_CLOSED,
             HOMEVIEW_OPENED,
             SUPPORT_CLOSED,
             SUPPORT_OPENED,
             ARTICLE_CLOSED,
             ARTICLE_DISLIKED,
             ARTICLE_LIKED,
             ARTICLE_OPENED,
             CHAT_ATTENDED,
             CHAT_CLOSED,
             FEEDBACK_RECEIVED,
             CHAT_MISSED,
             CHAT_OPENED,
             RATING_RECEIVED,
             CHAT_REOPENED,
             VISITOR_IPBLOCKED,
             BOT_TRIGGER,
             PERFORM_CHATACTION,
             CUSTOMTRIGGER,
             CHAT_QUEUE_POSITION_CHANGED,
             CHAT_UNREAD_COUNT_CHANGED,
             INFO_LOG,
             WARNING_LOG,
             ERROR_LOG,
             TAB_CONVERSATIONS,
             TAB_FAQ,
             TAB_KNOWLEDGE_BASE,
             EVENT_HANDLE_URL,
             EVENT_OPEN_URL,
             EVENT_COMPLETE_CHAT_ACTION,
             RESOURCE_ARTICLES,
             EVENT_RESOURCE_OPENED,
             EVENT_RESOURCE_CLOSED,
             EVENT_RESOURCE_LIKED,
             EVENT_RESOURCE_DISLIKED];
}

- (NSDictionary *) constantsToExport {
    return @{
        @"OPERATORS_OFFLINE": OPERATORS_OFFLINE,
        @"OPERATORS_ONLINE": OPERATORS_ONLINE,
        @"CHATVIEW_CLOSED": CHATVIEW_CLOSED,
        @"CHATVIEW_OPENED": CHATVIEW_OPENED,
        @"HOMEVIEW_CLOSED": HOMEVIEW_CLOSED,
        @"HOMEVIEW_OPENED": HOMEVIEW_OPENED,
        @"SUPPORT_CLOSED": SUPPORT_CLOSED,
        @"SUPPORT_OPENED": SUPPORT_OPENED,
        @"ARTICLE_CLOSED": ARTICLE_CLOSED,
        @"ARTICLE_DISLIKED": ARTICLE_DISLIKED,
        @"ARTICLE_LIKED": ARTICLE_LIKED,
        @"ARTICLE_OPENED": ARTICLE_OPENED,
        @"CHAT_ATTENDED": CHAT_ATTENDED,
        @"CHAT_CLOSED": CHAT_CLOSED,
        @"FEEDBACK_RECEIVED": FEEDBACK_RECEIVED,
        @"PERFORM_CHATACTION": PERFORM_CHATACTION,
        @"CHAT_MISSED": CHAT_MISSED,
        @"CHAT_OPENED": CHAT_OPENED,
        @"RATING_RECEIVED": RATING_RECEIVED,
        @"CHAT_REOPENED": CHAT_REOPENED,
        @"CHAT_UNREAD_COUNT_CHANGED": CHAT_UNREAD_COUNT_CHANGED,
        @"VISITOR_IPBLOCKED": VISITOR_IPBLOCKED,
        @"BOT_TRIGGER": BOT_TRIGGER,
        @"TYPE_OPEN": TYPE_OPEN,
        @"TYPE_WAITING": TYPE_WAITING,
        @"TYPE_MISSED": TYPE_MISSED,
        @"TYPE_CLOSED": TYPE_CLOSED,
        @"TYPE_CONNECTED": TYPE_CONNECTED,
        @"TYPE_ENDED": TYPE_ENDED,
        @"TYPE_TRIGGERED": TYPE_TRIGGERED,
        @"TYPE_PROACTIVE": TYPE_PROACTIVE,
        @"CUSTOMTRIGGER": CUSTOMTRIGGER,
        @"CHAT_QUEUE_POSITION_CHANGED": CHAT_QUEUE_POSITION_CHANGED,
        @"INFO_LOG": INFO_LOG,
        @"WARNING_LOG": WARNING_LOG,
        @"ERROR_LOG": ERROR_LOG,
        @"TAB_CONVERSATIONS": TAB_CONVERSATIONS,
        @"TAB_KNOWLEDGE_BASE": TAB_KNOWLEDGE_BASE,
        @"TAB_FAQ": TAB_FAQ,
        @"EVENT_HANDLE_URL": EVENT_HANDLE_URL,
        @"EVENT_OPEN_URL": EVENT_OPEN_URL,
        @"EVENT_COMPLETE_CHAT_ACTION": EVENT_COMPLETE_CHAT_ACTION,
        @"RESOURCE_ARTICLES": RESOURCE_ARTICLES,
        @"EVENT_RESOURCE_OPENED": EVENT_RESOURCE_OPENED,
        @"EVENT_RESOURCE_CLOSED": EVENT_RESOURCE_CLOSED,
        @"EVENT_RESOURCE_LIKED": EVENT_RESOURCE_LIKED,
        @"EVENT_RESOURCE_DISLIKED": EVENT_RESOURCE_DISLIKED,
    };
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSMutableDictionary *)prepareResourceInformation:(enum SIQResourceType)type resource:(SIQKnowledgeBaseResource * _Nullable)resource {
    NSMutableDictionary *resourceInformation = [NSMutableDictionary dictionary];
    NSMutableDictionary *resourceObject = [RNZohoSalesIQ getResourceObject:resource];
    
    if (resourceObject != nil) {
        [resourceInformation setObject:resourceObject forKey:@"resource"];
    }
    
    if (type == SIQResourceTypeArticles) {
        [resourceInformation setObject:RESOURCE_ARTICLES forKey:@"type"];
    }
    
    return resourceInformation;
}

+ (NSMutableDictionary *)getVisitorObject: (SIQVisitor*)arguments {
    
    NSMutableDictionary *visitorDict = [NSMutableDictionary dictionary];
    
    if([arguments name] != nil){
        NSString *name = [arguments name];
        [visitorDict setObject:name forKey:@"name"];
    }
    
    if([arguments browser] != nil){
        NSString *browser = [arguments browser];
        [visitorDict setObject:browser forKey:@"browser"];
    }
    
    if([arguments city] != nil){
        NSString *city = [arguments city];
        [visitorDict setObject:city forKey:@"city"];
    }
    
    if([arguments countryCode] != nil){
        NSString *countryCode = [arguments countryCode];
        [visitorDict setObject:countryCode forKey:@"countryCode"];
    }
    
    if([arguments state] != nil){
        NSString *state = [arguments state];
        [visitorDict setObject:state forKey:@"state"];
    }
    
    if([arguments email] != nil){
        NSString *email = [arguments email];
        [visitorDict setObject:email forKey:@"email"];
    }
    
    if([arguments lastVisitTime] != nil){
        NSDate *lastVisitTime = [arguments lastVisitTime];
        int time = (int)[lastVisitTime timeIntervalSince1970];
        [visitorDict setObject: @(time) forKey: @"lastVisitTime"];
    }
    
    if([arguments ip] != nil){
        NSString *ip = [arguments ip];
        [visitorDict setObject:ip forKey:@"ip"];
    }
    
    if([arguments firstVisitTime] != nil){
        NSDate *firstVisitTime = [arguments firstVisitTime];
        int time = (int)[firstVisitTime timeIntervalSince1970];
        [visitorDict setObject: @(time) forKey: @"firstVisitTime"];
    }
    
    if([arguments name] != nil){
        NSString *name = [arguments name];
        [visitorDict setObject:name forKey:@"name"];
    }
    
    if([arguments noOfDaysVisited] != nil){
        NSNumber *noOfDaysVisited = [arguments noOfDaysVisited];
        [visitorDict setObject:noOfDaysVisited forKey:@"noOfDaysVisited"];
    }
    
    if([arguments numberOfChats] != nil){
        NSNumber *numberOfChats = [arguments numberOfChats];
        [visitorDict setObject:numberOfChats forKey:@"numberOfChats"];
    }
    
    if([arguments numberOfVisits] != nil){
        NSNumber *numberOfVisits = [arguments numberOfVisits];
        [visitorDict setObject:numberOfVisits forKey:@"numberOfVisits"];
    }
    
    if([arguments totalTimeSpent] != nil){
        NSNumber *totalTimeSpent = [arguments totalTimeSpent];
        [visitorDict setObject:totalTimeSpent forKey:@"totalTimeSpent"];
    }
    
    if([arguments os] != nil){
        NSString *os = [arguments os];
        [visitorDict setObject:os forKey:@"os"];
    }else{
        [visitorDict setObject:@"iOS" forKey:@"os"];
    }
    
    if([arguments phone] != nil){
        NSString *phone = [arguments phone];
        [visitorDict setObject:phone forKey:@"phone"];
    }
    
    if([arguments region] != nil){
        NSString *region = [arguments region];
        [visitorDict setObject:region forKey:@"region"];
    }
    
    if([arguments searchEngine] != nil){
        NSString *searchEngine = [arguments searchEngine];
        [visitorDict setObject:searchEngine forKey:@"searchEngine"];
    }
    
    if([arguments searchQuery] != nil){
        NSString *searchQuery = [arguments searchQuery];
        [visitorDict setObject:searchQuery forKey:@"searchQuery"];
    }
    
    return visitorDict;
}

+ (NSMutableDictionary *)getChatActionArguments: (SIQChatActionArguments*)arguments withID:(NSString*)actionID actionName:(NSString*)actionName
{
    NSMutableDictionary *argumentsDict = [NSMutableDictionary dictionary];
    if([arguments elementID] != nil){
        NSString *elementID = [arguments elementID];
        [argumentsDict setObject:elementID forKey:@"elementID"];
    }
    [argumentsDict setObject:actionName forKey:@"clientActionName"];
    if([arguments identifier] != nil){
        NSString *identifier = [arguments identifier];
        [argumentsDict setObject:identifier forKey:@"name"];
    }
    if([arguments label] != nil){
        NSString *label = [arguments label];
        [argumentsDict setObject:label forKey:@"label"];
    }
    [argumentsDict setObject:actionID forKey:@"uuid"];
    return argumentsDict;
}

+ (NSMutableDictionary *)getFAQCategoryObject: (SIQFAQCategory*) category
{
    NSMutableDictionary *categoryDict = [NSMutableDictionary dictionary];
    if([category id] != nil){
        NSString *categoryID = [category id];
        [categoryDict setObject: categoryID  forKey: @"id"];
        if([category name] != nil)
            [categoryDict setObject: [category name]  forKey: @"name"];
        
        [categoryDict setObject: @([category articleCount])  forKey: @"articleCount"];
    }
    return categoryDict;
}

+ (NSMutableDictionary *)getErrorObject: (NSError*) error{
    NSMutableDictionary *errorDict = [NSMutableDictionary dictionary];
    NSInteger code = [error code];
    NSString* message = [error localizedDescription];
    [errorDict setObject: @(code)  forKey: @"code"];
    [errorDict setObject: message  forKey: @"message"];
    return errorDict;
}

+ (NSMutableDictionary *)getSIQErrorObject:(id<SIQError>)siqError {
    NSMutableDictionary *errorDictionary = [NSMutableDictionary dictionary];
    [errorDictionary setObject:@(siqError.code) forKey:@"code"];
    [errorDictionary setObject:siqError.message forKey:@"message"];
    return errorDictionary;
}

+ (NSMutableArray *)getFAQCategoryList: (NSArray<SIQFAQCategory *> *) categories
{
    NSMutableArray *categoryArray = [NSMutableArray array];
    
    NSInteger i = 0;
    for (SIQFAQCategory *category in categories){
        
        NSMutableDictionary *categoryDict = [NSMutableDictionary dictionary];
        if([category id] != nil){
            categoryDict = [RNZohoSalesIQ getFAQCategoryObject:category];
            [categoryArray insertObject:categoryDict atIndex:i];
            i = i + 1;
        }
    }
    return categoryArray;
}

+ (NSMutableDictionary *)getFAQArticleObject: (SIQFAQArticle*) article
{
    NSMutableDictionary *articleDict = [NSMutableDictionary dictionary];
    if([article id] != nil){
        
        NSString *articleID = [article id];
        [articleDict setObject: articleID  forKey: @"id"];
        
        if([article categoryID] != nil)
            [articleDict setObject: [article categoryID]  forKey: @"categoryID"];
        
        if([article categoryName] != nil)
            [articleDict setObject: [article categoryName]  forKey: @"categoryName"];
        
        if([article lastModifiedTime] != nil){
            NSDate *modifiedTime = [article lastModifiedTime];
            int time = (int)[modifiedTime timeIntervalSince1970];
            [articleDict setObject: @(time) forKey: @"modifiedTime"];
        }
        
        if([article createdTime] != nil){
            NSDate *modifiedTime = [article createdTime];
            int time = (int)[modifiedTime timeIntervalSince1970];
            [articleDict setObject: @(time) forKey: @"createdTime"];
        }
        
        if([article name] != nil)
            [articleDict setObject: [article name]  forKey: @"name"];
        
        [articleDict setObject: @([article viewCount])  forKey: @"viewCount"];
        
        [articleDict setObject: @([article likeCount])  forKey: @"likeCount"];
        
        [articleDict setObject: @([article dislikeCount])  forKey: @"dislikeCount"];
    }
    return articleDict;
}

+ (NSMutableArray *)getArticlesList: (NSArray<SIQFAQArticle *> *) articles
{
    NSMutableArray *articlesArray = [NSMutableArray array];
    for (SIQFAQArticle *article in articles){
        
        NSMutableDictionary *articleDict = [NSMutableDictionary dictionary];
        
        NSInteger i = 0;
        if([article id] != nil){
            articleDict = [RNZohoSalesIQ getFAQArticleObject:article];
            [articlesArray insertObject:articleDict atIndex:i];
            i = i + 1;
        }
    }
    return articlesArray;
}

+ (NSMutableDictionary *)getChatObject: (SIQVisitorChat*) chat
{
    NSMutableDictionary *chatDict = [NSMutableDictionary dictionary];
    if([chat referenceID] != nil){
        
        NSString *id = [chat referenceID];
        [chatDict setObject: id  forKey: @"id"];
        
        if([chat attenderEmail] != nil){
            [chatDict setObject: [chat attenderEmail]  forKey: @"attenderEmail"];
        }
        if([chat attenderID] != nil){
            [chatDict setObject: [chat attenderID]  forKey: @"attenderID"];
        }
        if([chat attenderName] != nil){
            [chatDict setObject: [chat attenderName]  forKey: @"attenderName"];
        }
        if([chat departmentName] != nil){
            [chatDict setObject: [chat departmentName]  forKey: @"departmentName"];
        }
        
        [chatDict setObject: [NSNumber numberWithBool: [chat isBotAttender]]   forKey: @"isBotAttender"];
        
        if([chat question] != nil){
            [chatDict setObject: [chat question]  forKey: @"question"];
        }
        
        if([chat feedback] != nil){
            [chatDict setObject:[chat feedback] forKey:@"feedback"];
        }
        
        if([chat rating] != nil){
            [chatDict setObject:[chat rating] forKey:@"rating"];
        }
        
        ChatStatus status = [chat status];
        
        if (status == ChatStatusTriggered){
            [chatDict setObject: TYPE_TRIGGERED  forKey: @"status"];
        }else if (status == ChatStatusProactive){
            [chatDict setObject: TYPE_PROACTIVE  forKey: @"status"];
        }else if (status == ChatStatusConnected){
            [chatDict setObject: TYPE_CONNECTED  forKey: @"status"];
        }else if (status == ChatStatusWaiting){
            [chatDict setObject: TYPE_WAITING  forKey: @"status"];
        }else if (status == ChatStatusMissed){
            [chatDict setObject: TYPE_MISSED  forKey: @"status"];
        }else if (status == ChatStatusClosed){
            [chatDict setObject: TYPE_CLOSED  forKey: @"status"];
        }
        
        if ([chat lastMessage] != nil){
            NSMutableDictionary *recentMessageDict = [NSMutableDictionary dictionary];
            NSMutableDictionary *fileMessageDict = [NSMutableDictionary dictionary];
            if ([[chat lastMessage] file] != nil) {
                NSString *fileContent = [[[chat lastMessage] file] contentType];
                NSString *comment = [[[chat lastMessage] file] comment];
                NSString *fileName = [[[chat lastMessage] file] name];
                NSInteger fileSize = [[[chat lastMessage] file] size];
                
                
                if (fileName != nil) {
                    [fileMessageDict setObject: fileName  forKey: @"name"];
                }
                if (fileContent != nil) {
                    [fileMessageDict setObject: fileContent  forKey: @"content_type"];
                }
                if (comment != nil) {
                    [fileMessageDict setObject: comment  forKey: @"comment"];
                }
                if (fileSize != nil) {
                    [fileMessageDict setObject: @(fileSize)   forKey: @"size"];
                }
                
                if (fileContent != nil){
                    if (comment != nil){
                        [chatDict setObject:[NSString stringWithFormat:@"%@:%@",fileContent,comment]  forKey: @"lastMessage"];
                    }else{
                        [chatDict setObject:fileContent  forKey: @"lastMessage"];
                    }
                }
            } else if ([[chat lastMessage] text] != nil) {
                NSString *text = [[chat lastMessage] text];
                [chatDict setObject: text  forKey: @"lastMessage"];
                [recentMessageDict setObject: text  forKey: @"text"];
            }
            [recentMessageDict setObject: fileMessageDict  forKey: @"file"];
            NSString *sender = [[chat lastMessage] sender];
            if( sender != nil){
                [chatDict setObject: sender  forKey: @"lastMessageSender"];
                [recentMessageDict setObject: sender  forKey: @"sender"];
            }
            
            NSDate *messageTime = [[chat lastMessage] time];
            if (messageTime != nil){
                int time = (int)[messageTime timeIntervalSince1970];
                [chatDict setObject: @(time) forKey: @"lastMessageTime"];
                [recentMessageDict setObject: @(time)  forKey: @"time"];
            }
            
            BOOL isRead = [[chat lastMessage] isRead];
            [recentMessageDict setObject: [NSNumber numberWithBool: isRead]  forKey: @"is_read"];
            
            [chatDict setObject: recentMessageDict  forKey: @"recentMessage"];
        }
        
        [chatDict setObject: @([chat unreadCount])  forKey: @"unreadCount"];
        
        NSInteger queuePosition = [chat queuePosition];
        if(queuePosition > 0) {
            [chatDict setObject: @(queuePosition)  forKey: @"queuePosition"];
        }
        
    }
    return chatDict;
}

+ (NSMutableDictionary *)getResourceObject: (SIQKnowledgeBaseResource*)resource {
    NSMutableDictionary *resourceDictionary = [NSMutableDictionary dictionary];
    if([resource id] != nil){
        NSString *articleID = [resource id];
        [resourceDictionary setObject: articleID  forKey: @"id"];
        
        if ([resource category] != nil) {
            NSMutableDictionary *resourceCategory = [NSMutableDictionary dictionary];
            if ([[resource category] id] != nil) {
                [resourceCategory setObject: [[resource category] id]  forKey: @"id"];
            }
            if ([[resource category] name] != nil) {
                [resourceCategory setObject: [[resource category] name]  forKey: @"name"];
            }
            [resourceDictionary setObject: resourceCategory  forKey: @"category"];
        }
        
        if ([resource title] != nil) {
            [resourceDictionary setObject: [resource title]  forKey: @"title"];
        }
        
        if ([resource departmentId] != nil) {
            [resourceDictionary setObject: [resource departmentId]  forKey: @"departmentId"];
        }
        
        if ([resource language] != nil) {
            NSMutableDictionary *resourceLanguage = [NSMutableDictionary dictionary];
            if ([[resource language] id] != nil) {
                [resourceLanguage setObject: [[resource language] id]  forKey: @"id"];
            }
            if ([[resource language] code] != nil) {
                [resourceLanguage setObject: [[resource language] code]  forKey: @"code"];
            }
            [resourceDictionary setObject: resourceLanguage  forKey: @"language"];
        }
        
        if ([resource creator] != nil) {
            NSMutableDictionary *resourceCreator = [NSMutableDictionary dictionary];
            if ([[resource creator] id] != nil) {
                [resourceCreator setObject: [[resource creator] id]  forKey: @"id"];
            }
            if ([[resource creator] name] != nil) {
                [resourceCreator setObject: [[resource creator] name]  forKey: @"name"];
            }
            if ([[resource creator] email] != nil) {
                [resourceCreator setObject: [[resource creator] email]  forKey: @"email"];
            }
            if ([[resource creator] displayName] != nil) {
                [resourceCreator setObject: [[resource creator] displayName]  forKey: @"displayName"];
            }
            if ([[resource creator] imageUrl] != nil) {
                [resourceCreator setObject: [[resource creator] imageUrl]  forKey: @"imageUrl"];
            }
            [resourceDictionary setObject: resourceCreator  forKey: @"creator"];
        }
        
        if ([resource modifier] != nil) {
            NSMutableDictionary *resourceModifier = [NSMutableDictionary dictionary];
            if ([[resource modifier] id] != nil) {
                [resourceModifier setObject: [[resource modifier] id]  forKey: @"id"];
            }
            if ([[resource modifier] name] != nil) {
                [resourceModifier setObject: [[resource modifier] name]  forKey: @"name"];
            }
            if ([[resource modifier] email] != nil) {
                [resourceModifier setObject: [[resource modifier] email]  forKey: @"email"];
            }
            if ([[resource modifier] displayName] != nil) {
                [resourceModifier setObject: [[resource modifier] displayName]  forKey: @"displayName"];
            }
            if ([[resource modifier] imageUrl] != nil) {
                [resourceModifier setObject: [[resource modifier] imageUrl]  forKey: @"imageUrl"];
            }
            [resourceDictionary setObject: resourceModifier  forKey: @"modifier"];
        }
        
        if ([resource createdTime] != nil) {
            NSDate *createdTime = [resource createdTime];
            int time = (int)[createdTime timeIntervalSince1970];
            [resourceDictionary setObject: @(time) forKey: @"createdTime"];
        }
        
        if ([resource modifiedTime] != nil) {
            NSDate *createdTime = [resource modifiedTime];
            int time = (int)[createdTime timeIntervalSince1970];
            [resourceDictionary setObject: @(time) forKey: @"modifiedTime"];
        }
        
        if ([resource publicUrl] != nil) {
            [resourceDictionary setObject: [resource publicUrl]  forKey: @"publicUrl"];
        }
        
        if ([resource stats] != nil) {
            NSMutableDictionary *resourceStats = [NSMutableDictionary dictionary];
            if ([[resource stats] liked] != nil) {
                [resourceStats setObject: [[resource stats] liked]  forKey: @"liked"];
            }
            if ([[resource stats] disliked] != nil) {
                [resourceStats setObject: [[resource stats] disliked]  forKey: @"disliked"];
            }
            if ([[resource stats] used] != nil) {
                [resourceStats setObject: [[resource stats] used]  forKey: @"used"];
            }
            if ([[resource stats] viewed] != nil) {
                [resourceStats setObject: [[resource stats] viewed]  forKey: @"viewed"];
            }
            [resourceDictionary setObject: resourceStats  forKey: @"stats"];
        }
        
        if ([resource content] != nil) {
            [resourceDictionary setObject: [resource content]  forKey: @"content"];
        }
        
        SIQArticleRatedType ratedType = [resource ratedType];
        if (ratedType == SIQArticleRatedTypeLiked) {
            [resourceDictionary setObject: @"liked" forKey:@"ratedType"];
        }
        if (ratedType == SIQArticleRatedTypeDisliked) {
            [resourceDictionary setObject: @"disliked" forKey:@"ratedType"];
        }
        
    }
    return resourceDictionary;
}

+ (NSMutableDictionary *)getCategoryObject: (SIQKnowledgeBaseCategory*)category {
    NSMutableDictionary *categoryDictionary = [NSMutableDictionary dictionary];
    if([category id] != nil) {
        NSString *categoryID = [category id];
        [categoryDictionary setObject: categoryID  forKey: @"id"];
        
        if ([category name] != nil) {
            [categoryDictionary setObject: [category name]  forKey: @"name"];
        }
        if ([category departmentId] != nil) {
            [categoryDictionary setObject: [category departmentId]  forKey: @"departmentId"];
        }
        if ([category count] != nil) {
            [categoryDictionary setObject: [category count]  forKey: @"count"];
        }
        if ([category childrenCount] != nil) {
            [categoryDictionary setObject: [category childrenCount]  forKey: @"childrenCount"];
        }
        if ([category order] != nil) {
            [categoryDictionary setObject: [category order]  forKey: @"order"];
        }
        if ([category parentCategoryId] != nil) {
            [categoryDictionary setObject: [category parentCategoryId]  forKey: @"parentCategoryId"];
        }
        if ([category resourceModifiedTime] != nil) {
            NSDate *modifiedTime = [category resourceModifiedTime];
            int time = (int)[modifiedTime timeIntervalSince1970];
            [categoryDictionary setObject: @(time) forKey: @"resourceModifiedTime"];
        }
    }
    return categoryDictionary;
}

+ (NSMutableArray *)getResourceList: (NSArray<SIQKnowledgeBaseResource *> *) resources
{
    NSMutableArray *resourceArray = [NSMutableArray array];
    
    NSInteger i = 0;
    for (SIQKnowledgeBaseResource *resource in resources){
        NSMutableDictionary *resourceDict = [NSMutableDictionary dictionary];
        resourceDict = [RNZohoSalesIQ getResourceObject:resource];
        [resourceArray insertObject:resourceDict atIndex:i];
        i = i + 1;
    }
    return resourceArray;
}

+ (NSMutableArray *)getCategoryList: (NSArray<SIQKnowledgeBaseCategory *> *) categories
{
    NSMutableArray *categoryArray = [NSMutableArray array];
    
    NSInteger i = 0;
    for (SIQKnowledgeBaseCategory *category in categories){
        NSMutableDictionary *categoryDict = [NSMutableDictionary dictionary];
        categoryDict = [RNZohoSalesIQ getCategoryObject:category];
        [categoryArray insertObject:categoryDict atIndex:i];
        i = i + 1;
    }
    return categoryArray;
}

+ (NSMutableDictionary *)getDepartmentObject: (SIQDepartment*)argument {
    
    NSMutableDictionary *departmentDictionary = [NSMutableDictionary dictionary];
    
    NSString *departmentName = [argument name];
    NSString *departmentID = [argument id];
    BOOL departmentAvailable = [argument available];
    
    if(departmentID != nil){
        [departmentDictionary setObject:departmentID forKey:@"id"];
    }
    
    if(departmentName != nil){
        [departmentDictionary setObject:departmentName forKey:@"name"];
    }
    
    [departmentDictionary setObject: [NSNumber numberWithBool: departmentAvailable]   forKey: @"available"];
    
    return departmentDictionary;
    
}

+ (NSMutableArray *)getDepartmentList: (NSArray<SIQDepartment *> *) departments
{
    NSMutableArray *departmentsArray = [NSMutableArray array];
    NSInteger i = 0;
    for (SIQDepartment *department in departments) {
        NSMutableDictionary *departmentDictionary = [NSMutableDictionary dictionary];
        departmentDictionary = [self getDepartmentObject:department];
        [departmentsArray insertObject:departmentDictionary atIndex:i];
        i = i + 1;
    }
    return departmentsArray;
}

+ (NSMutableArray *)getChatList: (NSArray<SIQVisitorChat *> *) chats
{
    NSMutableArray *chatsArray = [NSMutableArray array];
    
    NSInteger i = 0;
    for (SIQVisitorChat *chat in chats){
        NSMutableDictionary *chatDict = [NSMutableDictionary dictionary];
        chatDict = [RNZohoSalesIQ getChatObject:chat];
        [chatsArray insertObject:chatDict atIndex:i];
        i = i + 1;
    }
    return chatsArray;
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
    }else if([language_code isEqualToString:@"he"]){
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
    }else if([language_code isEqualToString:@"br"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageBulgarian];
    }else if([language_code isEqualToString:@"vi"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageVietnamese];
    }else if([language_code isEqualToString:@"fil"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageFilipino];
    }else if([language_code isEqualToString:@"fi"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageFinnish];
    }else if([language_code isEqualToString:@"zh_TW"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageChineseTraditional];
    }else if([language_code isEqualToString:@"in"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageIndonesian];
    }else if([language_code isEqualToString:@"ka"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageGeorgian];
    }else if([language_code isEqualToString:@"hy"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguageArmenian];
    }else if([language_code isEqualToString:@"fa"]){
        [[ZohoSalesIQ Chat] setLanguage:LanguagePersian];
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
    // No Implementation
}

RCT_EXPORT_METHOD(setThemeForAndroid: (NSString *)attribute){
    // No Implementation
}
RCT_EXPORT_METHOD(setThemeColorforiOS: (NSString *)color_code){
    unsigned rgbValue = 0;
    NSScanner *scanner = [NSScanner scannerWithString:color_code];
    [scanner setScanLocation:1];
    [scanner scanHexInt:&rgbValue];
    UIColor *themeColor = [UIColor colorWithRed:((rgbValue & 0xFF0000) >> 16)/255.0 green:((rgbValue & 0xFF00) >> 8)/255.0 blue:(rgbValue & 0xFF)/255.0 alpha:1.0];
    if(themeColor!=nil){
        SIQTheme *theme = [SIQTheme new];
        [theme setThemeColor:themeColor];
        [[ZohoSalesIQ Theme] setThemeWithTheme:theme];
    }
}
RCT_EXPORT_METHOD(setLauncherPropertiesForAndroid: (NSDictionary *)launcherProperties){
    
}
RCT_EXPORT_METHOD(syncThemeWithOsForAndroid: (BOOL)sync){
    
}
RCT_EXPORT_METHOD(printDebugLogsForAndroid: (BOOL)sync){
    
}
RCT_EXPORT_METHOD(showOperatorImageInLauncher: (BOOL)show){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentAttenderImageOnLauncher visible:show];
}
RCT_EXPORT_METHOD(showOperatorImageInChat: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentAttenderImageInChat visible:visibility];
}
RCT_EXPORT_METHOD(setLauncherVisibility : (BOOL)show){
    [ZohoSalesIQ showLauncher:show];
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
RCT_EXPORT_METHOD(setVisitorLocation: (NSDictionary *)location){
    
    if(location!= nil){
        SIQVisitorLocation *visitorLocation = [SIQVisitorLocation new];
        NSNumberFormatter *formatter = [[NSNumberFormatter alloc] init];
        formatter.numberStyle = NSNumberFormatterDecimalStyle;
        
        if([location valueForKey:@"latitude"]!=nil){
            //NSNumber *latitude = [f numberFromString:[location valueForKey:@"latitude"]];
            if([[location valueForKey:@"latitude"] isKindOfClass:[NSNumber class]]){
                [visitorLocation setLatitude:[location valueForKey:@"latitude"]];
            }
            if([[location valueForKey:@"latitude"] isKindOfClass:[NSString class]]){
                NSNumber *latitude = [formatter numberFromString:[location valueForKey:@"latitude"]];
                [visitorLocation setLatitude:latitude];
            }
        }
        
        if([location valueForKey:@"longitude"]!=nil){
            if([[location valueForKey:@"longitude"] isKindOfClass:[NSNumber class]]){
                [visitorLocation setLongitude:[location valueForKey:@"longitude"]];
            }
            if([[location valueForKey:@"longitude"] isKindOfClass:[NSString class]]){
                NSNumber *longitude = [formatter numberFromString:[location valueForKey:@"longitude"]];
                [visitorLocation setLongitude:longitude];
            }
        }
        
        if([location valueForKey:@"zipCode"]!=nil){
            if([[location valueForKey:@"zipCode"] isKindOfClass:[NSString class]]){
                [visitorLocation setZipCode:[location valueForKey:@"zipCode"]];
            }
        }
        
        if([location valueForKey:@"city"]!=nil){
            if([[location valueForKey:@"city"] isKindOfClass:[NSString class]]){
                [visitorLocation setCity:[location valueForKey:@"city"]];
            }
        }
        
        if([location valueForKey:@"state"]!=nil){
            if([[location valueForKey:@"state"] isKindOfClass:[NSString class]]){
                [visitorLocation setState:[location valueForKey:@"state"]];
            }
        }
        
        if([location valueForKey:@"country"]!=nil){
            if([[location valueForKey:@"country"] isKindOfClass:[NSString class]]){
                [visitorLocation setCountry:[location valueForKey:@"country"]];
            }
        }
        
        if([location valueForKey:@"countryCode"]!=nil){
            if([[location valueForKey:@"countryCode"] isKindOfClass:[NSString class]]){
                [visitorLocation setCountryCode:[location valueForKey:@"countryCode"]];
            }
        }
        
        [[ZohoSalesIQ Visitor] setLocation:visitorLocation];
        
    }
    
}
RCT_EXPORT_METHOD(setQuestion: (NSString *)question){
    [[ZohoSalesIQ Visitor] setQuestion:question];
}
RCT_EXPORT_METHOD(startChat: (NSString *)message){
    [[ZohoSalesIQ Chat] startChatWithQuestion:(message)];
}
RCT_EXPORT_METHOD(registerVisitor: (NSString *)uniqueid){
    [ZohoSalesIQ registerVisitor:uniqueid completion:nil];
}
RCT_EXPORT_METHOD(unregisterVisitor){
    [ZohoSalesIQ unregisterVisitorWithCompletion:nil];
}
RCT_EXPORT_METHOD(setPageTitle: (NSString *)pagetitle){
    [[ZohoSalesIQ Tracking] setPageTitle:pagetitle];
}
RCT_EXPORT_METHOD(setCustomAction: (NSString *)action_name){
    [[ZohoSalesIQ Tracking] setCustomAction:action_name shouldOpenChatWindow:NO];
}
RCT_EXPORT_METHOD(performCustomAction: (NSString *)action_name shouldOpenChatWindow:(BOOL)openChatWindow){
    [[ZohoSalesIQ Visitor] performCustomAction:action_name shouldOpenChatWindow:openChatWindow];
}
RCT_EXPORT_METHOD(enableInAppNotification){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentInAppNotifications visible:YES];
}
RCT_EXPORT_METHOD(disableInAppNotification){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentInAppNotifications visible:NO];
}
RCT_EXPORT_METHOD(setConversationVisibility: (BOOL)visibility){
    [[ZohoSalesIQ Conversation] setVisibility:visibility];
}
RCT_EXPORT_METHOD(setConversationListTitle: (NSString *)title){
    [[ZohoSalesIQ Conversation] setTitle:title];
}
RCT_EXPORT_METHOD(setFAQVisibility: (BOOL)visibility){
    [[ZohoSalesIQ FAQ] setVisibility:visibility];
}

//MARK:- v3.0
//MARK:- API TO HIDE FORMS

RCT_EXPORT_METHOD(setVisitorNameVisibility: (BOOL)visibility){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentVisitorName visible:visibility];
}

RCT_EXPORT_METHOD(enablePreChatForms){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentPreChatForm visible:YES];
}

RCT_EXPORT_METHOD(disablePreChatForms){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentPreChatForm visible:NO];
}

RCT_EXPORT_METHOD(enableScreenshotOption){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentScreenshotOption visible:YES];
}

RCT_EXPORT_METHOD(disableScreenshotOption){
    [[ZohoSalesIQ Chat] setVisibility:ChatComponentScreenshotOption visible:NO];
}

RCT_EXPORT_METHOD(isChatEnabled:(RCTResponseSenderBlock)callback)
{
    NSNumber *chatEnabled = [NSNumber numberWithBool:ZohoSalesIQ.Chat.isEnabled];
    callback(@[chatEnabled]);
}

RCT_EXPORT_METHOD(getChatUnreadCount:(RCTResponseSenderBlock)callback)
{
    NSNumber *unreadCount = [NSNumber numberWithInteger: [[ZohoSalesIQ Chat] getUnreadMessageCount]];
    callback(@[unreadCount]);
}

//MARK:- CHAT GET LIST API
RCT_EXPORT_METHOD(getChats:(RCTResponseSenderBlock)callback)
{
    ChatStatus chatStatus = ChatStatusAll;
    [[ZohoSalesIQ Chat] getListWithFilter:chatStatus completion:^(NSError * _Nullable error, NSArray<SIQVisitorChat *> * _Nullable chats) {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary, @""]);
        }else{
            NSMutableArray *chatsArray = [NSMutableArray array];
            chatsArray = [RNZohoSalesIQ getChatList:chats];
            callback(@[[NSNull null], chatsArray]);
        }
    }];
    
}

//MARK:- CHAT GET LIST API WITH FILTER
RCT_EXPORT_METHOD(getChatsWithFilter:(NSString *)status callback:(RCTResponseSenderBlock)callback)
{
    ChatStatus chatStatus = ChatStatusAll;
    if([status isEqual: TYPE_OPEN]){
        chatStatus = ChatStatusOpen;
    }else if ([status  isEqual: TYPE_CONNECTED]){
        chatStatus = ChatStatusConnected;
    }else if ([status  isEqual: TYPE_WAITING]){
        chatStatus = ChatStatusWaiting;
    }else if ([status  isEqual: TYPE_MISSED]){
        chatStatus = ChatStatusMissed;
    }else if ([status  isEqual: TYPE_CLOSED]){
        chatStatus = ChatStatusClosed;
    }else if ([status  isEqual: TYPE_ENDED]){
        chatStatus = ChatStatusEnded;
    }else if ([status isEqual: TYPE_TRIGGERED]){
        chatStatus = ChatStatusTriggered;
    }else if ([status isEqual: TYPE_PROACTIVE]){
        chatStatus = ChatStatusProactive;
    }else{
        NSMutableDictionary *errorDictionary = [NSMutableDictionary dictionary];
        [errorDictionary setObject: @(604)  forKey: @"code"];
        [errorDictionary setObject: @"invalid filter type"  forKey: @"message"];
        callback(@[errorDictionary, @""]);
        return;
    }
    [[ZohoSalesIQ Chat] getListWithFilter:chatStatus completion:^(NSError * _Nullable error, NSArray<SIQVisitorChat *> * _Nullable chats) {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary, @""]);
        }else{
            NSMutableArray *chatsArray = [NSMutableArray array];
            chatsArray = [RNZohoSalesIQ getChatList:chats];
            callback(@[[NSNull null], chatsArray]);
        }
    }];
}

RCT_EXPORT_METHOD(getDepartments:(RCTResponseSenderBlock)callback)
{
    [[ZohoSalesIQ Chat] getDepartmentsWithCompletion:^(NSError * _Nullable error, NSArray<SIQDepartment *> * _Nullable departments) {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary, @""]);
        }else{
            NSMutableArray *departmentsArray = [NSMutableArray array];
            departmentsArray = [RNZohoSalesIQ getDepartmentList:departments];
            callback(@[[NSNull null], departmentsArray]);
        }
    }];
}

RCT_EXPORT_METHOD(isMultipleOpenChatRestricted:(RCTResponseSenderBlock)callback)
{
    BOOL restricted = [[ZohoSalesIQ Chat] multipleOpenRestricted];
    callback(@[[NSNumber numberWithBool:restricted]]);
}

//MARK:- CHAT OPEN/SHOW API
RCT_EXPORT_METHOD(openChat){
    [[ZohoSalesIQ Chat] showWithReferenceID:nil new:NO];
}

RCT_EXPORT_METHOD(openChatWithID: (NSString *)id){
    [[ZohoSalesIQ Chat] showWithReferenceID:id new:NO];
}

RCT_EXPORT_METHOD(openNewChat){
    [[ZohoSalesIQ Chat] showWithReferenceID:nil new:YES];
}

//MARK:- CHAT END SESSION API
RCT_EXPORT_METHOD(endChat: (NSString *)ref_id){
    [[ZohoSalesIQ Chat] endSessionWithReferenceID:ref_id];
}

//MARK:- GET CATEGORIES LIST API
RCT_EXPORT_METHOD(getCategories:(RCTResponseSenderBlock)callback)
{
    [[ZohoSalesIQ FAQ] getCategoriesWithDepartmentIDS:nil :^(NSError * _Nullable error, NSArray<SIQFAQCategory *> * _Nullable categories) {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary, @""]);
        }else{
            callback(@[[NSNull null], [RNZohoSalesIQ getFAQCategoryList:categories]]);
        }
    }];
}

//MARK:- GET ARTICLES LIST API
RCT_EXPORT_METHOD(getArticles:(RCTResponseSenderBlock)callback)
{
    [[ZohoSalesIQ FAQ] getArticlesWithCategoryID:nil :^(NSError * _Nullable error, NSArray<SIQFAQArticle *> * _Nullable articles) {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary, @""]);
        }else{
            callback(@[[NSNull null], [RNZohoSalesIQ getArticlesList:articles]]);
        }
    }];
}

//MARK:- GET ARTICLES LIST WITH CATEGORY ID API
RCT_EXPORT_METHOD(getArticlesWithCategoryID:(NSString *)catid callback:(RCTResponseSenderBlock)callback)
{
    [[ZohoSalesIQ FAQ] getArticlesWithCategoryID:catid :^(NSError * _Nullable error, NSArray<SIQFAQArticle *> * _Nullable articles) {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary, @""]);
        }else{
            callback(@[[NSNull null], [RNZohoSalesIQ getArticlesList:articles]]);
        }
    }];
}

//MARK:- OPEN ARTICLE API
RCT_EXPORT_METHOD(openArticle:(NSString *)id callback:(RCTResponseSenderBlock)callback)
{
    [[ZohoSalesIQ FAQ] openArticleWithArticleID:id :^(NSError * _Nullable error)  {
        if(error != nil){
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getErrorObject:error];
            callback(@[errorDictionary]);
        }else{
            callback(@[[NSNull null]]);
        }
    }];
}

//MARK:- GET ATTENDER IMAGE
RCT_EXPORT_METHOD(fetchAttenderImage:(NSString *)id: (BOOL)fetchDefault: (RCTResponseSenderBlock)callback){
    SIQVisitorChat *chat = [SIQVisitorChat alloc];
    __block BOOL imageFetched = false;
    chat.attenderID = id;
    [[ZohoSalesIQ Chat] fetchAttenderImageWithChat:chat fetchDefaultImage:fetchDefault completion:^(NSError * _Nullable error, UIImage * _Nullable image) {
        
        NSString *base64String = [UIImagePNGRepresentation(image) base64EncodedStringWithOptions:0];
        if(base64String == nil){ base64String = @""; }
        
        if(!imageFetched){
            imageFetched = true;
            if(error != nil){
                callback(@[[RNZohoSalesIQ getErrorObject:error], base64String]);
            }else{
                callback(@[[NSNull null], base64String]);
            }
        }
    }];
}

RCT_EXPORT_METHOD(registerChatAction: (NSString *)actionName){
    
    SIQChatAction *chatAction = [[SIQChatAction alloc] initWithName:actionName action:^(SIQChatActionArguments * _Nonnull arguments, SIQActionHandler * _Nonnull handler) {
        NSString *uuid = [[NSUUID UUID] UUIDString];
        [actionDictionary setObject:handler forKey:uuid];
        [self sendEventWithName:PERFORM_CHATACTION body: [RNZohoSalesIQ getChatActionArguments:arguments withID:uuid actionName:actionName]];
    }];
    
    [[ZohoSalesIQ ChatActions] registerWithAction:chatAction];
}

RCT_EXPORT_METHOD(completeChatAction:(NSString *)uuid){
    if([actionDictionary valueForKey:uuid] != nil){
        SIQActionHandler *handler = [actionDictionary valueForKey:uuid];
        
        [handler successWithMessage:nil];
        [actionDictionary removeObjectForKey:uuid];
        
    }
}

RCT_EXPORT_METHOD(setChatActionTimeout:(NSNumber *  _Nonnull) timeout){
    [[ZohoSalesIQ ChatActions] setTimeout:timeout.doubleValue];
}


RCT_EXPORT_METHOD(completeChatActionWithMessage: (NSString *)uuid complete:(BOOL)complete message:(NSString*)message){
    
    if([actionDictionary valueForKey:uuid] != nil){
        SIQActionHandler *handler = [actionDictionary valueForKey:uuid];
        
        if(complete){
            [handler successWithMessage:message];
        }else{
            [handler faliureWithMessage:message];
        }
        
        [actionDictionary removeObjectForKey:uuid];
    }
    
}

RCT_EXPORT_METHOD(unregisterChatAction: (NSString *)actionName){
    [[ZohoSalesIQ ChatActions] unregisterWithNameWithName:actionName];
}

RCT_EXPORT_METHOD(unregisterAllChatActions){
    [[ZohoSalesIQ ChatActions] unregisterAll];
}

RCT_EXPORT_METHOD(setLoggerEnabled : (BOOL)enable){
    [[ZohoSalesIQ Logger] setEnabled:enable];
}

RCT_EXPORT_METHOD(clearLogsForiOS){
    [[ZohoSalesIQ Logger] clear];
}

RCT_EXPORT_METHOD(shouldOpenUrl : (BOOL)shouldOpen){
    handleURI = shouldOpen;
}

RCT_EXPORT_METHOD(setNotificationIconForAndroid:(NSString *)icon) {
    
}

RCT_EXPORT_METHOD(writeLogForiOS: (NSString *)log level:(NSString *)level callback:(RCTResponseSenderBlock)callback) {
    SIQDebugLogLevel debugLogLevel = SIQDebugLogLevelInfo;
    if([level isEqual: INFO_LOG]){
        debugLogLevel = SIQDebugLogLevelInfo;
    }else if ([level  isEqual: WARNING_LOG]){
        debugLogLevel = SIQDebugLogLevelWarning;
    }else if ([level  isEqual: ERROR_LOG]){
        debugLogLevel = SIQDebugLogLevelError;
    }
    
    [[ZohoSalesIQ Logger] write: log logLevel: debugLogLevel file:nil line:nil function:nil fileID:nil filePath:nil column:nil success:^(BOOL success) {
        NSNumber *complete = [NSNumber numberWithBool:success];
        callback(@[complete]);
    }];
    
}

RCT_EXPORT_METHOD(isLoggerEnabled:(RCTResponseSenderBlock)callback)
{
    NSNumber *logEnabled = [NSNumber numberWithBool:ZohoSalesIQ.Logger.isEnabled];
    callback(@[logEnabled]);
}

RCT_EXPORT_METHOD(setLoggerPathForiOS : (NSURL * _Nonnull)url){
    [[ZohoSalesIQ Logger] setPath:url];
}

RCT_EXPORT_METHOD(setTabOrder:(NSArray *)orders) {
    NSMutableArray *sendOrders = [[NSMutableArray alloc]init];
    for (int i = 0; i < orders.count; i++)
    {
        NSString  *currentObject = [orders objectAtIndex:i];
        if ([currentObject  isEqual: TAB_CONVERSATIONS]){
            [sendOrders addObject:[NSNumber numberWithInteger:0]];
        } else if ([currentObject isEqual:TAB_FAQ] || [currentObject isEqual:TAB_KNOWLEDGE_BASE]){
            [sendOrders addObject:[NSNumber numberWithInteger:1]];
        }
        
    }
    [ZohoSalesIQ setTabOrder: sendOrders];
}

RCT_EXPORT_METHOD(sendEvent: (NSString *)eventName values:(NSArray *)values){
    if ([eventName  isEqual: EVENT_OPEN_URL]) {
        if (handleURI == NO) {
            for (int i = 0; i < values.count; i++)
            {
                NSString *currentObject = [values objectAtIndex:i];
                NSMutableURLRequest *url = [[NSURL alloc] initWithString:currentObject];
                [ZohoSalesIQ openURL: url];
                break;
            }
        }
    } else if ([eventName  isEqual: EVENT_COMPLETE_CHAT_ACTION]) {
        NSString *uuid;
        BOOL complete;
        NSString *message;
        
        for (int i = 0; i < values.count; i++)
        {
            switch (i) {
                case 0:
                    uuid = [values objectAtIndex: 0];
                    break;
                case 1:
                    complete = [[values objectAtIndex:1] boolValue];
                case 2:
                    message = [values objectAtIndex: 2];
                default:
                    break;
            }
        }
        if (([actionDictionary valueForKey:uuid] != nil) && (uuid != nil)) {
            SIQActionHandler *handler = [actionDictionary valueForKey:uuid];
            if (message != nil) {
                if (complete == YES){
                    [handler successWithMessage:message];
                }else{
                    [handler faliureWithMessage:message];
                }
            }else {
                [handler successWithMessage:nil];
            }
            [actionDictionary removeObjectForKey:uuid];
        }
    }
}

//KnowledgeBase
RCT_EXPORT_METHOD(isKnowledgeBaseEnabled: (NSString*)type callback:(RCTResponseSenderBlock)callback)
{
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        NSNumber *chatEnabled = [NSNumber numberWithBool:[[ZohoSalesIQ KnowledgeBase] isEnabled:SIQResourceTypeArticles]];
        callback(@[chatEnabled]);
    }
}

RCT_EXPORT_METHOD(setKnowledgeBaseVisibility: (NSString*)type enable:(BOOL)enable)
{
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        [[ZohoSalesIQ KnowledgeBase] setVisibility:SIQResourceTypeArticles enable: enable];
    }
}

RCT_EXPORT_METHOD(categorizeKnowledgeBase: (NSString*)type enable:(BOOL)enable)
{
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        [[ZohoSalesIQ KnowledgeBase] categorize:SIQResourceTypeArticles enable:enable];
    }
}

RCT_EXPORT_METHOD(combineKnowledgeBaseDepartments: (NSString*)type enable:(BOOL)enable)
{
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        [[ZohoSalesIQ KnowledgeBase] combineDepartments:SIQResourceTypeArticles enable:enable];
    }
}

RCT_EXPORT_METHOD(setKnowledgeBaseRecentShowLimit:(NSInteger)limit) {
    [[ZohoSalesIQ KnowledgeBase] setRecentShowLimit:limit];
}

RCT_EXPORT_METHOD(getKnowledgeBaseResourceDepartments: (RCTResponseSenderBlock)callback) {
    [[ZohoSalesIQ KnowledgeBase] getResourceDepartmentsWithCompletion:^(id<SIQError> _Nullable error, NSArray<SIQResourceDepartment *> * _Nullable departments) {
        
        if (departments != nil) {
            NSMutableArray *departmentsArray = [NSMutableArray array];
            for (SIQResourceDepartment *department in departments) {
                NSMutableDictionary *departmentDict = [NSMutableDictionary dictionary];
                departmentDict[@"id"] = department.id;
                departmentDict[@"name"] = department.name;
                [departmentsArray addObject:departmentDict];
            }
            callback(@[[NSNull null], departmentsArray]);
        } else {
            NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getSIQErrorObject:error];
            callback(@[errorDictionary, [NSNull null]]);
        }
    }];
}

RCT_EXPORT_METHOD(openKnowledgeBase:(NSString *)type articleID:(NSString *)articleID callback:(RCTResponseSenderBlock)callback) {
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        [[ZohoSalesIQ KnowledgeBase] open:SIQResourceTypeArticles id:articleID completion:^(BOOL success, id<SIQError> _Nullable error) {
            NSNumber *succeeded = [NSNumber numberWithBool:success];
            if (error != nil) {
                NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getSIQErrorObject:error];
                callback(@[succeeded, errorDictionary]);
            } else {
                callback(@[succeeded, [NSNull null]]);
            }
        }];
    }
}

RCT_EXPORT_METHOD(getKnowledgeBaseSingleResource:(NSString *)type articleID:(NSString *)articleID callback:(RCTResponseSenderBlock)callback) {
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        [[ZohoSalesIQ KnowledgeBase]getSingleResource:SIQResourceTypeArticles id:articleID completion:^(BOOL success, id<SIQError> _Nullable error, SIQKnowledgeBaseResource * _Nullable resource) {
            if (error != nil) {
                NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getSIQErrorObject:error];
                callback(@[errorDictionary, [NSNull null]]);
            } else {
                NSMutableDictionary *resourceObject = [NSMutableDictionary dictionary];
                resourceObject = [RNZohoSalesIQ getResourceObject:resource];
                callback(@[[NSNull null], resourceObject]);
            }
        }];
    }
}

RCT_EXPORT_METHOD(getKnowledgeBaseResources:(NSString *)type departmentId:(NSString * _Nullable)departmentId parentCategoryId:(NSString * _Nullable)parentCategoryId page:(NSInteger)page limit:(NSInteger)limit searchKey:(NSString * _Nullable)searchKey callback:(RCTResponseSenderBlock)callback) {
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        NSInteger limitValue = limit;
        NSInteger pageValue = page;
        [[ZohoSalesIQ KnowledgeBase] getResources:SIQResourceTypeArticles departmentId:departmentId parentCategoryId:parentCategoryId searchKey:searchKey page:pageValue limit:limitValue completion:^(BOOL success, id<SIQError> _Nullable error, NSArray<SIQKnowledgeBaseResource *> * _Nullable resources, BOOL moreDataAvailable) {
            NSNumber *available = [NSNumber numberWithBool:moreDataAvailable];
            if (error != nil) {
                NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getSIQErrorObject:error];
                callback(@[errorDictionary, [NSNull null], available]);
            } else {
                NSMutableArray *resourceArray = [NSMutableArray array];
                resourceArray = [RNZohoSalesIQ getResourceList:resources];
                callback(@[[NSNull null], resourceArray, available]);
            }
        }];
    }
}

RCT_EXPORT_METHOD(getKnowledgeBaseCategories:(NSString *)type departmentId:(NSString * _Nullable)departmentId parentCategoryId:(NSString * _Nullable)parentCategoryId callback:(RCTResponseSenderBlock)callback) {
    if ([type isEqualToString: RESOURCE_ARTICLES]) {
        [[ZohoSalesIQ KnowledgeBase] getCategories:SIQResourceTypeArticles departmentId:departmentId parentCategoryId:parentCategoryId completion:^(BOOL success, id<SIQError> _Nullable error, NSArray<SIQKnowledgeBaseCategory *> * _Nullable categories) {
            if (error != nil) {
                NSMutableDictionary *errorDictionary = [RNZohoSalesIQ getSIQErrorObject:error];
                callback(@[errorDictionary, [NSNull null]]);
            } else {
                NSMutableArray *categoryArray = [NSMutableArray array];
                categoryArray = [RNZohoSalesIQ getCategoryList:categories];
                callback(@[[NSNull null], categoryArray]);
            }
        }];
    }
}

//MARK:- DELEGATE METHODS - EVENTS
- (void)agentsOffline {
    if (hasListeners)
        [self sendEventWithName:OPERATORS_OFFLINE body:[NSNull null]];
}

- (void)agentsOnline {
    if (hasListeners)
        [self sendEventWithName:OPERATORS_ONLINE body:[NSNull null]];
}

- (void)chatViewClosedWithId:(NSString * _Nullable)id {
    if (hasListeners)
        [self sendEventWithName:CHATVIEW_CLOSED body:id];
}

- (void)chatViewOpenedWithId:(NSString * _Nullable)id {
    if (hasListeners)
        [self sendEventWithName:CHATVIEW_OPENED body:id];
}

- (void)homeViewClosed {
    if (hasListeners)
        [self sendEventWithName:HOMEVIEW_CLOSED body:[NSNull null]];
}

- (void)homeViewOpened {
    if (hasListeners)
        [self sendEventWithName:HOMEVIEW_OPENED body:[NSNull null]];
}

- (void)supportClosed {
    if (hasListeners)
        [self sendEventWithName:SUPPORT_CLOSED body:[NSNull null]];
}

- (void)supportOpened {
    if (hasListeners)
        [self sendEventWithName:SUPPORT_OPENED body:[NSNull null]];
}

- (void)articleClosedWithId:(NSString * _Nullable)id {
    if (hasListeners)
        [self sendEventWithName:ARTICLE_CLOSED body:id];
}

- (void)articleDislikedWithId:(NSString * _Nullable)id {
    if (hasListeners)
        [self sendEventWithName:ARTICLE_DISLIKED body:id];
}

- (void)articleLikedWithId:(NSString * _Nullable)id {
    if (hasListeners)
        [self sendEventWithName:ARTICLE_LIKED body:id];
}

- (void)articleOpenedWithId:(NSString * _Nullable)id {
    if (hasListeners)
        [self sendEventWithName:ARTICLE_OPENED body:id];
}

- (void)chatAttendedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:CHAT_ATTENDED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatClosedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:CHAT_CLOSED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatFeedbackRecievedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:FEEDBACK_RECEIVED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatMissedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:CHAT_MISSED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatOpenedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:CHAT_OPENED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatQueuePositionChangedWithChat:(SIQVisitorChat *)chat {
    if (hasListeners)
        [self sendEventWithName:CHAT_QUEUE_POSITION_CHANGED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatRatingRecievedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:RATING_RECEIVED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)chatReopenedWithChat:(SIQVisitorChat * _Nullable)chat {
    if (hasListeners)
        [self sendEventWithName:CHAT_REOPENED body: [RNZohoSalesIQ getChatObject:chat]];
}

- (void)unreadCountChanged:(NSInteger)count {
    if (hasListeners)
        [self sendEventWithName:CHAT_UNREAD_COUNT_CHANGED body: @(count)];
}

- (void)visitorIPBlocked {
    if (hasListeners)
        [self sendEventWithName:VISITOR_IPBLOCKED body:[NSNull null]];
}

- (BOOL)shouldOpenURL:(NSURL *)url in:(SIQVisitorChat * _Nullable)chat {
    NSMutableDictionary *chatDict = [NSMutableDictionary dictionary];
    chatDict = [RNZohoSalesIQ getChatObject:chat];
    [chatDict setObject:url.absoluteString forKey:@"url"];
    [self sendEventWithName:EVENT_HANDLE_URL body: chatDict];
    return handleURI;
}

- (void) handleTriggerWithName:(NSString *)name visitorInformation:(SIQVisitor *)visitorInformation{
    if (hasListeners){
        
        NSMutableDictionary *triggerInformation = [NSMutableDictionary dictionary];
        
        NSMutableDictionary *visitorInfo = [RNZohoSalesIQ getVisitorObject:visitorInformation];
        
        if(visitorInfo != nil){
            [triggerInformation setObject:visitorInfo forKey:@"visitorInformation"];
        }
        
        if(name != nil){
            [triggerInformation setObject:name forKey:@"triggerName"];
        }
        
        [self sendEventWithName:CUSTOMTRIGGER body: triggerInformation];
        
    }
}

- (void)handleBotTrigger {
    if (hasListeners)
        [self sendEventWithName:BOT_TRIGGER body:[NSNull null]];
}

- (void)handleResourceOpened:(enum SIQResourceType)type resource:(SIQKnowledgeBaseResource * _Nullable)resource {
    if (hasListeners) {
        NSMutableDictionary *resourceInformation = [self prepareResourceInformation:type resource:resource];
        [self sendEventWithName:EVENT_RESOURCE_OPENED body: resourceInformation];
    }
}

- (void)handleResourceClosed:(enum SIQResourceType)type resource:(SIQKnowledgeBaseResource * _Nullable)resource {
    if (hasListeners) {
        NSMutableDictionary *resourceInformation = [self prepareResourceInformation:type resource:resource];
        [self sendEventWithName:EVENT_RESOURCE_CLOSED body: resourceInformation];
    }
}


- (void)handleResourceLiked:(enum SIQResourceType)type resource:(SIQKnowledgeBaseResource * _Nullable)resource {
    if (hasListeners) {
        NSMutableDictionary *resourceInformation = [self prepareResourceInformation:type resource:resource];
        [self sendEventWithName:EVENT_RESOURCE_LIKED body: resourceInformation];
    }
}


- (void)handleResourceDisliked:(enum SIQResourceType)type resource:(SIQKnowledgeBaseResource * _Nullable)resource {
    if (hasListeners) {
        NSMutableDictionary *resourceInformation = [self prepareResourceInformation:type resource:resource];
        [self sendEventWithName:EVENT_RESOURCE_DISLIKED body: resourceInformation];
    }
}

@end
