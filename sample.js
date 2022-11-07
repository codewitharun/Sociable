import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import Postprofile from './Postprofile';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {userSignout} from '../../redux/action/firebaseActions';
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
import {useNavigation} from '@react-navigation/native';
function CustomDrawerContent(props) {
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
    userSignout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    });
  };
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
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
            onPress={() => props.navigation.navigate('Postprofile')}>
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
      </View>

      {/* <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        />
        <DrawerItem
          label="Toggle drawer"
          onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
        /> */}

      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign Out"
        labelStyle={{color: 'white'}}
        onPress={() => onSignout()}
        // style={{backgroundColor: COLOR.TABCARD}}
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer(props) {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLOR.TABCARD,
        // drawerActiveBackgroundColor: COLOR.TABCARD,
        drawerPosition: 'right',
        drawerType: 'back',
        drawerStyle: {backgroundColor: 'black'},
        drawerLabelStyle: {color: 'white'},
      }}>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Postprofile" component={Postprofile} />
      {/* <Drawer.Screen name="Postp" component={Postprofile} /> */}
    </Drawer.Navigator>
  );
}

export default MyDrawer;
