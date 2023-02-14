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
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {useSelector, useDispatch} from 'react-redux';
import {height, width, COLOR} from '../components/Colors';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
// import ImagePicker from 'react-native-image-picker';
import asyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {color} from 'react-native-reanimated';
import {getUser} from '../../redux/action/firebaseActions';
const Upload = ({navigation, params}) => {
  const {user} = useSelector(state => state.fromReducer);
  // console.log('user in upload screen', user);
  const [refreshing, setRefreshing] = useState(false);
  // console.log('users from drawer screen', users.displayName);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  useEffect(() => {
    setTimeout(() => {
      setRefreshing(true);
      fetchUser();
      setUserData(user);
      setRefreshing(false);
    }, 2000);
  }, []);

  // const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const [caption, setcaption] = useState('');
  const User = auth().currentUser;
  const [filePath, setFilePath] = useState('');
  const [ImageName, setImagename] = useState('');
  const [userData, setUserData] = useState();
  const [date, setDate] = useState();
  // const parsedUserData = JSON.stringify(JSON.parse(userData));
  // console.log('User data is after' + userData.displayName);
  console.log('IMageNAme ', ImageName);
  const update = {
    photoUrl: image,
    userPhoto: user?.photoUrl,
    email: user?.email,
    caption: caption,
    uid: user?.uid,
    name: user?.displayName,
    like: [],
    comment: [],
    createdAt: date,
  };

  const findDate = () => {
    const date = new Date();
    setDate(date);
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
            onPress: () => cropImageGallary(),

            style: 'default',
          },
          // {
          //   text: 'Gallary',
          //   onPress: () => chooseFile('photo'),

          //   style: 'default',
          // },
          // {
          //   text: 'Camera',
          //   onPress: () => captureImage('photo'),
          //   style: 'default',
          // },
          {
            text: 'Camera',
            onPress: () => cropImage(),
            style: 'default',
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };
  const reference = storage().ref(ImageName);
  async function uploadDetails() {
    try {
      await firestore()
        .collection('Upload')
        .doc()
        .set(update)
        .then(() => {
          Alert.alert('Post Uploaded');
          navigation.navigate('Success');
        });
    } catch (error) {
      console.log('error while uploading post', error);
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

        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('response assets response -> ', response.assets[0].uri);
        setImagename(response.assets[0].fileName);
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
      selectionLimit: 0,
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
      // console.log('base64 -> ', response.base64);
      // // console.log('base64 -> ', response?.assets?.width);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('response assets response -> ', response.assets[0].uri);

      setFilePath(response);
      setImagename(response.assets[0].fileName);
      console.log(response);
    });
  };
  const cropImage = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setFilePath(image.path);
        setImagename(image.path);
        console.log('edit image name', image.filename);
        console.log('edit image path', image.path);
        console.log('image response ', image);
      })
      .catch(error => {
        console.log('crop image error', error);
      });
  };
  const cropImageGallary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setFilePath(image.path);
        setImagename(image.path);
        console.log('edit image name', image.filename);
        console.log('edit image path', image.path);
        console.log('image response', image);
      })
      .catch(error => {
        console.log('Crop image picker error ', error);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          justifyContent: 'center',
          width: width * 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            height: height * 1,
            marginTop: 70,
            width: width * 0.95,
            alignSelf: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              height: height * 0.47,
              // backgroundColor: 'red',

              alignSelf: 'center',
              alignItems: 'center',
              width: width * 0.9,
            }}>
            {filePath ? (
              <TouchableOpacity onPress={() => onChoose()}>
                <Image
                  onLoad={async () => {
                    // path to existing file on filesystem
                    const pathToFile = filePath;

                    // uploads file
                    await reference.putFile(pathToFile);
                    const urrl = await storage()
                      .ref(ImageName)
                      .getDownloadURL();

                    console.log('url link get after Post upload ', urrl);
                    setImage(urrl);
                    findDate();
                    console.log('setImaage', image);
                  }}
                  source={{
                    uri: filePath,
                  }}
                  style={styles.imageStyle1}
                />
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity onPress={() => onChoose()}>
                  <Image
                    source={require('../../assets/images/upload.png')}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={{height: height * 0.2}}>
            <View>
              <TextInput
                placeholder="Caption "
                multiline={true}
                placeholderTextColor={'rgb(122,122,122)'}
                onChangeText={txt => {
                  setcaption(txt);
                }}
                style={{
                  height: height * 0.2,
                  backgroundColor: 'rgb(54,54,54)',
                  borderRadius: 3,
                  paddingHorizontal: 10,
                  color: '#fff',
                  // marginTop: 20,
                  fontFamily: 'InstagramSans-Medium',
                  //   justifyContent: 'flex-start',
                }}
              />
            </View>

            <View>
              <TouchableOpacity
                onPress={() => uploadDetails()}
                style={{
                  height: height * 0.06,
                  backgroundColor: 'rgb(28,154,236)',
                  borderRadius: 3,
                  justifyContent: 'center',

                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: 'InstagramSans-Medium',
                  }}>
                  Upload Post
                </Text>
              </TouchableOpacity>
            </View>

            {/* <Button
                style={{marginTop: 20}}
                title="Sign Out"
                onPress={() => onSignout()}
              /> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Upload;

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
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
    margin: 20,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLOR.BUTTON,
    borderRadius: 11,

    // borderRadius: 200 / 2,
    padding: 10,
  },
  imageStyle1: {
    width: width * 0.9,
    height: height * 0.4,

    // backgroundColor: 'red',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLOR.BUTTON,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    padding: 10,
  },
});
