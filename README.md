## Integrate React Native ZohoSalesIQ SDK:

Open your react-native project in the terminal and install the package using the commands as follows :

    - npm install react-native-zohosalesiq-mobilisten --save
    - react-native link react-native-zohosalesiq-mobilisten

###### iOS Setup :

Open **Podfile** inside the **ios** folder of your react native project.

If you don't have Podfile, run the following command from the ios folder :

```
pod init
```

Include **ZohoSalesIQ React Native SDK** into your Podfile as follows :

```
target 'YourProjectName' do

pod 'RNZohoSalesIQ', :path => '../node_modules/react-native-zohosalesiq-mobilisten/ios/RNZohoSalesIQ.podspec'

end
```

Run command **pod install** from the ios directory.

**Note :**
After a successful pod install, open the iOS project in Xcode and navigate to the **Build Settings > Build Options** and set **ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES** to **Yes**

###### Android Setup :

Open the android folder of your react-native project in Android Studio or any other platform for Android development.

Add the following maven repository in the project level build.gradle file.

```
allprojects {
    repositories {
  .....
      maven { url 'https://maven.zohodl.com' }
    }
}
```

Then, press **Sync Now** in the bar that appears in the IDE.


Help Doc :- [ZohoSalesIQ ReactNative SDK](https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-installation.html)
