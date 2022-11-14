import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import asyncStorage from '@react-native-async-storage/async-storage';

import {getPosts, getUser} from '../../redux/action/firebaseActions';

const Dashboard = ({navigation}) => {
  const [DATA, setDATA] = useState([]);
  // {
  //   DATA && console.log('dasdsajfkhfjkhfkj', DATA);
  // }

  const [useData, setUserData] = useState('');
  const [liked, setLiked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {posts} = useSelector(state => state.fromReducer);

  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getPosts());
  useEffect(() => {
    setRefreshing(true);
    fetchPosts();
    setRefreshing(false);
  }, [refreshing]);
  const Item = ({title, url, thumbnailUrl, username, email, postId}) => (
    <View style={styles.item}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor: 'red',
          borderColor: 'grey',
          borderWidth: 0.2,
          height: height * 0.07,
        }}>
        <View>
          <TouchableOpacity>
            <Image
              source={{uri: thumbnailUrl}}
              style={{height: 50, width: 50, borderRadius: 100 / 2}}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text
              style={{color: 'white', marginRight: 190, fontWeight: 'bold'}}>
              {/* {useData?.displayName} */}
              {username}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => deleteSelectedElement(title, postId)}>
            <Icon name="dots-vertical" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: height * 0.5,
          alignSelf: 'center',
          width: width * 0.95,
          // backgroundColor: 'green',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: url}}
          style={{height: 400, width: 400, resizeMode: 'contain'}}
        />
        {/* <Text style={{color: 'white'}}>{title}</Text> */}
      </View>
      <View
        style={{
          height: height * 0.035,
          // backgroundColor: 'red',
          width: width * 0.4,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Icon
              name={liked == true ? 'heart' : 'heart-outline'}
              color={liked == true ? 'red' : 'white'}
              size={30}
              onPress={() => {
                setLiked(isLiked => !isLiked);
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="comment-outline" color={'white'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteSelectedElement(title, postId)}>
            <Icon name="delete-outline" color={'white'} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* username and caption portion starts here  */}
      <View
        style={{
          height: height * 0.05,
          // backgroundColor: 'red',
          width: width * 0.9,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {email?.split('.com')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width: width * 0.5}}>
            <Text style={{color: 'white'}}>{title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const renderItem = ({item}) => (
    <Item
      title={item.caption}
      url={item.photoUrl}
      thumbnailUrl={item.userPhoto}
      username={item.name}
      email={item.email}
      postId={item.id}
      like={item.like}
    />
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
  const deleteSelectedElement = (title, postId) => {
    console.log(title);
    Alert.alert(
      'Are You Sure Want To Delete Item = ' + postId,
      'Select Below Options',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            // // Filter Data

            // const filteredData = Item.filter(item => item.id !== title);
            // //Updating List Data State with NEW Data.
            // setTEMP_DATA(filteredData);
            firestore().collection('Upload').doc(postId).delete();
          },
        },
      ],
    );
  };
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
        <View
          style={{
            width: width * 0.95,
            height: height * 0.759,
            alignSelf: 'center',
          }}>
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                title="Referesing Data..."
                tintColor={COLOR.BUTTON}
                titleColor="#fff"
                refreshing={refreshing}
                onRefresh={fetchPosts}
              />
            }
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
    height: height * 0.7,
    width: width * 0.95,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 22,
  },
});
