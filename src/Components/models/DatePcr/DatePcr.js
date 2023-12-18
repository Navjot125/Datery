import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    FlatList,
    ScrollView
} from "react-native";
import Modal from "react-native-modal";
import React, { useState } from 'react'
import fonts from '../../../Constants/Fonts';
import color from '../../../Constants/Color';
import Cross from "react-native-vector-icons/AntDesign";
import * as Atom from "../../atoms";
import DatePicker from "react-native-date-picker";

const DatePcr = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    // const [date, setDate] = useState('');


    const { isVisible, onRequestClose, onRef, onPress, selected, setSelected, onPressCancel, setSelectedTime, selectedTime, cancelTitle, date, onDateChange } = props;

    React.useEffect(() => {
        setModalVisible(isVisible);
    }, [isVisible]);


    const renderModalContent = () => (
        <View style={styles.modalContent}>
            <DatePicker
                date={date}
                mode="date"
                // placeholder="Select date"
                format="YYYY-MM-DD"
                style={{  flex: 1 }}
                onDateChange={onDateChange}
            />
            {/* <Text style={styles.orangeTextTime}>Select Time</Text> */}
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => onPressCancel()} >
                <Text style={styles.cancel}>{props.cancelTitle}</Text>
            </TouchableOpacity>
            {/* <Atom.Button onPress={() => onPress(selected)} title={"DONE"} /> */}
        </View>
    );



    return (
        <View>
            <Modal
                isVisible={modalVisible}
                style={styles.bottomModal}
                animationType="slide"
                onBackButtonPress={() => {
                    if (onRequestClose !== undefined) {
                        setModalVisible(!modalVisible);
                        onRequestClose();
                    }
                }}
                onBackdropPress={() => {
                    if (onRequestClose !== undefined) {
                        setModalVisible(!modalVisible);
                        onRequestClose();
                    }
                }}
            >
                {renderModalContent()}
            </Modal>
        </View>
    )
}






const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        // padding: 22,
        justifyContent: "center",
        alignItems: "center",
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        flex:0.4,
        // alignSelf:'center',
        // bottom:10
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    },

    textTitle: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: 16,
        color: color._black,
        // width: 203,
    },
    orangeText: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: 16,
        color: color._primary_orange,
    },
    orangeTextTime: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: 16,
        color: color._primary_orange,
        textAlign: "center",
    },
    cancel: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: 12,
        color: color._primary_orange,
        textAlign: "center",
        textDecorationLine: "underline",
        marginBottom: 38,
    },
    time: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: 12,
        color: color._black,

        paddingHorizontal: 15,
        paddingVertical: 8,
        textAlign: "center",
        marginBottom: 31,
        borderRadius: 10,
    },
    timeSelected: {
        fontFamily: fonts.SEMI_BOLD,
        fontSize: 12,
        color: color._white,
        backgroundColor: color._primary_orange,
        paddingHorizontal: 15,
        paddingVertical: 8,
        textAlign: "center",
        marginBottom: 31,
        borderRadius: 10,
    },
});
export default DatePcr