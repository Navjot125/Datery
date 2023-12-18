import React from 'react';
import {View, Text, Image, Platform} from 'react-native';
import styles from './LessonCancelStyle';
import Modal from 'react-native-modal';
import * as resources from '../../../resources';
import * as Atoms from '../../atoms';
import {useSelector, useDispatch} from 'react-redux';
import color from '../../../Constants/Color';
import base from '../../../Constants/CommonStyle';

export const LessonCancel = props => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const stateGlobal = useSelector(state => state.global);

  const {
    isVisible,
    onRequestClose,
    onRef,
    isImage,
    OnRightPress,
    OnLeftPress,
    container,
    title,
    titleTxt,
    discription,
    descriptionTxt,
    middleContentStyle,
    leftBtnTxt,
    rightBtnTxt,
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
              <View style={[base.center]}>
                <Text style={[styles.titileTxt, titleTxt]}>{title}</Text>
                <Text style={[styles.descriptionTxt, descriptionTxt]}>
                  {discription}
                </Text>
              </View>
              {middleContent ? (
                <View style={[middleContentStyle]}>{middleContent}</View>
              ) : null}
            </View>

            {/* <View locale={stateGlobal.currentLanguage} style={styles.btnBox}>
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
                  onPress={() => {
                    OnRightPress();
                  }}
                />
              </View>
            </View> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LessonCancel;
