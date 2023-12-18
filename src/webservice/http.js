import {apiConfig, HeaderSecretKey, mode} from '../Constants/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../Navigation';
import {CommonActions} from '@react-navigation/native';

class HTTP {
  constructor() {}

  GET = async url => {
    if (mode == 'production') {
      var mainDomain = apiConfig.productionApiURL;
    } else if (mode == 'testing') {
      var mainDomain = apiConfig.testingApiURL;
    } else {
      var mainDomain = apiConfig.developmentApiURL;
    }
    let accessToken = await AsyncStorage.getItem('Token');
    if (accessToken == null || accessToken == undefined) {
      accessToken = '';
    }

    // console.log('URL==', mainDomain + url);
    // console.log('accessToken==', accessToken);

    try {
      let response = await fetch(mainDomain + url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          //Header Defination
          Authorization: 'Bearer ' + accessToken,
          apiSecretKey: HeaderSecretKey.Development,
          Accept: 'application/json',
          // 'Content-Type': 'application/json;charset=utf-8',
        },
      });
      if (response.status === 401) {
        RootNavigation.navigate('Login');
      }
      if (response.status == 200) {
        const responseJson = await response.json();
        if (responseJson.status === 401) {
          RootNavigation.navigate('Login');
        }
        // console.log(responseJson, '===responseJson--' + mainDomain + url);
        if (responseJson) {
          return responseJson;
        } else if (!responseJson.status) {
          return {
            error: responseJson.error.message,
            status: 'failed',
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  };

  POST = async (url, data) => {
    if (mode == 'production') {
      var mainDomain = apiConfig.productionApiURL;
    } else if (mode == 'testing') {
      var mainDomain = apiConfig.testingApiURL;
    } else {
      var mainDomain = apiConfig.developmentApiURL;
    }

    // let accessToken = await AsyncStorage.getItem('accessToken');
    let accessToken = await AsyncStorage.getItem('Token');
    if (accessToken == null || accessToken == undefined) {
      accessToken = '';
    }

    // console.log('Access Token', accessToken);
    // console.log('URL==', mainDomain + url);
    // console.log('data-request==', data);

    try {
      let response = await fetch(mainDomain + url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          //Header Defination
          Authorization: 'Bearer ' + accessToken,
          apiSecretKey: HeaderSecretKey.Development,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;application/json;charset=utf-8',
          // 'Content-Type': 'multipart/form-data;',
        },
        body: JSON.stringify(data),
      });

      // console.log("response ====>", response);
      if (response.status === 401) {
        RootNavigation.navigate('Login');
      }
      if (response.status == 200) {
        const responseJson = await response.json();
        if (responseJson.status === 401) {
          RootNavigation.navigate('Login');
        }
        // console.log(responseJson, 'responseJson--' + mainDomain + url);
        if (responseJson) {
          return responseJson;
        } else if (!responseJson.status) {
          return {
            error: responseJson.error.message,
            status: 'failed',
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  };

  POST2 = async (url, data) => {
    if (mode == 'production') {
      var mainDomain = apiConfig.productionApiURL;
    } else if (mode == 'testing') {
      var mainDomain = apiConfig.testingApiURL;
    } else {
      var mainDomain = apiConfig.developmentApiURL;
    }

    // let accessToken = await AsyncStorage.getItem('accessToken');
    let accessToken = await AsyncStorage.getItem('Token');
    if (accessToken == null || accessToken == undefined) {
      accessToken = '';
    }

    // console.log('URL==', mainDomain + url);
    // console.log('data-request==', data);

    try {
      let response = await fetch(mainDomain + url, {
        method: 'POST',
        // credentials: 'same-origin',
        headers: {
          //Header Defination
          // Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaGlmaXQuaS1waG9uZWFwcGRldmVsb3BlcnMuY29tXC9hcGlcL2xvZ2luIiwiaWF0IjoxNjU2MTQwNjc0LCJleHAiOjE2NTYxNDQyNzQsIm5iZiI6MTY1NjE0MDY3NCwianRpIjoiWTZNTmpPd3Y3NnNjWldXcCIsInN1YiI6NDAsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ._WbodjilSYieGnNF0QVtLwGLnzSsICPQdfNauWimpqE",
          Authorization: 'Bearer ' + accessToken,
          // apiSecretKey: HeaderSecretKey.Development,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;application/json;charset=utf-8',
          // 'Content-Type': 'multipart/form-data;',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 401) {
        RootNavigation.navigate('Login');
      }
      if (response.status == 200) {
        const responseJson = await response.json();
        if (responseJson.status === 401) {
          RootNavigation.navigate('Login');
        }
        // console.log(responseJson, 'responseJson--' + mainDomain + url);
        if (responseJson) {
          return responseJson;
        } else if (!responseJson.status) {
          return {
            error: responseJson.error.message,
            status: 'failed',
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  };

  POST3 = async (url, data) => {
    if (mode == 'production') {
      var mainDomain = apiConfig.productionApiURL;
    } else if (mode == 'testing') {
      var mainDomain = apiConfig.testingApiURL;
    } else {
      var mainDomain = apiConfig.developmentApiURL;
    }

    // let accessToken = await AsyncStorage.getItem('accessToken');
    let accessToken = await AsyncStorage.getItem('Token');
    if (accessToken == null || accessToken == undefined) {
      accessToken = '';
    }

    // console.log('Access Token', accessToken);
    // console.log('URL==', mainDomain + url);
    // console.log('data-request==', data);

    try {
      let response = await fetch(mainDomain + url, {
        method: 'POST',
        redirect: 'follow',
        body: data,
      });

      // console.log('REsponse --->>', response);
      if (response.status === 401) {
        RootNavigation.navigate('Login');
      }
      if (response.status == 200) {
        const responseJson = response.json();
        if (responseJson.status === 401) {
          RootNavigation.navigate('Login');
        }
        // console.log(responseJson, 'responseJson--' + mainDomain + url);
        if (responseJson) {
          return responseJson;
        } else if (!responseJson.status) {
          return {
            error: responseJson.error.message,
            status: 'failed',
          };
        } else {
          return null;
        }
      } else {
        return null;
      }
      // var requestOptions = {
      //   method: "POST",
      //   body: data,
      //   redirect: "follow",
      // };

      // fetch(mainDomain + url, requestOptions)
      //   .then(async (response) => {
      //     alert(response.status);
      //     response.text();
      //   })
      //   .then((result) => {
      //     let response = result;
      //     // return result;
      //   })
      //   .catch((error) => console.log("error", error));

      // let response = await fetch(mainDomain + url, requestOptions);
    } catch (error) {
      return error;
    }
  };
}
export default new HTTP();
