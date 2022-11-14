import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getASync} from '../../redux/action/asyncUpdateAction';

import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';

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
      apapa();
      setRefreshing(false);
    }, 2000);
  }, []);
  function apapa() {
    // const data = AsyncStorage.getItem('LoggedUser');
    const data = AsyncStorage.getItem('LoggedUser');
    console.log('hjksdfhkjdsfddd', data);
  }
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
