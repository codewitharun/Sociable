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
  FlatList,
  RefreshControl,
  Pressable,
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
import {useSelector, useDispatch} from 'react-redux';
import {userSignout} from '../../redux/action/firebaseActions';
import asyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

import {
  getPosts,
  getUser,
  getCurrentUsersPosts,
} from '../../redux/action/firebaseActions';

const Postprofile = ({navigation, params}) => {
  const [liked, setLiked] = useState(false);
  const [User, setUser] = useState('');
  const [updateCaption, setUpdateCaption] = useState('');

  let userefForCaption = '';

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };
  const {user} = useSelector(state => state.fromReducer);
  const {currentUserPosts} = useSelector(state => state.fromReducer);
  // console.log('user in PostProfile screen', currentUserPosts);
  const [refreshing, setRefreshing] = useState(false);
  // console.log('users from drawer screen', users.displayName);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  const fetchUserPosts = () => dispatch(getCurrentUsersPosts());
  useEffect(() => {
    setRefreshing(true);
    fetchUserPosts();
    fetchUser();
    setRefreshing(false);
  }, []);

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

        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
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
  const deleteSelectedElement = (title, postId) => {
    console.log(title);
    Alert.alert(
      'Are You Sure Want To Delete Item = ' + postId,
      'Select Below Options',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            // // Filter Data

            // const filteredData = Item.filter(item => item.id !== title);
            // //Updating List Data State with NEW Data.
            // setTEMP_DATA(filteredData);
            firestore()
              .collection('Upload')
              .doc(postId)
              .delete()
              .then(() => {
                fetchUserPosts();
              });
          },
        },
      ],
    );
  };

  const EditSelectedElement = postId => {
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({item}) => (
    <Item
      title={item.caption}
      url={item.photoUrl}
      thumbnailUrl={item.userPhoto}
      username={item.name}
      email={item.email}
      postId={item.id}
      like={item.like}
    />
  );
  const Item = ({title, url, thumbnailUrl, username, email, postId}) => (
    <View style={styles.item}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          borderColor: 'grey',
          borderWidth: 0.2,
          height: height * 0.07,
        }}>
        <View>
          <TouchableOpacity>
            <Image
              source={{uri: thumbnailUrl}}
              style={{height: 50, width: 50, borderRadius: 100 / 2}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {/* {useData?.displayName} */}
              {username}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}
          <TouchableOpacity
            onPress={() => {
              EditSelectedElement(postId);
            }}>
            <Icon name="dots-vertical" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* // modal starts here */}

      <Modal isVisible={isModalVisible}>
        <View style={{height: height * 0.5, backgroundColor: 'white'}}>
          <Text>{postId}</Text>
          <TextInput
            style={{color: 'red'}}
            placeholder={title}
            placeholderTextColor={'red'}
            // ref={userefForCaption}
            onChangeText={txt => {
              userefForCaption = txt;
            }}
          />
          <Button
            title="update caption"
            onPress={() => {
              firestore()
                .collection('Upload')
                .doc(postId)
                .update({caption: userefForCaption});
            }}
          />
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>

      <View
        style={{
          height: height * 0.5,
          alignSelf: 'center',
          width: width * 0.95,
          // backgroundColor: 'green',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          // borderRadius: 20,
        }}>
        <Image
          source={{uri: url}}
          style={{
            height: 400,
            width: 400,
            resizeMode: 'contain',
          }}
        />
        {/* <Text style={{color: 'white'}}>{title}</Text> */}
      </View>
      <View
        style={{
          height: height * 0.035,
          // backgroundColor: 'red',
          width: width * 0.4,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Icon
              name={liked == true ? 'heart' : 'heart-outline'}
              color={liked == true ? 'red' : 'white'}
              size={30}
              onPress={() => {
                setLiked(isLiked => !isLiked);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="comment-outline" color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteSelectedElement(title, postId)}>
            <Icon name="delete-outline" color={'white'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {/* username and caption portion starts here  */}
      <View
        style={{
          height: height * 0.05,
          // backgroundColor: 'red',
          width: width * 0.9,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {email?.split('.com')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: width * 0.5}}>
            <Text style={{color: 'white'}}>{title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
              source={{uri: user.photoUrl}}
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
              {user.displayName}
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontFamily: 'Comfortaa-bold',
              }}>
              {user.email}
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
          <View>
            <FlatList
              data={currentUserPosts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              refreshControl={
                <RefreshControl
                  title="Referesing Data..."
                  tintColor={COLOR.BUTTON}
                  titleColor="#fff"
                  refreshing={refreshing}
                  onRefresh={fetchUserPosts}
                />
              }
            />
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
