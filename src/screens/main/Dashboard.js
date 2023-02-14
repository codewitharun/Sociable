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
import {getPosts, getUser, sendLikes} from '../../redux/action/firebaseActions';
import {clockRunning} from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/auth';
import DoubleClick from 'react-native-double-tap';
import {
  comments,
  decrement,
  getLikes,
  increment,
} from '../../redux/action/action';
const Dashboard = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  const {likeButton} = useSelector(state => state.fromReducer);
  const {likesOnpost} = useSelector(state => state.fromReducer);
  // const myArray = likeButton.split(',');
  // console.log(likesOnpost);

  const [comment, setComments] = useState('testing comments');
  const getlike = () => dispatch(getLikes());
  const getCurrentUser = () => dispatch(getUser());
  const [useData, setUserData] = useState('');
  const [commentsScreen, setCommentScreeen] = useState(false);
  const [isLiked, updateLike] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const {posts} = useSelector(state => state.fromReducer);
  // console.log('user in drawer screen', posts);

  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getPosts());
  useEffect(() => {
    setRefreshing(true);
    fetchPosts();
    getCurrentUser();
    getlike();
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
        <DoubleClick
          // singleTap={() => {
          //   console.log('single tap');
          // }}
          doubleTap={() => {
            increment(postId, dispatch);
          }}
          delay={200}>
          <Image
            source={{uri: url}}
            style={{
              height: height * 0.5,
              width: width * 0.95,
              resizeMode: 'contain',
            }}
          />
          {/* <Text style={{color: 'white'}}>{title}</Text> */}
        </DoubleClick>
      </View>
      <View
        style={{
          height: height * 0.035,
          // backgroundColor: 'red',
          width: width * 0.4,
        }}>
        {posts.map(element => {
          // console.log(element);
        })}
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity>
            <Icon
              name={likeButton.includes(postId) ? 'heart' : 'heart-outline'}
              color={likeButton.includes(postId) ? 'red' : 'white'}
              size={30}
              onPress={() => {
                increment(postId, dispatch);
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon
              name="comment-outline"
              color={'white'}
              size={30}
              onPress={() => {
                comments(postId, dispatch, comment);
                // setCommentScreeen(true);
              }}
            />
          </TouchableOpacity>
          {commentsScreen == true ? (
            <View style={{height: 300, backgroundColor: 'red'}}>
              <Text style={{color: 'white'}}>HELLO {postId}</Text>
            </View>
          ) : null}
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
  const like = [];

  const renderItem = ({item}) => (
    <Item
      title={item.caption}
      url={item.photoUrl}
      thumbnailUrl={item.userPhoto}
      username={item.name}
      email={item.email}
      postId={item.id}
      // like={item.like}
      uid={item.uid}
      like={like}
    />
  );

  const retrieveData = async () => {
    try {
      const userdata = await asyncStorage.getItem('LoggedUser');

      if (userdata !== null) {
        // We have data!!
        // console.log('value from asyncstoragee parseed', userdata);
        setUserData(JSON.parse(userdata));
      }
    } catch (error) {
      console.log('no data in async storage', error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);

  const likebyuser = (postId, uid, post) => {
    dispatch(INCREMENT);
  };
  const dislikebyuser = postId => {};
  // };
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat');
                }}>
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
