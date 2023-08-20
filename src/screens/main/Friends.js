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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getFriend,
  userFromFriends,
  addFriends,
} from '../../redux/action/firebaseActions';
import {clockRunning} from 'react-native-reanimated';
import {firebase} from '@react-native-firebase/auth';
import {COLOR, height, width} from '../components/Colors';
import {AlphabetList} from 'react-native-section-alphabet-list';
import Modal from 'react-native-modal';
const Friends = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {allUsersOnApp} = useSelector(state => state.fromReducer);
  const {usersForModal} = useSelector(state => state.fromReducer);
  const [searchText, setSearchText] = useState('');
  console.log('Users for Modal in friends', usersForModal);

  const dispatch = useDispatch();
  const fetchFriends = () => dispatch(getFriend());

  const toggleModal = props => {
    props?.username && props?.email ? dispatch(userFromFriends(props)) : null;

    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    setRefreshing(true);
    fetchFriends();
    setRefreshing(false);
  }, []);
  function handleChat(params) {
    const usersForChat = {
      key: params.username,
      value: params,
    };
    navigation.navigate('Chat', usersForChat);
  }
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
        onPress={() => toggleModal({username, email, uid, url})}>
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
      <View>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              height: height * 0.5,
              backgroundColor: 'black',
              borderRadius: 10,
              borderColor: COLOR.BUTTON,
              borderWidth: 1,
              // borderStyle: 'dotted',
            }}>
            <View style={{padding: 20}}>
              <TouchableOpacity onPress={toggleModal}>
                <Icon
                  name="close"
                  color={'white'}
                  size={40}
                  style={{alignSelf: 'flex-end'}}
                />
              </TouchableOpacity>
              <Image
                source={{uri: usersForModal.url}}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 100 / 2,
                  alignSelf: 'center',
                }}
              />
              <Text style={{color: 'white', alignSelf: 'center'}}>
                {usersForModal.username}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${email}`)}>
                <Text style={{color: 'white', alignSelf: 'center'}}>
                  {usersForModal.email}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleModal(), handleChat(usersForModal);
                }}>
                <Icon
                  style={{color: 'white', alignSelf: 'center'}}
                  name="chat-outline"
                  size={50}
                  color={'white'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleModal(),
                    addFriends({
                      displayName: usersForModal.username,
                      email: usersForModal.email,
                      uid: usersForModal.uid,
                      photoUrl: usersForModal.url,
                    });
                }}>
                <Icon
                  style={{color: 'white', alignSelf: 'center'}}
                  name="chat-outline"
                  size={50}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
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
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: width * 1,
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
            <Button title="Search" />
          </View>
        </View>
        <FlatList
          data={allUsersOnApp.filter(item =>
            item.displayName.toLowerCase().includes(searchText),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          // refreshControl={
          //   <RefreshControl
          //     title="Referesing Users"
          //     tintColor={COLOR.BUTTON}
          //     titleColor="#fff"
          //     refreshing={refreshing}
          //     onRefresh={getFriend}
          //   />
          // }
        />
      </View>
    </SafeAreaView>
  );
};

export default Friends;

const styles = StyleSheet.create({});
