import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {GET_USER, GET_POSTS, LOGOUT_USER} from '../type/type';
export const getPosts = () => {
  try {
    return async dispatch => {
      firestore()
        .collection('Upload')
        .get()
        .then(querySnapshot => {
          let temp = [];
          console.log('Total users: ', querySnapshot.size);
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
      firestore()
        .collection('Users')
        .get()
        .then(querySnapshot => {
          let temp = [];
          console.log('Total users: ', querySnapshot.size);
          querySnapshot.forEach(documentSnapshot => {
            let userDetails = {};

            userDetails = documentSnapshot.data();

            userDetails['id'] = documentSnapshot.id;
            temp.push(userDetails);

            if (temp) {
              dispatch({
                type: GET_USER,
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
              return async dispatch => {
                dispatch({
                  type: CURRENT_USER,
                  payload: user,
                });
                setRefrence(storage().ref(user.uid));
                console.log('createddddd', reference);
                firestore()
                  .collection('Users')
                  .doc(user.uid)
                  .get()
                  .then(documentSnapshot => {
                    let userDetails = {};
                    userDetails = documentSnapshot.data();
                    console.log(
                      'user details from Login screen: ' +
                        JSON.stringify(userDetails),
                    );
                    AsyncStorage.setItem(
                      'LoggedUser',
                      JSON.stringify(userDetails),
                    );
                  });
              };
            } catch (error) {
              console.log('storage bucket not created', error);
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

export const userSignout = onsucess => {
  try {
    auth().signOut();
    AsyncStorage.clear();
    onsucess();
  } catch (err) {
    console.log('error while logging out', err);
  }
};
