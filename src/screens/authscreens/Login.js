import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import CommonImage from '../components/CommonImage';
import {loginUser} from '../../redux/action/firebaseActions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLOR} from '../components/Colors';
import Header from '../../common/header';
import CommonTextInput from '../../common/textinput';
import CommonButton from '../../common/button';
import showAlert from '../../common/showAlert';
const {height, width} = Dimensions.get('screen');
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [ErrorPassword, setErrorPassword] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const [reference, setRefrence] = useState('');

  async function EmailSign() {
    setLoading(true);
    const user = {
      email: email,
      password: password,
    };
    loginUser(user, Login => {
      console.log('on success ', JSON.parse(Login));
      const name = JSON.parse(Login);
      setLoading(false);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,

        title: 'Login Success',
        textBody: `Welcome to Sociable ${name.displayName}`,
        button: 'close',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'Success'}],
      });
    });
  }

  // validation starts here
  const _emailvalidate = mail => {
    var emailRegex = /[a-zA-Z0-9]@(yopmail)\.com\b$/g;
    if (mail === '') {
      setErrorEmail('*Please enter email.');
      showAlert(errorEmail);
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email.');
      showAlert(errorEmail);
    } else {
      setErrorEmail(null);
    }
  };
  const _passwordvalidate = pass => {
    var passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (pass === '') {
      setErrorPassword('*Please enter password.');
      showAlert(ErrorPassword);
    } else if (/([A-Z]+)/g.test(pass) && pass.length < 8) {
      setErrorPassword(
        '*Please enter a special character and length must be 8 digit.',
      );
      showAlert(ErrorPassword);
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
    setLoading(true);
    if (validate()) {
      EmailSign();
    } else {
      setLoading(false);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Warning',
        textBody: 'Mandatory fields are required',
      });
    }
  };

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={{height: '30%', width: '100%'}}>
            <Header name={'Sociable'} />
          </View>
          <View style={styles.textViewContainer}>
            <View style={{marginTop: 30}}>
              <CommonTextInput
                placeholder={'Enter your email Id'}
                hidden={false}
                setText={txt => {
                  setEmail(txt);
                }}
                validate={txt => {
                  _emailvalidate(txt);
                }}
              />

              <CommonTextInput
                placeholder={'Enter your Password'}
                hidden={true}
                setText={txt => {
                  setPassword(txt);
                }}
                validate={txt => {
                  _passwordvalidate(txt);
                }}
              />
            </View>
            <View
              style={{
                height: height * 0.1,
                width: width * 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: COLOR.Link,
                    fontWeight: '400',
                    letterSpacing: 2,
                  }}>
                  FORGOT PASSWORD
                </Text>
              </TouchableOpacity>
            </View>
            <CommonButton name={'LOG IN'} onPress={() => onSubmit()} />
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
                  OR LOG IN BY
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
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>
                  Don't have account ?
                  <Text style={{color: COLOR.Link}}> SIGN UP</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
