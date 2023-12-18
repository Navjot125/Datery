import React from 'react';
import { View, Text, Image, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './CommonPopUpStyle';
import Modal from 'react-native-modal';
// import * as resources from '../../../resources';
import * as Atoms from '../../atoms';
import color from '../../../Constants/Color';

export const GeneralPopUp = props => {
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
    onBackPress
  } = props;

  React.useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <View>
      <Modal
        // deviceHeight={753}
        // coverScreen={false}
        // disableBottomTabs={false}
        backdropOpacity={0.3}
        transparent={true}
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
        style={{ justifyContent: 'center', }}>
        {/* style={{ backgroundColor: 'red',}}> */}
        <View style={styles.flex}>
          <View style={styles.bodyContainer}>
            {/* <View style={styles.titleContainer}>
              <View style={styles.LogoBox2}>
                <Image
                  source={resources.LOGO}
                  resizeMode={'contain'}
                  style={styles.img}
                />
              </View>
            </View> */}
            <View style={[styles.container, container]}>
              <Text style={[styles.titileTxt, titleTxt]}>{title}</Text>
              <Text style={[styles.descriptionTxt, descriptionTxt]}>
                {discription}
              </Text>
              {middleContent ? (
                <View style={[middleContentStyle]}>{middleContent}</View>
              ) : null}
            </View>
            <View style={styles.btnBox}>
              <View style={styles.btnCol}>
                {btnTxt && <Atoms.Button onPress={onPress} title={btnTxt} />}
                {secondBtnTxt && (
                  <Atoms.Button onPress={onSecondPress} title={secondBtnTxt} />
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GeneralPopUp;
