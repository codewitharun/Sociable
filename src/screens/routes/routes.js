// In App.js in a new project

import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  useDrawerStatus,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MyDrawer from '../main/drawer';
import Authscreen from '../authscreens/Authscreen';
import Login from '../authscreens/Login';
import Signup from '../authscreens/Signup';
import Forgot from '../authscreens/Forgot';
import Profile from '../authscreens/Profile';
import Dashboard from '../main/Dashboard';
import Splash from '../Splash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Postprofile from '../main/Postprofile';
import {COLOR} from '../components/Colors';
import Upload from '../main/upload';
import Termandcon from '../main/termandcon';
import Privacy from '../main/privacy';
import Friends from '../main/Friends';
import MyScreen from '../main/ChatScreen';
import Addedfriends from '../main/Addedfriend';
import PreviousChat from '../main/PreviousChat';
import Notify from '../main/Notify';
import YourComponent from '../main/Location';
const Drawer = createDrawerNavigator();

function MyTabBar({state, descriptors, navigation}) {
  console.log(
    '🚀 ~ file: routes.js:43 ~ {state.routes.map ~ options:',
    state,
    descriptors,
  );
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        let iconName;
        let tabStyles = {};
        let tabStylePlus = {};
        if (route.name === 'Upload') {
          tabStyles = {
            backgroundColor: COLOR.Link,
            height: 80,
            width: 80,
            borderRadius: 100 / 2,
            position: 'absolute',
            bottom: 35,
            elevation: 5,
            shadowColor: COLOR.Link,
            borderBottomColor: '#BDBDBD',
            borderBottomWidth: 2,
            justifyContent: 'space-evenly',
          };
          tabStylePlus = {
            backgroundColor: 'white',
            borderRadius: 10,
            height: 30,
            width: 30,
          };
        }
        if (route.name === 'Dashboard') {
          iconName = 'home';
        } else if (route.name === 'MyFriends') {
          iconName = 'account-group';
        } else if (route.name === 'Upload') {
          iconName = 'plus';
        } else if (route.name === 'Beta') {
          iconName = 'beta';
        } else if (route.name === 'More') {
          iconName = 'menu';
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              ...tabStyles,
              alignItems: 'center',
              position: 'relative',
            }}>
            <Icon
              name={iconName}
              size={30}
              style={{
                color: isFocused ? COLOR.Link : COLOR.TEXT,
                alignSelf: 'center',
                ...tabStylePlus,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const bottom = createBottomTabNavigator();
export function Afterauth(props) {
  return (
    <bottom.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'white'},
        // tabBarActiveBackgroundColor: 'green',
        // tabBarInactiveBackgroundColor: 'yellow',
        tabBarInactiveTintColor: COLOR.TEXT,
        tabBarActiveTintColor: COLOR.Link,
      }}>
      <bottom.Screen name="Dashboard" component={Dashboard} />

      <bottom.Screen name="MyFriends" component={Addedfriends} />
      <bottom.Screen name="Upload" component={Upload} />
      <bottom.Screen name="Beta" component={Notify} />

      <bottom.Screen name="More" component={MyDrawer} />
    </bottom.Navigator>
  );
}

const Auth = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Auth.Navigator screenOptions={{headerShown: false}}>
        <Auth.Screen name="Splash" component={Splash} />
        <Auth.Screen name="Auth" component={Authscreen} />
        <Auth.Screen name="Success" component={Afterauth} />
        <Auth.Screen name="Login" component={Login} />
        <Auth.Screen name="Signup" component={Signup} />
        <Auth.Screen name="Forgot" component={Forgot} />
        <Auth.Screen name="Profile" component={Profile} />
        <Auth.Screen name="Upload" component={Upload} />
        <Auth.Screen name="Postprofile" component={Postprofile} />
        <Auth.Screen name="TandC" component={Termandcon} />
        <Auth.Screen name="Privacy" component={Privacy} />
        <Auth.Screen name="Chat" component={MyScreen} />
        <Auth.Screen name="AllUsers" component={Friends} />
        {/* <bottom.Screen
        name="MyFriends"
        component={Addedfriends}
        options={{
          tabBarIcon: ({}) => <Icon name="home" color="white" size={30} />,
        }}
      /> */}
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
