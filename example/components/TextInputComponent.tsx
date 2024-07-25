import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    InputModeOptions,
    TextInputProps,
} from "react-native";

const TextInputComponent = ({
    placeholder,
    value,
    onChangeText,
    maxLength,
    height,
    multiline,
    inputMode,
}: {
    placeholder?: string;
    value?: string;
    onChangeText?: ((text: string) => void) | undefined;
    maxLength?: number;
    height?: number;
    multiline?: boolean;
    inputMode?: InputModeOptions;
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const boxHeight = height || 60;

    const inputStyle: TextInputProps["style"] = {
        fontSize: 16,
        height: boxHeight,
        borderRadius: 6,
        marginTop: 10,
        paddingVertical: boxHeight < 100 ? 10 : 15,
        paddingHorizontal: 10,
        borderColor: isFocused ? "#007AFF" : "#D9D9D9",
        borderWidth: isFocused ? 2 : 1,
        textAlignVertical: boxHeight < 100 ? "center" : "top",
    };

    return (
        <TextInput
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            inputMode={inputMode}
        />
    );
};

export default TextInputComponent;
