import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { styles } from '../styles/styles';

class Divider extends Component {
    render() {
        return (
            <View style={styles.horizontalLine}/>
        );
    }
}   

export default Divider;