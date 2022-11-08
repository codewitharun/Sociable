import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {userSignout} from '../../redux/action/firebaseActions';
import asyncStorage from '@react-native-async-storage/async-storage';

import {getPosts, getUser} from '../../redux/action/firebaseActions';

const Drawer = ({navigation}) => {
  const {users} = useSelector(state => state.fromReducer);
  console.log('users from drawer screen', users.displayName);
  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getUser());
  useEffect(() => {
    fetchPosts();
  }, []);
  const onSignOut = () => {
    userSignout(() => {
      console.log('on success ');
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
          // justifyContent: 'flex-start',
          width: width * 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            height: height * 0.2,
            width: width * 0.95,
            alignSelf: 'center',
            borderRadius: 8,
            borderColor: COLOR.BUTTON,
            borderWidth: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: width * 0.3,
              // backgroundColor: 'red',
            }}>
            <Image
              style={{height: 100, width: 100, borderRadius: 100 / 2}}
              source={{uri: users.photoUrl}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              width: width * 0.6,
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20}}>
              {users.displayName}
            </Text>
            <Text style={{color: 'white', fontSize: 15}}>{users.email}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: width * 0.6,
                // backgroundColor: 'red',
              }}>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'red',
                  marginTop: 10,
                  borderWidth: 2,
                  borderColor: COLOR.BUTTON,
                  height: 35,
                  width: 100,
                  justifyContent: 'center',
                  borderRadius: 7,
                }}
                onPress={() => navigation.navigate('Postprofile')}>
                <Text
                  style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'red',
                  marginTop: 10,
                  borderWidth: 2,
                  borderColor: COLOR.BUTTON,
                  height: 35,
                  width: 100,
                  justifyContent: 'center',
                  borderRadius: 7,
                }}
                onPress={() => onSignOut()}>
                <Text
                  style={{color: 'white', fontSize: 15, textAlign: 'center'}}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    height: height * 0.7,
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 22,
  },
});
