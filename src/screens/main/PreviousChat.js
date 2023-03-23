import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {useSelector} from 'react-redux';

// import 'firebase/database';
import {height, width} from '../components/Colors';
const PreviousChat = ({navigation}) => {
  const currentUser = useSelector(state => state.user);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const chatsRef = firebase.database().ref('chatRooms');
    const query = chatsRef
      .orderByChild(`users/${currentUser.uid}`)
      .equalTo(true);

    query.on('value', snapshot => {
      const chats = [];

      snapshot.forEach(chat => {
        const otherUserUid = Object.keys(chat.val().users).filter(
          uid => uid !== currentUser.uid,
        )[0];
        const lastMessage = chat.child('messages').val()[0].text;
        const otherUser = chat.child(`users/${otherUserUid}`).val();

        chats.push({
          chatId: chat.key,
          otherUserUid,
          otherUserName: otherUser.displayName,
          otherUserPhotoUrl: otherUser.photoURL,
          lastMessage,
        });
      });

      setChats(chats);
    });

    return () => {
      query.off();
    };
  }, [currentUser]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatRoom', {chatId: item.chatId})}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}>
        <Image
          source={{uri: item.otherUserPhotoUrl}}
          style={{width: 48, height: 48, borderRadius: 24}}
        />
        <View style={{marginLeft: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {item.otherUserName}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item.lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderItem}
      keyExtractor={item => item.chatId}
      contentContainerStyle={{flexGrow: 1}}
    />
  );
};

export default PreviousChat;
