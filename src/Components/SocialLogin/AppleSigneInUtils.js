// import { appleAuth } from "@invertase/react-native-apple-authentication";
import { get } from "lodash";
const APPLE_SIGNIN_CLIENT_ID = "com.hifit.login";
const APPLE_SIGNIN_CALLBACK_URL = "https://hifit.i-phoneappdevelopers.com/apple_notification_callback";
import { appleAuthAndroid, appleAuth, AppleAuthRequestOperation } from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid';
import jwt_decode from 'jwt-decode';
import { AlertHelper } from "../../Constants/AlertHelper";

//=============================================================================
// LOGIN WITH APPLE
//=============================================================================

export const appleSignIn = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // console.log('appleAuthRequestResponse ===>', appleAuthRequestResponse)

    // const credentialState = await appleAuth.getCredentialStateForUser(
    //   appleAuthRequestResponse.user
    //   );
    //   console.log('credentialState',credentialState)

    // if (credentialState === appleAuth.State.AUTHORIZED) {
    const { email, identityToken, user } = appleAuthRequestResponse;
    const firstname = get(appleAuthRequestResponse, "fullName.givenName", "");
    const lastname = get(appleAuthRequestResponse, "fullName.familyName", "");
    // console.log('===>>',{
    //   email,
    //   firstname,
    //   lastname,
    //   socialId: identityToken,
    //   socialLoginType: "apple",
    // })
    return Promise.resolve({
      email,
      firstname,
      lastname,
      socialId: user,
      socialLoginType: "apple",
    });
    // } else {
    //   const error = "Unauthorized";
    //   return Promise.reject(error);
    // }
  } catch (error) {
    // console.log(error)
    if (error.code === appleAuth.Error.CANCELED) {
      const error = "Apple Login Cancelled";
      return Promise.reject(error);
    }

    if (error.code === appleAuth.Error.CANCELED) {
    }
    if (error.code === appleAuth.Error.FAILED) {
      // AlertHelper.long('Touch ID wrong');
    }
    if (error.code === appleAuth.Error.INVALID_RESPONSE) {
      // AlertHelper.long('Touch ID wrong');
    }
    if (error.code === appleAuth.Error.NOT_HANDLED) {
    }
    if (error.code === appleAuth.Error.UNKNOWN) {
      // AlertHelper.long('Touch ID wrong');
    }
    // if (error.code === AppleAuthError.CANCELED) {
    // }
    // if (error.code === AppleAuthError.FAILED) {
    //   AlertHelper.long('Touch ID wrong');
    // }
    // if (error.code === AppleAuthError.INVALID_RESPONSE) {
    //   AlertHelper.long('Touch ID wrong');
    // }
    // if (error.code === AppleAuthError.NOT_HANDLED) {
    // }
    // if (error.code === AppleAuthError.UNKNOWN) {
    //   AlertHelper.long('Touch ID wrong');
    // }
  }
};

export const signWithApple = async () => {
  const rawNonce = uuid();
  // const rawNonce = sha256('nonce')
  const state = 'state'
  return new Promise(async (resolve, reject) => {
    try {
      appleAuthAndroid.configure({
        clientId: APPLE_SIGNIN_CLIENT_ID,
        redirectUri: APPLE_SIGNIN_CALLBACK_URL,
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });

      const response = await appleAuthAndroid.signIn();

      if (response) {
        resolve(response);
      }
    } catch (error) {
      // console.log("Data " + JSON.stringify(error));
      if (error && error.message) {
        switch (error.message) {
          case appleAuthAndroid.Error.NOT_CONFIGURED:
            //Alert.alert(Strings.unable_to_login_with_your_apple_account);
            break;
          case appleAuthAndroid.Error.SIGNIN_FAILED:
            //Alert.alert(Strings.unable_to_login_with_your_apple_account);
            break;
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            //Alert.alert(Strings.you_have_cancell_login);
            break;
          default:
            break;
        }
      }
      reject(error);
    }
  })
}

export const appleSignInForAndroid = async () => {
  try {
    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: 'com.hifit.login',

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: 'https://hifit.i-phoneappdevelopers.com/apple_notification_callback',

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();
    // console.log('response--', response)

    // Decode user ID and email from token returned from Apple,
    // this is a common workaround for Apple sign-in via web API
    const decodedIdToken = jwt_decode(response.id_token);
    const appleId = decodedIdToken.sub;
    const appleToken = response.id_token;
    const appleEmail = decodedIdToken.email;
    // const userName = response.user.name.firstName ? response.user.name.firstName + " " + response.user.name.lastName : null
    // console.log('decodedIdToken', decodedIdToken)

    if (response) {
      return Promise.resolve({
        email: appleEmail,
        appleToken: appleToken,
        socialId: appleId,
        socialLoginType: "apple",
      });
    }
    else {
      const error = "Unauthorized";
      return Promise.reject(error);
    }
  } catch (error) {
    if (error.code === appleAuth.Error.CANCELED) {
      const error = "Apple Login Cancelled";
      return Promise.reject(error);
    }

  }
};