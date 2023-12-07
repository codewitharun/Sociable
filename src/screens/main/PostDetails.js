import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getPostDetails} from '../../redux/action/firebaseActions';
import {useSelector, useDispatch} from 'react-redux';

const PostView = props => {
  const {id} = props.route.params;

  const handleComment = () => {
    // Handle comment action
  };
  const handleLike = () => {};
  const post = useSelector(state => state.fromReducer.postDetails);

  console.log('🚀 ~ file: PostDetails.js:26 ~ post ~ post:', post);

  return (
    // <></>
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{uri: post.userPhoto}} style={styles.profilePhoto} />
        <Text style={styles.profileName}>{post.name}</Text>
      </View>

      {/* Photo Section */}
      <Image source={{uri: post.photoUrl}} style={styles.postPhoto} />

      {/* Caption Section */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* Like and Comment Section */}
      <View style={styles.likeCommentSection}>
        <TouchableOpacity onPress={handleLike}>
          <Icon name="heart" size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleComment}>
          <Icon name="comment" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontColor: 'black',
  },
  postPhoto: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  caption: {
    padding: 10,
    fontSize: 16,
  },
  likeCommentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});

export default PostView;
