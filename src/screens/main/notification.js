import {StyleSheet, Text, View, Alert, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getASync} from '../../redux/action/asyncUpdateAction';

import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';
import messaging from '@react-native-firebase/messaging';
import {height, width} from '../components/Colors';
const Notifications = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  console.log('user in notifications screen', user);
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

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          backgroundColor: 'black',
          height: height * 1,
          width: width * 1,
        }}>
        <View
          style={{
            height: height * 0.1,
            width: width * 0.95,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily:
                Platform.OS == 'android'
                  ? 'Logo-Regular'
                  : 'FONTSPRINGDEMO-BlueVinylRegular',
              fontSize: 35,
            }}>
            Notifications
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
