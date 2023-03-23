import {
  GET_LIKES,
  GET_USER,
  LOGOUT_USER,
  INCREMENT,
  COMMENT,
} from '../type/type';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';

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
            documentSnapshot.data().like.length,
          );

          temp = documentSnapshot.data().like;

          if (temp) {
            dispatch({
              type: GET_LIKES,
              payload: temp,
            });
            console.log('Likes data from redux', temp);
          } else {
            console.log('Unable to fetch likes');
          }
        });
    };
  } catch (error) {
    console.log('Error while fetching likes', error);
  }
};

const arr = [];
export const increment = like => {
  const update = {
    like: like,
    userId: auth().currentUser.uid,
    postId: like,
  };
  // console.log(like);
  if (arr.includes(like)) {
    try {
      return async dispatch => {
        arr.pop(like);

        dispatch({
          type: INCREMENT,
          payload: arr,
        });
        // console.log('dghjkfsdjkf', arr);
        firestore()
          .collection('Upload')
          .doc(like)
          .update({like: firestore.FieldValue.arrayRemove(update)});
      };
    } catch (error) {
      console.log('Error while dislike', error);
    }
  } else {
    try {
      return async dispatch => {
        arr.push(like);

        dispatch({
          type: INCREMENT,
          payload: arr,
        });
        firestore()
          .collection('Upload')
          .doc(like)
          .update({like: firestore.FieldValue.arrayUnion(update)});
        // firestore().collection('Upload').doc(like).update({like: arr});
        // console.log('dghjkfsdjkf', arr);
      };
    } catch (error) {
      // Add custom logic to handle errors
      console.log('Error while like', error);
    }
  }
};
export const comments = (postId, dispatch, comments) => {
  const update = {
    comment: comments,
    userId: auth().currentUser.uid,
    postId: postId,
  };
  // console.log(like);
  if (arr.includes(comments)) {
    try {
      arr.pop(comments);

      dispatch({
        type: COMMENT,
        payload: arr,
      });
      // console.log('dghjkfsdjkf', arr);
      Alert.alert('tried to set comment in ==>', postId);
      // firestore()
      //   .collection('Upload')
      //   .doc(postId)
      //   .update({comment: firestore.FieldValue.arrayRemove(update)});
    } catch (error) {
      // Add custom logic to handle errors
      console.log('Error while dislike', error);
    }
  } else {
    try {
      arr.push(comments);

      dispatch({
        type: COMMENT,
        payload: arr,
      });
      Alert.alert('tried to set comment in ==>', postId);
      // firestore()
      //   .collection('Upload')
      //   .doc(postId)
      //   .update({comment: firestore.FieldValue.arrayUnion(update)});
      // firestore().collection('Upload').doc(like).update({like: arr});
      // console.log('dghjkfsdjkf', arr);
    } catch (error) {
      // Add custom logic to handle errors
      console.log('Error while like', error);
    }
  }
};
