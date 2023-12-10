import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import showAlert from '../../common/showAlert';
import moment from 'moment';
import {COLOR} from '../components/Colors';
const PostViews = ({post, handleLike, handleComment}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.fromReducer);
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    const likedByUser = post.like.some(like => like.userId === user.uid);
    setLike(likedByUser);
  }, []);

  const handleToggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handlePostComment = postId => {
    if (comment.length > 0) {
      const newComment = {userId: user.uid, comment: comment, postId: postId};
      const updatedComments = [...post.comment, newComment];
      console.log(
        '🚀 ~ file: HomePosts.js:35 ~ handlePostComment ~ updatedComments:',
        updatedComments,
      );

      setShowCommentBox(false);
      setComment('');
      // setLike(likedByUser); // Update like state if needed
      handleComment(newComment);
    } else {
      showAlert('Comment Cannot be empty', 'info');
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{uri: post.userPhoto}} style={styles.profilePhoto} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{post.name}</Text>
          <Text style={styles.createdAt}>
            {moment(post.createdAt).fromNow()}
          </Text>
        </View>
      </View>

      {/* Photo Section */}
      <Image source={{uri: post.photoUrl}} style={styles.postPhoto} />

      {/* Caption Section */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* Like and Comment Section */}
      <View style={styles.likeCommentSection}>
        <TouchableOpacity
          onPress={() => handleLike(post.id)}
          style={styles.commentButton}>
          <Icon
            name={like ? 'heart' : 'heart-outline'}
            size={30}
            color={like ? 'red' : COLOR.PRIMARY}></Icon>
          <Text
            style={{
              color: '#828282',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {post.like.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleToggleCommentBox()}
          style={styles.commentButton}>
          <Text
            style={{
              color: '#828282',
              fontSize: 14,
              textAlign: 'center',
            }}>
            {post?.comment?.length}
          </Text>
          <Icon name="comment-outline" size={30} color={COLOR.PRIMARY} />
        </TouchableOpacity>
      </View>
      {showCommentBox && (
        <View>
          <View style={styles.commentBox}>
            <TextInput
              placeholder="Add a comment..."
              style={styles.commentInput}
              value={comment}
              onChangeText={text => setComment(text)}
            />
            <TouchableOpacity onPress={() => handlePostComment(post.id)}>
              <Text style={styles.postCommentButton}>Post</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.commentsContainer}>
            {post.comment.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text>{comment.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentButton: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 30,
    width: 60,
  },
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
  profileDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontColor: '#242424',
  },
  createdAt: {
    fontSize: 14,
    color: '#999',
  },
  postPhoto: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
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
  commentBox: {
    padding: 10,
    backgroundColor: '#F1F1FE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  postCommentButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default PostViews;
