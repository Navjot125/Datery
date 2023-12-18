import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React from "react";
import styles from "./PaymentMethodsStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/Entypo";
import DropShadow from "react-native-drop-shadow";
import { BackHeader } from "../../../Components/molecules";
import { ListItem, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as Atom from "../../../Components/atoms";
import * as Card from "../../../Components/organisms";
const PaymentMethods = (props) => {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Payment Methods"} />
        <Card.PaymentCards />
      </View>
    </SafeAreaView>
  );
};


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethods);
