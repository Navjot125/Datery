import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Checkbox} from 'react-native-paper';

import styles from './ForgotPasswordStyles';
import color from '../../../Constants/Color';
import fonts from '../../../Constants/Fonts';
import {ScrollView} from 'react-native-virtualized-view';
import * as Atom from '../../../Components/atoms';
import * as Molecules from '../../../Components/molecules';
import {APPLE_LOGO, GOOGLE_LOGO, LOGO_ORANGE} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as Models from '../../../Components/models';

const ForgotPassword = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Molecules.BackHeader />
        <View style={styles.screenView}>
          <Image
            resizeMode='contain'
            source={LOGO_ORANGE}
            style={styles.logoImage}
          />
          <Text style={styles.mainHeading}>Forgot Password?</Text>
          <Text style={styles.textHeading}>
            Enter your email below, and we'll send you a link to reset your
            password.
          </Text>
          <View style={{paddingHorizontal: 12}}>
            <Atom.TextInput TextIcon={'email-outline'} placeholder="Email" />
          </View>
          <Atom.Button
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            containerStyle={{paddingHorizontal: 12, marginVertical: '8%'}}
            title={'SUBMIT'}
          />
        </View>
      </View>
      <Models.CommonPopUp
        title={'Successful'}
        discription={'We have emailed you a link to reset your password.'}
        isVisible={modalVisible}
        btnTxt={'BACK TO LOGIN'}
        onPress={() => {
          setModalVisible(!modalVisible);
          navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
