import {
    SafeAreaView,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from "react-native-virtualized-view";
import React from "react";
import styles from "./PlanReservedStyles";
import { Searchbar, TextInput } from "react-native-paper";
import fonts from "../../../Constants/Fonts";
import color from "../../../Constants/Color";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icons from 'react-native-vector-icons/AntDesign';
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Search from "react-native-vector-icons/FontAwesome";
import CalendarDark from "react-native-vector-icons/FontAwesome5";
import DropShadow from "react-native-drop-shadow";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { BackHeader } from "../../../Components/molecules";
import * as PopUp from "../../../Components/models";
import * as Model from "../../../Components/models";
import Modal from 'react-native-modal';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { roleRequest } from "../../../modules/Role/actions";
import { API_URL } from "../../../Constants/Config";
import { Button } from "../../../Components/atoms";
const PlanReservedGuest = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    // const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(role == 1 ? true : false);
    const [modalVisibleAvailablity, setModalVisibleAvailablity] = React.useState(false);
    const navigation = useNavigation();
    const role = props.state.roleReducer.role.id
    // props.roleRequest({ user: 'Guest', id: 1 })
    const data = [

        {
            id: 1,
            media: require("../../../assets/images/dummyImage.png"),
            title: "3 Course Meal Cooked at your home by Chef Jon",
            name: "Chef Jon",
            date: "Thursday 9th",
            time: "5:30 PM",
            schedule: "Availability",
        },
        {
            id: 2,
            media: require("../../../assets/images/dummyImage.png"),
            title: "3 Course Meal Cooked at your home by Chef Jon",
            name: "Chef Jon",
            date: "Friday 10th",
            time: "7:30 PM",
            schedule: "Availability",
        },
    ];


    const data2 = [
        {
            id: 1,
            media: require("../../../assets/images/dummyImage.png"),
            title: "3 Course Meal Cooked at your home by Chef Jon",
            name: "Chef Jon",
            date: "Thursday 9th",
            time: "5:30 PM",
            schedule: "Availability",
        },
    ];



    const search = () => {
        return (
            <View>
                <Searchbar
                    placeholder="Search "
                    placeholderTextColor={'grey'}
                    fontSize={16}
                    onChangeText={onChangeSearch}
                    // value={searchQuery}
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
                        // opacity: 0.4,
                        // lineHeight: 11,
                    }}
                />
            </View>
        );
    };
    // const d = new Date();
    // let currentMonth = d.getMonth();
    currentMonth = getMonthName(currentMonth + 1)
    const [searchQuery, setSearchQuery] = React.useState("");
    const [show, setShow] = React.useState(false);
    const [month, setMonths] = React.useState(currentMonth);
    const onChangeSearch = (query) => setSearchQuery(query);

    const showData = ({ item }) => {
        return (
            <View style={[styles.cardView]}>
                <DropShadow style={styles.shadowProp}>
                    <TouchableOpacity
            activeOpacity={0.9}

                        onPress={() => {
                            navigation.navigate("ListingDetail");
                        }}
                    >
                        <View style={styles.card}>
                            <Text style={styles.textStyle}>{item.date}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Image
                                    source={item.media}
                                    style={{ height: 50, width: 62, borderRadius: 6 }}
                                />
                                <View
                                    style={{
                                        padding: 15,
                                        width: "80%",
                                    }}
                                >
                                    <Text style={styles.textTitle}>{item.title}</Text>
                                    <View style={styles.lastText}>
                                        <Text style={styles.textBetween}> {item.name}</Text>
                                        {/* <Text style={styles.textBetween}>{item.time}</Text> */}
                                        <TouchableOpacity
            activeOpacity={0.9}

                                            onPress={() => setModalVisible(true)}
                                            style={styles.mediaType}>
                                            <Text style={styles.mediaType2}>
                                                <Icon name={"calendar-alt"} size={11} color={color._white} />{" "}
                                                {item.schedule}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </DropShadow>
            </View>
        );
    };
    const d = new Date();

    let currentMonth = d.getMonth();
    const [monthName, setMonthName] = React.useState(getMonthName(currentMonth + 1));
    const [monthName2, setMonthName2] = React.useState(getMonthName(currentMonth + 2));
    const [selected, setSelected] = React.useState("");
    const [daystring, setdaystring] = React.useState("");
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const select = (day) => {
        setSelected(day.dateString)
    }
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        const month = date.toLocaleString('en-US', {
            month: 'long',
        });
        return month
    }
    return (
        <SafeAreaView style={styles.scrollView}>
            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                zIndex: 3,
                // backgroundColor: 'tansparent',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '100%',
                // alignItems: 'center',

                // position: 'absolute', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
            }} >
                {/* <View
                
                //  style={{ height: '30%', backgroundColor: 'yellow', width: '90%', alignSelf: 'center' }} 
                > */}
                <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 1)']} style={styles.linearGradient}>
                    <View
                        backdropOpacity={0.3}
                        transparent={true}
                        isVisible={true}

                        animationIn="zoomIn"
                        animationOut="zoomOut"
                        style={{ justifyContent: 'center', width: '90%', alignSelf: 'center', }}>
                        <View style={styles.flex}>
                            <View style={styles.bodyContainer}>
                                <View style={[styles.container]}>
                                    <Text style={[styles.titileTxt,]}>{"Plan Dates"}</Text>
                                    <Text style={[styles.descriptionTxt,]}>
                                        {"User account required to plan dates."}
                                    </Text>
                                </View>
                                <View style={styles.btnBox}>
                                    <View style={[styles.btnCol, { zIndex: 6 }]}>
                                        <Button onPress={() => {
                                            setModalVisibleAvailablity(false),
                                                navigation.navigate("Login")
                                        }} title={"SIGN IN"} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.mainView}>
                {!show && <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: wp(4.25),
                    }}
                >
                    <TouchableOpacity
            activeOpacity={0.9}

                        onPress={() => { navigation.navigate("PlanReadyReservation") }}
                    >
                        {/* <CalendarIcon
                name="calendar-clock"
                size={27}
                color={color._border_orange}
                // PlanReady.png
              /> */}
                        <Image source={require('../../../assets/images/PlanReady.png')} style={{
                            height: 22,
                            width: 22
                        }} />
                    </TouchableOpacity>
                    <Image
                        resizeMode="contain"
                        style={{ height: 30, width: 30 }}
                        source={require("../../../assets/images/orange_hearts.png")}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
            activeOpacity={0.9}
                        
                        >
                            <CalendarDark
                                name="calendar-day"
                                size={22}
                                color={color._border_orange}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
            activeOpacity={0.9}
                        
                        >
                            <Search
                                onPress={() => setShow(!show)}
                                name="search"
                                size={22}
                                color={color._border_orange}
                                style={{ marginLeft: 15 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>}
                {
                    show &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }} >
                        <View>{search()}</View>
                        <Icons onPress={() => setShow(!show)} name={'arrowright'} size={24} color={color._primary_orange} />
                    </View>
                }
                <Calendar
                    style={{
                        marginTop: 31,
                        marginBottom: 19,
                        borderWidth: 1,
                        borderColor: "white",
                        borderRadius: 15,
                        shadowColor: "rgba(0, 0, 0, 0.7)",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 4.65,
                        elevation: 7,
                        width: "97%",
                        alignSelf: "center",
                    }}
                    theme={{
                        todayTextColor: color._border_orange,
                        textDayFontFamily: fonts.REGULAR,
                        textDayFontSize: 16,
                        textMonthFontFamily: fonts.SEMI_BOLD,
                        textMonthFontSize: 18,
                        textDayHeaderFontFamily: fonts.SEMI_BOLD,
                        textDayHeaderFontSize: 14,
                        dayTextColor: "rgba(0, 0, 0, 0.7)",
                        textSectionTitleColor: "rgba(0, 0, 0, 0.7)",
                        arrowColor: color._black,
                        monthTextColor: color._border_orange,
                    }}
                    onDayPress={(day) => {
                        select(day)
                    }}
                    onMonthChange={(day) => {
                        setMonthName(getMonthName(day.month)),
                            setMonthName2(getMonthName(day.month + 1));
                    }}
                    markedDates={{
                        [selected]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: color._border_orange,
                        },
                    }}
                />
                <ScrollView
                 bounces={false}
                 alwaysBounceVertical={false}
                 overScrollMode="never"
                showsVerticalScrollIndicator={false} >
                    <Text style={styles.orangeText}>{monthName}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={showData}
                        showsVerticalScrollIndicator={false}
                    />
                    <Text style={styles.orangeText}>{monthName2}</Text>
                    <FlatList
                        data={data2}
                        keyExtractor={(item) => item.id}
                        renderItem={showData}
                        showsVerticalScrollIndicator={false}
                    />
                </ScrollView>
            </View>
            <PopUp.SlideUpPopUp
                isVisible={modalVisible}
                onPress={() => {
                    // navigation.navigate("PurchasedActivity"), 
                    setModalVisible(!modalVisible)
                }}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            />
            {/* <Model.CommonPopUp
                isVisible={modalVisibleAvailablity}
                // isVisible={true}
                // onRequestClose={() => { setModalVisibleAvailablity(false) }}
                title="Plan Dates"
                titleTxt={{ fontSize: 24 }}
                discription="User account required to plan dates."
                descriptionTxt={styles.description}
                // middleContent={middleContentCardDecline()}
                middleContentStyle={{ paddingTop: 19 }}
                btnTxt={"SIGN IN"}
                onPress={() => { setModalVisibleAvailablity(false), navigation.navigate("Login") }}
            /> */}
        </SafeAreaView >
    );
};

const mapStateToProps = (state) => ({
    state: state
});

const mapDispatchToProps = (dispatch) => ({
    roleRequest: (data) => (dispatch(roleRequest(data))),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanReservedGuest);
