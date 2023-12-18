import React from "react";
import { View, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./StatusbarStyle";

const Statusbar = ({ animated, backgroundColor, barStyle, translucent }) => {
    // const insets = useSafeAreaInsets();
    return (
        <View style={[styles.Container, { backgroundColor }]}>
            <StatusBar 
                animated = {animated}
                backgroundColor = {backgroundColor}
                barStyle = {barStyle}
                translucent = {translucent}
                hidden={Platform.OS === "android" ? false : true}
            />
        </View>
    );
};
export default Statusbar;