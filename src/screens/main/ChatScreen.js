import React from 'react';
import {View} from 'react-native';
import ChatRoom from '../chat/ChatRoom';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';

const MyScreen = () => {
  const {usersForModal} = useSelector(state => state.fromReducer);
  const {user} = useSelector(state => state.fromReducer);
  console.log(user.displayName);
  return (
    <View>
      <ChatRoom user1={user.displayName} user2={usersForModal.username} />
    </View>
  );
};

export default MyScreen;

