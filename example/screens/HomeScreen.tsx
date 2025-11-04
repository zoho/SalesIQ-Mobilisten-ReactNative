import React from "react";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View } from "react-native";
import { styles } from "../styles/styles";
import SalesIQLogoComponent from "../components/SalesIQLogoComponent";
import ButtonComponent from "../components/ButtonComponent";
import LauncherVisibilitySegmentedComponent from "../components/LauncherVisibilitySegmentedComponent";
import Divider from "../components/Divider";
import RegisteredUserComponent from "../components/RegisteredUserComponent";
import SetLanguageComponent from "../components/SetLanguageComponent";
import { ZohoSalesIQ } from "@react-native-zohosalesiq/mobilisten";

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    useFocusEffect(() => {
        /*
        This API lets you set an apt title for each and every screen in your application,
        thus making it easy for you to track down the trail of your visitors when they navigate through the screens of your mobile app.
        It will be visible within the Activity section in the chat window.
        Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-tracking-title.html
      */
        ZohoSalesIQ.setPageTitle("Home Screen");
    });

    const openSalesIQSupport = () => {
        ZohoSalesIQ.openChat(); //This API is used to open the SalesIQ SDK from the custom launcher view
    };

    const trackVisitorActions = () => {
        /*
            This API would let you track specified custom actions performed by the visitors in your mobile application.
            The actions will be visible within the Activity section in the chat window.

            You can also use this API to open the chat window and trigger a new chat based on the performed custom action
            by setting the shouldOpenChatWindow parameter to true. By default, the shouldOpenChatWindow parameter is set to false.
            Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-tracking-set-custom-actions.html
        */
        ZohoSalesIQ.performCustomAction("Added to cart");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={[styles.container, {marginHorizontal: 15}]}>
                <SalesIQLogoComponent />
                <ButtonComponent
                    title="Open SalesIQ support"
                    onPress={openSalesIQSupport}
                />
                <LauncherVisibilitySegmentedComponent />
                <Divider />

                <RegisteredUserComponent />
                <Divider />

                <ButtonComponent
                    title="Set visitor details"
                    onPress={() =>
                        navigation.navigate("SetVisitorDetailsScreen", {
                            name: "Set Visitor Details Screen",
                        })
                    }
                />
                <SetLanguageComponent />
                <Divider />

                <ButtonComponent
                    title="Track visitor actions"
                    onPress={trackVisitorActions}
                    outlinedButtonStyle={undefined}
                />
                <View>
                    <ButtonComponent
                        title="Fetch SalesIQ data"
                        onPress={() =>
                            navigation.navigate("FetchSalesIQDataScreen", {
                                name: "Fetch SalesIQ Data Screen",
                            })
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
