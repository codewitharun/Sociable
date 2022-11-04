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
function Forgot({navigation}) {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
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
      alert('Mandatory field is required');
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
        </View>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={{
            height: height * 0.06,
            backgroundColor: 'rgb(28,154,236)',
            borderRadius: 3,
            justifyContent: 'center',
            width: width * 0.9,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 18,
              fontFamily: 'InstagramSans-Medium',
            }}>
            Send Reset Link
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
              <Text style={{color: '#fff', fontFamily: 'InstagramSans-Bold'}}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Forgot;

const styles = StyleSheet.create({});
