import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../common/header';
import CommonButton from '../../common/button';
GoogleSignin.configure({
  webClientId:
    '783880828424-errl5i9tcucvu8i9bl1643gi7ur1h4km.apps.googleusercontent.com',
});

const Authscreen = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  GoogleSignin.configure({
    webClientId:
      '783880828424-errl5i9tcucvu8i9bl1643gi7ur1h4km.apps.googleusercontent.com',
  });
  //   var arun = {};
  //   console.log(arun);
  return (
    <SafeAreaView>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            // backgroundColor: 'green',
            height: '30%',
            width: '100%',
          }}>
          <Header name={'Sociable'} />
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: '70%',
            width: '100%',
            justifyContent: 'center',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }}>
          <CommonButton
            name={'CREATE NEW ACCOUNT'}
            onPress={() => navigation.navigate('Signup')}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.LoginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  LoginText: {
    fontSize: 18,
    marginTop: 30,
    color: '#5555C9',
    textAlign: 'center',
    fontFamily: 'Comfortaa-Bold',
  },
});

export default Authscreen;
