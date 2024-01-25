import React, { Component, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { styles } from "../styles/styles";
import { ZohoSalesIQ } from "react-native-zohosalesiq-mobilisten";
import SegmentedControlTab from "react-native-segmented-control-tab";
import "../assets/fonts/Roboto-Medium.ttf";

const showLauncher = 0;
const hideLauncher = 1;
const values = ["Show", "Hide"];

const LauncherVisibilitySegmentedComponent = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    function handleIndexChange(index: number) {
        if (index === showLauncher) {
            ZohoSalesIQ.Launcher.show(
                ZohoSalesIQ.Launcher.VisibilityMode.ALWAYS
            ); //You can use this API to show the launcher in the SalesIQ SDK.
        } else if (index === hideLauncher) {
            ZohoSalesIQ.Launcher.show(
                ZohoSalesIQ.Launcher.VisibilityMode.NEVER
            ); //You can use this API to hide the launcher in the SalesIQ SDK.
        }

        setSelectedIndex(index);
    }
    return (
        <View style={styles.launcherVisibilityContainer}>
            <Text style={styles.launcherVisibilityTitle}>
                Launcher Visibility :
            </Text>
            <SegmentedControlTab
                borderRadius={6}
                tabsContainerStyle={styles.launcherVisibilityTabsContainerStyle}
                tabStyle={styles.launcherVisibilityTabStyle}
                tabTextStyle={styles.launcherVisibilityTabTextStyle}
                activeTabStyle={styles.launcherVisibilityActiveTabStyle}
                activeTabTextStyle={styles.launcherVisibilityActiveTabTextStyle}
                values={values}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
            />
        </View>
    );
};

export default LauncherVisibilitySegmentedComponent;
