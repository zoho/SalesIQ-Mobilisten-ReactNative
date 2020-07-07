
# react-native-zohosalesiq-mobilisten

## Getting started

`$ npm install react-native-zohosalesiq-mobilisten --save`

### Automatic installation

`$ react-native link react-native-zohosalesiq-mobilisten`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-zohosalesiq-mobilisten` and add `RNZohosalesiqMobilisten.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNZohosalesiqMobilisten.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNZohosalesiqMobilistenPackage;` to the imports at the top of the file
  - Add `new RNZohosalesiqMobilistenPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-zohosalesiq-mobilisten'
  	project(':react-native-zohosalesiq-mobilisten').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-zohosalesiq-mobilisten/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-zohosalesiq-mobilisten')
  	```

## Usage
```javascript
import { ZohoSalesIQ } from 'react-native-zohosalesiq-mobilisten';

if (Platform.OS === 'ios'){
    ZohoSalesIQ.init("ios_app_key","ios_access_key");
    ZohoSalesIQ.setLauncherVisibility(true);
    //By default, if you wish to display the chat button/bubble on the application, then use .setLauncherVisibility() API.
}
else{
   ZohoSalesIQ.init("android_app_key","android_access_key");
   ZohoSalesIQ.setLauncherVisibility(true);
   //By default, if you wish to display the chat button/bubble on the application, then use .setLauncherVisibility() API.
}
```
