/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {Avatar} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native';
import {TextInput} from 'react-native';
import {Button} from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getASync} from '../../redux/action/asyncUpdateAction';
import {GiftedChat} from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../redux/action/firebaseActions';
import messaging from '@react-native-firebase/messaging';
import {height, width} from '../components/Colors';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/database';
const Notifications = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  const [messages, setMessages] = useState([]);
  // console.log('user in notifications screen', user);
  const [refreshing, setRefreshing] = useState(false);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log('users from drawer screen', users.displayName);
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getUser());
  useEffect(() => {
    setTimeout(() => {
      setRefreshing(true);
      fetchUser();
      // getmessage();
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('THREADS')
      // .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
        console.log('threads jkdsfhjkd', threads);
        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{marginLeft: 20}}>
          <Avatar
            rounded
            source={{
              uri: user?.photoUrl,
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}>
          <Text style={{color: 'red'}}>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const onSend = useCallback(messages => {
    console.log(messages);
    let msg = {
      ...messages,
      user: {
        _id: 1,
        name: 'Arun Kumar',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore()
      .collection('ChatTesting')
      .doc('test')
      .set({_id, createdAt, text, user})
      .then(() => console.log('Data set.'));
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          backgroundColor: 'black',
          height: height * 1,
          width: width * 1,
        }}>
        <View
          style={{
            height: height * 0.1,
            width: width * 0.95,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily:
                Platform.OS == 'android'
                  ? 'Logo-Regular'
                  : 'FONTSPRINGDEMO-BlueVinylRegular',
              fontSize: 35,
            }}>
            Notifications
          </Text>
        </View>
        <View style={{justifyContent: 'center', height: height * 0.5}}>
          <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
              _id: user?.email,
              name: user?.displayName,
              avatar: user?.photoUrl,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
