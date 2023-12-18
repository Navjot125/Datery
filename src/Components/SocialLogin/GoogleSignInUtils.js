/**
 * This class is used for all methods related to google sign in
 */
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-community/google-signin";
import { Platform } from "react-native";
import { AlertHelper } from "../../Constants/AlertHelper";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "../../Constants/Config";
// import {showNativeMessage} from '../../utils/helpers';

/**
 * This method is used to configure google project id with the app
 */
export const configureGoogleSign = () => {
    GoogleSignin.configure({
        iosClientId: IOS_CLIENT_ID,
        webClientId: Platform.OS == "ios" ? IOS_CLIENT_ID : WEB_CLIENT_ID,
        offlineAccess: false,
        forceCodeForRefreshToken: true,
    });
    // GoogleSignin.configure();
};

/**
 * This method is used to  with the google
 * @param {*} setUserInfo callback for getting user details
 * @param {*} setError callback for google sign in failure
 * @param {*} setIsLoggedIn callback for google sign in completer or having error
 */
export const signIn = async (setUserInfo, setError, setIsLoggedIn) => {
    try {
        await GoogleSignin.hasPlayServices({
            autoResolve: true,
            showPlayServicesUpdateDialog: true,
        });
        const userInfo = await GoogleSignin.signIn();
        // console.log(userInfo);
        setUserInfo(userInfo);
        setError(null);
        // setIsLoggedIn(true);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // when user cancels sign in process,
            // console.log("Process Cancelled", "info");
            // showNativeMessage("Process Cancelled", "info");
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // when in progress already
            // console.log("Process in progress", "info");
            // showNativeMessage("Process in progress", "info");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // when play services not available
            // console.log("Play services are not available");
            // showNativeMessage("Play services are not available");
        } else {
            // some other error
            // console.log("Something went wrong... " + error.toString());
            //    AlertHelper.long("Something went wrong... " + error.toString());
            // showNativeMessage('Something went wrong... ' + error.toString());
            setError(error);
        }
    }
};

/**
 * This method is used to logout from google sign in
 * @param {*} setIsLoggedIn callback to if logout is done or not
 */
export const signOut = async (setIsLoggedIn) => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        // setIsLoggedIn(false);
    } catch (error) {
        // console.log("Something went wrong... " + error.toString());
        // AlertHelper.long("Something went wrong... " + error.toString());
        // showNativeMessage('Something else went wrong... ' + error.toString());
    }
};

/**
 * This method is used to get google logged in user details
 */
export const getCurrentUserInfo = async (setUserInfo) => {
    try {
        const userInfo = await GoogleSignin.signInSilently();
        setUserInfo(userInfo);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_REQUIRED) {
            // when user hasn't signed in yet
            // console.log("Please Sign in", "info");
            // showNativeMessage('Please Sign in', 'info');
            // setIsLoggedIn(false);
        } else {
            // console.log("Something else went wrong... " + error.toString());
            // AlertHelper.long(
            //     "Something else went wrong... " + error.toString()
            // );
            // showNativeMessage('Something else went wrong... ' + error.toString());
            // setIsLoggedIn(false);
        }
    }
};
