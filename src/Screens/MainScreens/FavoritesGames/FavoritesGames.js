import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import styles from "./FavoritesGamesStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
// import BackButton from '../../../components/BackButton';
import DropShadow from "react-native-drop-shadow";
import { connect, useSelector } from "react-redux";
import { BackHeader } from "../../../Components/molecules";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../Constants/Config";
import axiosClient from "../../../Utils/ApiClient";
import { showAlertError } from "../../../Common/Functions/CommonFunctions";


const FavoritesGames = (props) => {

  const navigation = useNavigation()

  const { userToken, loginData } = useSelector(state => state.loginReducer)
  const { Usertoken, signupSucessData } = useSelector(state => state.signupReducer)
  const [favData, setfavData] = useState()

  useEffect(() => {
    handleFavourite()
  }, [])

  const showData = ({ item }) => {
    // console.log(item, "illl")
    return (
      <View style={styles.cardView}>
        <DropShadow style={styles.shadowProp}>
          <TouchableOpacity
            activeOpacity={0.9}

            onPress={() => navigation.navigate("HowToPlay", { item, favorite:true })}
          >
            <View style={[styles.card]}>
              <Image
                source={{ uri: `http://54.92.82.16:3001/data/${item?.file[0]}` }}
                style={{ height: 66, width: 85, borderRadius: 6 }}
              />
              <View style={{ padding: 15 }}>
                <Text style={styles.textTitle}>{item.gameTitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </DropShadow>
      </View>
    );
  };

  const emptyData = () => {
    return (
      < View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
        <Text style={{ fontSize: 18, color: color._black, fontFamily: fonts.MEDIUM }}>{"No Favorities Games"}</Text>
      </View >
    );
  };

  const handleFavourite = async () => {
    try {
      const token = userToken ? userToken :
        Usertoken
      const res = await axiosClient.get(API_URL.fetchFavoriteGame, {
        headers: {
          Authorization: token
        }
      })
      if (res.data.status)
        setfavData(res.data.data)

    } catch (error) {
      console.log(error)
      // showAlertError(error)
    }

  }

  { console.log(favData) }

  return (
    <SafeAreaView style={styles.scrollView}>
      <View style={styles.mainView}>
        <BackHeader title={"Favorites"} />
        {/* <View style={styles.header}>
          <TouchableOpacity>
            <BackButton />
          </TouchableOpacity>
          <Text style={styles.textStyle}>Favorites</Text>
          <Text> </Text>
        </View> */}
        {/* <ScrollView
          bounces={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 15 }}
        > */}
        <FlatList
          data={favData}
          ListEmptyComponent={emptyData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={showData}
          showsVerticalScrollIndicator={false}
        />
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesGames);
