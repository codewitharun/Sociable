import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getASync} from '../../redux/action/asyncUpdateAction';
import {useSelector, useDispatch} from 'react-redux';

const Notifications = ({navigation}) => {
  const {postUser} = useSelector(state => state.fromReducer);
  console.log('users in redux async storage', postUser);
  //   const dispatch = useDispatch();
  //   const fetchPosts = () => dispatch(getASync());
  const [names, setNames] = useState('');
  useEffect(() => {
    // fetchPosts;
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
