import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/database';
// import 'firebase/database';

const Notifications = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref('chatRooms')
      .on('value', snapshot => {
        // const messages = snapshot.val();
        snapshot.forEach(element => {
          // console.log(element);
          setUsers(element);
        });

        console.log('uniqueUsers', users);
      });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.userContainer}>
          {console.log('item', item)}
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
  },
});

export default Notifications;
