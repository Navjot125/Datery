import React from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
// import Home from '../assets/bottom_tab/Home.svg';
// import HomeS from '../assets/bottom_tab/HomeSelected.svg';
// import Instructor from '../assets/bottom_tab/Instructor.svg';
// import InstructorS from '../assets/bottom_tab/InstructorSelected.svg';
// import Favourite from '../assets/bottom_tab/Favourite.svg';
// import FavouriteS from '../assets/bottom_tab/FavouriteSelected.svg';
// import Champion from '../assets/bottom_tab/Champion.svg';
// import ChampionS from '../assets/bottom_tab/ChampionSelected.svg';

// import HomeScreen from '../Screens/HomeScreen';
// import InstructorScreen from '../Screens/InstructorScreen';
// import FavouriteScreen from '../Screens/FavouriteScreen';
// import ChampionScreen from '../Screens/ChampionScreen';
// import ProfileScreen from '../Screens/ProfileScreen';

import colors from "../Constants/Color";
// import SubscriptionScreen from '../Screens/SubscriptionScreen';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from "@react-navigation/stack";
// import ChangeSubscription from '../Screens/ChangeSubscription';
// import ChooseSubscription from '../Screens/ChooseSubscription';
// import MonthlyPlan from '../Screens/MonthlyPlan';
// import HomeModal from '../Screens/HomeScreen/HomeModal';
// import ContactScreen from '../Screens/ContactScreen/ContactScreen';
// import NotificationSettings from '../Screens/NotificationSettings';
// import LessonPlannedApproved from '../Screens/LessonPlannedApproved';
// import PlannedLesson from '../Screens/PlannedLesson';
// import FollowingList from '../Screens/FollowingList';
// import MySubsription from '../Screens/MySubsription';
// import SutabilityScreen from '../Screens/SutabilityScreen/SutabilityScreen';
// import Navigation from '.';
import { useSelector } from "react-redux";
// import FinancialTransaction from '../Screens/FinancialTransaction';
import Profile from "../Screens/MainScreens/Profile/Profile";
import PlanReserved from "../Screens/MainScreens/PlanReserved/PlanReserved";
import Learn from "../Screens/MainScreens/Learn/Learn";
import Play from "../Screens/MainScreens/Play/Play";
import Home from "../Screens/MainScreens/Home/Home";
import AllLearn from "../Screens/MainScreens/Learn/AllLearn";
import All from "../Screens/MainScreens/Play/All";
import ProfileGuestUser from "../Screens/GuestScreens/ProfileGuestUser";
import AllMap from "../Screens/MainScreens/Home/AllMap";
import MapViews from "../Screens/MainScreens/Home/MapViews";
import PlanReadyReservation from "../Screens/MainScreens/PlanReadyReservation/PlanReadyReservation";
import HowToPlay from "../Screens/MainScreens/HowToPlay/HowToPlay";
import Game from "../Screens/MainScreens/Game/Game";
import CourseOverview from "../Screens/MainScreens/CourseOverview/CourseOverview";
import AdviceDetail from "../Screens/MainScreens/AdviceDetail/AdviceDetail";
import CoachDetail from "../Screens/MainScreens/CoachDetail/CoachDetail";
import { Models } from "../Components";
import PlanReservedGuest from "../Screens/MainScreens/PlanReserved/PlanReservedGuest";
import color from "../Constants/Color";
import Images from "../assets/Images";
// import { CommonPopUp } from "../Components/models";
// import * as Model from "../Components/models";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

// Dashboard bottom tabs navigator
export const HomeNavigator = (props) => {
  // const {bottom} = useSafeAreaInsets();

  // const stateUser = useSelector(state => state.user);

  // const tabBarListeners = ({navigation, route, params}) => ({
  //   tabPress: () => navigation.navigate(route.name),
  // });

  return (
    <Tab.Navigator
      // initialRouteName={
      //   props.route.params == "guest" ? "ProfileGuestUser" : "Home"
      // }
      screenOptions={{
        tabBarShowLabel: false,

        headerStyle: {
          borderBottomWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "white",
          height: 70,
          paddingTop: 0,
          overflow: "visible",
        },
      }}
      // initialRouteName='TabHome'
      tabBarOptions={{
        // tintColor: colors._dark_gray_50,
        // activeTintColor: colors._splash_back_blue,
        style: {
          // paddingBottom: bottom + 4,
          paddingTop: 4,
          // shadowColor: colors._splash_back_blue,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        },
        lazy: false,
      }}
    >
      <Tab.Screen
        name={"HomeTab"}
        // name={props.route.params == "guest" ? "ProfileGuestUser" : "Home"}
        component={HomeTab}
        // props.route.params == "guest" ? ProfileGuestUser :
        options={({ navigation }) => ({
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconFlex}>
              {/* <SimpleLineIcons
                name="magnifier"
                color={focused ? 'red' : 'grey'}
                size={20}
              /> */}
              <Image
                source={
                  require("../assets/images/Discover.png")
                }
                style={{ height: 25, width: 25, tintColor: focused ? color._black : color._gray }}
              />
              <Text
                style={[
                  styles.tabtext1,
                  { color: focused ? color._black : color._gray },
                ]}
              >
                Discover
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={"PlanTab"}
        component={PlanStack}
        options={({ navigation }) => ({
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconFlex}>
              {/* <SimpleLineIcons
                name="magnifier"
                color={focused ? 'red' : 'grey'}
                size={20}
              /> */}
              <Image
                source={
                  require("../assets/images/Plan.png")

                }
                style={{ height: 25, width: 25, tintColor: focused ? color._black : color._gray }}
              />
              <Text
                style={[
                  styles.tabtext1,
                  { color: focused ? color._black : color._gray },
                ]}
              >
                Plan
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={"Profile"}
        component={props.route.params == "guest" ? ProfileGuestUser : Profile}
        options={({ navigation }) => ({
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconFlex}>
              {/* <SimpleLineIcons
                name="magnifier"
                color={focused ? 'red' : 'grey'}
                size={20}
              /> */}
              <Image
                source={
                  require("../assets/images/Profile.png")

                }
                style={{ height: 25, width: 25, tintColor: focused ? color._black : color._gray }}
              />
              <Text
                style={[
                  styles.tabtext1,
                  { color: focused ? color._black : color._gray },
                ]}
              >
                Profile
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name={"LearnTab"}
        component={LearnStack}
        options={({ navigation }) => ({
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconFlex}>
              {/* <SimpleLineIcons
                name="magnifier"
                color={focused ? 'red' : 'grey'}
                size={20}
              /> */}
              <Image
                source={
                  require("../assets/images/LearnIconFocused.png")

                }
                style={{ height: 25, width: 25, tintColor: focused ? color._black : color._gray }}
              />
              <Text
                style={[
                  styles.tabtext1,
                  { color: focused ? color._black : color._gray },
                ]}
              >
                Learn
              </Text>
            </View>
          ),
        })}
      />

      <Tab.Screen
        name={"PlayTab"}
        component={PlayStack}
        options={({ navigation }) => ({
          headerShown: false,
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconFlex}>
              {/* <SimpleLineIcons
                name="magnifier"
                color={focused ? 'red' : 'grey'}
                size={20}
              /> */}
              <Image
                source={
                  focused ?
                    Images.playImage :
                    Images.playCardImage
                }
                style={{ height: 25, width: 25 }}
              />
              <Text
                style={[
                  styles.tabtext1,
                  { color: focused ? color._black : color._gray },
                ]}
              >
                Play
              </Text>
            </View>
          ),
        })}
      // component={ChampionScreen}
      // options={{
      //   headerShown: false,
      //   tabBarLabel: '',
      //   tabBarIcon: ({color, focused}) =>
      //     focused ? <Learn style={{marginTop: 15}} /> : <Learn />,
      // }}
      // listeners={tabBarListeners}
      />
    </Tab.Navigator>
    //   <Tab.Navigator>
    //   <Tab.Screen name="Home" component={Profile} />
    //   <Tab.Screen name="Settings" component={Learn} />
    // </Tab.Navigator>
  );
};

const HomeNavigator2 = () => {
  const { bottom } = useSafeAreaInsets();

  const stateUser = useSelector((state) => state.user);

  const tabBarListeners = ({ navigation, route, params }) => ({
    tabPress: () => navigation.navigate(route.name),
  });

  return (
    <Tab.Navigator
      tabBarOptions={{
        tintColor: colors._dark_gray_50,
        activeTintColor: colors._splash_back_blue,
        style: {
          paddingBottom: bottom + 4,
          paddingTop: 4,
          shadowColor: colors._splash_back_blue,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        },
        lazy: false,
      }}
    >
      {/* <Tab.Screen
        name={'Dashboard'}
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) =>
            focused ? <HomeS style={{marginTop: 15}} /> : <Home />,
        }}
        listeners={tabBarListeners}
      /> */}
      <Tab.Screen
        name={"Profile"}
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? <HomeS style={{ marginTop: 15 }} /> : <Home />,
        }}
        listeners={tabBarListeners}
      />

      {/* {stateUser.isLogin &&
      stateUser.currentUser.user_role === 'trainer' ? null : (
        <Tab.Screen
          name={'Instructor'}
          component={InstructorStack}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <InstructorS style={{marginTop: 15}} />
              ) : (
                <Instructor />
              ),
          }}
          listeners={tabBarListeners}
        />
      )} */}

      {/* <Tab.Screen
        name={'Favourite'}
        component={FavouriteScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) =>
            focused ? <FavouriteS style={{marginTop: 15}} /> : <Favourite />,
        }}
        listeners={tabBarListeners}
      /> */}
      <Tab.Screen
        name={"Favourite"}
        component={FavouriteScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? <FavouriteS style={{ marginTop: 15 }} /> : <Favourite />,
        }}
        listeners={tabBarListeners}
      />

      <Tab.Screen
        name={"Champion"}
        component={ChampoinStack}
        // component={ChampionScreen}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? <ChampionS style={{ marginTop: 15 }} /> : <Champion />,
        }}
        listeners={tabBarListeners}
      />
    </Tab.Navigator>
  );
};


const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Home"}
        component={Home}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"MapViews"}
        component={MapViews}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/* <Stack.Screen
        name={'Subscription'}
        component={SubscriptionScreen}
        options={{headerShown: false, gestureEnabled: false}}
      /> */}
      {/* <Stack.Screen
        name={"Subscription"}
        component={ChooseSubscription}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"MonthlyPlan"}
        component={MonthlyPlan}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"ChangeSubscription"}
        component={ChangeSubscription}
        options={{ headerShown: false, gestureEnabled: false }}
      /> */}
    </Stack.Navigator>
  );
};

const PlanStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"PlanReserved"}
        component={PlanReserved}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"PlanReadyReservation"}
        component={PlanReadyReservation}
        options={{ headerShown: false, gestureEnabled: false, }}
      />
      <Stack.Screen
        name={"PlanReservedGuest"}
        component={PlanReservedGuest}
        options={{ headerShown: false, gestureEnabled: false, }}
      />
    </Stack.Navigator>
  );
};

const LearnStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Learn"}
        component={Learn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"CourseOverview"}
        component={CourseOverview}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/* <Stack.Screen
        name={"AdviceDetail"}
        component={AdviceDetail}
        options={{ headerShown: false, gestureEnabled: false }}
      /> */}
      {/* <Stack.Screen
        name={"CoachDetail"}
        component={CoachDetail}
        options={{ headerShown: false, gestureEnabled: false }}
      /> */}
    </Stack.Navigator>
  );
};
const PlayStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Play"}
        component={Play}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      {/* <Stack.Screen
        name={"HowToPlay"}
        component={HowToPlay}
        options={{ headerShown: false, gestureEnabled: false }}
      /> */}
      <Stack.Screen
        name={"Game"}
        component={Game}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};
const modalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Modal"}
        component={CommonPopUp}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const ChampoinStack = () => {
  return (
    <Stack.Navigator initialRouteName="Champion">
      <Stack.Screen
        name={"Champion"}
        component={ChampionScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"ChangeSubscription"}
        component={ChangeSubscription}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"ContactScreen"}
        component={ContactScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"NotificationSettings"}
        component={NotificationSettings}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"PlannedLesson"}
        component={PlannedLesson}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"FollowingList"}
        component={FollowingList}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"MySubsription"}
        component={MySubsription}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"SutabilityScreen"}
        component={SutabilityScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name={"FinancialTransaction"}
        component={FinancialTransaction}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  absoluteContainer: { position: "absolute" },
  backbtn: {
    paddingLeft: 15,
  },
  tabtext1: {
    // fontFamily: FONTS.GillSansNovaSemiBold,
    fontSize: 11,
    textAlign: "center",
    paddingTop: 6,
    // color: COLORS.primary,
  },
  iconFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeNavigator;
