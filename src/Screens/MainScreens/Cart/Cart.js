import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Cross from "react-native-vector-icons/AntDesign";
import * as Atom from "../../../Components/atoms";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
const Cart = (props) => {
  const [modalVisible, setModalVisible] = useState();

  const { isVisible, onRequestClose, onRef, onPress } = props;
  React.useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const renderModalContent = () => (
    <View style={styles.modalContent}>
      <TouchableOpacity
            activeOpacity={0.9}
        onPress={() => {
          if (onRequestClose !== undefined) {
            setModalVisible(!modalVisible);
            onRequestClose();
          }
        }}
        style={{ alignItems: "flex-end" }}
      >
        <Cross name={"closecircleo"} size={22} color={color._border_orange} />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Image
          source={require("../../../assets/images/Cart.png")}
          style={{
            width: 111,
            height: 92,
            alignSelf: "center",
            justifyContent: "center",
          }}
        />
        <Text style={styles.orangeText}>Your cart is empty</Text>
        <Text style={styles.blackText}>
          Continue browsing for unique activities in your area
        </Text>
      </View>
      <Atom.Button title={"GO SHOPPING"} />
    </View>
  );
  return (
    <View>
      <Modal
        isVisible={modalVisible}
        style={styles.bottomModal}
        animationType="slide"
        onBackButtonPress={() => {
          if (onRequestClose !== undefined) {
            setModalVisible(!modalVisible);
            onRequestClose();
          }
        }}
        onBackdropPress={() => {
          if (onRequestClose !== undefined) {
            setModalVisible(!modalVisible);
            onRequestClose();
          }
        }}
      >
        {renderModalContent()}
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    height: hp("80%"),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  orangeText: {
    fontFamily: fonts.BOLD,
    fontSize: 24,
    color: color._primary_orange,
    lineHeight: 30,
    paddingTop: 21,
  },
  blackText: {
    fontFamily: fonts.MEDIUM,
    fontSize: 14,
    color: color._black,
    lineHeight: 18,
    textAlign: "center",
    paddingTop: 7,
  },
});
