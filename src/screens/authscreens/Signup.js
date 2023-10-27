import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import messaging from '@react-native-firebase/messaging';
import React, {useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import CommonTextInput from '../../common/textinput';
import Header from '../../common/header';
import {COLOR} from '../components/Colors';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import CommonButton from '../../common/button';
import CommonImage from '../components/CommonImage';
import showAlert from '../../common/showAlert';
const {height, width} = Dimensions.get('screen');
const Signup = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorConfirm, setErrorConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [ErrorPassword, setErrorPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);

  const [fcmToken, setfcmToken] = useState('');
  const update = {
    displayName: username,
    email: email,
    token: firestore.FieldValue.arrayUnion(fcmToken),
  };
  const toggleEye = () => {
    setHidePass(!hidePass);
  };
  async function EmailSign() {
    setLoading(true);
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
                setLoading(false);
              }
              // It shows the Firebase user
            }
          });
        })
        .then(() => {
          // navigation.push ('Success');
          setLoading(false);

          navigation.reset({
            index: 0,
            routes: [{name: 'Profile'}],
          });
        })

        .catch(error => {
          setLoading(false);
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
      setLoading(false);
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
      // showAlert(errorUsername);
    } else if (!nameRegex.test(name)) {
      setErrorUsername('*Please enter valid valid name.');
      // showAlert(errorUsername);
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
      // showAlert(errorEmail);
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email.');
      // showAlert(errorEmail);
    } else {
      setErrorEmail(null);
    }
  };
  const _passwordvalidate = pass => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (pass === '') {
      setErrorPassword('*Please enter password.');
      // showAlert(ErrorPassword);
    } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
      setErrorPassword(
        '*Please enter a special character and length must be 8 digit.',
      );
      // showAlert(ErrorPassword);
    } else if (!passwordRegex.test(pass)) {
      setErrorPassword('*Please enter valid password.');
      // showAlert(ErrorPassword);
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
      // showAlert(errorUsername);
      flag = false;
    }

    if (email === '') {
      setErrorEmail('*Please enter email.');
      // showAlert(errorEmail);

      flag = false;
    }

    if (password === '') {
      setErrorPassword('*Please enter password.');
      // showAlert(ErrorPassword);

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
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{height: '30%', width: '100%'}}>
          <Header name={'Sociable'} />
          <SafeAreaView>
            <StatusBar barStyle={'light-content'} />
          </SafeAreaView>
        </View>
        <View style={styles.textViewContainer}>
          <View style={{marginTop: 30, marginBottom: 30}}>
            <CommonTextInput
              placeholder={'Enter your email Id'}
              setText={txt => {
                setEmail(txt);
              }}
              validate={txt => {
                _emailvalidate(txt);
              }}
            />

            <CommonTextInput
              placeholder={'Enter your Full Name'}
              setText={txt => {
                setUsername(txt);
              }}
              validate={txt => {
                _validateName(txt);
              }}
            />
            <CommonTextInput
              placeholder={'Enter New Password'}
              aa
              hide={true}
              hidden={hidePass}
              showEye={() => {
                toggleEye();
              }}
              setText={txt => {
                setPassword(txt);
              }}
              validate={txt => {
                _passwordvalidate(txt);
              }}
            />
          </View>

          <CommonButton
            loading={loading}
            name={'SIGN UP'}
            onPress={() => onSubmit()}
          />
          <View style={styles.secondLogin}>
            <View
              style={{
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  color: '#606060',
                  fontWeight: '400',
                  letterSpacing: 2,
                }}>
                OR SIGN UP BY
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                Dialog.show({
                  type: ALERT_TYPE.WARNING,
                  title: 'Google Login',
                  textBody: `Google Login Coming Soon! meanwhile you can Login by Sign Up manually`,
                  button: `OK`,
                });
              }}>
              <Image
                style={{height: 50, width: 50, borderRadius: 50}}
                source={CommonImage.googleLogo}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text>
                Already have an account ?
                <Text style={{color: COLOR.Link}}> SIGN IN</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    height: height * 1,
    width: width * 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
  },
  textViewContainer: {
    height: '70%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  secondLogin: {
    height: height * 0.23,
    width: width * 1,
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
