const {NativeModules} = require('react-native');    //No I18N
const {RNZohoSalesIQ} = NativeModules;
import {NativeEventEmitter} from 'react-native';    //No I18N
const emitter = new NativeEventEmitter(RNZohoSalesIQ);

module.exports = {
    TYPE_OPEN : RNZohoSalesIQ.TYPE_OPEN,
    TYPE_WAITING : RNZohoSalesIQ.TYPE_WAITING,
    TYPE_CONNECTED : RNZohoSalesIQ.TYPE_CONNECTED,
    TYPE_ENDED : RNZohoSalesIQ.TYPE_ENDED,
    TYPE_CLOSED : RNZohoSalesIQ.TYPE_CLOSED,
    TYPE_MISSED : RNZohoSalesIQ.TYPE_MISSED,

    EVENT_SUPPORT_OPENED : RNZohoSalesIQ.SUPPORT_OPENED,
    EVENT_SUPPORT_CLOSED : RNZohoSalesIQ.SUPPORT_CLOSED,
    EVENT_VISITOR_IPBLOCKED : RNZohoSalesIQ.VISITOR_IPBLOCKED,
    EVENT_OPERATORS_ONLINE : RNZohoSalesIQ.OPERATORS_ONLINE,
    EVENT_OPERATORS_OFFLINE : RNZohoSalesIQ.OPERATORS_OFFLINE,

    EVENT_CHATVIEW_OPENED : RNZohoSalesIQ.CHATVIEW_OPENED,
    EVENT_CHATVIEW_CLOSED : RNZohoSalesIQ.CHATVIEW_CLOSED,
    EVENT_CHAT_OPENED : RNZohoSalesIQ.CHAT_OPENED,
    EVENT_CHAT_CLOSED : RNZohoSalesIQ.CHAT_CLOSED,
    EVENT_CHAT_REOPENED : RNZohoSalesIQ.CHAT_REOPENED,
    EVENT_CHAT_ATTENDED : RNZohoSalesIQ.CHAT_ATTENDED,
    EVENT_CHAT_MISSED : RNZohoSalesIQ.CHAT_MISSED,
    EVENT_FEEDBACK_RECEIVED : RNZohoSalesIQ.FEEDBACK_RECEIVED,
    EVENT_RATING_RECEIVED : RNZohoSalesIQ.RATING_RECEIVED,

    EVENT_ARTICLE_LIKED : RNZohoSalesIQ.ARTICLE_LIKED,
    EVENT_ARTICLE_DISLIKED : RNZohoSalesIQ.ARTICLE_DISLIKED,
    EVENT_ARTICLE_OPENED : RNZohoSalesIQ.ARTICLE_OPENED,
    EVENT_ARTICLE_CLOSED : RNZohoSalesIQ.ARTICLE_CLOSED,
    EVENT_PERFORM_CHATACTION : RNZohoSalesIQ.PERFORM_CHATACTION,
    EVENT_CUSTOMTRIGGER: RNZohoSalesIQ.CUSTOMTRIGGER,

    init: function(appKey,accessKey){
        RNZohoSalesIQ.init(appKey,accessKey);
    },
    initWithCallback: function(appKey,accessKey,callback){
        RNZohoSalesIQ.initWithCallback(appKey,accessKey,callback);
    },
    setChatTitle : function(title){
        RNZohoSalesIQ.setChatTitle(title);
    },
    setLanguage : function(language_code){
        RNZohoSalesIQ.setLanguage(language_code);
    },
    setDepartment : function(department){
        RNZohoSalesIQ.setDepartment(department);
    },
    setOperatorEmail : function(email){
        RNZohoSalesIQ.setOperatorEmail(email);
    },
    showOperatorImageInChat : function(show){
        RNZohoSalesIQ.showOperatorImageInChat(show);
    },
    setFeedbackVisibility : function(visibility){
      RNZohoSalesIQ.setFeedbackVisibility(visibility);
    },
    setRatingVisibility : function(visibility){
      RNZohoSalesIQ.setRatingVisibility(visibility);
    },
    showOperatorImageInLauncher : function(show){
        RNZohoSalesIQ.showOperatorImageInLauncher(show);
    },
    openChat : function(){
        RNZohoSalesIQ.openChat();
    },
    openChatWithID : function(id){
        RNZohoSalesIQ.openChatWithID(id);
    },
    showOfflineMessage : function(show){
        RNZohoSalesIQ.showOfflineMessage(show);
    },
    endChat : function(id){
        RNZohoSalesIQ.endChat(id);
    },
    getChats : function(callback){
        RNZohoSalesIQ.getChats(callback);
    },
    getChatsWithFilter : function(filter, callback){
        RNZohoSalesIQ.getChatsWithFilter(filter, callback);
    },
    setLauncherVisibility : function(visibility){
      RNZohoSalesIQ.setLauncherVisibility(visibility);
    },
    setVisitorName : function(name){
      RNZohoSalesIQ.setVisitorName(name);
    },
    setVisitorEmail : function(email){
      RNZohoSalesIQ.setVisitorEmail(email);
    },
    setVisitorContactNumber : function(number){
      RNZohoSalesIQ.setVisitorContactNumber(number);
    },
    setVisitorAddInfo : function(key, value){
        RNZohoSalesIQ.setVisitorAddInfo(key, value);
    },
    setQuestion : function(question){
        RNZohoSalesIQ.setQuestion(question);
    },
    startChat : function(message){
        RNZohoSalesIQ.startChat(message);
    },
    setConversationVisibility : function(visibility){
      RNZohoSalesIQ.setConversationVisibility(visibility);
    },
    setConversationListTitle : function(title){
      RNZohoSalesIQ.setConversationListTitle(title);
    },
    setFAQVisibility : function(visibility){
      RNZohoSalesIQ.setFAQVisibility(visibility);
    },
    getArticles : function(callback){
      RNZohoSalesIQ.getArticles(callback);
    },
    getArticlesWithCategoryID : function(id, callback){
      RNZohoSalesIQ.getArticlesWithCategoryID(id, callback);
    },
    getCategories : function(callback){
      RNZohoSalesIQ.getCategories(callback);
    },
    openArticle : function(id, callback){
      RNZohoSalesIQ.openArticle(id, callback);
    },
    fetchAttenderImage : function(atttenderId, fetchDefaultImage, callback){
      RNZohoSalesIQ.fetchAttenderImage(atttenderId, fetchDefaultImage, callback);
    },
    registerVisitor : function(visitorId){
      RNZohoSalesIQ.registerVisitor(visitorId);
    },
    setThemeColorforAndroid: function(attribute, colorCode){
      RNZohoSalesIQ.setThemeColorforAndroid(attribute, colorCode);
    },
    setThemeColorforiOS: function(colorCode){
      RNZohoSalesIQ.setThemeColorforiOS(colorCode);
    },
    setVisitorNameVisibility: function(visible){
      RNZohoSalesIQ.setVisitorNameVisibility(visible);
    },
    enablePreChatForms: function(){
      RNZohoSalesIQ.enablePreChatForms();
    },
    disablePreChatForms: function(){
      RNZohoSalesIQ.disablePreChatForms();
    },
    enableVoiceMessages: function(){
      RNZohoSalesIQ.enableVoiceMessages();
    },
    disableVoiceMessages: function(){
      RNZohoSalesIQ.disableVoiceMessages();
    },
    enableScreenshotOption: function(){
      RNZohoSalesIQ.enableScreenshotOption();
    },
    disableScreenshotOption: function(){
      RNZohoSalesIQ.disableScreenshotOption();
    },
    enableInAppNotification: function(){
      RNZohoSalesIQ.enableInAppNotification();
    },
    disableInAppNotification: function(){
      RNZohoSalesIQ.disableInAppNotification();
    },
    unregisterVisitor : function(){
      RNZohoSalesIQ.unregisterVisitor();
    },
    setPageTitle : function(title){
      RNZohoSalesIQ.setPageTitle(title);
    },
    setCustomAction : function(actionName){
      RNZohoSalesIQ.setCustomAction(actionName);
    },
    performCustomAction : function(actionName){
      RNZohoSalesIQ.performCustomAction(actionName);
    },
    registerChatAction : function(chatActionName){
      RNZohoSalesIQ.registerChatAction(chatActionName);
    },
    unregisterChatAction : function(chatActionName){
      RNZohoSalesIQ.unregisterChatAction(chatActionName);
    },
    unregisterAllChatActions: function(){
      RNZohoSalesIQ.unregisterAllChatActions();
    },
    completeChatAction: function(uuid){
      RNZohoSalesIQ.completeChatAction(uuid);
    },
    completeChatActionWithMessage: function(uuid, success, message){
      RNZohoSalesIQ.completeChatActionWithMessage(uuid, success, message);
    },
    setChatActionTimeout: function(timeout){
      RNZohoSalesIQ.setChatActionTimeout(timeout);
    },
    setVisitorLocation: function(location){
      RNZohoSalesIQ.setVisitorLocation(location);
    },
    addEventListener: function (type, listener){
        listener = emitter.addListener(type, listener);
    },
    syncThemeWithOS: function(sync){
      RNZohoSalesIQ.syncThemeWithOS(sync);
    }
}
