import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import RenderHtml from 'react-native-render-html';
import styles from "./AboutComfilityStyles";
import { fontConfig } from "react-native-paper/lib/typescript/src/styles/fonts";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { API_URL } from "../../../Constants/Config";
import { aboutComfilityRequest } from "../../../modules/Profile/actions";
const AboutComfility = (props) => {
  const navigation = useNavigation();
  const DATA = [
    {
      id: "1",
      title: "Terms of Use",
      // onPress: () => navigation.navigate("TermsOfUse"),
      onPress: () => {
        let params = {
          endpoint: API_URL.aboutComfilityget,
          userToken: props.state.loginReducer.userToken,
          type: { type: 'Terms of Use' },
          navigation: () =>
            navigation.navigate("TermsOfUse"),
        };
        props.aboutComfilityRequest(params);
        // console.log(params,'params');
        // console.log(props);
      }
    },
    {
      id: "2",
      title: "Licenses ",
      // onPress: () => navigation.navigate("Licenses"),
      onPress: () => {
        let params = {
          endpoint: API_URL.aboutComfilityget,
          type: { type: 'Licences' },
          navigation: () =>
            navigation.navigate("Licenses"),
        };
        props.aboutComfilityRequest(params);
      }
    },
    {
      id: "3",
      title: "Privacy Statement",
      // onPress: () => navigation.navigate("PrivacyPolicy"),
      onPress: () => {
        let params = {
          endpoint: API_URL.aboutComfilityget,
          type: { type: 'Privacy Statement' },
          navigation: () =>
            navigation.navigate("PrivacyPolicy"),
        };
        props.aboutComfilityRequest(params);
      }
    },
    {
      id: "4",
      title: "Cookie Policy",
      // onPress: () => navigation.navigate("CookiePolicy"),
      onPress: () => {
        let params = {
          endpoint: API_URL.aboutComfilityget,
          type: { type: 'Cookie Policy' },
          navigation: () =>
            navigation.navigate("CookiePolicy"),
        };
        props.aboutComfilityRequest(params);
      }
    },
  ];

  const Item = ({ title, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.9}

      style={styles.item} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.scrollView}>
      {
        props.state.loaderReducer?.loader &&
        <View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}>
          <ActivityIndicator
            size="large" color={color._primary_orange} />
        </View>
      }
      <View style={styles.mainView}>
        <View style={{ marginBottom: 26 }}>
          <BackHeader title={"About Datery"} />
        </View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} onPress={item.onPress} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({

  setLoader: (data) => dispatch(setLoader(data)),
  aboutComfilityRequest: (data, navigation) => dispatch(aboutComfilityRequest(data, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutComfility);
