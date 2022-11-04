import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Button,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

import {height, width, COLOR} from '../components/Colors';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
// import ImagePicker from 'react-native-image-picker';

import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Postprofile = ({navigation, params}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('hejr');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const User = auth().currentUser;
  const [filePath, setFilePath] = useState('');

  const [userData, setUserData] = useState();
  // const parsedUserData = JSON.stringify(JSON.parse(userData));
  // console.log('User data is after' + userData.displayName);
  const update = {
    photoUrl: image,
    // displayName: userData?.displayName == '' ? name : userData?.displayName,
    displayName: name,
    email: email,
    phoneNumber: '+91' + phone,
    address: address,
    bio: bio,
    uid: auth().currentUser.uid,
  };
  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(User.uid)
      .get()
      .then(documentSnapshot => {
        /*
          A DocumentSnapshot belongs to a specific document,
          With snapshot you can view a documents data,
          metadata and whether a document actually exists.
        */
        let userDetails = {};
        // Document fields
        userDetails = documentSnapshot.data();
        // All the document related data
        // userDetails['id'] = documentSnapshot.id;
        console.log(
          'user details from profile screen: ' + JSON.stringify(userDetails),
        );
        AsyncStorage.setItem('LoggedUser', JSON.stringify(userDetails));
        setUserData(userDetails);
        setEmail(userDetails?.email);
        setName(userDetails?.displayName);
        setAddress(userDetails?.address);
        setBio(userDetails?.bio);
        setPhone(userDetails?.phoneNumber?.slice(3));
        setImage(userDetails?.photoUrl);
      });

    // uploadDetails();
  }, []);

  console.log(User);
  const onSignout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then(() => {
        AsyncStorage.removeItem('userid');
      })
      .then(() =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
  };

  const onChoose = () => {
    try {
      Alert.alert(
        'Select Image!',
        'From Where you want to Choose Image ?',

        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'destructive',
          },
          {
            text: 'Gallary',
            onPress: () => chooseFile('photo'),

            style: 'default',
          },
          {
            text: 'Camera',
            onPress: () => captureImage('photo'),
            style: 'default',
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };
  const reference = storage().ref(`${User.uid}/profilePhoto`);
  async function uploadDetails() {
    try {
      const urrl = await storage()
        .ref(`${User.uid}/profilePhoto`)
        .getDownloadURL();
      setImage(urrl);

      console.log('url link get after image upload', urrl);
      await firestore()
        .collection('Users')
        .doc(User.uid)
        .set(update)
        .then(() => {
          console.log('User updated!');
          AsyncStorage.setItem('LoggedUser', JSON.stringify(update));
          navigation.navigate('Success');
        });
    } catch (error) {
      // console.log(' image upload to storage', error);
      Alert.alert('Please Fill all the fields', error.message);
    }
  }
  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeExtra: true,
      saveToPhotos: false,
      cameraType: 'front',
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        // console.log('response assets response -> ', response.assets[0].uri);

        setFilePath(response);
      });
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      saveToPhotos: false,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      // console.log('base64 -> ', response?.assets?.width);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      // console.log('response assets response -> ', response.assets[0].uri);

      setFilePath(response);
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          // justifyContent: 'center',
          width: width * 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            height: height * 0.2,
            width: width * 1,
            // backgroundColor: 'red',
            alignSelf: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: COLOR.BUTTON,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              source={{uri: image}}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100 / 2,
              }}
            />
          </View>
          <View style={{justifyContent: 'center', marginLeft: 20}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Comfortaa-bold',
              }}>
              {name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Comfortaa-bold',
              }}>
              {email}
            </Text>
            <TouchableOpacity
              style={{
                height: 35,
                marginTop: 10,

                width: 150,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: COLOR.BUTTON,

                justifyContent: 'center',
              }}
              onPress={() => navigation.navigate('Profile')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '700',
                }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: height * 0.65,
            width: width * 0.95,
            alignSelf: 'center',
            backgroundColor: 'black',
          }}>
          <View
            style={{
              height: height * 0.1,
              width: width * 0.95,
              alignSelf: 'center',
              justifyContent: 'center',
              // backgroundColor: COLOR.TABCARD,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
              <View style={{justifyContent: 'center', alignSelf: 'center'}}>
                <Icon name="plus" size={50} color={'white'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Postprofile;

const styles = StyleSheet.create({
  container: {
    height: height * 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonStyle: {
    // alignItems: 'center',
    backgroundColor: '#DDDDDD',
    // padding: 5,
    marginVertical: 10,
    width: width * 0.5,
    alignSelf: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,

    // backgroundColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLOR.BUTTON,
    borderRadius: 200 / 2,
  },
  imageStyle1: {
    width: 1,
    height: 1,
    margin: 5,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLOR.BUTTON,
    borderRadius: 200 / 2,
  },
});
