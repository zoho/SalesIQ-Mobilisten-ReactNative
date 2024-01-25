import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles";
import { ZohoSalesIQ } from "react-native-zohosalesiq-mobilisten";
import TextInputComponent from "../components/TextInputComponent";

const RegisteredUserComponent = () => {
    const [uniqueID, setUniqueID] = useState("");

    const characterCount = uniqueID.length;
    const characterLimit = 100;

    const registerVisitor = () => {
        /*
      This API allows you to register a visitor using a unique ID with the SalesIQ SDK.
      
      If your application has login and logout life cycles, you can enroll your visitor and
      their activities in the SDK will be synchronized across multiple platforms.

      Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-register-visitor.html
    */
        ZohoSalesIQ.registerVisitor(uniqueID);
        console.log("Registered visitor as " + uniqueID);
        console.log("-----------------------------------------");
    };

    const unregisterVisitor = () => {
        /*
      This API allows you to unregister a user once they are registered using the .registerVisitor() API.
      
      If your application has login and logout life cycles, you can unregister a visitor during a session logout
      which would clear any data that the SDK may hold such as past conversations had by the registered user.

      Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-unregister-visitor.html
    */
        ZohoSalesIQ.unregisterVisitor();
        setUniqueID("");
        console.log("Visitor Unregistered");
        console.log("-----------------------------------------");
    };

    return (
        <View>
            <View style={styles.registeredUserComponentContainer}>
                <View style={styles.registeredUserComponentInputContainer}>
                    <TextInputComponent
                        placeholder="Enter visitor unique ID"
                        value={uniqueID}
                        onChangeText={setUniqueID}
                        maxLength={characterLimit}
                    />
                    <Text
                        style={styles.registeredUserComponentCharacterCounter}
                    >
                        {characterCount}/{characterLimit}
                    </Text>
                </View>
            </View>
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity
                    style={styles.spaceBetweenSingleButtonContainer}
                    onPress={registerVisitor}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.spaceBetweenSingleButtonContainer,
                        styles.spaceBetweenSingleRightButtonContainer,
                    ]}
                    onPress={unregisterVisitor}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisteredUserComponent;
