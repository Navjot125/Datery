import { SafeAreaView, Text, View, Image, PermissionsAndroid, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import styles from './SplashStyle';
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { roleRequest } from '../../../modules/Role/actions';

const Splash = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    Timer()
  }, [])
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      // console.log('granted', granted);
      if (granted === 'granted') {
        return true
      } else {
        // console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const Timer = () => {
    requestLocationPermission()
    setTimeout(function () {
      // {
      //   props.state?.loginReducer?.userToken ?
      //     (navigation.navigate("HomeTab", { screen: "Home" }),
      //       props.roleRequest({ user: 'User', id: 2 }))
      //     :
      //     props.state?.signupReducer?.signupSucessData?.Usertoken ?
      //       (navigation.navigate("HomeTab", { screen: "Home" }),
      //         props.roleRequest({ user: 'User', id: 2 })) :

      //       props.roleRequest({ user: 'Guest', id: 1 })
      //   navigation.navigate('Root')
      // }
      if (props.state?.loginReducer?.userToken || props.state?.signupReducer?.signupSucessData?.Usertoken) {
        // User is logged in or signed up
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root', params: { screen: 'Home' } }],
        });
        props.roleRequest({ user: 'User', id: 2 });
      } else {
        // User is a guest
        props.roleRequest({ user: 'Guest', id: 1 });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        });
      }
    }, 800);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.mainView}>
        <Image
          resizeMode="cover"
          source={require('../../../assets/images/Splash.png')}
          style={styles.mainView}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
