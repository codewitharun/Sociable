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

import {ScrollView, TextInput} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import {color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      await firestore()
        .collection('Users')
        .doc(User.uid)
        .set(update)
        .then(() => {
          console.log('User updated!');
          AsyncStorage.setItem('LoggedUser', JSON.stringify(update));
          navigation.navigate('Success');
        })
        .then(() => {
          ImagePicker.clean()
            .then(() => {
              console.log('removed all tmp images from tmp directory');
            })
            .catch(e => {
              alert('error while cleaning tmp images from picker: ' + e);
            });
        });
    } catch (error) {
      // console.log(' image upload to storage', error);
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
    <SafeAreaView style={{backgroundColor: 'black'}}>
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
        <View
          style={{
            height: height * 1,
            justifyContent: 'center',
            width: width * 1,
            backgroundColor: 'black',
          }}>
          <KeyboardAvoidingView>
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
                  height: height * 0.16,
                  // backgroundColor: 'red',

                  alignSelf: 'center',
                  alignItems: 'center',
                  width: width * 0.9,
                }}>
                {filePath ? (
                  <View>
                    <TouchableOpacity onPress={() => onChoose()}>
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
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={() => onChoose()}>
                      <Image
                        // source={require('../../assets/images/upload.png')}
                        source={{uri: image}}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* <View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => onChoose()}>
              <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
          </View> */}
              <View style={{height: height * 0.2}}>
                <View>
                  <TextInput
                    // editable={userData?.email == '' ? true : false}
                    value={email}
                    placeholder="Enter your corporate email ID"
                    placeholderTextColor={'rgb(122,122,122)'}
                    onChangeText={txt => {
                      setEmail(txt);
                    }}
                    style={{
                      height: height * 0.06,
                      backgroundColor: 'rgb(54,54,54)',
                      borderRadius: 3,
                      paddingHorizontal: 10,
                      color: '#fff',
                      fontFamily: 'InstagramSans-Medium',
                    }}
                  />
                  <TextInput
                    placeholder="Full Name"
                    // editable={userData?.displayName == '' ? true : false}
                    value={name}
                    placeholderTextColor={'rgb(122,122,122)'}
                    // secureTextEntry={true}
                    onChangeText={txt => {
                      setName(txt);
                    }}
                    style={{
                      height: height * 0.06,
                      backgroundColor: 'rgb(54,54,54)',
                      borderRadius: 3,
                      paddingHorizontal: 10,
                      color: '#fff',
                      marginTop: 20,
                      fontFamily: 'InstagramSans-Medium',
                    }}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor={'rgb(122,122,122)'}
                    maxLength={10}
                    value={phone}
                    // editable={userData?.phoneNumber == '' ? true : false}
                    // secureTextEntry={true}
                    onChangeText={txt => {
                      setPhone(txt);
                    }}
                    style={{
                      height: height * 0.06,
                      backgroundColor: 'rgb(54,54,54)',
                      borderRadius: 3,
                      paddingHorizontal: 10,
                      color: '#fff',
                      marginTop: 20,
                      fontFamily: 'InstagramSans-Medium',
                    }}
                  />
                  <TextInput
                    placeholder="Address"
                    value={address}
                    // defaultValue={userData?.address}
                    // editable={userData?.address == '' ? true : false}
                    placeholderTextColor={'rgb(122,122,122)'}
                    // secureTextEntry={true}
                    onChangeText={txt => {
                      setAddress(txt);
                    }}
                    style={{
                      height: height * 0.06,
                      backgroundColor: 'rgb(54,54,54)',
                      borderRadius: 3,
                      paddingHorizontal: 10,
                      color: '#fff',
                      marginTop: 20,

                      fontFamily: 'InstagramSans-Medium',
                    }}
                  />
                  <TextInput
                    placeholder="About me"
                    multiline={true}
                    // editable={userData?.bio == '' ? true : false}
                    value={bio}
                    placeholderTextColor={'rgb(122,122,122)'}
                    // secureTextEntry={true}
                    onChangeText={txt => {
                      setBio(txt);
                    }}
                    style={{
                      height: height * 0.1,
                      backgroundColor: 'rgb(54,54,54)',
                      borderRadius: 3,
                      paddingHorizontal: 10,
                      color: '#fff',
                      marginTop: 20,
                      fontFamily: 'InstagramSans-Medium',
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
                      Update details
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
          </KeyboardAvoidingView>
        </View>
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
