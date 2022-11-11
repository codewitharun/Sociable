import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {COLOR, height, width} from './components/Colors';

import messaging from '@react-native-firebase/messaging';

import Authscreen from './authscreens/Authscreen';
import auth, {firebase} from '@react-native-firebase/auth';
import asyncStorage from '@react-native-async-storage/async-storage';
// import Dashboard from './screens/Dashboard';

import {Afterauth} from './routes/routes';
const Splash = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');
  const [fuser, setFuser] = useState('');
  const [token, setToken] = useState();
  async function onAuthStateChanged(user) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log('user from  splash screen', user); // It shows the Firebase user
        asyncStorage.setItem('userid', user.uid);
        // console.log(firebase.auth().user); // It is still undefined
      }
    });
    // console.log('User state changed', user);
    setUser(user);
    if (initializing) {
      setInitializing(false);

      // const fcmToken = await messaging().getToken();
      // setToken(fcmToken);

      // console.log('Device FcmToken: ========>>>>>', fcmToken);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

      return subscriber;
    }, 2000);
  }, []);

  if (initializing)
    return (
      <View
        style={{
          backgroundColor: 'black',
          height: height * 1,
          width: width * 1,
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          color={COLOR.BUTTON}
          size={40}
          style={{justifyContent: 'center'}}
        />
        <Text style={{textAlign: 'center', color: COLOR.WTEXT}}>
          Loading please Wait ...
        </Text>
      </View>
    );

  if (!user) {
    return <Authscreen navigation={navigation} />;
  }

  return <Afterauth navigation={navigation} />;
};
export default Splash;

const styles = StyleSheet.create({});
