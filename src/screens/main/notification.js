import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getASync} from '../../redux/action/asyncUpdateAction';

import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';
import messaging from '@react-native-firebase/messaging';

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
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>HELlo</Text>
        <TextInput
          placeholder={'hello'}
          onChangeText={txt => {
            setNames(txt);
          }}
        />

        <Button
          onPress={() => {
            getASync(names);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
