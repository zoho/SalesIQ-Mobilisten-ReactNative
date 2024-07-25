import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { styles } from "../styles/styles";

const ButtonComponent = ({
    title,
    onPress,
    outlinedButtonStyle,
}: {
    title: string;
    onPress: () => void;
    outlinedButtonStyle?: boolean;
}) => {
    const defaultButtonStyle = styles.button;
    const defaultButtonTextStyle = styles.buttonText;

    const buttonStyle = outlinedButtonStyle
        ? { ...defaultButtonStyle, ...styles.outlinedButton }
        : defaultButtonStyle;

    const buttonTextStyle = outlinedButtonStyle
        ? { ...defaultButtonTextStyle, ...styles.outlinedButtonText }
        : defaultButtonTextStyle;

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={buttonTextStyle}>{title}</Text>
        </TouchableOpacity>
    );
};

export default ButtonComponent;
