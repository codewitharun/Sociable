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
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';
import {useSelector, useDispatch} from 'react-redux';
import {height, width, COLOR} from '../components/Colors';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import CommonImage from '../components/CommonImage';
import firestore from '@react-native-firebase/firestore';
import {getUser} from '../../redux/action/firebaseActions';
import CommonButton from '../../common/button';
import CommonTextInput from '../../common/textinput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ProfileHeader from '../../common/profileheader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import showAlert from '../../common/showAlert';

const Upload = ({navigation, params}) => {
  const {user} = useSelector(state => state.fromReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
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
      if (image === '') {
        showAlert('Please Select/Click Image', 'info');
      } else {
        setLoading(true);
        await firestore()
          .collection('Upload')
          .doc()
          .set(update)
          .then(() => {
            navigation.navigate('Success');
            setLoading(false);
            showAlert('Post Uploaded', 'Success');
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
      }
    } catch (error) {
      console.log('error while uploading post', error);
      setLoading(false);
    }
  }

  const cropImage = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setFilePath(image.path);
        setImagename(image.path);
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
      })
      .catch(error => {
        console.log('Crop image picker error ', error);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ProfileHeader name={'Upload'}></ProfileHeader>
      <KeyboardAwareScrollView>
        <View
          style={{
            height: height * 1,
            justifyContent: 'center',
            width: width * 1,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: height * 1,
              // marginTop: 30,
              width: width * 0.95,
              alignSelf: 'center',
              // justifyContent: 'center',
            }}>
            <View
              style={{
                height: height * 0.47,

                alignSelf: 'center',
                alignItems: 'center',
                width: width * 0.95,
                position: 'relative',
              }}>
              {filePath ? (
                <TouchableOpacity
                  style={{
                    height: height * 0.47,

                    alignSelf: 'center',
                    alignItems: 'center',
                    width: width * 0.95,
                  }}
                  onPress={() => onChoose()}>
                  <Image
                    onLoad={async () => {
                      const pathToFile = filePath;

                      await reference.putFile(pathToFile);
                      const urrl = await storage()
                        .ref(ImageName)
                        .getDownloadURL();

                      console.log('url link get after Post upload ', urrl);
                      setImage(urrl);
                      findDate();
                      // console.log('setI);maage', image
                    }}
                    source={{
                      uri: filePath,
                    }}
                    style={styles.imageStyle1}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <TouchableOpacity
                    style={{
                      height: height * 0.47,

                      alignSelf: 'center',
                      alignItems: 'center',
                      width: width * 0.95,
                    }}
                    onPress={() => onChoose()}>
                    <Image
                      source={CommonImage.AuthHeader}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                onPress={() => onChoose()}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  backgroundColor: COLOR.Link,
                  width: width * 0.71,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  height: 50,
                }}>
                <Icon
                  name="cloud-upload-outline"
                  size={40}
                  color={COLOR.WTEXT}
                />
                {filePath ? (
                  <Text style={{fontSize: 25, color: COLOR.WTEXT}}>
                    {'  '}
                    Choose another
                  </Text>
                ) : (
                  <Text style={{fontSize: 30, color: COLOR.WTEXT}}>
                    {' '}
                    Select Image
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: height * 0.2,
                width: width * 0.95,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'green',
                marginTop: 40,
              }}>
              <CommonTextInput
                placeholder={'Caption...'}
                validate={false}
                setText={txt => {
                  setcaption(txt);
                }}
              />

              <View style={{marginTop: 20}}>
                <CommonButton
                  loading={loading}
                  onPress={() => uploadDetails()}
                  name={'Upload Post'}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    width: 300,
    height: 400,
    resizeMode: 'cover',
    // margin: 20,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLOR.BUTTON,
    borderRadius: 11,

    // borderRadius: 200 / 2,
    padding: 10,
  },
  imageStyle1: {
    width: 300,
    height: 400,

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
