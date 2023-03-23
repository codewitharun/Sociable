// import {useEffect, useState} from 'react';
// import {storage} from '@react-native-firebase/storage';
// import {Image} from 'react-native';
// import {getPosts} from './firebaseActions';
// import {useSelector, useDispatch} from 'react-redux';
// const {posts} = useSelector(state => state.fromReducer);
// const dispatch = useDispatch();
// const fetchPosts = () => dispatch(getPosts());
// const update = {
//   photoUrl: image,
//   userPhoto: userData?.photoUrl,
//   email: userData?.email,
//   caption: caption,
//   uid: userData?.uid,
//   name: userData?.displayName,
//   like: [],
//   comment: [],
// };

// export const chooseImage = () => {
//   try {
//     Alert.alert(
//       'Select Image!',
//       'From Where you want to Choose Image ?',

//       [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'destructive',
//         },
//         {
//           text: 'Gallary',
//           onPress: () => chooseFile('photo'),

//           style: 'default',
//         },
//         {
//           text: 'Camera',
//           onPress: () => captureImage('photo'),
//           style: 'default',
//         },
//       ],
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
// const reference = storage().ref(ImageName);
// export async function uploadImagedetails() {
//   try {
//     const urrl = await storage().ref(ImageName).getDownloadURL();
//     setImage(urrl);
//     console.log('url link get after image upload', urrl);
//     setTimeout(async () => {
//       await firestore()
//         .collection('Upload')
//         .doc(User.uid)
//         .update(update)
//         .then(() => {
//           // navigation.navigate('Success');
//           console.log('User updated!');
//         });
//     }, 2000);
//   } catch (error) {
//     console.log('error while uploading post', error);
//   }
// }
// const captureImage = async type => {
//   let options = {
//     mediaType: type,
//     maxWidth: 300,
//     maxHeight: 550,
//     quality: 1,
//     includeExtra: true,
//     saveToPhotos: false,
//     cameraType: 'front',
//   };
//   let isCameraPermitted = await requestCameraPermission();
//   let isStoragePermitted = await requestExternalWritePermission();
//   if (isCameraPermitted && isStoragePermitted) {
//     launchCamera(options, response => {
//       console.log('Response = ', response);

//       if (response.didCancel) {
//         alert('User cancelled camera picker');
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         alert('Camera not available on device');
//         return;
//       } else if (response.errorCode == 'permission') {
//         alert('Permission not satisfied');
//         return;
//       } else if (response.errorCode == 'others') {
//         alert(response.errorMessage);
//         return;
//       }

//       console.log('base64 -> ', response.base64);
//       console.log('uri -> ', response.uri);
//       console.log('width -> ', response.width);
//       console.log('height -> ', response.height);
//       console.log('fileSize -> ', response.fileSize);
//       console.log('type -> ', response.type);
//       // console.log('response assets response -> ', response.assets[0].uri);
//       setImagename(response.assets[0].fileName);
//       setFilePath(response);
//     });
//   }
// };

// const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera permission',
//         },
//       );
//       // If CAMERA Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   } else return true;
// };

// const requestExternalWritePermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs write permission',
//         },
//       );
//       // If WRITE_EXTERNAL_STORAGE Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       alert('Write permission err', err);
//     }
//     return false;
//   } else return true;
// };

// const chooseFile = type => {
//   let options = {
//     mediaType: type,
//     maxWidth: 300,
//     maxHeight: 550,
//     saveToPhotos: false,
//     quality: 1,
//   };
//   launchImageLibrary(options, response => {
//     console.log('Response = ', response);

//     if (response.didCancel) {
//       alert('User cancelled camera picker');
//       return;
//     } else if (response.errorCode == 'camera_unavailable') {
//       alert('Camera not available on device');
//       return;
//     } else if (response.errorCode == 'permission') {
//       alert('Permission not satisfied');
//       return;
//     } else if (response.errorCode == 'others') {
//       alert(response.errorMessage);
//       return;
//     }
//     console.log('base64 -> ', response.base64);
//     // console.log('base64 -> ', response?.assets?.width);
//     console.log('uri -> ', response.uri);
//     console.log('width -> ', response.width);
//     console.log('height -> ', response.height);
//     console.log('fileSize -> ', response.fileSize);
//     console.log('type -> ', response.type);
//     // console.log('response assets response -> ', response.assets[0].uri);

//     setFilePath(response);
//     setImagename(response.assets[0].fileName);
//   });
// };
