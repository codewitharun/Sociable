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
  TextInput,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

import {height, width, COLOR} from '../components/Colors';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import firestore from '@react-native-firebase/firestore';
import {color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {getPostDetails, userSignout} from '../../redux/action/firebaseActions';
import asyncStorage from '@react-native-async-storage/async-storage';

import {
  getPosts,
  getUser,
  getCurrentUsersPosts,
} from '../../redux/action/firebaseActions';
import ProfileHeader from '../../common/profileheader';
import CommonImage from '../components/CommonImage';

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
  // const currentUserPosts = [];
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
    <View
      style={{
        height: height * 0.2,
        // alignSelf: 'center',
        width: width * 0.3,
        // backgroundColor: 'green',
        // borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderRadius: 20,
        margin: 5,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Post', {id: postId}),
            dispatch(getPostDetails(postId));
        }}>
        <Image
          source={{uri: url}}
          style={{
            height: 200,
            width: 200,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </View>
  );

  const nodata = () => (
    <View
      style={{
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={CommonImage.empty} style={{height: 200, width: 200}} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Your ProfileHeader component */}
        {/* <ScrollView> */}
        <ProfileHeader name={user.email} />
        {/* Content below ProfileHeader */}
        <View style={styles.contentContainer}>
          <View style={styles.profileInfo}>
            <Image source={{uri: user.photoUrl}} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{user.displayName}</Text>
              <Text style={styles.address}>{user.address}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Text style={styles.follower}>Follower</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.follower}>Following</Text>
            </View>
          </View>

          <View style={styles.myUploadsContainer}>
            <View style={styles.button}>
              <Text style={styles.follower}>My Uploads</Text>
            </View>
          </View>
        </View>
        {/* Additional Container */}
        <View style={styles.additionalContainer}>
          <View
            style={{
              // backgroundColor: 'pink',
              height: height,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              data={currentUserPosts}
              scrollEnabled
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={3} // Set the number of columns to 3
              // contentContainerStyle={styles.container}
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default Postprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    height: height * 0.35,
    marginTop: -height * 0.05,
    // Adjusted to cover half of ProfileHeader
    // backgroundColor: 'red',
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: 'white',
  },
  textContainer: {
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Comfortaa-bold',
  },
  address: {
    color: '#8F90A7',
    fontSize: 16,
    fontFamily: 'Comfortaa-bold',
    fontWeight: '400',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '95%',
  },
  button: {
    width: '45%',
    backgroundColor: '#F6F7F9',
    height: 40,
    justifyContent: 'center',
    borderRadius: 6,
  },
  myUploadsContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 6,
    backgroundColor: '#F6F7F9',
  },
  additionalContainer: {
    // backgroundColor: 'green',
    height: height * 0.5,
    marginTop: 40,
  },
  follower: {
    textAlign: 'center',
  },
});
