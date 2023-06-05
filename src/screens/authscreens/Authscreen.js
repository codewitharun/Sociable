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
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: 'black',
        }}>
        <View style={{height: '12%', width: '90%', alignSelf: 'center'}}>
          <Text
            style={{
              fontFamily:
                Platform.OS == 'android'
                  ? 'Logo-Regular'
                  : 'FONTSPRINGDEMO-BlueVinylRegular',
              fontSize: 35,
              textAlign: 'center',
              // lineHeight: 29,
              color: 'white',
            }}>
            Welcome to Sociable
          </Text>
        </View>
        <View style={{height: '10%', width: '90%', alignSelf: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{
              backgroundColor: 'rgb(28,154,236)',
              height: 50,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#fff',
                textAlign: 'center',
                fontFamily: 'Comfortaa-Bold',
              }}>
              {' '}
              Create new account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 18,
                marginTop: 30,
                color: 'rgb(28,154,236)',
                textAlign: 'center',
                fontFamily: 'Comfortaa-Bold',
              }}>
              Log in
            </Text>
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
});

export default Authscreen;
