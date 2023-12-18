import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "./SearchHomeStyles";
import { BackHeader } from "../../../Components/molecules";
import CartIcon from "react-native-vector-icons/AntDesign";
import { Searchbar, Divider } from "react-native-paper";
import color from "../../../Constants/Color";
import fonts from "../../../Constants/Fonts";
import Search from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

const data = [
  {
    id: 1,
    title: "Sweet Dreams Spa",
  },
  {
    id: 2,
    title: "Elite Spa",
  },
  {
    id: 3,
    title: "Balance Dance Studios",
  },
  {
    id: 4,
    title: "Texas Land & Cattle",
  },
  {
    id: 5,
    title: "Midway Dance Studio",
  },
  {
    id: 6,
    title: "Dance Austin Studio",
  },
];

const SearchHome = (props) => {
  const navigation = useNavigation();

  const rightImage = () => {
    return (
      <CartIcon
        name="shoppingcart"
        size={19}
        color={color._border_orange}
        style={{ marginLeft: 8 }}
      />
    );
  };

  const search = () => {
    return (
      <View>
        <Searchbar
          placeholder="Search "
          onChangeText={onChangeSearch}
          value={searchQuery}
          iconColor={color._primary_orange}
          style={{
            backgroundColor: "#F8F7FA",
            height: 40,
            width: 266,
          }}
          inputStyle={{
            fontFamily: fonts.REGULAR,
            fontSize: 10,
            color: "#000000",
            alignSelf: "center",
            opacity: 0.4,
            lineHeight: 11,
          }}
        />
      </View>
    );
  };

  const separator = () => {
    return <Divider orientation="vertical" />;
  };

  const showData = ({ item }) => {
    return (
      <TouchableOpacity
      activeOpacity={0.9}

        style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
      >
        <Search
          name="search"
          size={14}
          color={"rgba(0, 0, 0, 0.1)"}
          style={{ marginRight: 15 }}
        />
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const [result, setResult] = React.useState(data[0]);

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.view}>
        <BackHeader title={search()} isRight rightContent={rightImage()} />
        <View style={{ marginTop: 48 }}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={showData}
            ItemSeparatorComponent={separator}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHome);
