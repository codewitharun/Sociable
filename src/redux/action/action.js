import {GET_LIKES, GET_USER, LOGOUT_USER, LIKE, COMMENT} from '../type/type';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';
import showAlert from '../../common/showAlert';

// export const getLikes = () => {
//   try {
//     return async dispatch => {
//       firestore()
//         .collection('Upload')
//         .get()
//         .then(querySnapshot => {
//           let temp = [];
//           console.log('Total Post: ', querySnapshot.size);
//           querySnapshot.forEach(documentSnapshot => {
//             let userDetails = {};

//             userDetails = documentSnapshot.data();

//             userDetails['id'] = documentSnapshot.id;
//             temp.push(userDetails.like);
//             // console.log(userDetails.id);

//             if (temp) {
//               dispatch({
//                 type: GET_LIKES,
//                 payload: temp,
//               });
//               console.log('Post data from redux', temp);
//             } else {
//               console.log('Unable to fetch');
//             }
//           });
//         });
//     };
//   } catch (error) {
//     console.log('Error while fetching like', error);
//   }
// };

export const getLikes = postId => {
  try {
    return async dispatch => {
      firestore()
        .collection('Upload')
        .doc(postId) // Filter by post id
        .get()
        .then(documentSnapshot => {
          let temp = [];
          console.log(
            'Total Likes for Post ',
            postId,
            ':',
            documentSnapshot?.data().like.length,
          );

          temp = documentSnapshot?.data().like;

          if (temp) {
            dispatch({
              type: GET_LIKES,
              payload: temp,
            });
            console.log('Likes data from redux', temp);
          } else {
            console.log('Unable to fetch likes');
          }
        })
        .catch(err => {
          console.log('Error while fetching like', err);
        });
    };
  } catch (error) {
    console.log('Error while fetching likes', error);
  }
};

const updatedLike = [];
export const updateLike = like => {
  const fieldName = 'like';
  const update = {
    [fieldName]: true,
    userId: auth().currentUser.uid,
    postId: like,
  };

  const updateFirestore = async (like, operation) => {
    console.log('🚀 ~ file: action.js:100 ~ updateFirestore ~ like:', like);
    try {
      await firestore()
        .collection('Upload')
        .doc(like)
        .update({[fieldName]: firestore.FieldValue[operation](update)});
    } catch (error) {
      console.log(
        `Error while ${operation === 'arrayRemove' ? 'disliking' : 'liking'}`,
        error,
      );
    }
  };

  if (updatedLike.includes(like)) {
    updatedLike.pop(like);
  } else {
    updatedLike.push(like);
  }

  return dispatch => {
    dispatch({
      type: LIKE,
      payload: updatedLike,
    });

    updateFirestore(
      like,
      updatedLike.includes(like) ? 'arrayRemove' : 'arrayUnion',
    );
  };
};
const updatedComment = [];
export const updateComments = commentData => {
  const fieldName = 'comment';
  const update = {
    [fieldName]: commentData.comment,
    userId: auth().currentUser.uid,
    postId: commentData.postId,
  };
  const updateFirestore = async (comment, operation) => {
    try {
      await firestore()
        .collection('Upload')
        .doc(comment)
        .update({[fieldName]: firestore.FieldValue[operation](update)});
      showAlert('Comment Added', 'success');
    } catch (error) {
      console.log(
        `Error while ${operation === 'arrayRemove' ? 'comment' : 'comment'}`,
        error,
      );
    }
  };

  if (updatedComment.includes(commentData.postId)) {
    updatedComment.pop(commentData.postId);
  } else {
    updatedComment.push(commentData.postId);
  }

  return dispatch => {
    dispatch({
      type: COMMENT,
      payload: updatedComment,
    });

    updateFirestore(
      commentData.postId,
      updatedComment.includes(commentData.postId) ? 'arrayUnion' : 'arrayUnion',
    );
  };
};
