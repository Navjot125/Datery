import { ToastAndroid } from "react-native";

export const showAlert = (msg) => {
    setTimeout(() => {
        toast.show(msg, {
            type: "normal",
            placement: "bottom",
            duration: 3000,
            offset: 30,
            animationType: "zoom-in",
        });
    }, 100);
};
export class AlertHelper {
    static long(message) {
        // this.show('success', 'Success', message);
        // ------------------------ START ------------------------
        toast.show(message, {
            type: "normal",
            placement: "bottom",
            duration: 3000,
            offset: 30,
            animationType: "zoom-in",
        });
        // -------------------------- END --------------------------
        // ToastAndroid.showWithGravityAndOffset(
        //   message,
        //   ToastAndroid.LONG,
        //   ToastAndroid.BOTTOM,
        //   25,
        //   120
        // );
    }

    static short(message) {
        // this.show('success', 'Success', message);
        // ------------------------ START ------------------------
        toast.show(message, {
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "zoom-in",
        });
        // -------------------------- END --------------------------
        // ToastAndroid.showWithGravityAndOffset(
        //   message,
        //   ToastAndroid.SHORT,
        //   ToastAndroid.BOTTOM,
        //   25,
        //   120
        // );
    }
}
