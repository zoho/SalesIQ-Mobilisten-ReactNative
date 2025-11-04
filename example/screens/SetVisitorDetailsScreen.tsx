import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles";
import Toast from "react-native-simple-toast";
import TextInputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import Divider from "../components/Divider";
import DropdownComponent from "../components/DropdownComponent";

import { ZohoSalesIQ } from "@react-native-zohosalesiq/mobilisten";

const SetVisitorDetailsScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [infoKey, setInfoKey] = useState("");
    const [infoValue, setInfoValue] = useState("");
    const [question, setQuestion] = useState("");
    const [departmentItem, setDepartmentItems] = useState<
        { label: any; value: any }[]
    >([]);

    useEffect(() => {
        getDepartmentsFromAPI();
    }, []);

    useFocusEffect(() => {
        /*
         This API lets you set an apt title for each and every screen in your application.
         Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-tracking-title.html
      */
        ZohoSalesIQ.setPageTitle("Visitor Info Screen");
    });

    const getDepartmentsFromAPI = async () => {
        /*
         This API allows you to get a list of all the departments that have been associated with the brand in which Mobilisten is configured.
         Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-get-departments.html
      */
        ZohoSalesIQ.getDepartments((error: any, departments: any[]) => {
            if (error) {
                console.error("Error fetching data from the API:", error);
            } else {
                const mappedData = departments.map((item) => ({
                    label: item.name,
                    value: item.name,
                }));
                console.log(mappedData);
                setDepartmentItems(mappedData);
            }
        });
    };

    const setVisitorDetails = () => {
        if (name) {
            ZohoSalesIQ.setVisitorName(name); // This API lets you set the name of the visitor
        }

        if (email) {
            ZohoSalesIQ.setVisitorEmail(email); // This API lets you set the email of the visitor
        }

        if (phone) {
            ZohoSalesIQ.setVisitorContactNumber(phone); // This API lets you set the contact number of the visitor
        }

        if (infoKey && infoValue) {
            /*
            This API would let you add additional information about the visitors and display it to the operators of your firm
            in the pane right beside their chat windows while conversing with the visitors.
            Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-visitor-info.html
         */
            ZohoSalesIQ.setVisitorAddInfo(infoKey, infoValue);
        }
    };

    const setSelectedDepartment = (department: any) => {
        if (department) {
            ZohoSalesIQ.setDepartment(department); //This API lets you set a default department to which you would like to route all the chat requests placed by the visitors.
        }
    };

    const startChat = () => {
        if (question) {
            ZohoSalesIQ.startChat(question); // This API can be used to automatically initiate a chat with the given message
        } else {
            Toast.showWithGravity(
                "Question field is mandatory",
                Toast.LONG,
                Toast.BOTTOM
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={[styles.container, styles.containerTopSpacing]}>
                <TextInputComponent
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInputComponent
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={setEmail}
                    inputMode="email"
                />
                <TextInputComponent
                    placeholder="Enter your contact number"
                    value={phone}
                    onChangeText={setPhone}
                    inputMode="tel"
                />

                <View style={styles.visitorInfoContainer}>
                    <Text style={styles.visitorInfoTitle}>Set Info</Text>
                    <View style={styles.visitorInfoInputsContainer}>
                        <View style={styles.visitorInfoComponent}>
                            <TextInputComponent
                                placeholder="Key"
                                value={infoKey}
                                onChangeText={setInfoKey}
                            />
                        </View>
                        <View style={styles.visitorInfoComponent}>
                            <TextInputComponent
                                placeholder="Value"
                                value={infoValue}
                                onChangeText={setInfoValue}
                            />
                        </View>
                    </View>
                </View>

                <ButtonComponent
                    title="Set visitor details"
                    onPress={setVisitorDetails}
                />

                <Divider />

                <DropdownComponent
                    placeholder="Choose a department"
                    items={departmentItem}
                    onChangeItem={(value) => {
                        setSelectedDepartment(value);
                    }}
                />
                <TextInputComponent
                    placeholder="Enter your question"
                    value={question}
                    onChangeText={setQuestion}
                    height={150}
                    multiline={true}
                />
                <View style={styles.containerBottomSpacing}>
                    <ButtonComponent title="Start Chat" onPress={startChat} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SetVisitorDetailsScreen;
