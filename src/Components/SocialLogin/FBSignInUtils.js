import { LoginManager, Settings } from "react-native-fbsdk-next";
import { GraphRequest, GraphRequestManager } from "react-native-fbsdk-next";
import { Platform } from "react-native";
import { useEffect } from "react";

// useEffect(() => {
// Settings.initializeSDK();
// Settings.setAppID("377085451041624");
// Settings.setAppID("1341922246542747");
// }, []);

export const _responseInfoCallback = (
    setIsLoggedIn,
    setUserInfo,
    setError,
    error,
    result
) => {
    if (error) {
        console.error(error.toString());
        setError(error.toString());
    } else {
        // console.log("-->> ", result);
        setUserInfo(result);
        // setIsLoggedIn(true);
    }
};

export const fbSignOut = () => {
    LoginManager.logOut();
};

export const fbSignIn = (setUserInfo, setError, setIsLoggedIn) => {
    if (Platform.OS === "android") {
        LoginManager.setLoginBehavior("web_only");
    }
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function (result) {
            if (result.isCancelled) {
                // console.log(result);
            } else {
                // console.log(
                //     "Login success with permissions: " +
                //         result.grantedPermissions.toString()
                // );
                // Create a graph request asking for user information with a callback to handle the response.
                const infoRequest = new GraphRequest(
                    "/me?fields=email,name,picture",
                    null,
                    (error, result) =>
                        _responseInfoCallback(
                            setIsLoggedIn,
                            setUserInfo,
                            setError,
                            error,
                            result
                        )
                );
                // const infoRequest = new GraphRequest(
                //     "/me",
                //     {
                //         parameters: {
                //             fields: {
                //                 string: "id, email, name, first_name, middle_name, last_name",
                //             },
                //         },
                //     },
                //     (error, result) =>
                //         _responseInfoCallback(
                //             setIsLoggedIn,
                //             setUserInfo,
                //             setError,
                //             error,
                //             result
                //         )
                // );
                // Start the graph request.
                new GraphRequestManager().addRequest(infoRequest).start();
                // setIsLoggedIn(true)
            }
        },
        function (error) {
            setError(error);
        }
    );
};
