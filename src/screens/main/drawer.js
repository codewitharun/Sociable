import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {userSignout} from '../../redux/action/firebaseActions';
import asyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';

import {getPosts, getUser} from '../../redux/action/firebaseActions';
import CommonImage from '../components/CommonImage';
import Profile from '../authscreens/Profile';

const Drawer = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  // console.log('user in drawer screen', user);
  const [refreshing, setRefreshing] = useState(false);
  // console.log('users from drawer screen', users.displayName);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  useEffect(() => {
    setTimeout(() => {
      setRefreshing(true);
      fetchUser();
      setRefreshing(false);
    }, 2000);
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
  const navigationData = [
    {name: 'Profile', navigateTo: 'Postprofile'},
    {
      name: 'All Users',
      navigateTo: 'AllUsers',
    },
    {
      name: 'Settings',
      navigateTo: 'AllUsers',
    },
    {
      name: 'Change Password',
      navigateTo: 'ChangePassword',
    },
    {
      name: 'Term & Privacy',
      navigateTo: 'Privacy',
    },
    {
      name: 'About Developer',
      navigateTo: 'Codewitharun',
    },
  ];
  return (
    <ImageBackground
      source={CommonImage.BackGroundImage}
      resizeMode="contain"
      style={{
        height: height * 1,
        // flex: 1,
        // justifyContent: 'flex-start',
        width: width * 1,
        backgroundColor: 'black',
        position: 'relative',
      }}>
      <SafeAreaView>
        <StatusBar barStyle={'light-content'} />
        <View
          style={{
            height: height * 0.15,
            width: width * 0.95,
            alignSelf: 'center',
            borderRadius: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.10)',
            justifyContent: 'center',
            marginTop: 30,
            flexDirection: 'row',
            display: 'flex',
          }}>
          <View
            style={{
              width: width * 0.2,

              alignSelf: 'center',
              marginLeft: 30,
              // backgroundColor: 'green',
            }}>
            <Image
              style={{
                height: 90,
                width: 90,
                borderRadius: 100 / 2,
                resizeMode: 'cover',
              }}
              source={{uri: user?.photoUrl}}
            />
          </View>

          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignSelf: 'center',
              width: width * 0.5,

              marginLeft: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                marginTop: 10,
                fontWeight: '700',
              }}>
              {user?.displayName}
            </Text>
            <Text style={{color: 'white', fontSize: 14, marginBottom: 10}}>
              {user?.email}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              width: width * 0.2,

              // backgroundColor: 'yellow',
            }}>
            <TouchableOpacity
              style={{
                // backgroundColor: 'red',

                justifyContent: 'center',
                borderRadius: 7,
              }}
              onPress={() => navigation.navigate('Profile')}>
              <Image
                style={{height: 30, width: 30}}
                source={CommonImage.editIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: height * 0.67,
            // height: 200,
            width: width * 1,
            alignSelf: 'center',

            marginTop: 20,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              height: height * 0.67,
              width: width * 1,
            }}>
            <View>
              {navigationData.map((item, index) => (
                <View
                  style={{
                    backgroundColor: COLOR.TRANSPARENT,
                    height: 50,
                    justifyContent: 'center',
                    marginVertical: 10,
                    width: width * 0.7,
                    borderTopEndRadius: 40,
                    borderBottomEndRadius: 40,
                    paddingHorizontal: 10,
                  }}
                  key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.navigateTo)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Comfortaa-Bold',
                        fontSize: 16,
                        fontWeight: '400',
                      }}>
                      {item.name}
                    </Text>
                    <Icon
                      name="chevron-right-circle"
                      color={'rgba(255, 255, 255, 0.20)'}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => onSignOut()}
                style={{
                  width: 130,
                  height: 50,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  marginTop: 30,
                  marginLeft: 20,
                  borderRadius: 30,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                    display: 'flex',
                    paddingHorizontal: 14,
                  }}>
                  <Icon name="exit-to-app" size={30} color={'black'} />
                  <Text
                    style={{fontSize: 14, color: 'black', fontWeight: '400'}}>
                    Log Out
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{width: width * 0.5}}>{/* <Profile /> */}</View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
