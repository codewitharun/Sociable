// In App.js in a new project

import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
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

//     <DrawerContentScrollView {...props}>
//       <View style={{height: 200, width: '70%', backgroundColor: 'green'}}>
//         <Image source={{uri: UImage}} style={{height: 100, width: 100}} />
//         <Text style={{fontSize: 30, color: 'black'}}>{name}</Text>
//       </View>

//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }
// function MyDrawer(props) {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: 'red',
//         drawerPosition: 'right',
//         drawerType: 'back',
//       }}>
//       <Drawer.Screen name="Home" component={Dashboard} />
//       <Drawer.Screen name="Profile" component={Profile} />
//     </Drawer.Navigator>
//   );
// }

const bottom = createBottomTabNavigator();
export function Afterauth(props) {
  return (
    <bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
        // tabBarActiveBackgroundColor: 'green',
        // tabBarInactiveBackgroundColor: 'yellow',
        tabBarInactiveTintColor: COLOR.TEXT,
        tabBarActiveTintColor: COLOR.BUTTON,
      }}>
      <bottom.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({}) => <Icon name="home" color="white" size={30} />,
        }}
      />
          <bottom.Screen
        name="Location"
        component={YourComponent}
        options={{
          tabBarIcon: ({}) => <Icon name="home" color="white" size={30} />,
        }}
      />
      {/* <bottom.Screen
        name="MyFriends"
        component={Addedfriends}
        options={{
          tabBarIcon: ({}) => <Icon name="home" color="white" size={30} />,
        }}
      /> */}
      <bottom.Screen
        name="MyFriends"
        component={Addedfriends}
        options={{
          tabBarIcon: ({}) => (
            <Icon name="account-group" color="white" size={30} />
          ),
        }}
      />
      <bottom.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({}) => <Icon name="plus" color="white" size={40} />,
        }}
      />
      <bottom.Screen
        name="Notifications"
        component={Notify}
        options={{
          tabBarIcon: ({}) => (
            <Icon name="bell-badge-outline" color="white" size={30} />
          ),
        }}
      />

      <bottom.Screen
        name="More"
        component={MyDrawer}
        options={{
          tabBarIcon: ({}) => (
            <Icon
              name="menu"
              color="white"
              size={30}
              // onPress={() =>
              //   props.navigation.dispatch(DrawerActions.toggleDrawer())
              // }
            />
          ),
        }}
      />
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
