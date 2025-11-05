[![SupportedLanguages](https://img.shields.io/badge/Platforms-iOS%20%7C%20%20Android-green.svg)](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html) [![Version](https://img.shields.io/badge/version-12.0.0-blue.svg)](https://mobilisten.io/) [![Mobilisten NPM CD](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/workflows/Mobilisten%20NPM%20CD/badge.svg)](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/actions)

# React Native module for SalesIQ Mobilisten SDK

Connect with customers at every step of their journey. Give them the best in-app live chat
experience with Mobilisten. Mobilisten enables customers to reach you from any screen on your app,
get their questions answered, and make better purchase decisions.

## Getting Started

[**Mobilisten**](https://mobilisten.io/) is a support chat SDK that comes with a set of highly
configurable APIs to suit your needs. Get started by generating an `App` and `Access` keys for your
bundle ID from the SalesIQ console.

## Requirements

**iOS**: Minimum deployment target should be set to iOS 13.

**Android**:
Ensure that your project meets the following requirements:

- Minimum Android Version: Android 6.0 (Lollipop) (API Level 23)
- Compile SDK Version: 35 (Android 15)
- Required Permissions:
   - android.permission.INTERNET (Required for network operations)

## Installation

Follow the below steps given below to complete installation of **Mobilisten** in your React-Native
app.

1. Install the **@react-native-zohosalesiq/mobilisten** package using NPM.

```bash
npm install @react-native-zohosalesiq/mobilisten-core @react-native-zohosalesiq/mobilisten
```

(Optional) Run this only if you want to integrate Mobilisten Calls along with Mobilisten
```bash
npm install @react-native-zohosalesiq/mobilisten-core @react-native-zohosalesiq/mobilisten @react-native-zohosalesiq/mobilisten-calls
```
Refer to
this [README](https://github.com/zoho/salesiq-mobilisten-ReactNative/tree/main/packages/mobilisten-calls/README.md)
for more details with calls integration

2. Link the module with the react native app
   If you're using React Native v0.60 or above, the dependency will be linked automatically without
   any steps being taken.

#### Android: Auto linking with React Native v0.59 and below

```bash
react-native link @react-native-zohosalesiq/mobilisten-core  @react-native-zohosalesiq/mobilisten
```

(Optional) Run this only if you want to integrate Mobilisten Calls along with Mobilisten
```bash
react-native link @react-native-zohosalesiq/mobilisten-calls
```

#### Android: Manual linking with React Native v0.59 and below

- Add the below code to the `android/settings.gradle`

```Gradle
include ':react-native-zohosalesiq_mobilisten-core'
project(':react-native-zohosalesiq_mobilisten-core').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-zohosalesiq_mobilisten-core/android')
include ':react-native-zohosalesiq_mobilisten'
project(':react-native-zohosalesiq_mobilisten').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-zohosalesiq_mobilisten/android')
```
(Optional)
```Gradle
include ':react-native-zohosalesiq_mobilisten-calls'
project(':react-native-zohosalesiq_mobilisten-calls').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-zohosalesiq_mobilisten-calls/android')
```

- Implement the dependency in the `android/app/build.gradle` file inside `dependencies`

```Gradle
implementation project(':react-native-zohosalesiq_mobilisten')
```

Note: `mobilisten-core` must be linked mandatorily.

#### Installation steps for iOS

1. Navigate to the `ios` folder in the project directory.

2. Run the `pod repo update && pod install` command from the `ios` directory.

For the RNZohoSalesIQ version below `10.0.0`:

1. Open your podfile.

2. Add the "/ios" to the path for the RNZohoSalesIQ pod, as shown below.

```ruby
pod 'RNZohoSalesIQ', :path => '../node_modules/@react-native-zohosalesiq/mobilisten/ios'
```

3. Run `pod install` after saving the changes made to the Podfile.

> **Note:** If you're updating from the SDK versions below `10.0.0` to above, remove the above path in your `Podfile` and run the `pod install` in the iOS folder.

#### Installation steps for Android

4. Navigate to the **android** folder within the project directory using Android Studio or any other
   platform of choice for Android development.
   Add the following maven repository to the **build.gradle** file.

```gradle
allprojects {
      repositories {
        .....
          maven { url 'https://maven.zohodl.com' }
      }
}
```

5. Click **Sync Now** from the toolbar on the IDE.

## Initializing Mobilisten

1. Generate `App` and `Access` keys for iOS and Android platforms by providing your bundle id.
2. Use the **ZohoSalesIQ.init** API with keys for each platform as shown below.

```js
import { ZohoSalesIQ } from '@react-native-zohosalesiq/mobilisten';

// OPTIONAL - Only If Calls feature is required.
import { ZohoSalesIQCalls } from '@react-native-zohosalesiq/mobilisten-calls';

let APP_KEY;
let ACCESS_KEY;
if (Platform.OS === 'ios'){
    APP_KEY = "ios_app_key";
    ACCESS_KEY = "ios_access_key";
} else {
    APP_KEY = "android_app_key";
    ACCESS_KEY = "android_access_key";
}

// OPTIONAL - Only If Calls feature is required.
ZohoSalesIQCalls.initialiseForiOS();

ZohoSalesIQ.initialize({ appKey: APP_KEY, accessKey: ACCESS_KEY }).then(() => {
  ZohoSalesIQ.Launcher.show(ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS); // Show the chat launcher
  // Your logic after initialization
}).catch((error) => {
  // Handle initialization error
});
```

3. If you wish to show the default chat launcher, use the [**ZohoSalesIQ.Launcher.show()**](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-launcher-show.html)
   API (Optional).

## API Documentation

You can find the list of all APIs and their
documentation [here](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-add-event-listener.html)
under the **API Reference** section.