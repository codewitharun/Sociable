import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import {useSelector, useDispatch} from 'react-redux';

import asyncStorage from '@react-native-async-storage/async-storage';
import {userSignout} from '../../redux/action/firebaseActions';
import {getPosts, getUser, loginUser} from '../../redux/action/firebaseActions';
const Drawer = ({navigation}) => {
  // const {currentusers} = useSelector(state => state.fromReducer);
  // console.log(currentusers);
  const dispatch = useDispatch();
  // const useSelect = useSelector();
  // const fetchUser = () => dispatch(loginUser());

  const [authUser, setauthUser] = useState();
  const [useData, setUserData] = useState('');
  const [name, setName] = useState('');
  const [UImage, setUImage] = useState('');
  const retrieveData = async () => {
    try {
      const userdata = await asyncStorage.getItem('LoggedUser');

      if (userdata !== null) {
        // We have data!!
        console.log('value from asyncstoragee parseed', userdata);
        setUserData(JSON.parse(userdata));

        database()
          .ref(`userdata/${useData?.uid}`)
          .set({
            name: 'Arun Kumar',
            age: 22,
            role: 'admin',
            post: 'react native developer',
          })
          .then(() => console.log('Data set.'));
        database()
          .ref(`userdata/${useData?.uid}`)
          .once('value')
          .then(snapshot => {
            console.log('User data: ', snapshot.val());
          });
        // setName(useData?.displayName);
        // setUImage(useData?.photoUrl);
      }
    } catch (error) {
      console.log('no data in async storage', error);
    }
  };
  useEffect(() => {
    // retrieveData();
    // fetchUser();
  }, []);
  const onSignout = () => {
    userSignout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          width: width * 1,
          backgroundColor: COLOR.BACKGROUND_COLOR,
        }}>
        <View>
          <View
            style={{
              height: 230,
              width: '100%',
              backgroundColor: 'black',
              marginLeft: 15,
            }}>
            <Image
              source={{uri: useData.photoUrl}}
              style={{height: 100, width: 100, borderRadius: 100 / 2}}
            />

            <Text style={{fontSize: 30, color: 'white'}}>
              {useData.displayName}
            </Text>
            <Text style={{color: 'white'}}>{useData.bio}</Text>
            <View
              style={{
                height: 30,
                // backgroundColor: COLOR.TABCARD,
                width: 100,
                justifyContent: 'center',
                borderColor: COLOR.BUTTON,
                borderWidth: 1,
                borderRadius: 7,
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Postprofile')}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    // fontWeight: '700',
                    color: 'white',
                    fontFamily: 'Comfortaa-bold',
                  }}>
                  Profile
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => onSignout()}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  // fontWeight: '700',
                  color: 'white',
                  fontFamily: 'Comfortaa-bold',
                }}>
                signOut
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Drawer;

const styles = StyleSheet.create({});
