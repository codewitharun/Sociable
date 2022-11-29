import {StyleSheet, Text, View, Alert, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getASync} from '../../redux/action/asyncUpdateAction';
import {firebase} from '@react-native-firebase/messaging';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';
import messaging from '@react-native-firebase/messaging';
import {height, width} from '../components/Colors';
const Notifications = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  // console.log('user in notifications screen', user);
  const [refreshing, setRefreshing] = useState(false);
  // console.log('users from drawer screen', users.displayName);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  useEffect(() => {
    setTimeout(() => {
      notified();
      setRefreshing(true);
      fetchUser();
      // notify();
      setRefreshing(false);
    }, 2000);
  }, []);

  function notified() {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'A new FCM message arrived!',
        remoteMessage?.notification?.body,
      );
      console.log(JSON.stringify(JSON.stringify(remoteMessage)));
    });

    return unsubscribe;
  }
  notified();
  // async function notify() {
  //   (await Platform.OS) == 'android'
  //     ? firebase.messaging().sendMessage({
  //         tokens: [
  //           'foyucm5ISeGBtbuVFnmkYy:APA91bGYCa4bvvWoS7_TVMH9yYnJbKFRdGIl7LH5QLuhM9JoAQVNkoZH3DncnkIGvuYoBCDzwuB7IpWsCVGvVwznSZ8e4_LKxrbRseHrtN66p-ZFDh6d6v61NPMRH4rJu9bFz3pxMvju',
  //         ], // ['token_1', 'token_2', ...]
  //         notification: {
  //           title: 'Basic Notification',
  //           body: 'This is a basic notification sent from the server!',
  //           // imageUrl: 'https://my-cdn.com/app-logo.png',
  //         },
  //         data: {
  //           title: 'hello user',
  //         },
  //       })
  //     : null;
  // }

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          backgroundColor: 'black',
          height: height * 1,
          width: width * 1,
        }}>
        <View
          style={{
            height: height * 0.1,
            width: width * 0.95,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily:
                Platform.OS == 'android'
                  ? 'Logo-Regular'
                  : 'FONTSPRINGDEMO-BlueVinylRegular',
              fontSize: 35,
            }}>
            Notifications
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
