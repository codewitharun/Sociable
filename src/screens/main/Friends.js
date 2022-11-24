import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import asyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPosts, getUser, getFriend} from '../../redux/action/firebaseActions';
import {clockRunning} from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/auth';
import {COLOR, height, width} from '../components/Colors';
const Friends = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const {allUsersOnApp} = useSelector(state => state.fromReducer);
  // console.log('All users on the app', allUsersOnApp);

  const dispatch = useDispatch();
  const fetchFriends = () => dispatch(getFriend());

  useEffect(() => {
    setRefreshing(true);
    fetchFriends();
    setRefreshing(false);
  }, []);
  const Item = ({
    title,
    url,
    thumbnailUrl,
    username,
    email,
    postId,
    like,
    uid,
  }) => (
    <View style={styles.item}>
      <TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: height * 0.07,
            marginVertical: 16,
          }}>
          <View style={{width: width * 0.15}}>
            <Image
              source={{uri: url}}
              style={{height: 50, width: 50, borderRadius: 100 / 2}}
            />
          </View>
          <View style={{width: width * 0.7}}>
            <Text
              style={{
                color: 'white',

                fontWeight: 'bold',
              }}>
              {/* {useData?.displayName} */}
              {username}
            </Text>
          </View>
          <View style={{width: width * 0.1}}>
            <Icon name="chat-outline" size={20} color={'white'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({item}) => (
    <Item
      title={item.caption}
      url={item.photoUrl}
      thumbnailUrl={item.userPhoto}
      username={item.displayName}
      email={item.email}
      postId={item.id}
      like={item.like}
      uid={item.uid}
    />
  );
  return (
    <SafeAreaView style={{backgroundColor: 'black'}}>
      {/* <StatusBar > </StatusBar> */}
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
            Others in Yopmail
          </Text>
        </View>
        <FlatList
          data={allUsersOnApp}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              title="Referesing Users"
              tintColor={COLOR.BUTTON}
              titleColor="#fff"
              refreshing={refreshing}
              onRefresh={getFriend}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Friends;

const styles = StyleSheet.create({});
