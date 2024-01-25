import React, { useState, useCallback } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { styles } from "../styles/styles";
import DropDownPicker from "react-native-dropdown-picker";

const DropdownComponent = ({
    placeholder,
    items,
    onChangeItem,
}: {
    placeholder?: string;
    items: any[];
    onChangeItem: (data: any) => void;
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleChangeValue = (newValue: any) => {
        if (newValue !== null) {
            onChangeItem(newValue);
        }
        setValue(newValue);
    };

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            placeholder={placeholder}
            loading={loading}
            activityIndicatorColor="#007AFF"
            activityIndicatorSize={40}
            listMode="SCROLLVIEW"
            dropDownDirection="AUTO"
            bottomOffset={20}
            style={styles.dropdownBox}
            textStyle={styles.dropdownTextStyle}
            placeholderStyle={styles.dropdownPlaceholderStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            listItemLabelStyle={styles.dropdownListItemLabelStyle}
            listItemContainerStyle={styles.dropdownListItemContainerStyle}
            onChangeValue={handleChangeValue}
            onOpen={() => setValue(null)}
        />
    );
};

export default DropdownComponent;
