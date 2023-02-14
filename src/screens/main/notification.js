import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/database';
// import 'firebase/database';

const Notifications = ({navigation}) => {
  const [users, setUsers] = useState([]);

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

        setUsers(snapshot?.val());
      });

    return () => unsubscribe();
  }, []);

  return (
    <FlatList
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      data={users}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() =>
            navigation.navigate('PreviousChatUser', {userName: item})
          }>
          <Text style={styles.userText}>{item.item}</Text>
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
