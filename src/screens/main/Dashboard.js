import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height, width} from '../components/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import asyncStorage from '@react-native-async-storage/async-storage';

import {getPosts, getUser} from '../../redux/action/firebaseActions';

const Dashboard = ({navigation}) => {
  const [DATA, setDATA] = useState([]);
  {
    DATA && console.log('dasdsajfkhfjkhfkj', DATA);
  }

  const [useData, setUserData] = useState('');
  const [liked, setLiked] = useState(false);

  const {posts} = useSelector(state => state.fromReducer);
  const dispatch = useDispatch();
  const fetchPosts = () => dispatch(getPosts());
  useEffect(() => {
    fetchPosts();
  }, []);
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
          <TouchableOpacity>
            <Icon name="dots-vertical" size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: height * 0.5,
          alignSelf: 'center',
          width: width * 0.9,
          // backgroundColor: 'green',
          borderRadius: 20,
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
          <TouchableOpacity>
            <Icon name="share-outline" color={'white'} size={30} />
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
      url={item.url}
      thumbnailUrl={item.thumbnailUrl}
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

    // firestore()
    //   .collection('Upload')
    //   .get()
    //   .then(querySnapshot => {
    //     /*
    //             A QuerySnapshot allows you to inspect the collection,
    //             such as how many documents exist within it,
    //             access to the documents within the collection,
    //             any changes since the last query and more.
    //         */
    //     let temp = [];
    //     console.log('Total users: ', querySnapshot.size);
    //     querySnapshot.forEach(documentSnapshot => {
    //       // console.log('user Id: ', documentSnapshot.id);
    //       /*
    //             A DocumentSnapshot belongs to a specific document,
    //             With snapshot you can view a documents data,
    //             metadata and whether a document actually exists.
    //           */
    //       let userDetails = {};
    //       // Document fields
    //       userDetails = documentSnapshot.data();
    //       // All the document related data
    //       userDetails['id'] = documentSnapshot.id;
    //       temp.push(userDetails);
    //       setDATA(temp);
    //     });
    // });
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
