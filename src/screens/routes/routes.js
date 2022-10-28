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
import {COLOR} from '../components/Colors';

const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   const isDrawerOpen = useDrawerStatus() === 'open';
//   const [name, setName] = useState();
//   const [UImage, setUImage] = useState();
//   //   useEffect(() => {
//   //     setInterval(() => {
//   //       {
//   //         firestore()
//   //           .collection('Users')
//   //           .doc('all')
//   //           .get()
//   //           .then(documentSnapshot => {
//   //             /*
//   //       A DocumentSnapshot belongs to a specific document,
//   //       With snapshot you can view a documents data,
//   //       metadata and whether a document actually exists.
//   //      */
//   //             let userDetails = {};
//   //             // Document fields
//   //             userDetails = documentSnapshot.data();
//   //             // All the document related data
//   //             // userDetails['id'] = documentSnapshot.id;
//   //             console.log('user details: ' + JSON.stringify(userDetails));
//   //             setName(userDetails?.displayName);
//   //             setUImage(userDetails?.photoUrl);

//   //             {
//   //               /* setUserData(userDetails);
//   //           setEmail(userDetails?.email);
//   //           setAddress(userDetails?.address);
//   //           setBio(userDetails?.bio);
//   //           setPhone(userDetails?.phoneNumber?.slice(3));
//   //           setImage(userDetails?.photoUrl); */
//   //             }
//   //           });
//   //       }
//   //     }, 3000);
//   //   }, []);

//   return (
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
      </Auth.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
