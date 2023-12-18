import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './LogOutPopUpStyle';
import Modal from 'react-native-modal';
// import * as resources from "../../../resources";
import * as Atoms from '../../atoms';

export const LoginAutoPopup = props => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const {isVisible, onRequestClose, onRef, OnRightPress, OnLeftPress} = props;

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
              {/* <View style={styles.LogoBox}> */}
              <View style={styles.LogoBox2}>
                {/* <Image
                  source={resources.LOGO}
                  resizeMode={"contain"}
                  style={styles.img}
                /> */}
                {/* <Image source={resources.LearnVernAppLogo} resizeMode={'center'} style={styles.img} /> */}
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.titileTxt}>{'Hold on!'}</Text>
              <Text style={styles.descriptionTxt}>
                {'Are You Sure You Want to Logout?'}
              </Text>
            </View>
            <View style={styles.btnBox}>
              <Atoms.Button
                title={'Cancel'}
                style={styles.button1}
                textStyle={styles.butTxt}
                onPress={() => {
                  OnLeftPress();
                }}
              />
              <Atoms.Button
                title={'YES'}
                style={styles.button}
                textStyle={styles.butTxt1}
                onPress={() => {
                  OnRightPress();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginAutoPopup;
