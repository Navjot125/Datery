import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import styles from './GeneralPopUpStyle';
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
    OnRightPress,
    OnLeftPress,
    title,
    discription,
    leftBtnTxt,
    rightBtnTxt,
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
          onRequestClose();
        }}
        onBackdropPress={() => {
          onRequestClose();
        }}
        animationIn="zoomIn"
        animationOut="zoomOut"
        style={{justifyContent: 'center'}}>
        <View style={styles.flex}>
          <View style={styles.bodyContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.LogoBox2}>
                {/* <Logo height={'100%'} width={'100%'} /> */}
                {/* <Image
                  source={resources.LOGO}
                  resizeMode={'contain'}
                  style={styles.img}
                /> */}
                {/* <Image source={resources.LearnVernAppLogo} resizeMode={'center'} style={styles.img} /> */}
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.titileTxt}>{title}</Text>
              <Text style={styles.descriptionTxt}>{discription}</Text>
            </View>
            <View style={styles.btnBox}>
              <View style={styles.btnCol}>
                <Atoms.Button
                  title={leftBtnTxt}
                  style={[styles.button, styles.button2]}
                  textStyle={[styles.butTxt, {color: color._primary_blue}]}
                  onPress={() => {
                    OnLeftPress();
                  }}
                />
              </View>
              <View style={styles.btnCol}>
                <Atoms.Button
                  title={rightBtnTxt}
                  style={[styles.button]}
                  textStyle={{color: color._white}}
                  onPress={() => {
                    OnRightPress();
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GeneralPopUp;
