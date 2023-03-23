import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ChatRoom from '../chat/ChatRoom';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';
import {firebase} from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
const MyScreen = props => {
  const {usersForModal} = useSelector(state => state.fromReducer);
  console.log('hello', usersForModal);
  const {user} = useSelector(state => state.fromReducer);
  console.log('hellooooooooooooo', props.route.params);
  return (
    <ChatRoom user1={user} user2={props?.route?.params} />
    // <></>
  );
};

export default MyScreen;
