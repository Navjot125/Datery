import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import base from "../../../Constants/CommonStyle";
import * as resources from "../../../resources";
import * as Atoms from "../../../Components/atoms";
import styles from "../AuthStyle";
import Otp from "../../../resources/svg/ic_otp.svg";
import Check from "../../../resources/svg/ic_radio_check.svg";
import UnCheck from "../../../resources/svg/ic_radio_uncheck.svg";
import Email from "../../../resources/svg/ic_email.svg";
import color from "../../../Constants/Color";
import { Button } from "../../Button/Button";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const OTPInput = (props) => {
    const {
        navigation,
        otp,
        setOtp,
        ref,
        onOTPSend,
        timer,
        setTimer,
        onResendCode,
        desc,
        resend,
        resendStatus = true,
    } = props;

    useEffect(() => {
        setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);
    });

    // useEffect(() => {
    //   setInterval(() => {
    //     if (timer > 0) {
    //       setTimer(timer - 1);
    //     }
    //   }, 1000);
    // }, [timer]);

    // useEffect(() => {
    //   setTimeout(() => {
    //     if (timer > 0) {
    //       setTimer(timer - 1);
    //     }
    //   }, 1000);
    // }, [timer]);

    return (
        <View style={{ paddingHorizontal: 15, flex: 1 }}>
            <View style={[base.horizontal, styles.topSpace]}>
                <View>
                    <Text style={[styles.heading]}>Security</Text>
                    <Text style={[styles.heading, { maxWidth: "100%" }]}>
                        Enter Your OTP {"      "}
                    </Text>
                </View>
                <View style={styles.topIcon}>
                    <Otp />
                </View>
            </View>
            {desc ? (
                <Text style={styles.descTxt}>{desc}</Text>
            ) : (
                <Text style={styles.descTxt}>
                    4-digit code received on your phone
                </Text>
            )}

            <View
                style={[
                    {
                        backgroundColor: color._smoke_white,
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        marginVertical: 5,
                        color: color._font_Dark,
                    },
                    { marginTop: 35 },
                ]}
            >
                <Text style={{ fontSize: 10, color: color._dark_grey }}>
                    Güvenlik Kodu
                </Text>
                <Atoms.TextInput
                    value={otp}
                    textFieldStyle={{
                        padding: 0,
                        marginTop: -2,
                        height: 30,
                        color: color._font_Dark,
                    }}
                    onSubmitEditing={() => {}}
                    placeholder={"Enter OTP"}
                    placeholderTextColor={color._dark_grey}
                    onChangeText={(text) => {
                        setOtp(text);
                    }}
                    onRef={ref}
                    keyboardType={"number-pad"}
                    maxLength={7}
                />
            </View>

            <View
                style={[
                    base.horizontal,
                    { marginTop: wp(1.25), justifyContent: "space-between" },
                ]}
            >
                <Text style={styles.timerTxt}>{timer} seconds left</Text>
                <TouchableOpacity
            activeOpacity={0.9}
                    disabled={!(timer == 0)}
                    // disabled={resendStatus ? false : true}
                    onPress={onResendCode}
                >
                    <Text style={[styles.hilitedFont, resend]}>
                        I did not receive the code
                    </Text>
                </TouchableOpacity>
            </View>

            <Button
                title={"Send"}
                btn={{ marginTop: wp(4) }}
                onPress={onOTPSend}
            />
        </View>
    );
};

export default OTPInput;
