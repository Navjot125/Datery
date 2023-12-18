import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as Atom from '../../Components/atoms';
import * as Molecules from '../../Components/molecules';
import * as Models from '../../Components/models';
import styles from './MySplashScreenStyle';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFormik } from 'formik';
import { ScrollView } from 'react-native-virtualized-view';
import color from '../../Constants/Color';

const MySplashScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
      >
        <View>
          <Text onPress={() => navigation.navigate('Demo')}>Demo</Text>
          {/* <Atom.Button title={'SIGN IN'} />
      <Atom.Button
        title={'SIGN IN'}
        style={{
          borderWidth: 1,
          backgroundColor: '#FFF',
          borderColor: '#FF8E00',
        }}
        textStyle={{color: '#2F2729'}}
      />
      <Atom.TextInput TextIcon={'email-outline'} />
      <Atom.TextInput TextIcon={'key'} typePassword={true} />
    */}
          {/* <Atom.CheckBox
            onPress={console.log}
            label={
              'Yes, I would like to received personalized Comfility emails with suggested dates.'
            }
          /> */}
          {/* <Molecules.SelectItem
            DATA={[
              {_id: 4, name: 'ADD'},
              {_id: 2, name: 'sayfgis'},
              {_id: 3, name: 'DSKJ'},
              {_id: 5, name: 'DSKJ'},
              {_id: 6, name: 'DSKJ'},
            ]}
            onChange={console.log}
            multiSelect={true}
          /> */}
          {/* <Atom.TextInput title={'Name'} TextIcon={'calendar'} /> */}
          {/* Successful */}
          {/* <Models.CommonPopUp
            title={'Successful'}
            discription={'We have emailed you a link to reset your password.'}
            isVisible={true}
            btnTxt={'BACK TO LOGIN'}
            onPress={() => {} }
          /> */}
          {/* Failed Purchase 3*/}
          {/* <Models.CommonPopUp
            title={'Oops...'}
            discription={'Something went wrong during your purchase'}
            isVisible={true}
            middleContent={
              <Text
                style={{
                  color: color._font_grey,
                  alignSelf: 'center',
                  marginVertical: 20,
                }}>
                Error message for card declined
              </Text>
            }
            btnTxt={'Back to Cart'}
            onPress={() => {}}
          /> */}
          {/* Failed Purchase*/}
          {/* <Models.CommonPopUp
            title={"We're Sorry..."}
            discription={'The following reservation time is unavailable:'}
            isVisible={true}
            middleContent={
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: color._font_grey,
                      alignSelf: 'center',
                      marginVertical: 20,
                      width: '50%',
                    }}>
                    Error message for card declined
                  </Text>
                  <Text
                    style={{
                      color: color._font_grey,
                      alignSelf: 'center',
                      marginVertical: 20,
                      width: '50%',
                    }}>
                    Error message for card declined
                  </Text>
                </View>

                <Text ellipsizeMode="clip" numberOfLines={1}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - -
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      color: color._font_grey,
                      alignSelf: 'center',
                      marginVertical: 20,
                      width: '50%',
                    }}>
                    Error message for card declined
                  </Text>
                  <Text
                    style={{
                      color: color._font_grey,
                      alignSelf: 'center',
                      marginVertical: 20,
                      width: '50%',
                    }}>
                    Error message for card declined
                  </Text>
                </View>
              </View>
            }
            btnTxt={'Back to Cart'}
            onPress={() => {}}
          /> */}
          {/* Purchase Complete */}
          {/* <Models.CommonPopUp
            title={'Purchase Complete'}
            discription={'Thank you for shopping with us!'}
            isVisible={true}
            onPress={() => {}}
            btnTxt={'Review Activity'}
            secondBtnTxt={'Continue shopping'}
          /> */}

          <Models.ConfirmationPopUp
            isVisible={true}
            title={'Are you sure you want to delete this review?'}
            onPressYes={() => { }}
            onPressNo={() => { }}
          />
        </View>
      </ScrollView>

      {/* <Atom.Button onPress={() => {}} style={{}} title={'Next'} /> */}
    </View>
  );
};

export default MySplashScreen;
