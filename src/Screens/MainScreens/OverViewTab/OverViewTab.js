import { Text, View } from "react-native";
import React, { useState } from "react";
import styles from "./OverViewTabStyles";
import { ScrollView } from "react-native-virtualized-view";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";



const OverViewTab = ({ descrip }) => {
  const navigation = useNavigation();
  const [listData, setListData] = useState(descrip)

  const formatDate = (isoDateString) => {
    const createdAtDate = new Date(isoDateString);
    return `${createdAtDate.toDateString()}`;
  };

  // { console.log("LLLLLDDDDD", listData) }

  return (
    <View style={styles.scrollView}>
      <View style={{ flexDirection: "row", marginVertical: 16 }}>
        <Text style={styles.textNew}> {listData.learnTime}</Text>
        <Text style={styles.textNew}>  {formatDate(listData.createdAt)}</Text>
      </View>
      <Text style={styles.text}> {listData.learnDescription}</Text>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OverViewTab);
