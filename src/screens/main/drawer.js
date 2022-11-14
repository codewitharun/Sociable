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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {userSignout} from '../../redux/action/firebaseActions';
import asyncStorage from '@react-native-async-storage/async-storage';

import {getPosts, getUser} from '../../redux/action/firebaseActions';

const Drawer = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  console.log('user in drawer screen', user);
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

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          // flex: 1,
          // justifyContent: 'flex-start',
          width: width * 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            height: height * 0.25,
            width: width * 0.95,
            alignSelf: 'center',
            borderRadius: 20,
            // borderColor: COLOR.BUTTON,
            borderWidth: 1,
            // flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              width: width * 0.3,
              // height: height * 0.3,
              alignSelf: 'center',
              // backgroundColor: 'red',
            }}>
            <Image
              style={{
                height: 90,
                width: 90,
                borderRadius: 100 / 2,
                borderColor: COLOR.BACKGROUND_COLOR,
              }}
              source={{uri: user?.photoUrl}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignSelf: 'center',
              width: width * 0.6,
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 20, marginTop: 10}}>
              {user?.displayName}
            </Text>
            <Text style={{color: 'white', fontSize: 15, marginBottom: 10}}>
              {user?.email}
            </Text>
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
                onPress={() => navigation.navigate('Profile')}>
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

        <View
          style={{
            backgroundColor: '#171717',

            height: height * 0.67,
            // height: 200,
            width: width * 0.95,
            alignSelf: 'center',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: 20,
          }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                title="Referesing Data..."
                tintColor={COLOR.BUTTON}
                titleColor="#fff"
                refreshing={refreshing}
                onRefresh={console.log(
                  'this is just testing for refreshing drawer screen data',
                )}
              />
            }>
            <View>
              <View style={{paddingLeft: 10, paddingTop: 20}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}   
                  onPress={() => navigation.navigate('Postprofile')}>
                  <Icon
                    name="badge-account-outline"
                    size={20}
                    color={'white'}
                    style={{width: width * 0.1}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 15,
                      width: width * 0.75,
                    }}>
                    Profile
                  </Text>
                  <Icon name="arrow-right-thin" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 10, paddingTop: 20}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="account-supervisor-outline"
                    size={20}
                    color={'white'}
                    style={{width: width * 0.1}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 15,
                      width: width * 0.75,
                    }}>
                    My Friends
                  </Text>
                  <Icon name="arrow-right-thin" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 10, paddingTop: 20}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="lock-outline"
                    size={20}
                    color={'white'}
                    style={{width: width * 0.1}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 15,
                      width: width * 0.75,
                    }}>
                    Privacy Policy
                  </Text>
                  <Icon name="arrow-right-thin" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 10, paddingTop: 20}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="checkbox-intermediate"
                    size={20}
                    color={'white'}
                    style={{width: width * 0.1}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 15,
                      width: width * 0.75,
                    }}>
                    Term & Conditions
                  </Text>
                  <Icon name="arrow-right-thin" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
              <View style={{paddingLeft: 10, paddingTop: 20}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="application-settings"
                    size={20}
                    color={'white'}
                    style={{width: width * 0.1}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 15,
                      width: width * 0.75,
                    }}>
                    Settings
                  </Text>
                  <Icon name="arrow-right-thin" color={'white'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
