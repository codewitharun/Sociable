import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React from 'react';

import {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import Profile from '../authscreens/Profile';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import asyncStorage from '@react-native-async-storage/async-storage';
import {
  createDrawerNavigator,
  useDrawerStatus,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {color} from 'react-native-reanimated';
import {COLOR} from '../components/Colors';
import database from '@react-native-firebase/database';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props, {navigation}) {
  const isDrawerOpen = useDrawerStatus() === 'open';
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
    retrieveData();
  }, []);
  const onSignout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!!'))
      .then(() => {
        asyncStorage.clear();
      })
      .then(() =>
        props.navigation.navigate({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
  };
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{height: 200, width: '100%', backgroundColor: COLOR.TABCARD}}>
        <Image
          source={{uri: useData.photoUrl}}
          style={{height: 100, width: 100, borderRadius: 100 / 2}}
        />

        <Text style={{fontSize: 30, color: 'black'}}>
          {useData.displayName}
        </Text>
        <Text>{useData.bio}</Text>
      </View>

      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />

      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        labelStyle={{color: 'Red'}}
        onPress={() => onSignout()}
        style={{backgroundColor: COLOR.TABCARD}}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer(props, {navigation}) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'red',
        drawerPosition: 'right',
        drawerType: 'back',
      }}>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
