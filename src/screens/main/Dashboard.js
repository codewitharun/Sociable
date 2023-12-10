/* eslint-disable react-native/no-inline-styles */
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
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLOR, height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import {getPosts, getUser, sendLikes} from '../../redux/action/firebaseActions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import DoubleClick from 'react-native-double-tap';
import {
  comments,
  decrement,
  updateLike,
  updateComments,
} from '../../redux/action/action';
import PostViews from './HomePosts';
import Header from '../../common/header';
import ProfileHeader from '../../common/profileheader';
import CommonImage from '../components/CommonImage';
const Dashboard = ({navigation}) => {
  const {user} = useSelector(state => state.fromReducer);
  const {likeButton} = useSelector(state => {
    return state.fromReducer;
  });
  const {likesOnpost} = useSelector(state => state.fromReducer);
  const [comment, setComments] = useState('testing comments');

  const getCurrentUser = () => dispatch(getUser());
  const [refreshing, setRefreshing] = useState(false);
  const {posts} = useSelector(state => state.fromReducer);
  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getPosts());
  useEffect(() => {
    setRefreshing(true);
    fetchPosts();
    getCurrentUser();

    setRefreshing(false);
  }, [refreshing]);

  const handleComment = updatedPost => {
    dispatch(updateComments(updatedPost));
  };
  const handleLike = postId => {
    dispatch(updateLike(postId));
  };

  return (
    <SafeAreaView>
      {/* <ProfileHeader name={'Upload'}></ProfileHeader> */}
      <ImageBackground
        source={CommonImage.BackGroundImage}
        resizeMode="cover"
        style={{
          height: height * 1,

          width: width * 1,

          position: 'relative',
        }}>
        <View>
          <View
            style={{
              height: '9%',
              width: '100%',
              // backgroundColor: 'red',
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.10)',
                width: width * 0.4,
                height: 60,
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
              }}>
              <Text
                style={{
                  fontFamily:
                    Platform.OS == 'android'
                      ? 'Logo-Regular'
                      : 'FONTSPRINGDEMO-BlueVinylRegular',
                  fontSize: 35,
                  // textAlign: 'center',
                  lineHeight: 40,
                  color: COLOR.WTEXT,
                  textAlign: 'center',
                }}>
                Sociable
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity>
                  <Icon name="ladder" size={30} color="white" />
                </TouchableOpacity>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PreviousChat');
                  }}>
                  <Icon name="send" size={30} color={COLOR.Link} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            scrollEnabled
            behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <View
              style={{
                width: width * 0.95,
                height: height * 0.79,
                alignSelf: 'center',
              }}>
              <FlatList
                data={posts}
                keyboardShouldPersistTaps="handled"
                renderItem={({item}) => (
                  <PostViews
                    post={item}
                    handleLike={handleLike}
                    handleComment={handleComment}
                  />
                )}
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
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
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
