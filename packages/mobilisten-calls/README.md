[![SupportedLanguages](https://img.shields.io/badge/Platforms-iOS%20%7C%20%20Android-green.svg)](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html) [![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://mobilisten.io/) [![Mobilisten NPM CD](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/workflows/Mobilisten%20NPM%20CD/badge.svg)](https://github.com/zoho/SalesIQ-Mobilisten-ReactNative/actions)

# React Native module for SalesIQ Mobilisten Calls SDK

## Requirements

**Android**:
Ensure that your project meets the following requirements:

- Minimum Android Version: Android 6.0 (Marshmallow) (API Level 23)
- Compile SDK Version: 35 (Android 15)
- Required Permissions:
  - android.permission.INTERNET (Required for network operations)
  - android.permission.POST_NOTIFICATIONS
  - android.permission.FOREGROUND_SERVICE_SPECIAL_USE
  - android.permission.FOREGROUND_SERVICE_PHONE_CALL
  - android.permission.FOREGROUND_SERVICE_MICROPHONE
  - android.permission.MANAGE_OWN_CALLS
  - android.hardware.sensor.proximity
  - android.permission.BLUETOOTH_CONNECT
  - android.permission.USE_FULL_SCREEN_INTENT
  - android.permission.MODIFY_AUDIO_SETTINGS
  - android.permission.SYSTEM_ALERT_WINDOW
  - android.permission.RECORD_AUDIO
  - android.permission.VIBRATE

**iOS**: iOS 13 or above is required.

## Installation
Follow the below steps given below to complete installation of **Mobilisten** in your React-Native app.

1. Install the **@react-native-zohosalesiq/mobilisten** package using NPM.
   // Mobilisten package is mandatory for calls to work
```ruby
npm install @react-native-zohosalesiq/mobilisten-core @react-native-zohosalesiq/mobilisten @react-native-zohosalesiq/mobilisten-calls --save
```

2. Link the module with the react native app
```ruby
react-native link @react-native-zohosalesiq/mobilisten-core @react-native-zohosalesiq/mobilisten-core @react-native-zohosalesiq/mobilisten-calls
```

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

1. If you're using React Native v0.60 or above, the dependency will be linked automatically without
   any steps being taken.

#### Android: Auto linking with React Native v0.59 and below

```
react-native link @react-native-zohosalesiq/mobilisten react-native link @react-native-zohosalesiq/mobilisten-calls
```

#### Android: Manual linking with React Native v0.59 and below

- Add the below code to the `android/settings.gradle`

```Gradle
include ':react-native-zohosalesiq_mobilisten-core'
project(':react-native-zohosalesiq_mobilisten-core').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-zohosalesiq/mobilisten-core/android')

include ':react-native-zohosalesiq_mobilisten'
project(':react-native-zohosalesiq_mobilisten').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-zohosalesiq/mobilisten/android')

include ':react-native-zohosalesiq_mobilisten-calls'
project(':react-native-zohosalesiq_mobilisten-calls').projectDir = new File(rootProject.projectDir, '../node_modules/@react-native-zohosalesiq/mobilisten-calls/android')
```

- Implement the dependency in the `android/app/build.gradle` file inside `dependencies`

```Gradle
implementation project(':react-native-zohosalesiq_mobilisten-calls')
```

- Add the below snippet to `android/app/src/main/java/com/module_name/MainApplication.java` if the
  packages were not auto-generated.

```java
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    // ...
    @Override
    protected List<ReactPackage> getPackages() {
        // Add new RNZohoSalesIQCallsPackage() into the React packages list like below
        return new ArrayList<>(Arrays.<ReactPackage>asList(new RNZohoSalesIQCallsPackage()));
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
   Add the following maven repository to the `build.gradle` or `settings.gradle` file.

For Gradle version 6.7 and below
```Gradle
// Add the following to your project's root build.gradle file.

allprojects {
   repositories {
      google()
      mavenCentral()
      // ...
      maven { url 'https://maven.zohodl.com' }
   }
}
```

For Gradle version 6.8 and above
```Gradle
// Add the following to your settings.gradle file.

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        // Add the Zoho Maven URL here
        maven { url 'https://maven.zohodl.com' }
    }
}
```

3. Click `Sync Now` from the toolbar on the IDE.

## New Architecture support: (RN >= 0.73)

To take advantage of the new architecture

4. **iOS**
- Open the `ios/Podfile`  file
  Add `ENV['RCT_NEW_ARCH_ENABLED'] = '1'` in the main scope of your `Podfile`
```diff
# Resolve react_native_pods.rb with node to allow for hoisting
+ ENV['RCT_NEW_ARCH_ENABLED'] = '1'
require Pod::Executable.execute_command('node', ['-p',
  'require.resolve(
    "react-native/scripts/react_native_pods.rb",
    {paths: [process.argv[1]]},
  )', __dir__]).strip
```

- Navigate to the `ios` folder under the project directory and run `pod install`.

5. **Android**
- Open the `android/gradle.properties` file.
  Toggle the `newArchEnabled` flag from `false` to `true`.

```diff
# Use this property to enable support to the new architecture.
# This will allow you to use TurboModules and the Fabric render in
# your application. You should enable this flag either if you want
# to write custom TurboModules/Fabric components OR use libraries that
# are providing them.
+ newArchEnabled=true
- newArchEnabled=false
```   
> **Note:** While switching between old architecture and new architecture remove the node_modules folder and then run your project.

## API Documentation
You can find the list of all APIs and their documentation [here](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-add-event-listener.html) under the **API Reference** section.
