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
} from '../type/type';

export const getPosts = () => {
  try {
    return async dispatch => {
      firestore()
        .collection('Upload')
        // .where('uid', '==', '9PuCW7G1nUQUPfdD62yGnvXL2303')
        .orderBy('createdAt', 'desc')
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
                type: GET_POSTS,
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
export const getUser = () => {
  try {
    return async dispatch => {
      try {
        const userdata = await AsyncStorage.getItem('LoggedUser');

        if (userdata !== null) {
          // We have data!!
          const usernow = JSON.parse(userdata);
          // console.log(
          //   'value from asyncstoragee  redux before parsed',
          //   userdata,
          // );
          // console.log(
          //   'value from asyncstoragee redux after parseed ',
          //   usernow.uid,
          // );

          dispatch({
            type: GET_USER,
            payload: usernow,
          });
        }
      } catch (error) {
        console.log('no data in async storage', error);
      }
    };
  } catch (error) {
    console.log(
      'Error while getting user data from firestore refer to redux action',
    );
  }
};

export const loginUser = (user, onsucess) => {
  console.log(user);
  try {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)

      .then(() => {
        console.log('signed in!');
      })
      .then(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            try {
              // return async dispatch => {
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

                  // dispatch({
                  //   type: CURRENT_USER,
                  //   payload: userDetails,
                  // });
                });
              // };
            } catch (error) {
              console.log('error while loggin', error);
            }
          }
        });
      })
      .then(() => {
        onsucess();
      })

      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
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
