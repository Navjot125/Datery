import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import color from './Constants/Color';
import Navigation, { HomeNavigator } from './Navigation';

const Containers = ({navigation}) => {
  //   const [exitViewVisible, setExitViewVisible] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  // console.log('currentRouteName ==>', stateGlobal.currentRouteName);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', backHandlerListener);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', backHandlerListener);
  //   };
  // }, [backHandlerListener]);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? color._black : color._white}
      />
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={{flex: 1}} enabled={false}>
          <Navigation />
        </KeyboardAvoidingView>
        {/* <Models.GeneralPopUp
          isVisible={exitViewVisible}
          title={'Hold On!'}
          discription={'Are You Sure You Want to Exit?'}
          leftBtnTxt={'CANCEL'}
          rightBtnTxt={'YES'}
          onRequestClose={() => {
            // setExitViewVisible(false);
          }}
          OnRightPress={() => {
            // setExitViewVisible(false);
          }}
          OnLeftPress={() => {
            // setExitViewVisible(false);
          }}
        /> */}
      </SafeAreaView>
    </>
  );
};

export default Containers;
