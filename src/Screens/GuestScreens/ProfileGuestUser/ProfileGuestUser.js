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
import { Checkbox } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import styles from "./ProfileGuestStyle";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import { LOGO_ORANGE } from "../../../assets";

const ProfileGuestUser = (props) => {
  const navigation = useNavigation();
  const [checked, setChecked] = React.useState(false);
  const DATA = [
    {
      id: "1",
      title: "Location",
      onPress: () => navigation.navigate("LocationSetting"),
    },
    {
      id: "2",
      title: "Customer Support ",
      onPress: () => navigation.navigate("CustomerSupport"),
    },
    {
      id: "3",
      title: "Join the Datery Marketplace",
    },
    {
      id: "4",
      title: "Rate & Review Datery",
      // onPress: () => navigation.navigate("UserReviews"),
    },
    {
      id: "5",
      title: "About Datery",
    },
  ];
  // props.roleRequest({ user: 'Guest', id: 1 })

  const Item = ({ title, onPress }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.item} onPress={onPress}>
      {/* <View style={styles.item}> */}
      <Text style={styles.title}>{title}</Text>
      {/* </View> */}
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.scrollView}>
      {/* <View>  */}
      <ScrollView
        bounces={false}
        alwaysBounceVertical={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scrollView}>
          <View style={styles.mainView}>
            <Image
              resizeMode="contain"
              source={LOGO_ORANGE}
              style={{
                width: wp(35),
                height: hp(16),
                marginTop: 91,
              }}
            />
            <Text style={styles.mainHeading}>Welcome to Datery</Text>
            <Text style={styles.textHeading}>
              Where you can discover exclusive dates in your area
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.signInButtonStyle}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                })
              }
            >
              <Text style={styles.signInText}>SIGN IN OR SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 23, marginTop: 29 }}>
            <Text
              style={{
                fontFamily: fonts.SEMI_BOLD,
                fontSize: 16,
                color: color._font_grey,
                marginBottom: 22,
              }}
            >
              My Settings
            </Text>

            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <Item title={item.title} onPress={item.onPress} />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>

      {/* <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item title={item.title} onPress={item.onPress} />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View> */}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = (dispatch) => ({
  roleRequest: (data) => dispatch(roleRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGuestUser);
