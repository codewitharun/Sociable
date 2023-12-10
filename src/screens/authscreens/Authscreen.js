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
  Image,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from '../../common/header';
import CommonButton from '../../common/button';
import CommonImage from '../components/CommonImage';
import {COLOR} from '../components/Colors';


const Authscreen = ({navigation}) => {

  return (
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
        <SafeAreaView>
          <StatusBar barStyle={'light-content'} />
        </SafeAreaView>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          height: '70%',
          width: '100%',
          // justifyContent: 'center',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome to Sociable App!</Text>
          {/* <Text style={styles.description}>
              Connect with friends, share moments, and explore new experiences.
            </Text> */}
          {/* <Text style={styles.description}>Created with ❤️ by Arun </Text> */}
          <Text style={styles.instructions}>
            Get started by creating your profile and connecting with others.
          </Text>
        </View>
        <CommonButton
          name={'CREATE NEW ACCOUNT'}
          onPress={() => navigation.navigate('Signup')}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.LoginText}>Log in</Text>
        </TouchableOpacity>
        <View
          style={{
            height: '30%',
            width: '100%',
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20,
          }}>
          <Image
            style={{
              height: 100,
              width: 300,
              resizeMode: 'contain',
            }}
            source={CommonImage.threeSquires}
          />
          <Text style={styles.description}>Created with ❤️ by Arun </Text>
        </View>
      </View>
    </View>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLOR.Link,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    backgroundColor: '#F1F1FE',
    padding: 15,
    borderRadius: 24,
    marginTop: 30,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#242424',
    backgroundColor: '#F1F1FE',
    borderRadius: 24,
    padding: 20,
  },
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Authscreen;
