// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
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
import Authscreen from './src/screens/authscreens/Authscreen';
import Login from './src/screens/authscreens/Login';
import Signup from './src/screens/authscreens/Signup';
import Forgot from './src/screens/authscreens/Forgot';
import Profile from './src/screens/authscreens/Profile';
import Dashboard from './src/screens/main/Dashboard';
import Splash from './src/screens/Splash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from './src/screens/components/Colors';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
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
        drawerActiveTintColor: 'red',
        drawerPosition: 'right',
        drawerType: 'back',
      }}>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

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
          tabBarIcon: ({}) => (
            // <View
            //   style={{
            //     position: 'absolute',
            //     bottom: 0, // space from bottombar
            //     height: 68,
            //     width: 68,
            //     borderRadius: 68,
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}>
            // </View>
            <Icon name="home" color="white" size={30} />
          ),
        }}
      />
      <bottom.Screen
        name="Friends"
        component={Profile}
        options={{
          tabBarIcon: ({}) => (
            <Icon name="account-group" color="white" size={30} />
          ),
        }}
      />
      <bottom.Screen
        name="Chat"
        component={Profile}
        options={{
          tabBarIcon: ({}) => (
            <Icon name="android-messages" color="white" size={30} />
          ),
        }}
      />
      <bottom.Screen
        name="Notifications"
        component={Profile}
        options={{
          tabBarIcon: ({}) => (
            <Icon name="bell-badge-outline" color="white" size={30} />
          ),
        }}
      />
      <bottom.Screen
        name="More"
        component={MyDrawer}
        listeners={({navigation}) => ({
          tabPress: () => {
            props.navigation.dispatch(DrawerActions.toggleDrawer());
          },
        })}
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

function App() {
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
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default App;
