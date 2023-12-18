// import styles from './EmptyCartPopUpStyle';
import Modal from 'react-native-modal';
// import * as resources from '../../../resources';
// import * as Atoms from '../../atoms';
import color from '../../../Constants/Color';
import React, { useState } from "react";
import * as Atom from "../../atoms";
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
import fonts from "../../../Constants/Fonts";
import Cross from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

export const EmptyCartPopUp = props => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const {
    isVisible,
    onRequestClose,
    onRef,
    isImage,
    onPress,
    btnTxt,
    onSecondPress,
    onThirdPress,
    secondBtnTxt,
    thirdBtnTxt,
    container,
    title,
    titleTxt,
    discription,
    descriptionTxt,
    middleContentStyle,
    middleContent,
  } = props;

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
        <Cross name={"closecircleo"} size={22} color={color._primary_orange} />
      </TouchableOpacity>
      <View style={styles.modal}>
        <Image
          source={require("../../../assets/images/Cart.png")}
          style={{
            width: 111,
            height: 92,
            alignSelf: "center",
            justifyContent: "center",
            tintColor: color._primary_orange
          }}
        />
        <Text style={styles.orangeText}>Your cart is empty</Text>
        <Text style={styles.blackText}>
          Continue browsing for exclusive dates in your area
        </Text>
      </View>
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

  // return (
  //   <View>
  //     <Modal
  //       // isVisible={true}
  //       ref={onRef != undefined ? onRef : null}
  //       isVisible={modalVisible}
  //       onBackButtonPress={() => {
  //         if (onRequestClose !== undefined) {
  //           setModalVisible(!modalVisible);
  //           onRequestClose();
  //         }
  //       }}
  //       onBackdropPress={() => {
  //         if (onRequestClose !== undefined) {
  //           setModalVisible(!modalVisible);
  //           onRequestClose();
  //         }
  //       }}
  //       animationIn="zoomIn"
  //       animationOut="zoomOut"
  //       style={{justifyContent: 'center'}}>
  //       <View style={styles.flex}>
  //         <View style={styles.bodyContainer}>
  //           <View style={[styles.container, container]}>
  //             <Text style={[styles.titileTxt, titleTxt]}>{title}</Text>
  //             <Text style={[styles.descriptionTxt, descriptionTxt]}>
  //               {discription}
  //             </Text>
  //             {middleContent ? (
  //               <View style={[middleContentStyle]}>{middleContent}</View>
  //             ) : null}
  //           </View>

  //           <View style={styles.btnBox}>
  //             <View style={styles.btnCol}>
  //               {btnTxt && <Atoms.Button onPress={onPress} title={btnTxt} />}
  //               {secondBtnTxt && (
  //                 <Atoms.Button onPress={onSecondPress} title={secondBtnTxt} />
  //               )}
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  //   </View>
  // );
};

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
    color: color._black,
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
export default EmptyCartPopUp;

