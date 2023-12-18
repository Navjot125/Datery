import { SafeAreaView, Text, View } from "react-native";
import React from "react";
import styles from "./SelectCardsStyle";
import { BackHeader } from "../../../Components/molecules";
import { ListItem, Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import * as Atom from "../../../Components/atoms";
import * as Card from "../../../Components/organisms";
const SelectCards = (props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Select Cards"} />
        <Card.PaymentCards />
        {/* <Atom.Button
          title={"Update Card Selection"}
          onPress={() => navigation.navigate("ReviewCart")}
          containerStyle={{ marginBottom: 37 }}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCards);
