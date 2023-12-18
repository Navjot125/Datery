import React from "react";
import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import styles from "./ConfirmationPopUpStyle";
import Modal from "react-native-modal";
// import * as resources from '../../../resources';
import * as Atoms from "../../atoms";
import color from "../../../Constants/Color";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ConfirmationPopUp = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const {
    isVisible,
    onRequestClose,
    onRef,
    isImage,
    onPress,
    onPressYes,
    onPressNo,
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

  return (
    <View>
      <Modal
        // isVisible={true}
        ref={onRef != undefined ? onRef : null}
        isVisible={modalVisible}
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
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={{ justifyContent: "center" }}
      >
        <View style={styles.flex}>
          <View style={styles.bodyContainer}>
            <View style={[styles.container, container]}>
              {title && (
                <Text style={[styles.titileTxt, titleTxt]}>{title}</Text>
              )}
              <Text style={[styles.descriptionTxt, descriptionTxt]}>
                {discription}
              </Text>
              {middleContent ? (
                <View style={[middleContentStyle]}>{middleContent}</View>
              ) : null}
            </View>

            <View style={styles.btnBox}>
              <TouchableOpacity
            activeOpacity={0.9}

                onPress={onPressNo}
                style={[
                  styles.btnStyle,
                  {
                    borderBottomStartRadius: wp(4),
                    borderRightWidth: 0.5,
                  },
                ]}
              >
                <Text style={styles.butTxt}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
            activeOpacity={0.9}

                onPress={onPressYes}
                style={[
                  styles.btnStyle,
                  {
                    borderBottomEndRadius: wp(4),
                    borderLeftsWidth: 0.5,
                  },
                ]}
              >
                <Text style={styles.butTxt}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmationPopUp;
