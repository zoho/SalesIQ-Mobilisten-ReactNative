[![SupportedLanguages](https://img.shields.io/badge/Platforms-iOS%20%7C%20%20Android-green.svg)](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html) [![Version](https://img.shields.io/badge/version-3.5.1-blue.svg)](https://mobilisten.io/) [![Mobilisten NPM CD](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/workflows/Mobilisten%20NPM%20CD/badge.svg)](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/actions)

# React Native wrapper for SalesIQ Mobilisten SDK

Connect with customers at every step of their journey. Give them the best in-app live chat experience with Mobilisten. Mobilisten enables customers to reach you from any screen on your app, get their questions answered, and make better purchase decisions.

## Getting Started
**Mobilisten** is a support chat SDK that comes with a set of highly configurable APIs to suit your needs. Get started by generating an `App` and `Access` keys for your bundle ID from the SalesIQ console.

## Requirements
**iOS**: Minimum deployment target should be set to iOS 10
**Android**: Android API level 14 and above is required.

## Installation
Follow the below steps given below to complete installation of **Mobilisten** in your react-native app.

####Installation steps for iOS

1. Install the **react-native-zohosalesiq-mobilisten** package using NPM.
```ruby
npm install react-native-zohosalesiq-mobilisten --save
```

2. Link the module with the react native app
```ruby
react-native link react-native-zohosalesiq-mobilisten
```

3. Navigate to the **ios** folder in the project directory and open **Podfile**.
Add the "**/ios**" to the path for the **RNZohoSalesIQ** pod as shown below.
```ruby
pod 'RNZohoSalesIQ', :path => '../node_modules/react-native-zohosalesiq-mobilisten/ios'
```

4. Run the `pod repo update && pod install` command from the **ios** directory.

####Installation steps for Android

1. Navigate to the **android** folder within the project directory using Anroid Studio or any other platform of choice for Android development.
Add the following maven repository to the **build.gradle** file.
```
allprojects {
      repositories {
        .....
          maven { url 'https://maven.zohodl.com' }
      }
}
```
2. Click **Sync Now** from the toolbar on the IDE.

####Initializing Mobilisten
1. Generate `App` and `Access` keys for iOS and Android platforms.
2. Use the **ZohoSalesIQ.init** API with keys for each platform as shown below.
```js
import { ZohoSalesIQ } from 'react-native-zohosalesiq-mobilisten';

if (Platform.OS === 'ios'){
    ZohoSalesIQ.init("ios_app_key","ios_access_key");
}else{
    ZohoSalesIQ.init("android_app_key","android_access_key");
}
```
3. If you wish to show the default launcher, use the [**ZohoSalesIQ.setLauncherVisibility**](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-launcher-visibility.html) API.

