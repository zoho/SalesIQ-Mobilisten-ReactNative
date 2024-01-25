import React from "react";
import { View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SetVisitorDetailsScreen from "../screens/SetVisitorDetailsScreen";
import FetchSalesIQDataScreen from "../screens/FetchSalesIQDataScreen";
import { styles } from "../styles/styles";
const Stack = createStackNavigator();

export default function Main() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#007AFF",
                        },
                        headerTintColor: "white",
                    }}
                >
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ title: "Mobilisten Demo" }}
                    />
                    <Stack.Screen
                        name="FetchSalesIQDataScreen"
                        component={FetchSalesIQDataScreen}
                        options={{ title: "Mobilisten Demo" }}
                    />
                    <Stack.Screen
                        name="SetVisitorDetailsScreen"
                        component={SetVisitorDetailsScreen}
                        options={{ title: "Mobilisten Demo" }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}
