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
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import asyncStorage from '@react-native-async-storage/async-storage';
import {increment, decrement} from '../../redux/action/action';
import {getPosts, getUser, sendLikes} from '../../redux/action/firebaseActions';
import {clockRunning} from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/auth';

const Dashboard = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  const {counter} = useSelector(state => state.fromReducer);
  console.log(counter);
  const getCurrentUser = () => dispatch(getUser());
  const [useData, setUserData] = useState('');
  const [liked, setLiked] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {posts} = useSelector(state => state.fromReducer);
  // console.log('user in drawer screen', posts);

  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getPosts());
  useEffect(() => {
    setRefreshing(true);
    fetchPosts();
    getCurrentUser();
    setRefreshing(false);
  }, [refreshing]);

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
          <TouchableOpacity>
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
          // borderRadius: 20,
        }}>
        <Image
          source={{uri: url}}
          style={{
            height: 400,
            width: 400,
            resizeMode: 'contain',
          }}
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
            {/* {like.map(cur => {
              if (cur.postId == postId) {
                console.log(cur.postId, cur.like);
                setLiked(cur.like);
              }
            })} */}
            <Icon
              name={counter ? 'heart' : 'heart-outline'}
              color={counter ? 'red' : 'white'}
              size={30}
              // onPress={() => }
              onPress={() => {
                {
                  // console.log(e.timeStamp);
                  likebyuser(postId, like, uid);
                }
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="comment-outline" color={'white'} size={30} />
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Icon name="delete-outline" color={'white'} size={30} />
          </TouchableOpacity> */}
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
      uid={item.uid}
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

  const likebyuser = postId => {
    // setLiked(isLiked => !isLiked);
    const update = {
      like: counter == 1 ? true : true,
      postId: postId,
      userId: user.uid,
    };
    if (counter == 1) {
      dispatch(decrement());
      firestore()
        .collection('Upload')
        .doc(postId)
        .update({like: firestore.FieldValue.arrayUnion(update)});
      console.log('disliked', postId);
    }
    if (counter == 0) {
      dispatch(increment());
      firestore()
        .collection('Upload')
        .doc(postId)
        .update({like: firestore.FieldValue.arrayRemove(update)});
      console.log('liked', postId);
    }
    // if (liked) {
    //   firestore()
    //     .collection('Upload')
    //     .doc(postId)
    //     .update({like: firestore.FieldValue.arrayRemove(update)});
    //   console.log('disliked', postId);
    // } else {
    //   firestore()
    //     .collection('Upload')
    //     .doc(postId)
    //     .update({like: firestore.FieldValue.arrayUnion(update)});
    //   console.log('liked', postId);
    // }
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
