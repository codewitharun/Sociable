/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {GiftedChat} from 'react-native-gifted-chat';
import axios from 'axios';
import {COLOR, height, width} from '../components/Colors';
const ChatRoom = ({user1, user2, user3}) => {
  console.log(user1, user2, user3);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [fcmToken, setfcmToken] = useState('');
  const [ChatRoomId, setChatRoomId] = useState('');
  const sendNotification = async (fcmToken, message) => {
    try {
      const enabled = await messaging().hasPermission(fcmToken);
      if (enabled) {
        console.log('user has permissions');
      } else {
        console.log('user doesnt have permission');
        const enabled2 = await messaging().requestPermission();
        if (enabled2) {
          console.log('requestPermission');
        } else {
          console.log('not requestPermission');
        }
      }
      console.log('getToken');
      //   await messaging().registerForRemoteNotifications();
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      //   const uid = store.getState().email;
      console.log('fmcToken : ' + fcmToken);

      console.log(
        'isRegisteredForRemoteNotifications ' +
          messaging().isDeviceRegisteredForRemoteMessages,
      );
      messaging().onMessage(async remoteMessage => {
        console.log('FCM Message Data:', remoteMessage.data);
      });

      messaging().onSendError(event => {
        console.log(event.messageId);
        console.log(event.error);
      });

      //     {
      //       message: {
      //         token: fcmToken,
      //         notification: {
      //           title: 'New Message',
      //           body: message,
      //         },
      //       },
      //     },
      //     {
      //       headers: {
      //         Authorization: 'Bearer AIzaSyA_i9hyCfw50pdnwqmEmD96z4KyK92c-hg',
      //         'Content-Type': 'application/json',
      //       },
      //     },
      //   );

      //   console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    messaging()
      .getToken()
      .then(fcmToken => {
        console.log(fcmToken);
        setfcmToken(fcmToken);
        // send the FCM token to your server
      });
    const chatRoomId = [user1, user2].sort().join('-');
    setChatRoomId(chatRoomId);
    const chatRef = firebase.database().ref(`chatRooms/${chatRoomId}`);
    chatRef.on('value', snapshot => {
      const message = snapshot.val();
      const messages = [];
      snapshot.forEach(message => {
        messages.push(message.val());
      });
      setMessages(messages);
      sendNotification(fcmToken, message);
    });

    return () => {
      chatRef.off();
    };
  }, [user1, user2]);

  const sendMessage = () => {
    const chatRoomId = [user1, user2].sort().join('-');

    firebase.database().ref(`chatRooms/${chatRoomId}`).push({
      sender: user1,
      message: newMessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    setNewMessage('');
  };

  return (
    <View>
      <View>
        <Text
          style={{
            color: 'blue',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 24,
          }}>
          {ChatRoomId}
        </Text>
      </View>
      <FlatList
        data={messages}
        renderItem={({item}) => (
          <View>
            <Text style={{color: 'black'}}>
              {item.sender}: {item.message}
            </Text>
          </View>
        )}
        keyExtractor={item => item.timestamp.toString()}
      />

      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Enter message..."
        style={{color: 'black', backgroundColor: 'gray'}}
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={{
          width: width * 0.9,
          height: height * 0.05,
          backgroundColor: COLOR.BUTTON,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'black'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatRoom;
