import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import color from "../../../Constants/Color";
import base from "../../../Constants/CommonStyle";
// import * as resources from '../../../resources';
import styles from "./SubscriptionModalStyle";
import Home1 from "../../../assets/ic_home1.svg";
import { Button } from "../../../Components/Button/Button";
import fonts from "../../../Constants/Fonts";

const SubscriptionModal = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { onRequestClose, onRef, isVisible, navigation } = props;

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <Modal
      //   ref={onRef != undefined ? onRef : null}
      //   isVisible={modalVisible}
      //   onBackButtonPress={() => {
      //     onRequestClose();
      //   }}
      //   onBackdropPress={() => onRequestClose()}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ backgroundColor: "transparent", margin: 0 }}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={[base.block]}>
        <ScrollView 
         bounces={false}
         alwaysBounceVertical={false}
         overScrollMode="never"
        style={base.block}>
          <View style={{ paddingHorizontal: 15, flex: 1 }}>
            <View style={[base.horizontal, { marginTop: 55 }]}>
              <Text style={[styles.heading]}>Hello Erdem</Text>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                {/* <Image source={resources.LOGO} /> */}
              </View>
            </View>
            <Text style={styles.descTxt}>
              Stability makes perfect, Choose a subscription and get stability!
            </Text>
            <View
              style={{ width: "100%", alignItems: "flex-end", marginTop: -20 }}
            >
              <Home1 />
            </View>

            <Button
              title={"Choose a Subscription"}
              onPress={() => {
                navigation.navigate("Subscription");
              }}
            />

            <View
              style={{
                justifyContent: "flex-start",
                height: "75%",
                marginTop: "15%",
              }}
            >
              <Text style={styles.titleTxt}>
                Find trainers that are right for you.
              </Text>
              <Text style={[styles.descTxt, { maxWidth: "100%" }]}>
                Yoga, fitness, pilates and more.
              </Text>
              <TouchableOpacity
            activeOpacity={0.9}

                onPress={() => {
                  navigation.navigate("PopUp");
                }}
                style={[styles.buttonInstructor]}
              >
                <Text style={[base.buttonTxt, styles.btnInsTxt]}>
                  Find an Trainer
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SubscriptionModal;
