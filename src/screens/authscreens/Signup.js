import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import messaging from '@react-native-firebase/messaging';
import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
const {height, width} = Dimensions.get('screen');
const Signup = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [ErroUsername, setErrorUsername] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorConfirm, setErrorConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [ErrorPassword, setErrorPassword] = useState('');
  const [hidepass, setHidePass] = useState(false);
  const [check, setCheck] = useState(false);
  const [fcmToken, setfcmToken] = useState('');
  const update = {
    displayName: username,
    email: email,
    token: firestore.FieldValue.arrayUnion(fcmToken),
  };
  async function EmailSign() {
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              try {
                console.log('User account created & signed in!');
                firestore().collection('Users').doc(user.uid).set(update);

                storage().ref(`${user.uid}/profilePhoto`).putString('hello');
              } catch (error) {
                console.log(user);
              }
              // It shows the Firebase user
            }
          });
        })
        .then(() => {
          // navigation.push ('Success');
          navigation.reset({
            index: 0,
            routes: [{name: 'Profile'}],
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

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        return setfcmToken(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      setfcmToken(token);
    });
  }, []);
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

  // Validation start here
  const _validateName = name => {
    var nameRegex = /^[a-z A-Z ]{2,32}$/i;
    if (name == '' || name == undefined || name == null) {
      setErrorUsername('*Please enter full name.');
    } else if (!nameRegex.test(name)) {
      setErrorUsername('*Please enter valid valid name.');
    } else {
      setErrorUsername(null);
    }
  };

  const _emailvalidate = mail => {
    var emailRegex = /[a-zA-Z0-9]@(yopmail)\.com\b$/g;
    //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //  /^(?:\d{10}|\w+@\w+\.\w{2,3})$/;
    if (mail === '' || mail === undefined || mail === null) {
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
  // const _Confirmpassword = cpass => {
  //   if (confirm) {
  //     setErrorConfirmPassword('Confirm Password should be same as password');
  //   }
  // };
  //   validation step 2

  const validate = () => {
    let flag = true;

    if (username === '') {
      setErrorUsername('*Please enter Name.');
      flag = false;
    }

    if (email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }

    if (password === '') {
      setErrorPassword('*Please enter password.');
      flag = false;
    }
    // if (confirm !== password) {
    //   setConfirm('*Please enter confirm password.');
    //   flag = false;
    // }

    return flag;
  };
  const onSubmit = () => {
    if (validate()) {
      console.log('flag', validate());
      EmailSign();
    } else {
      alert('Mandatory field is required');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <KeyboardAwareScrollView>
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
              placeholder="Full Name"
              placeholderTextColor={'rgb(122,122,122)'}
              // secureTextEntry={true}
              onChangeText={txt => {
                setUsername(txt), _validateName(txt);
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
            {ErroUsername != null ? (
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
                  {ErroUsername}
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
                Sign up
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
              onPress={() => navigation.navigate('Login')}
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
                Already have an account ?
                <Text style={{color: '#fff', fontFamily: 'InstagramSans-Bold'}}>
                  Log in.
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;

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
