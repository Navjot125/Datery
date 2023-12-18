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
import styles from "./TermsStyles";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
const TermsOfUse = (props) => {
  const { width } = useWindowDimensions();
 
  const cleanedSource = props.state.profileReducer?.privacyStatement?.description.replace(/&quot;/g, '"');
  const renderItem = ({ item }) => (
    <View style={styles.viewFlatList}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Terms of Use "} />
        <RenderHtml
          contentWidth={width}
          source={{ html: cleanedSource }}
        />
        {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);
