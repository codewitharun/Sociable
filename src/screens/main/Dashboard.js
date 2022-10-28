import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import asyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Dashboard = ({navigation}) => {
  const [DATA, setDATA] = useState([]);
  const [useData, setUserData] = useState('');
  axios
    .get('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(function (response) {
      // console.log(response);
      setDATA(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  console.log('data from data axios', DATA);

  // how to show activityindicators when no data is available ?

  const Item = ({title, url, thumbnailUrl}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{uri: useData?.photoUrl}}
        style={{height: 200, width: 200}}
      />
      <View style={{height: 300, width: 300}}>
        <Image source={{uri: url}} style={{height: 200, width: 200}} />
        {/* <Image source={{uri: thumbnailUrl}} style={{height: 150, width: 150}} /> */}
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <Item title={item.title} url={item.url} thumbnailUrl={item.thumbnailUrl} />
  );
  const retrieveData = async () => {
    try {
      const userdata = await asyncStorage.getItem('LoggedUser');

      if (userdata !== null) {
        // We have data!!
        console.log('value from asyncstoragee parseed', userdata);
        setUserData(JSON.parse(userdata));
      }
    } catch (error) {
      console.log('no data in async storage', error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      <View
        style={{
          height: height * 1,
          // justifyContent: 'flex-start',
          width: width * 1,
          backgroundColor: 'black',
        }}>
        <View
          style={{
            height: '9%',
            width: '95%',
            // backgroundColor: 'red',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily:
                  Platform.OS == 'android'
                    ? 'Logo-Regular'
                    : 'FONTSPRINGDEMO-BlueVinylRegular',
                fontSize: 35,
                // textAlign: 'center',
                // lineHeight: 29,
                color: 'white',
              }}>
              Sociable
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity>
                <Icon name="ladder" size={30} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity>
                <Icon name="android-messages" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{backgroundColor: 'gray'}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    height: height * 0.4,
    width: width * 0.95,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
  },
});
