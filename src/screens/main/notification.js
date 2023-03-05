import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
// import 'firebase/database';

const Notifications = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [userI, setUserI] = useState('');
  const [userII, setUserIIS] = useState('');
  const [userID, setUserId] = useState([]);
  // console.log(user.displayName);

  // console.log(users);
  useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref('chatRooms')
      .on('value', snapshot => {
        // const messages = snapshot?.val();
        // console.log(snapshot.);
        // const uniqueUsers = snapshot.forEach(user => {
        //   user;
        //   console.log('user', user);
        // });

        // console.log('filtering', exits);
        setUsers(snapshot?._snapshot.childKeys);

        snapshot?._snapshot.childKeys.map(user => setUser(user));
        // const chatRoomId = [user1, user2].sort().join('-');
        const userIds = user?.toString().split('-').sort();
        setUserId(userIds);
        setUserI(userIds[0]);
        setUserIIS(userIds[1]);
        console.log(
          'User Ids for chat screen from notification ',
          '1' + userI,
          '2' + userII,
        );
      });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
      }}
      data={users}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => navigation.navigate('Chat', {items: item})}>
          <Text style={styles.userText}>{item}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item}
    />
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  userText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'red',
  },
});

export default Notifications;
