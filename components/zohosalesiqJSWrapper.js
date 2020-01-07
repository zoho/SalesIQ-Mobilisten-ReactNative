const {NativeModules} = require('react-native');
const {RNZohoSalesIQ} = NativeModules;
module.exports = {
    init: function(appKey,accessKey) {
        RNZohoSalesIQ.init(appKey,accessKey);
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
    setThemeColorforAndroid : function(attribute, color_code){
      RNZohoSalesIQ.setThemeColorforAndroid(attribute, color_code);
    },
    setThemeColorforiOS : function(color_code){
      RNZohoSalesIQ.setThemeColorforiOS(color_code);
    },
    showOperatorImageinLauncher : function(show){
        RNZohoSalesIQ.showOperatorImageinLauncher(show);
    },
    openChat : function(){
        RNZohoSalesIQ.openChat();
    },
    endChat : function(){
        RNZohoSalesIQ.endChat();
    },
    showOperatorImageInChat : function(show){
        RNZohoSalesIQ.showOperatorImageInChat(show);
    },
    setLauncherVisibility : function(visibility){
      RNZohoSalesIQ.setLauncherVisibility(visibility);
    },
    showOfflineMessage : function(show){
        RNZohoSalesIQ.showOfflineMessage(show);
    },
    setRatingVisibility : function(visibility){
      RNZohoSalesIQ.setRatingVisibility(visibility);
    },
    setFeedbackVisibility : function(visibility){
      RNZohoSalesIQ.setFeedbackVisibility(visibility);
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
    registerVisitor : function(uniqueid){
      RNZohoSalesIQ.registerVisitor(uniqueid);
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
    enableInAppNotification : function(){
      RNZohoSalesIQ.enableInAppNotification();
    },
    disableInAppNotification : function(){
      RNZohoSalesIQ.disableInAppNotification();
    },
    setConversationVisibility : function(visibility){
      RNZohoSalesIQ.setConversationVisibility(visibility);
    },
    setFAQVisibility : function(visibility){
      RNZohoSalesIQ.setFAQVisibility(visibility);
    }
}
