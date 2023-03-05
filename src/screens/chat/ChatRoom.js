import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
// import
import {InputToolbar} from 'react-native-gifted-chat';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
// import {messaging} from '@react-native-firebase/messaging';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
const ChatRoom = ({user1, user2, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState('');
  const [fcmToken, setfcmToken] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');
  const [isImageSelected, setIsImageSelected] = useState(false);
  useEffect(() => {
    // messaging()
    //   .getToken()
    //   .then(fcmToken => {
    //     setfcmToken(fcmToken);
    //   });

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
    });

    return () => {
      chatRef.off();
    };
  }, [user1, user2]);
  const handleMediaSelection = useCallback(async () => {
    try {
      const image = await ImagePicker.openPicker({
        title: 'Select Media',
        mediaType: 'any',
        width: 300,
        height: 400,
        cropping: true,
      });
      setSelectedMedia(image.path);
      console.log('edit image name', image.filename);
      console.log('edit image path', image.path);
      console.log('image response', image);
      console.log('send message', selectedMedia);
      setIsImageSelected(true);
      await getUrl(image.path);
    } catch (error) {
      console.log('Crop image picker error ', error);
    }
  }, []);

  async function getUrl(pathUrl) {
    if (pathUrl) {
      const storageRef = storage().ref(`media/${pathUrl}`);
      const task = storageRef.putFile(pathUrl);

      try {
        await task;
        const Url = await storageRef.getDownloadURL();
        setMediaUrl(Url);
        console.log('url for image', Url);
      } catch (error) {
        console.log('Error uploading media:', error);
      }
    }
  }
  const renderInputToolbar = props => {
    return (
      <>
        {isImageSelected && (
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Image source={{uri: selectedMedia}} />
            <TouchableOpacity
              onPress={() => {
                setSelectedMedia(null);
                setIsImageSelected(false);
                setMediaUrl('');
              }}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                borderRadius: 20,
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="close" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        <InputToolbar {...props} containerStyle={{borderTopWidth: 0}}>
          <TouchableOpacity onPress={handleMediaSelection}>
            <Icon
              name="camera"
              size={28}
              color="#2e64e5"
              style={{marginHorizontal: 5}}
            />
          </TouchableOpacity>
          {props.renderComposer(props)}
          {props.renderSend({
            ...props,
            containerStyle: {justifyContent: 'center', alignItems: 'center'},
          })}
        </InputToolbar>
      </>
    );
  };

  const sendMessage = async newMessages => {
    newMessages.forEach(newMessage => {
      firebase
        .database()
        .ref(`chatRooms/${chatRoomId}`)
        .push({
          _id: newMessage._id,
          text: newMessage.text,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          // user: {
          //   _id: newMessage.user._id,
          //   name: newMessage.user.name,
          // },
          user: {
            _id: newMessage.user._id,
            name: newMessage.user.name,
          },
          image: mediaUrl ? mediaUrl : null,
        });
    });
    setSelectedMedia(null);
    // Reset state after sending message
    setIsImageSelected(false);
    setMediaUrl(null);
  };

  const renderMessageImage = props => {
    const {currentMessage} = props;

    return (
      <Image
        source={{uri: currentMessage.image}}
        style={{height: 200, width: 200}}
      />
    );
  };

  return (
    <GiftedChat
      showUserAvatar
      inverted={false}
      // shouldUpdateMessage={true}
      // dateFormat="yyyy-MM-dd"
      placeholder="Enter your message here"
      alwaysShowSend
      renderUsernameOnMessage
      messages={messages}
      user={{_id: user1, name: user1}}
      onSend={newMessages => sendMessage(newMessages)}
      renderSend={props => (
        <Send {...props}>
          <View style={{marginRight: 10, marginBottom: 5}}>
            <Icon name="send" size={32} color="#00AAFF" />
          </View>
        </Send>
      )}
      renderMessageImage={renderMessageImage}
      renderInputToolbar={props => (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: 'black',
            borderTopWidth: 1,
            borderTopColor: 'gray',
          }}
        />
      )}
      renderBubble={props => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#00AAFF',
            },
            left: {
              backgroundColor: '#E6E6E6',
            },
          }}
          textStyle={{
            right: {
              color: '#000',
            },
            left: {
              color: '#000',
            },
          }}
        />
      )}
      renderActions={() => (
        <TouchableOpacity onPress={handleMediaSelection}>
          <Icon name="attachment" size={32} color="#00AAFF" />
        </TouchableOpacity>
      )}
    />
  );
};

export default ChatRoom;
