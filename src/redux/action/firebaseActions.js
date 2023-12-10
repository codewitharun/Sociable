import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

import {
  GET_USER,
  GET_POSTS,
  LOGOUT_USER,
  GET_CURRENT_POSTS,
  GET_FRIENDS,
  SET_MODAL,
  GET_ADDED_FRIENDS,
  GET_POST_DETAILS,
} from '../type/type';
import {Alert} from 'react-native';
import showAlert from '../../common/showAlert';

// export const getPosts = () => {
//   try {
//     return async dispatch => {
//       firestore()
//         .collection('Upload')
//         // .where('uid', '==', '9PuCW7G1nUQUPfdD62yGnvXL2303')
//         .orderBy('createdAt', 'desc')
//         // .doc('Posts')
//         .get()
//         .then(querySnapshot => {
//           let temp = [];
//           console.log('Total Post: ', querySnapshot.size);
//           querySnapshot.forEach(documentSnapshot => {
//             let userDetails = {};

//             userDetails = documentSnapshot.data();

//             userDetails['id'] = documentSnapshot.id;
//             temp.push(userDetails);

//             if (temp) {
//               dispatch({
//                 type: GET_POSTS,
//                 payload: temp,
//               });
//               // console.log('Post data from redux', temp);
//             } else {
//               console.log('Unable to fetch');
//             }
//           });
//         });
//     };
//   } catch (error) {
//     console.log(
//       'Error while getting POST data from firestore refer to redux action',
//       error,
//     );
//   }
// };
export const getUser = () => {
  try {
    return async dispatch => {
      const userdata = await AsyncStorage.getItem('LoggedUser');

      if (userdata !== null) {
        // We have data!!
        const usernow = JSON.parse(userdata);

        dispatch({
          type: GET_USER,
          payload: usernow,
        });
      }
    };
  } catch (error) {
    console.log(
      'Error while getting user data from firestore refer to redux action',
    );
  }
};

export const getPosts = () => {
  try {
    return async (dispatch, getState) => {
      const userId = auth().currentUser.uid;
      // console.log('hggjhgjhghgh', getState);
      // Retrieve the user's friend list from the database
      const friendList = await firestore()
        .collection('Users')
        .doc(userId)
        .collection('Friends')
        .get()
        .then(querySnapshot => {
          let temp = [];
          querySnapshot.forEach(documentSnapshot => {
            temp.push(documentSnapshot.id);
          });
          return temp;
        })
        .catch(error => {
          console.log('Error while getting friend list from firestore', error);
        });

      // Retrieve posts from the user's friend list
      const posts = await firestore()
        .collection('Upload')
        .where('uid', 'in', friendList)
        .orderBy('createdAt', 'desc')
        .get()
        .then(querySnapshot => {
          let temp = [];
          querySnapshot.forEach(documentSnapshot => {
            let userDetails = {};

            userDetails = documentSnapshot.data();

            userDetails['id'] = documentSnapshot.id;
            temp.push(userDetails);
          });
          return temp;
        });

      dispatch({
        type: GET_POSTS,
        payload: posts,
      });
    };
  } catch (error) {
    console.log(
      'Error while getting POST data from firestore refer to redux action',
      error,
    );
  }
};

export const loginUser = (user, onsucess) => {
  console.log(user);

  auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      console.log('signed in!');
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
              let userDetails = {};
              userDetails = documentSnapshot.data();
              const userData = JSON.stringify(userDetails);
              getLoggedUser(userData);
              console.log(
                'user details from Login screen: ' +
                  JSON.stringify(userDetails),
              );
              onsucess(userData);
            });
        }
      });
    })
    .catch(error => {
      console.log('throwing error from redux login ', error);
      onsucess('');
    });
};

export async function getLoggedUser(userData) {
  try {
    const getKey = await AsyncStorage.setItem('LoggedUser', userData);
    console.log('my call back function is working correctly', userData);
  } catch (error) {
    // Add custom logic to handle errors
  }
}

export const userSignout = onsucess => {
  try {
    auth().signOut();
    AsyncStorage.clear();
    onsucess();
    console.log('User successfully SignOut');
  } catch (err) {
    console.log('error while logging out', err);
  }
};

export const getCurrentUsersPosts = () => {
  const user = auth().currentUser.uid;
  try {
    return async dispatch => {
      firestore()
        .collection('Upload')
        .where('uid', '==', user)
        // .orderBy('createdAt', 'desc')
        // .doc('Posts')
        .get()
        .then(querySnapshot => {
          let temp = [];
          console.log('Total Post: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            let userDetails = {};

            userDetails = documentSnapshot.data();

            userDetails['id'] = documentSnapshot.id;
            temp.push(userDetails);

            if (temp) {
              dispatch({
                type: GET_CURRENT_POSTS,
                payload: temp,
              });
              // console.log('Post data from redux', temp);
            } else {
              console.log('Unable to fetch');
            }
          });
        });
    };
  } catch (error) {
    console.log(
      'Error while getting POST data from firestore refer to redux action',
      error,
    );
  }
};
export const getPostDetails = id => {
  console.log('🚀 ~ file: firebaseActions.js:240 ~ getPostDetails ~ id:', id);

  // Assuming you have the GET_CURRENT_POSTS action type defined in './types'

  return async dispatch => {
    try {
      const querySnapshot = await firestore()
        .collection('Upload')
        .doc(id)
        .get();

      if (querySnapshot.exists) {
        const postDetails = querySnapshot.data();
        const temp = {id: querySnapshot.id, ...postDetails};

        dispatch({
          type: GET_POST_DETAILS,
          payload: temp,
        });
        // return temp;
        console.log('Post data from redux', temp);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.log('Error while getting POST data from firestore', error);
    }
  };
};

export const getFriend = () => {
  try {
    return async dispatch => {
      firestore()
        .collection('Users')
        .orderBy('displayName', 'asc')
        .get()
        .then(querySnapshot => {
          let tempp = [];
          console.log('Total Users: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            let userDetails = {};

            userDetails = documentSnapshot.data();

            userDetails['id'] = documentSnapshot.id;
            tempp.push(userDetails);

            if (tempp) {
              dispatch({
                type: GET_FRIENDS,
                payload: tempp,
              });
              // console.log('Post data from redux', tempp);
            } else {
              console.log('Unable to fetch');
            }
          });
        });
    };
  } catch (error) {
    console.log(
      'Error while getting POST data from firestore refer to redux action',
      error,
    );
  }
};

export const addFriends = Friends => {
  const user = auth().currentUser.uid;
  console.log('friend to add ', Friends);
  firestore()
    .collection('Users')
    .doc(user)
    .collection('Friends')
    .doc(Friends.uid)
    .set(Friends)
    .then(res => {
      console.log('Added as Friend Successfully');
      showAlert('Added as Friend', 'Success');
    })
    .catch(err => {
      console.log('error while adding friend', err);
    });
};
export const deletePost = postId => {
  const user = auth().currentUser.uid;
  console.log('post to delete', postId);
  firestore()
    .collection('Upload')
    .doc(postId)
    .delete()
    .then(res => {
      console.log('🚀 ~ file: firebaseActions.js:325 ~ deletePost ~ res:', res);
      showAlert('Post Deleted', 'success');
    })
    .catch(err => {
      console.log('error while deleting post', err);
    });
};

export const getAddedFriend = () => {
  const user = auth().currentUser.uid;
  try {
    return async dispatch => {
      firestore()
        .collection('Users')
        .doc(user)
        .collection('Friends')
        .orderBy('displayName', 'asc')
        .get()
        .then(querySnapshot => {
          let tempp = [];
          console.log('Total Friends: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            let userDetails = {};

            userDetails = documentSnapshot.data();

            userDetails['id'] = documentSnapshot.id;
            tempp.push(userDetails);

            if (tempp) {
              dispatch({
                type: GET_ADDED_FRIENDS,
                payload: tempp,
              });
              // console.log('Post data from redux', tempp);
            } else {
              console.log('Unable to fetch');
            }
          });
        });
    };
  } catch (error) {
    console.log(
      'Error while getting POST data from firestore refer to redux action',
      error,
    );
  }
};

export const userFromFriends = props => {
  // console.log('from redux for modal', props);
  try {
    return async dispatch => {
      if (props.username) {
        dispatch({
          type: SET_MODAL,
          payload: props,
        });
        // console.log('Post data from redux', tempp);
      } else {
        console.log('No data from friends');
      }
    };
  } catch (error) {
    console.log(
      'Error while getting POST data from firestore refer to redux action',
      error,
    );
  }
};
