import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
const {height, width} = Dimensions.get('screen');
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [ErrorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');
  const [reference, setRefrence] = useState('');
  async function EmailSign() {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)

        .then(() => {
          console.log('signed in!');
        })
        .then(() => {
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              try {
                setRefrence(storage().ref(user.uid));
                console.log('createddddd', reference);
              } catch (error) {
                console.log('storage bucket not created', error);
              }
              console.log(user); // It shows the Firebase user

              console.log(firebase.auth().user); // It is still undefined
            }
          });
        })
        .then(() => {
          // navigation.push ('Success');
          navigation.reset({
            index: 0,
            routes: [{name: 'Success'}],
          });
        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

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

  // validation starts here
  const _emailvalidate = mail => {
    var emailRegex = /[a-zA-Z]@(yopmail)\.com\b$/g;
    //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //  /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
    if (mail === '') {
      setErrorEmail('*Please enter email.');
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email.');
    } else {
      setErrorEmail(null);
    }
  };
  const _passwordvalidate = pass => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (pass === '') {
      setErrorPassword('*Please enter password.');
    } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
      setErrorPassword(
        '*Please enter a special character and length must be 8 digit.',
      );
    } else if (!passwordRegex.test(pass)) {
      setErrorPassword('*Please enter valid password.');
    } else {
      setErrorPassword(null);
    }
  };
  const validate = () => {
    let flag = true;

    if (email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }

    if (password === '') {
      setErrorPassword('*Please enter password.');
      flag = false;
    }

    return flag;
  };
  const onSubmit = () => {
    if (validate()) {
      EmailSign();
    } else {
      alert('Mandatory field is required');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          justifyContent: 'center',
          width: width * 1,
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
            Sociable
          </Text>
        </View>
        <View style={{alignSelf: 'center', width: width * 0.9}}>
          <TextInput
            placeholder="Enter your corporate email ID"
            placeholderTextColor={'rgb(122,122,122)'}
            autoCapitalize={false}
            onChangeText={txt => {
              setEmail(txt), _emailvalidate(txt);
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
          {errorEmail != null ? (
            <View
              style={{
                height: height * 0.02,
                width: width / 1.3,
                justifyContent: 'center',
                // backgroundColor: "grey"
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 15,
                }}>
                {errorEmail}
              </Text>
            </View>
          ) : null}
          <TextInput
            placeholder="Password"
            placeholderTextColor={'rgb(122,122,122)'}
            secureTextEntry={true}
            onChangeText={txt => {
              setPassword(txt), _passwordvalidate(txt);
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
          {ErrorPassword != null ? (
            <View
              style={{
                height: height * 0.02,
                width: width / 1.3,
                justifyContent: 'center',
                // backgroundColor: "grey"
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 15,
                }}>
                {ErrorPassword}
              </Text>
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => onSubmit()}
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
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot')}
            style={{
              height: height * 0.06,
              //   backgroundColor: 'rgb(28,154,236)',
              borderRadius: 3,
              justifyContent: 'center',

              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'InstagramSans-Medium',
                color: 'rgb(54,54,54)',
              }}>
              Forgot your login details?{' '}
              <Text style={{color: '#fff', fontFamily: 'InstagramSans-Bold'}}>
                Get Help logging in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 1,
            borderBottomColor: 'rgb(54,54,54)',
            borderBottomWidth: 0.5,
          }}></View>
        <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }>
          <Text
            style={{
              fontSize: 18,
              marginTop: 30,
              color: 'rgb(28,154,236)',
              textAlign: 'center',
              fontFamily: 'Comfortaa-Bold',
            }}>
            Log in with Google
          </Text>
        </TouchableOpacity>

        <View style={{position: 'absolute', bottom: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: width * 1,
              borderBottomColor: 'rgb(54,54,54)',
              borderBottomWidth: 0.5,
            }}></View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={{
              height: height * 0.06,
              //   backgroundColor: 'rgb(28,154,236)',
              borderRadius: 3,
              justifyContent: 'center',

              marginTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'InstagramSans-Medium',
                color: 'rgb(54,54,54)',
              }}>
              Don't have an account?
              <Text style={{color: '#fff', fontFamily: 'InstagramSans-Bold'}}>
                Sign up.
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  hairline: {
    backgroundColor: '#A2A2A2',
    height: 1,
    width: 165,
  },

  loginButtonBelowText1: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: '#A2A2A2',
    // marginBottom:
  },
});
