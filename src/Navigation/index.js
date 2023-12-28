import * as React from "react";
import { Animated, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// import SplashScreen from 'react-native-splash-screen';
import MySplashScreen from "../Screens/MySplashScreen";
import color from "../Constants/Color";
import Demo from "../Screens/Demo";
import Login from "../Screens/AuthScreens/Login";
import SignUp from "../Screens/AuthScreens/SignUp";
import ForgotPassword from "../Screens/AuthScreens/ForgotPassword";
import Welcome from "../Screens/AuthScreens/Welcome";
import Age from "../Screens/AuthScreens/Age";
import Gender from "../Screens/AuthScreens/Gender";
import SexualOrientation from "../Screens/AuthScreens/SexualOrientation";
import RelationshipStatus from "../Screens/AuthScreens/RelationshipStatus";
import CurrentRelationshipLength from "../Screens/AuthScreens/CurrentRelationshipLength";
import HowManyDates from "../Screens/AuthScreens/HowManyDates";
import LongestRelationship from "../Screens/AuthScreens/LongestRelationship";
import Budget from "../Screens/AuthScreens/Budget";
import TypeOfDates from "../Screens/AuthScreens/TypeOfDates";
import AboutComfility from "../Screens/MainScreens/AboutComfility";
import CookiePolicy from "../Screens/MainScreens/CookiePolicy";
import TermsOfUse from "../Screens/MainScreens/TermsOfUse";
import PrivacyPolicy from "../Screens/MainScreens/PrivacyPolicy";
import Licenses from "../Screens/MainScreens/Licenses";
import ChangePassword from "../Screens/MainScreens/ChangePassword";
import LocationSetting from "../Screens/MainScreens/LocationSetting";
import NotificationsSetting from "../Screens/MainScreens/NotificationsSettings";
import EmailPreference from "../Screens/MainScreens/EmailPreference";
import DatingProfile from "../Screens/MainScreens/DatingProfile";
import PurchaseHistory from "../Screens/MainScreens/PurchaseHistory";
import Profile from "../Screens/MainScreens/Profile";
import PaymentMethods from "../Screens/MainScreens/PaymentMethods";
import AddCard from "../Screens/MainScreens/AddCard";
import EditCard from "../Screens/MainScreens/EditCard";
import CourseOverview from "../Screens/MainScreens/CourseOverview";
import OverViewTab from "../Screens/MainScreens/OverViewTab";
import ReviewTab from "../Screens/MainScreens/ReviewTab";
import HowToPlay from "../Screens/MainScreens/HowToPlay";
import Play from "../Screens/MainScreens/Play";
import CoachDetail from "../Screens/MainScreens/CoachDetail";
import Game from "../Screens/MainScreens/Game";
import Home from "../Screens/MainScreens/Home";
import PlanReadyReservation from "../Screens/MainScreens/PlanReadyReservation";
import PlanReserved from "../Screens/MainScreens/PlanReserved";
import Receipt from "../Screens/MainScreens/Receipt";
import PurchasedActivity from "../Screens/MainScreens/PurchasedActivity";
import Learn from "../Screens/MainScreens/Learn";
import SearchHome from "../Screens/MainScreens/SearchHome";
import MerchantReviews from "../Screens/MainScreens/MerchantReviews";
import ListingDetail from "../Screens/MainScreens/ListingDetail";
import FavoriteHome from "../Screens/MainScreens/FavoriteHome";
import SlideUpPopUp from "../Components/models/SlideUpPopUp";
import ReviewCart from "../Screens/MainScreens/ReviewCart";
import SelectCards from "../Screens/MainScreens/SelectCards";
import EditReview from "../Screens/MainScreens/EditReview";
import UserReviews from "../Screens/MainScreens/UserReviews";
import ProfileGuestUser from "../Screens/GuestScreens/ProfileGuestUser";
import Topics from "../Screens/AuthScreens/Topics";
import DatingCoach from "../Screens/AuthScreens/DatingCoach";
import Kids from "../Screens/AuthScreens/Kids";
import Location from "../Screens/AuthScreens/Location";
import Done from "../Screens/AuthScreens/Done";
import AdviceDetail from "../Screens/MainScreens/AdviceDetail";
import LearnFavorites from "../Screens/MainScreens/LearnFavorites";
import CustomerSupport from "../Screens/MainScreens/CustomerSupport";
import FavoritesGames from "../Screens/MainScreens/FavoritesGames";
import FavoritesCoaches from "../Screens/MainScreens/FavoritesCoaches";
import HomeNavigator from "./Home.Navigator";
import HomeSearchResult from "../Screens/MainScreens/HomeSearch/HomeSearchResult";
import MapViews from "../Screens/MainScreens/Home/MapViews";
import Splash from "../Screens/AuthScreens/SplashScreen/Splash";
import Planed from "../Screens/MainScreens/PlanReadyReservation/Planed";
import Unplaned from "../Screens/MainScreens/PlanReadyReservation/Unplaned";
import WriteReview from "../Screens/MainScreens/WriteReview/WriteReview";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const navigationRef = React.createRef();
export const navigate = (name, params) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  );
};

const Navigation = (props) => {
  const routeNameRef = React.useRef();

  //   React.useEffect(() => {
  //     SplashScreen.hide();
  //   }, []);
  const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.width * -0.3, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  };
  const forReverseSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Fully unfocused
                  0, // Fully focused
                  screen.width * -0.3, // Focused, but offscreen in the beginning
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        // console.log("CurrentRouteName ==>", currentRouteName);
        // console.log('PreviousRouteName ==>', previousRouteName);
      }}
    >
      {/* <StatusBar barStyle="dark-content" backgroundColor={"#ffffff"} /> */}
      <Stack.Navigator
        screenOptions={{ gestureEnabled: true, cardStyleInterpolator: forReverseSlide }}
        // initialRouteName={"Login"}
        initialRouteName={"Splash"}
      // initialRouteName={"ReviewCart"}
      // initialRouteName={"Root"}
      // initialRouteName={"PurchasedActivity"}
      >
        <Stack.Screen
          name="Root"
          component={HomeNavigator}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Age"
          component={Age}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Gender"
          component={Gender}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="SexualOrientation"
          component={SexualOrientation}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="RelationshipStatus"
          component={RelationshipStatus}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="CurrentRelationshipLength"
          component={CurrentRelationshipLength}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="LongestRelationship"
          component={LongestRelationship}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="HowManyDates"
          component={HowManyDates}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Budget"
          component={Budget}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="TypeOfDates"
          component={TypeOfDates}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Topics"
          component={Topics}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="DatingCoach"
          component={DatingCoach}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Kids"
          component={Kids}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Location"
          component={Location}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Done"
          component={Done}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Demo"
          component={Demo}
        />
        {/* Guest Screens */}
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ProfileGuestUser"
          component={ProfileGuestUser}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="EditReview"
          component={EditReview}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="WriteReview"
          component={WriteReview}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="UserReviews"
          component={UserReviews}
        />
        {/* Main screens */}
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="AboutComfility"
          component={AboutComfility}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="TermsOfUse"
          component={TermsOfUse}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Licenses"
          component={Licenses}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="PrivacyPolicy"
          component={PrivacyPolicy}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="CookiePolicy"
          component={CookiePolicy}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="LocationSetting"
          component={LocationSetting}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="NotificationsSetting"
          component={NotificationsSetting}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="EmailPreference"
          component={EmailPreference}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="DatingProfile"
          component={DatingProfile}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="PurchaseHistory"
          component={PurchaseHistory}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="PaymentMethods"
          component={PaymentMethods}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="HomeSearchResult"
          component={HomeSearchResult}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="MapViews"
          component={MapViews}
        />
        {/* <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="FoodMap"
          component={FoodMap}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="EntertainmentMap"
          component={EntertainmentMap}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ArtsMap"
          component={ArtsMap}
        /> */}
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Planed"
          component={Planed}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Unplaned"
          component={Unplaned}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="AddCard"
          component={AddCard}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="EditCard"
          component={EditCard}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="CourseOverview"
          component={CourseOverview}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="OverViewTab"
          component={OverViewTab}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ReviewTab"
          component={ReviewTab}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="HowToPlay"
          component={HowToPlay}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Play"
          component={Play}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="CoachDetail"
          component={CoachDetail}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Game"
          component={Game}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="PlanReadyReservation"
          component={PlanReadyReservation}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="PlanReserved"
          component={PlanReserved}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Receipt"
          component={Receipt}
        />
        {/* <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="PurchasedActivity"
          component={PurchasedActivity}
        /> */}
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="Learn"
          component={Learn}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="SearchHome"
          component={SearchHome}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="MerchantReviews"
          component={MerchantReviews}
        />

        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ListingDetail"
          component={ListingDetail}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="FavoriteHome"
          component={FavoriteHome}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="ReviewCart"
          component={ReviewCart}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="SelectCards"
          component={SelectCards}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="AdviceDetail"
          component={AdviceDetail}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="LearnFavorites"
          component={LearnFavorites}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="CustomerSupport"
          component={CustomerSupport}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="FavoritesCoaches"
          component={FavoritesCoaches}
        />
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="FavoritesGames"
          component={FavoritesGames}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // <NavigationContainer  ref={navigationRef}
    //   onReady={() =>
    //     (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
    //   }
    //   onStateChange={() => {
    //     const previousRouteName = routeNameRef.current;
    //     const currentRouteName = navigationRef.current.getCurrentRoute().name;
    //     console.log("CurrentRouteName ==>", currentRouteName);
    //     // console.log('PreviousRouteName ==>', previousRouteName);
    //   }}
    // >
    //   {/* <StatusBar barStyle="dark-content" backgroundColor={"#ffffff"} /> */}
    //   <Stack.Navigator
    //     screenOptions={{ gestureEnabled: false }}
    //     // initialRouteName={"Login"}
    //     initialRouteName={"HomeNavigator"}
    //   >
    //     <Stack.Screen
    //     options={{ headerShown: false, gestureEnabled: false }}
    //     name="HomeNavigator"
    //     component={HomeNavigator}
    //   />
    //       <Stack.Screen
    //       options={{ headerShown: false, gestureEnabled: false }}
    //       name="FavoritesGames"
    //       component={FavoritesGames}
    //     />
    //   {/* <HomeNavigator /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
