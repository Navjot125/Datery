import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import base from "../../../Constants/CommonStyle";
import * as resources from "../../../resources";
import * as Atoms from "../../../Components/atoms";
import styles from "../AuthStyle";
import Check from "../../../resources/svg/ic_radio_check.svg";
import UnCheck from "../../../resources/svg/ic_radio_uncheck.svg";
import Email from "../../../resources/svg/ic_email.svg";
import color from "../../../Constants/Color";
import { Button } from "../../Button/Button";

const RegisterForm = (props) => {
    const {
        navigation,
        userAgreement,
        privacy,
        setUserAgreement,
        setPrivacy,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        ref,
        onCreateAccount,
        loginType,
    } = props;

    return (
        <View style={{ paddingHorizontal: 15, flex: 1 }}>
            <View style={[base.horizontal, styles.topSpace]}>
                <Text style={[styles.heading]}>Come on lets start!</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Image source={resources.LOGO} />
                </View>
            </View>
            <Text style={styles.descTxt}>
                You made the best decision for yourself Exercise, live life!
            </Text>

            <View style={{ marginTop: 25 }}></View>
            <Atoms.TextInput
                value={name}
                textFieldStyle={styles.txtInput}
                onSubmitEditing={() => {}}
                placeholder={"Name Surname"}
                placeholderTextColor={color._dark_grey}
                onChangeText={(text) => {
                    setName(text);
                }}
                onRef={ref}
            />
            <Atoms.TextInput
                value={email}
                textFieldStyle={styles.txtInput}
                onSubmitEditing={() => {}}
                placeholder={"you@example.com"}
                placeholderTextColor={color._dark_grey}
                onChangeText={(text) => {
                    setEmail(text);
                }}
                keyboardType={"email-address"}
                onRef={ref}
            />
            {loginType == "normal" ? (
                <Atoms.TextInput
                    value={password}
                    textFieldStyle={styles.txtInput}
                    onSubmitEditing={() => {}}
                    placeholder={"At least 6 characters"}
                    placeholderTextColor={color._dark_grey}
                    onChangeText={(text) => {
                        setPassword(text);
                    }}
                    onRef={ref}
                    secureTextEntry={true}
                    isRight
                    iconStyle={{ marginTop: 5 }}
                />
            ) : null}

            <Button
                title={"Create Account"}
                btn={{ marginTop: 7 }}
                onPress={onCreateAccount}
            />

            <View
                style={[
                    base.horizontal,
                    { justifyContent: "space-between", marginVertical: 20 },
                ]}
            >
                <TouchableOpacity
            activeOpacity={0.9}

                    style={[base.horizontal, { width: "50%" }]}
                    onPress={() => {
                        setUserAgreement(!userAgreement);
                        // if (!userAgreement) {
                        //   navigation.push('UserAgreement');
                        // }
                    }}
                >
                    {userAgreement ? <Check /> : <UnCheck />}
                    <Text
                        style={styles.policyTxt}
                        onPress={() => {
                            setUserAgreement(!userAgreement);
                            if (!userAgreement) {
                                navigation.push("UserAgreement");
                            }
                        }}
                    >
                        User agreement
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
            activeOpacity={0.9}

                    style={[base.horizontal, { width: "50%" }]}
                    onPress={() => {
                        setPrivacy(!privacy);
                        // if (!privacy) {
                        //   navigation.push('PrivacyTerms');
                        // }
                    }}
                >
                    {privacy ? <Check /> : <UnCheck />}
                    <Text
                        style={styles.policyTxt}
                        onPress={() => {
                            setPrivacy(!privacy);
                            if (!privacy) {
                                navigation.push("PrivacyTerms");
                            }
                        }}
                    >
                        Privacy Terms
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
            activeOpacity={0.9}

                    style={{ marginBottom: 25 }}
                    onPress={() => {
                        navigation.navigate("Login");
                    }}
                >
                    <Text style={[base.hilitedFont, styles.bottomBtnTxt]}>
                        Already a Member
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterForm;
