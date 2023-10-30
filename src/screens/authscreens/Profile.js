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
  RefreshControl,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-crop-picker';
import {height, width, COLOR} from '../components/Colors';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
// import ImagePicker from 'react-native-image-picker';

import firestore from '@react-native-firebase/firestore';
import {color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileHeader from '../../common/profileheader';
import CommonTextInput from '../../common/textinput';
import CommonButton from '../../common/button';
import CommonImage from '../components/CommonImage';
const Profile = ({navigation, params}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('hejr');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const User = auth().currentUser;
  const [filePath, setFilePath] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  // console.log('🚀 ~ file: Profile.js:36 ~ Profile ~ image:', userData);
  // const parsedUserData = JSON.stringify(JSON.parse(userData));
  // console.log('User data is after' + userData.displayName);
  const update = {
    photoUrl: image,
    // displayName: userData?.displayName == '' ? name : userData?.displayName,
    displayName: name,
    email: email,
    phoneNumber: phone,
    address: address,
    bio: bio,
    uid: auth().currentUser.uid,
  };
  useEffect(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchUsers();
    }, 3000);
    setRefreshing(false);
  }, []);

  // console.log(User);
  function fetchUsers(params) {
    setRefreshing(true);
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
        // console.log(
        //   'user details from profile screen: ' + JSON.stringify(userDetails),
        // );
        AsyncStorage.setItem('LoggedUser', JSON.stringify(userDetails));
        setUserData(userDetails);
        setEmail(userDetails?.email);
        setName(userDetails?.displayName);
        setAddress(userDetails?.address);
        setBio(userDetails?.bio);
        setPhone(userDetails?.phoneNumber);
        setImage(userDetails?.photoUrl);
      });
    setRefreshing(false);
  }

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
            onPress: () => chooseFile(),

            style: 'default',
          },
          {
            text: 'Camera',
            onPress: () => captureImage(),
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
    console.log(update);
    try {
      setLoading(true);
      await firestore()
        .collection('Users')
        .doc(User.uid)
        .set(update)
        .then(() => {
          console.log('User updated!');
          setLoading(false);

          AsyncStorage.setItem('LoggedUser', JSON.stringify(update));
          navigation.goBack();
        })
        .then(() => {
          ImagePicker.clean()
            .then(() => {
              console.log('removed all tmp images from tmp directory');
            })
            .catch(e => {
              alert('error while cleaning tmp images from picker: ' + e);
              setLoading(false);
            });
        });
    } catch (error) {
      // console.log(' image upload to storage', error);
      setLoading(false);
      Alert.alert('Please Fill all the fields', error);
    }
  }
  const captureImage = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setFilePath(image.path);
        // setImagename(image.path);
        // console.log('edit image name', image.filename);
        // console.log('edit image path', image.path);
        // console.log('image response', image);
      })
      .catch(error => {
        console.log('Crop image picker error ', error);
      });
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

  const chooseFile = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setFilePath(image.path);
        // setImagename(image.path);
        // console.log('edit image name', image.filename);
        // console.log('edit image path', image.path);
        // console.log('image response', image);
      })
      .catch(error => {
        console.log('Crop image picker error ', error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            title="Referesing Data..."
            tintColor={COLOR.BUTTON}
            titleColor="#fff"
            refreshing={refreshing}
            onRefresh={fetchUsers}
          />
        }>
        <KeyboardAvoidingView>
          <View
            style={{
              height: height * 1,
              width: width * 1,
              backgroundColor: 'white',
              position: 'relative',
            }}>
            <ProfileHeader name={'Edit Profile'}></ProfileHeader>
            <View
              style={{
                height: height * 0.13,
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                width: width * 0.3,
                position: 'absolute',
                top: 120,
              }}>
              {filePath ? (
                <View>
                  <Image
                    onLoad={async () => {
                      // path to existing file on filesystem
                      const pathToFile = filePath;

                      // uploads file
                      await reference.putFile(pathToFile);
                      const urrl = await storage()
                        .ref(`${User.uid}/profilePhoto`)
                        .getDownloadURL();
                      setImage(urrl);

                      console.log('url link get after image upload', urrl);
                    }}
                    source={{
                      uri: filePath ? filePath : image,
                    }}
                    style={styles.imageStyle}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    // source={require('../../assets/images/upload.png')}
                    source={{uri: image}}
                    style={styles.imageStyle}
                  />
                </View>
              )}
              <View style={{position: 'absolute', bottom: 10, right: 10}}>
                <TouchableOpacity onPress={() => onChoose()}>
                  <Image source={CommonImage.cameraIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: height * 0.6,
                marginTop: 100,
                alignSelf: 'center',
                alignItems: 'center',
                width: width * 0.9,
                // backgroundColor: 'red',
              }}>
              <View>
                <CommonTextInput
                  placeholder={'Please enter your email'}
                  hidden={false}
                  value={email}
                  validate={false}
                  setText={txt => {
                    setEmail(txt);
                  }}
                />
                <CommonTextInput
                  placeholder={name ? name : 'Please enter you name'}
                  hidden={false}
                  value={name}
                  validate={false}
                  setText={txt => {
                    setName(txt);
                  }}
                />
                <CommonTextInput
                  placeholder={phone ? phone : 'Please enter your phone number'}
                  hidden={false}
                  validate={false}
                  value={phone}
                  setText={txt => {
                    setPhone(txt);
                  }}
                />
                <CommonTextInput
                  placeholder={address ? address : 'Please enter your address'}
                  hidden={false}
                  validate={false}
                  value={address}
                  setText={txt => {
                    setAddress(txt);
                  }}
                />
                <CommonTextInput
                  placeholder={bio ? bio : 'Please enter your bio'}
                  hidden={false}
                  validate={false}
                  value={bio}
                  setText={txt => {
                    setBio(txt);
                  }}
                />
              </View>

              <View style={{marginTop: 50}}>
                <CommonButton
                  name={'Update details'}
                  loading={loading}
                  onPress={() => {
                    uploadDetails();
                  }}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

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
    resizeMode: 'contain',
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
