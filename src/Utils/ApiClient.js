import axios from "axios";
// import {clockRunning} from 'react-native-reanimated';
import { BASE_URL } from "../Constants/Config";
import configureStore from "../redux/configureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const {store, persistor} = configureStore();

const axiosClient = axios.create({
  baseURL: BASE_URL,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('axiosClient ==>', config.headers);
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log(error.response.data)
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log(error.response.data)
    return Promise.reject(error);
  }
);

export const axiosClientFormdata = axios.create({
  baseURL: BASE_URL,
  // timeout: 1000,
  headers: {
    Accept: "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
    "Content-Type": "multipart/form-data",
  },
});

export const axiosClientLoggedIn = axios.create({
  baseURL: BASE_URL,
  // timeout: 1000,
});

axiosClientLoggedIn.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('axiosClientLoggedIn interceptors ==>', config.headers);
    return config;
  },
  function (error) {
    // Do something with request error
    // console.log('axiosClientLoggedIn interceptors ==>', error);
    return Promise.reject(error);
  }
);

export default axiosClient;
