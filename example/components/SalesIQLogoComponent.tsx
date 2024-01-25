import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/styles';
import { ZohoSalesIQ } from 'react-native-zohosalesiq-mobilisten';

export default function SalesIQLogoComponent() {
    const openSalesIQSupport = () => {
        ZohoSalesIQ.openChat(); // This API is used to open the SalesIQ SDK from the custom launcher view
    };

    return (
        <TouchableOpacity style={styles.logoContainer} onPress={openSalesIQSupport}>
            <Image style={styles.salesiqLogo} source={require('../assets/images/salesiq-logo.png')} />
        </TouchableOpacity>
    );
}
