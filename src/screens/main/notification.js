import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
const Notifications = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [fcmToken, setfcmToken] = useState('');
  const [ChatRoomId, setChatRoomId] = useState('');
  const user1 = 'Arun';
  const user2 = 'Dhananjay';
  useEffect(() => {
    const chatRef = firebase.database().ref('/chat');
    chatRef.on('value', snapshot => {
      const newMessages = [];
      snapshot.forEach(child => {
        newMessages.push(child.val());
      });
      setMessages(newMessages);
    });
  }, []);

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
      // sendNotification(fcmToken, message);
    });

    return () => {
      chatRef.off();
    };
  }, [user1, user2]);
  const onSend = newMessages => {
    // newMessages.forEach(message => {
    //   firebase.database().ref('/chat').push(message);
    // });
    const chatRoomId = [user1, user2].sort().join('-');

    firebase.database().ref(`chatRooms/${chatRoomId}`).push({
      sender: user1,
      message: newMessage,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    setNewMessage('');
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={newMessage}
        onSend={onSend}
        user={{
          _id: user1,
        }}
      />
    </View>
  );
};

export default Notifications;
