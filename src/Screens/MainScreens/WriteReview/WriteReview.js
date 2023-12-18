import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import * as Atom from "../../../Components/atoms";
import styles from "./WriteReviewStyles";
import Icon from "react-native-vector-icons/Entypo";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import * as Model from "../../../Components/models";

import { connect } from "react-redux";
import { Models } from "../../../Components";
const WriteReview = (props) => {
  const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(false);
  const navigation = useNavigation();
  const type = props?.route?.params?.type

  const selectedImages = () => {
    return (
      <View style={styles.selectedImage}>
        <Image
          source={require("../../../assets/images/Splash.png")}
          style={{ width: 100, height: 120, resizeMode: "contain" }}
        />
        <Icon name={"cross"} size={24} color={color._primary_orange} />
      </View>
    );
  };
  const onPlaceOrder = () => {
    setModalVisibleAvailablity("true");
  };
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <BackHeader title={"Review"} />
        <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Text style={styles.headings}>Rating</Text>
          {/* <Text> 4 </Text> */}
          <View style = {{flexDirection:'row'}}>
            <Atom.Rating
              currentRating={Math.round(4)}
              titleStyle={{ paddingVertical: 8 }}
            />
          </View>
          <Text style={styles.headings}>Title</Text>
          <TextInput
            style={styles.input}
            value={""}
            placeholderTextColor={"#505050"}
            placeholder="Sed ut perspiciatis unde omnis iste natus"
          />
          <Text style={styles.headings}>Summary</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={""}
            placeholderTextColor={"#505050"}
            placeholder="The experience was amazing. My husband and I loved the outcome of the meal."
            multiline
          />
          <Text style={styles.headings}>Photos</Text>
          <View style={styles.uploadImage}>
            <Image
              source={require("../../../assets/images/PhotosUpload.png")}
              style={{ width: 37, height: 29 }}
            />
            <Text style={styles.uploadText}>Upload Image</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <Text style={[styles.noteText, { marginBottom: 25 }]}>( Maximum of four images )</Text>
            {/* {selectedImages()} */}
            <Atom.Button
              title="SUBMIT REVIEW"
              onPress={() => onPlaceOrder()}
            />
          </View>
        </ScrollView>
      </View>
      <Model.CommonPopUp
        isVisible={modalVisibleAvailablity}
        title="Successful"
        titleTxt={{ fontSize: 24 }}
        discription="Review Submitted!"
        descriptionTxt={styles.description}
        // middleContent={middleContentCardDecline()}
        middleContentStyle={{ paddingTop: 19 }}
        btnTxt={type == "video" ? "BACK TO VIDEO" : "Back To Activity"}
        onPress={() => { setModalVisibleAvailablity(false), navigation.navigate(type == "video" ? "CourseOverview" : "PurchasedActivity") }}
      />
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
