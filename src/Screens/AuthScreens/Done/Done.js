import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import * as Atom from "../../../Components/atoms";
import * as Molecules from "../../../Components/molecules";
import styles from "./DoneStyles";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { answerRequest } from "../../../modules/SetAnswer/actions";
import { navigate } from "../../../RootNavigation";
import { API_URL } from "../../../Constants/Config";
const Done = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Image
          resizeMode="center"
          source={require("../../../assets/images/Datery.png")}
          style={{
            width: wp(35),
            height: hp(16),
          }}
        />
        <View style={styles.View}>
          <Text style={styles.text}>Your Dating Profile is up to date!</Text>
          <Atom.Button
            onPress={() => {
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: 'Root', params: { screen: 'Home' } }],
              // })
              navigation.navigate("Root", { screen: "Home" });
            }}
            containerStyle={{ width: 335, height: 61 }}
            title={"Explore Comfility"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswer: (data, navigation) => dispatch(setAnswer(data, navigation)),
  answerRequest: (data, navigation) =>
    dispatch(answerRequest(data, navigation)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Done);
