[![SupportedLanguages](https://img.shields.io/badge/Platforms-iOS%20%7C%20%20Android-green.svg)](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html) [![Version](https://img.shields.io/badge/version-10.0.0-blue.svg)](https://mobilisten.io/) [![Mobilisten NPM CD](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/workflows/Mobilisten%20NPM%20CD/badge.svg)](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/actions)

# React Native module for SalesIQ Mobilisten SDK

Connect with customers at every step of their journey. Give them the best in-app live chat experience with Mobilisten. Mobilisten enables customers to reach you from any screen on your app, get their questions answered, and make better purchase decisions.

## Getting Started
[**Mobilisten**](https://mobilisten.io/) is a support chat SDK that comes with a set of highly configurable APIs to suit your needs. Get started by generating an `App` and `Access` keys for your bundle ID from the SalesIQ console.

## Requirements

**iOS**: Minimum deployment target should be set to iOS 12.

**Android**: Android API level 21 or above is required.

## Installation
Follow the below steps given below to complete installation of **Mobilisten** in your React-Native app.

1. Install the **react-native-zohosalesiq-mobilisten** package using NPM.
```ruby
npm install react-native-zohosalesiq-mobilisten --save
```

2. Link the module with the react native app
```ruby
react-native link react-native-zohosalesiq-mobilisten
```

#### Installation steps for iOS

1. Navigate to the `ios` folder in the project directory.

2. Run the `pod repo update && pod install` command from the `ios` directory.

For the RNZohoSalesIQ version below `10.0.0`:

1. Open your podfile.

2. Add the "/ios" to the path for the RNZohoSalesIQ pod, as shown below. 
   
```diff
- pod 'RNZohoSalesIQ', :path => '../node_modules/react-native-zohosalesiq-mobilisten'
+ pod 'RNZohoSalesIQ', :path => '../node_modules/react-native-zohosalesiq-mobilisten/ios'
```     
3. Run `pod install` after saving the changes made to the Podfile.

**Note:** If you're updating from the SDK versions below `10.0.0` to above, remove the above path in your `Podfile` and run the `pod install` in the iOS folder.

#### Installation steps for Android

1. If you're using React Native v0.60 or above, the dependency will be linked automatically without
   any steps being taken.

#### Android: Auto linking with React Native v0.59 and below

```
$ react-native link react-native-zohosalesiq-mobilisten
```

#### Android: Manual linking with React Native v0.59 and below

- Add the below code to the `android/settings.gradle`

```Gradle
include ':react-native-zohosalesiq-mobilisten'
project(':react-native-zohosalesiq-mobilisten').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-zohosalesiq-mobilisten/android')
```

- Implement the dependency in the `android/app/build.gradle` file inside `dependencies`

```Gradle
implementation project(':react-native-zohosalesiq-mobilisten')
```

- Add the below snippet to `android/app/src/main/java/com/module_name/MainApplication.java` if the
  packages were not auto-generated.

```java
private final ReactNativeHost mReactNativeHost=new ReactNativeHost(this){
// ...
@Override
protected List<ReactPackage> getPackages(){
        // Add new RNZohoSalesIQPackage() into the React packages list like below
        return new ArrayList<>(Arrays.<ReactPackage>asList(new RNZohoSalesIQPackage()));
        }
        // ...
        };

@Override
public ReactNativeHost getReactNativeHost(){
        return mReactNativeHost;
        }
```

2. Navigate to the `android` folder within the project directory using Android Studio or any other
   platform of choice for Android development.
   Add the following maven repository to the `build.gradle` file.

```Gradle
allprojects {
      repositories {
        // ...
          maven { url 'https://maven.zohodl.com' }
      }
}
```

3. Click `Sync Now` from the toolbar on the IDE.

## Initializing Mobilisten

1. Generate `App` and `Access` keys for iOS and Android platforms by providing your bundle id.
2. Use the `ZohoSalesIQ.initWithCallback` API with keys for each platform as shown below.

```js
import { ZohoSalesIQ } from 'react-native-zohosalesiq-mobilisten';

let appKey;
let accessKey;

if (Platform.OS === 'ios') {
    appKey = "ios_app_key";
    accessKey = "ios_access_key";
} else {
    appKey = "android_app_key";
    accessKey = "android_access_key";
}

ZohoSalesIQ.initWithCallback((appKey, accessKey, success) => {
    // Your code
});
```

3. If you want to show the default chat launcher, use the [**ZohoSalesIQ.Launcher.show()**](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-launcher-show.html) API (Optional).

## API Documentation
You can find the list of all APIs and their documentation [here](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-add-event-listener.html) under the **API Reference** section.
