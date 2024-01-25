import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
    ViewStyle,
} from "react-native";
import { styles } from "../styles/styles";
import DropdownComponent from "../components/DropdownComponent";
import ButtonComponent from "../components/ButtonComponent";
import Divider from "../components/Divider";
import RegisteredUserComponent from "../components/RegisteredUserComponent";
import TextInputComponent from "../components/TextInputComponent";

import { ZohoSalesIQ } from "react-native-zohosalesiq-mobilisten";

const FetchSalesIQDataScreen = () => {
    const [chatID, setChatID] = useState("");
    const [attenderID, setAttenderID] = useState("");
    const [attenderImage, setAttenderImage] = useState(
        require("../assets/images/empty-image.png")
    );
    const [isDefaultImage, setIsDefaultImage] = useState(true);
    const [isAttenderIdInputFocused, setIsAttenderIdInputFocused] =
        useState(false);

    useFocusEffect(() => {
        /*
         This API lets you set an apt title for each and every screen in your application.
         Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-tracking-title.html
      */
        ZohoSalesIQ.setPageTitle("SalesIQ Data Screen");
    });

    const handleFocus = () => {
        setIsAttenderIdInputFocused(true);
    };

    const handleBlur = () => {
        setIsAttenderIdInputFocused(false);
    };

    const attenderIdInputContainer: ViewStyle = {
        flex: 1,
        flexDirection: "row",
        height: 60,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: "center",
        borderWidth: isAttenderIdInputFocused ? 2 : 1,
        borderColor: isAttenderIdInputFocused ? "#007AFF" : "#D9D9D9",
        borderRadius: 6,
    };

    //Type of chat that has to be returned
    const [conversationTypes, setConversationTypes] = useState([
        { label: "Connected", value: ZohoSalesIQ.TYPE_CONNECTED },
        { label: "Waiting", value: ZohoSalesIQ.TYPE_WAITING },
        { label: "Open", value: ZohoSalesIQ.TYPE_OPEN },
        { label: "Closed", value: ZohoSalesIQ.TYPE_CLOSED },
        { label: "Missed", value: ZohoSalesIQ.TYPE_MISSED },
        { label: "Ended", value: ZohoSalesIQ.TYPE_ENDED },
    ]);

    const getChatsList = (type: string) => {
        /*
         This API lets you obtain a list of chats and additionally provides a filter parameter 
         to let you filter out the type of chats based on their current status.
         Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-get-chats-with-filter.html

         You can also get the list of all chats by getChats() API. Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-get-chats.html
      */
        ZohoSalesIQ.getChatsWithFilter(type, (error: any, chats: any) => {
            console.log(JSON.stringify(chats, null, 2));
        });
    };

    const getAllArticles = () => {
        /*
         This API can be used to fetch a list of articles from the SalesIQ knowledge base.
         Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-get-articles.html
      */
        ZohoSalesIQ.KnowledgeBase.getResources(
            ZohoSalesIQ.Resource.ARTICLES,
            null,
            null,
            1,
            99,
            null,
            (error: any, resources: any, moreDataAvailable: any) => {
                if (resources) {
                    console.log(JSON.stringify(resources, null, 2));
                }
            }
        );
    };

    const openChatView = () => {
        ZohoSalesIQ.openChatWithID(chatID); //This API is used to open a specific chat when the chatID is provided.
    };

    const endChat = () => {
        ZohoSalesIQ.endChat(chatID); //This API can be used to end a support chat that is currently in an open state.
    };

    const fetchAttenderImage = () => {
        /*
         This API can be used to fetch the image of the attender of the chat.
         Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-fetch-attender-image.html
      */
        ZohoSalesIQ.fetchAttenderImage(
            attenderID,
            true,
            (error: any, imageBase64: any) => {
                if (!error && imageBase64) {
                    setAttenderImage({
                        uri: `data:image/jpeg;base64,${imageBase64}`,
                    });
                    setIsDefaultImage(false);
                } else {
                    console.log(error);
                }
            }
        );
    };

    const getAttenderImageStyle = () => {
        return isDefaultImage
            ? styles.attenderDefaultImageStyle
            : [
                  styles.attenderDefaultImageStyle,
                  styles.attenderProfileImageStyle,
              ];
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={[styles.container, styles.containerTopSpacing]}>
                <DropdownComponent
                    placeholder="Choose conversation type"
                    items={conversationTypes}
                    onChangeItem={(type) => {
                        getChatsList(type);
                    }}
                />
                <Divider />

                <View>
                    <View style={styles.chatIdInputContainer}>
                        <TextInputComponent
                            placeholder="Enter chat ID (#)"
                            value={chatID}
                            onChangeText={setChatID}
                            inputMode="numeric"
                        />
                    </View>
                    <View style={styles.spaceBetweenButtonsContainer}>
                        <TouchableOpacity
                            style={styles.spaceBetweenSingleButtonContainer}
                            onPress={openChatView}
                        >
                            <Text style={styles.buttonText}>Open chatview</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.spaceBetweenSingleButtonContainer,
                                styles.spaceBetweenSingleRightButtonContainer,
                            ]}
                            onPress={endChat}
                        >
                            <Text style={styles.buttonText}>End chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Divider />

                <View style={styles.attenderImageContainer}>
                    <View style={attenderIdInputContainer}>
                        <TextInput
                            value={attenderID}
                            onChangeText={setAttenderID}
                            style={styles.attenderIdInputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Enter attender ID"
                        />
                        <TouchableOpacity
                            style={styles.attenderIdDoneIconPaddedContent}
                            onPress={fetchAttenderImage}
                        >
                            <Image
                                style={styles.attenderIdDoneIconStyle}
                                source={require("../assets/images/done-icon.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <Image
                        style={getAttenderImageStyle()}
                        source={attenderImage}
                    />
                </View>
                <Divider />

                <View style={styles.containerBottomSpacing}>
                    <ButtonComponent
                        title="Get all articles"
                        onPress={getAllArticles}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default FetchSalesIQDataScreen;
