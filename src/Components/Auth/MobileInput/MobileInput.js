import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import base from "../../../Constants/CommonStyle";
import * as resources from "../../../resources";
import * as Atoms from "../../../Components/atoms";
import styles from "../AuthStyle";
import Mobile from "../../../resources/svg/ic_mobile.svg";
import Check from "../../../resources/svg/ic_radio_check.svg";
import UnCheck from "../../../resources/svg/ic_radio_uncheck.svg";
import Email from "../../../resources/svg/ic_email.svg";
import color from "../../../Constants/Color";
import { Button } from "../../Button/Button";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import CountryPicker from "../../../Components/atoms/CoutryPicker";

const MobileInput = (props) => {
    const {
        navigation,
        mobile,
        setMobile,
        ref,
        onMobileSend,
        mCountryCode,
        setMCountryCode,
        _selectedValue,
    } = props;

    return (
        <View style={{ paddingHorizontal: 15, flex: 1 }}>
            <View style={[base.horizontal, styles.topSpace]}>
                <Text style={[styles.heading]}>Security Important</Text>
                <View style={styles.topIcon}>
                    <Mobile />
                </View>
            </View>
            <Text style={styles.descTxt}>Verify your phone number!</Text>

            <View
                style={[
                    base.horizontal,
                    { marginTop: 35, justifyContent: "space-between" },
                ]}
            >
                <View
                    style={[
                        {
                            backgroundColor: color._smoke_white,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            marginVertical: 5,
                            color: color._font_Dark,
                            width: wp(22),
                        },
                        { marginTop: 35 },
                    ]}
                >
                    <Text style={{ fontSize: 10, color: color._dark_grey }}>
                        Country
                    </Text>
                    <CountryPicker
                        disable={false}
                        animationType={"slide"}
                        containerStyle={{
                            padding: 0,
                            marginTop: 5,
                            height: 23,
                            color: color._font_Dark,
                        }}
                        pickerTitleStyle={styles.pickerTitleStyle}
                        selectedCountryTextStyle={
                            styles.selectedCountryTextStyle
                        }
                        countryNameTextStyle={styles.countryNameTextStyle}
                        pickerTitle={"Country Picker"}
                        searchBarPlaceHolder={"Select"}
                        hideCountryFlag={true}
                        hideCountryCode={false}
                        searchBarStyle={styles.searchBarStyle}
                        countryCode={mCountryCode}
                        selectedValue={_selectedValue}
                    />
                </View>

                <View
                    style={[
                        {
                            backgroundColor: color._smoke_white,
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            marginVertical: 5,
                            color: color._font_Dark,
                            width: wp(57),
                        },
                        { marginTop: 35 },
                    ]}
                >
                    <Text style={{ fontSize: 10, color: color._dark_grey }}>
                        Your phone number
                    </Text>

                    <Atoms.TextInput
                        value={mobile}
                        textFieldStyle={{
                            padding: 0,
                            marginTop: -2,
                            height: 30,
                            color: color._font_Dark,
                        }}
                        onSubmitEditing={() => {}}
                        placeholder={"Enter Phone Number"}
                        placeholderTextColor={color._dark_grey}
                        onChangeText={(text) => {
                            setMobile(text);
                        }}
                        keyboardType={"number-pad"}
                        maxLength={10}
                    />
                </View>
            </View>

            <Button
                title={"Send"}
                btn={{ marginTop: wp(10) }}
                onPress={onMobileSend}
            />
        </View>
    );
};

export default MobileInput;
