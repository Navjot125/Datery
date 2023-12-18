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
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import styles from "./PrivacyPolicyStyles";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { BackHeader } from "../../../Components/molecules";
const PrivacyPolicy = (props) => {
  const { width } = useWindowDimensions();
  const DATA = [
    {
      id: "1",
      title: "At vero eos et accusamus et iusto odio dignissimos",
      content:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "2",
      content:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
    },
    {
      id: "3",
      content:
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.",
    },
  ];
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
        <BackHeader title={"Privacy Statement "} />
        <RenderHtml
          contentWidth={width}
          source={{ html: cleanedSource }}
        />
        {/* <Text></Text> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
