import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import ChatRoom from '../chat/ChatRoom';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';
import {firebase} from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
const MyScreen = props => {
  console.log(props?.route?.params?.items);
  let items = props.route?.params?.items;

  const [ChatRoomId, setChatRoomId] = useState('');
  const [users, setUsers] = useState([]);
  const [userI, setUserI] = useState('');
  const [userII, setUserIIS] = useState('');
  const {usersForModal} = useSelector(state => state.fromReducer);
  console.log('hello', usersForModal);
  const {user} = useSelector(state => state.fromReducer);

  const userForChat = items?.split('-').sort();
  // console.log('Chat screen', userForChat[1]);
  // const exits = userForChat?.filter(user => {
  //   // console.log(user);
  //   {
  //     user === auth().currentUser.displayName
  //       ? console.log('fouund', user)
  //       : console.log('no chat found');
  //   }
  // });
  // {
  //   userForChat[0] === auth().currentUser.displayName ||
  //   userForChat[1] === auth().currentUser.displayName
  //     ? console.log('fouund', user)
  //     : console.log('no chat found');
  // }
  return (
    // <View>
    <ChatRoom
      user1={
        userForChat
          ? userForChat[0]
          : usersForModal !== []
          ? user?.displayName
          : ''
      }
      user2={
        userForChat
          ? userForChat[1]
          : usersForModal !== []
          ? usersForModal?.username
          : auth().currentUser.displayName
      }
    />
    // </View>
  );
};

export default MyScreen;
