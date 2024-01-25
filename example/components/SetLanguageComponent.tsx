import React, { useState, Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import { ZohoSalesIQ } from "react-native-zohosalesiq-mobilisten";

type lang = "en" | "fr" | "ja";

const SetLanguageComponent = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<lang>("en");

    const getLanguageButtonStyle = (language: lang) => {
        return selectedLanguage === language
            ? [styles.languageButton, styles.selectedLanguageButton]
            : styles.languageButton;
    };

    const setLanguage = (language: lang) => {
        /*
            This API lets you configure the language preference for the embedded chat widget.
            Refer https://www.zoho.com/salesiq/help/developer-section/react-native-sdk-set-language.html
        */
        ZohoSalesIQ.setLanguage(language);
        setSelectedLanguage(language);
    };

    return (
        <View style={styles.languageContainer}>
            <Text style={styles.setLanguageTitle}>Support Language :</Text>
            <View style={styles.languageOptionsContainer}>
                <TouchableOpacity onPress={() => setLanguage("en")}>
                    <Text style={getLanguageButtonStyle("en")}>EN</Text>
                </TouchableOpacity>
                <Text style={styles.languageContainerVerticalDivider}>|</Text>
                <TouchableOpacity onPress={() => setLanguage("fr")}>
                    <Text style={getLanguageButtonStyle("fr")}>FR</Text>
                </TouchableOpacity>
                <Text style={styles.languageContainerVerticalDivider}>|</Text>
                <TouchableOpacity onPress={() => setLanguage("ja")}>
                    <Text style={getLanguageButtonStyle("ja")}>JA</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SetLanguageComponent;
