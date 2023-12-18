// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {requestCameraPermission} from './Permissions';

// // props --> mediaType
// // 'photo' or 'video' or 'mixed'
// const optionConfig = {maxHeight: 700, maxWidth: 700};

// export const onOpenCamera = async mediaType => {
//   var result = null;
//   const permission = await requestCameraPermission();
//   if (permission.isGraned) {
//     try {
//       await launchCamera(
//         {
//           mediaType: mediaType,
//           cameraType: 'back',
//           ...optionConfig,
//         },
//         response => {
//           if (response.didCancel) {
//             console.log(
//               'User cancelled image picker src => Common => Function => ImagePicker',
//             );
//           } else if (response.errorCode) {
//             console.log(
//               'ImagePicker Error src => Common => Function => ImagePicker: ',
//               response.error,
//             );
//           } else if (response.customButton) {
//             console.log(
//               'User tapped custom button src => Common => Function => ImagePicker: ',
//               response.customButton,
//             );
//           } else {
//             const file = {
//               name: response.assets[0].fileName,
//               type: response.assets[0].type,
//               path:
//                 Platform.OS === 'android'
//                   ? response.assets[0].uri
//                   : response.assets[0].uri.replace('file://', ''),
//             };
//             result = file;
//           }
//         },
//       );
//     } catch (error) {
//       result = null;
//       console.log(error);
//     }

//     return result;
//   } else {
//     console.log(result);
//     return result;
//   }
// };

// export const onOpenGallery = async mediaType => {
//   var result = null;
//   try {
//     await launchImageLibrary(
//       {mediaType: mediaType, ...optionConfig},
//       response => {
//         if (response.didCancel) {
//           console.log(
//             'User cancelled image picker src => Common => Function => ImagePicker',
//           );
//         } else if (response.errorCode) {
//           console.log(
//             'ImagePicker Error src => Common => Function => ImagePicker: ',
//             response.error,
//           );
//         } else if (response.customButton) {
//           console.log(
//             'User tapped custom button src => Common => Function => ImagePicker: ',
//             response.customButton,
//           );
//         } else {
//           const file1 = {
//             name: response.assets[0].fileName,
//             type: response.assets[0].type,
//             path:
//               Platform.OS === 'android'
//                 ? response.assets[0].uri
//                 : response.assets[0].uri.replace('file://', ''),
//           };
//           result = file1;
//         }
//       },
//     );
//   } catch (error) {
//     result = null;
//   }

//   return result;
// };
