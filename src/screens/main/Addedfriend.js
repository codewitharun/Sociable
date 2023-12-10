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
  TextInput,
  Button,
  Linking,
  ImageBackground,
  Animated,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getFriend,
  userFromFriends,
  addFriends,
  removeFriends,
  removeFriend,
  getAddedFriend,
} from '../../redux/action/firebaseActions';
import {clockRunning} from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/auth';
import {COLOR, height, width} from '../components/Colors';
import {AlphabetList} from 'react-native-section-alphabet-list';
import Modal from 'react-native-modal';
import CommonImage from '../components/CommonImage';
const AddedFriends = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {friendsAdded} = useSelector(state => state.fromReducer);
  const {usersForModal} = useSelector(state => state.fromReducer);
  const [searchText, setSearchText] = useState('');
  // console.log('Users for Modal in friends', usersForModal);

  const dispatch = useDispatch();
  const fetchFriends = () => dispatch(getAddedFriend());

  const toggleModal = props => {
    props?.username && props?.email ? dispatch(userFromFriends(props)) : null;

    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      setRefreshing(true);
      // Call any action
      setTimeout(() => {
        getFriends();
        setRefreshing(false);
      }, 2000);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  // console.log(
  //   '🚀 ~ file: Addedfriend.js:61 ~ AddedFriends ~ navigation:',
  //   navigation,
  // );
  const getFriends = () => {
    setRefreshing(true);
    fetchFriends();
    setRefreshing(false);
  };
  function handleChat(params) {
    const usersForChat = {
      key: params.username,
      value: params,
    };
    navigation.navigate('Chat', usersForChat);
  }

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [height, 0],
        }),
      },
    ],
  };

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
    <View>
      <TouchableOpacity
        onPress={() => toggleModal({username, email, uid, url})}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.95,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            height: height * 0.07,
            width: width * 0.95,
            marginVertical: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.10)',
            borderRadius: 20,
          }}>
          <View style={{width: width * 0.15}}>
            <Image
              source={url ? {uri: url} : CommonImage.dummyProfile}
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
      <View>
        <Modal
          backdropOpacity={0.1} // Adjust the backdrop opacity for the blur effect
          onBackdropPress={() => setModalVisible(false)}
          isVisible={isModalVisible}>
          <Animated.View style={[styles.cardContainer, animatedStyle]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={url ? {uri: usersForModal.url} : CommonImage.dummyProfile}
              style={styles.userPhoto}
            />
            <Text style={styles.userName}>{usersForModal.username}</Text>
            <Text style={styles.userEmail}>{usersForModal.email}</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                toggleModal(),
                  removeFriend({
                    uid: usersForModal.uid,
                  });
              }}>
              <Text style={styles.actionButtonText}>Unfollow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleModal(), handleChat(usersForModal);
              }}
              style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Chat</Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>
      </View>
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
    <SafeAreaView>
      {/* <StatusBar > </StatusBar> */}
      <ImageBackground
        source={CommonImage.BackGroundImage}
        resizeMode="cover"
        style={{
          height: height * 1,

          width: width * 1,
          // backgroundColor: 'black',
          position: 'relative',
        }}>
        <View
          style={{
            height: height * 0.2,
            width: width * 0.95,
            alignSelf: 'center',
            justifyContent: 'space-evenly',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily:
                Platform.OS == 'android'
                  ? 'Logo-Regular'
                  : 'FONTSPRINGDEMO-BlueVinylRegular',
              fontSize: 35,
              lineHeight: 40,
              // textAlign: 'center',
            }}>
            Friends
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: width * 0.95,
              height: height * 0.05,
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <TextInput
              style={{color: 'black', width: width * 0.7}}
              onChangeText={text => setSearchText(text)}
              value={searchText}
              placeholder="Search..."
              placeholderTextColor={'gray'}
            />
            <Button title="Search" color={COLOR.Link} />
          </View>
        </View>
        <FlatList
          data={friendsAdded.filter(item =>
            item.displayName.toLowerCase().includes(searchText),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              title="Refreshing Users"
              tintColor={COLOR.BUTTON}
              titleColor="#fff"
              refreshing={refreshing}
              onRefresh={() => getFriends()}
            />
          }
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddedFriends;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: width - 40,
    alignSelf: 'center',
    position: 'absolute',
    top: height / 2 - 150, // Adjust the top position based on card height
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  userPhoto: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: COLOR.Link,

    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
