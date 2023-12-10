import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLOR, height, width} from '../components/Colors';
import auth from '@react-native-firebase/auth';
import Header from '../../common/header';
import CommonTextInput from '../../common/textinput';
import CommonButton from '../../common/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function Forgot({navigation}) {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const _emailvalidate = mail => {
    var emailRegex = /[a-zA-Z]@(yopmail)\.com\b$/g;

    if (mail === '') {
      setErrorEmail('*Please enter email.');
    } else if (!emailRegex.test(mail)) {
      setErrorEmail('*Please enter valid email.');
    } else {
      setErrorEmail(null);
    }
  };
  const validate = () => {
    let flag = true;

    if (email === '') {
      setErrorEmail('*Please enter email.');
      flag = false;
    }

    return flag;
  };
  const onSubmit = () => {
    if (validate()) {
      EmailSign();
    } else {
    }
  };
  async function EmailSign() {
    try {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          console.log('User reset link sent successfully');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          height: height * 1,

          width: width * 1,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View style={{height: '30%', width: '100%'}}>
          <Header name={'Sociable'} />
          <SafeAreaView>
            <StatusBar barStyle={'light-content'} />
          </SafeAreaView>
        </View>
        <View
          style={{
            height: '70%',
            width: '100%',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
            // justifyContent: 'center',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }}>
          <View style={{marginBottom: 30, justifyContent: 'center'}}>
            <Text
              style={{
                textAlign: 'center',
                width: width * 1,
                paddingVertical: 40,
                paddingHorizontal: 40,
              }}>
              Have you Forgot your password we will help you getting your
              account back !!
            </Text>
            <CommonTextInput
              placeholder={'Enter your email'}
              setText={txt => {
                setEmail(txt);
              }}
              validate={txt => {
                _emailvalidate(txt);
              }}
            />
          </View>
          <View>
            <CommonButton name={'Send Reset Link'} onPress={() => onSubmit()} />
          </View>
          <View style={{paddingVertical: 40}}>
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
}

export default Forgot;

const styles = StyleSheet.create({});
