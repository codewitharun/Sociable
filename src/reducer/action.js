import {GET_MOVIES, GET_USER, LOGOUT_USER} from './type';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
export const getMovies = () => {
  try {
    return async dispatch => {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/photos?_limit=10',
      );
      if (res.data) {
        dispatch({
          type: GET_MOVIES,
          payload: res.data,
        });
        console.log(res.data);
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};

export const getUser = () => {
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

export const userSignout = navigation => {
  try {
    // dispatch({type: LOGOUT_USER, payload: res.data});
    auth().signOut();
    AsyncStorage.clear();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  } catch (err) {
    console.log('error while logging out', err);
  }
  // auth()
  //   .signOut()
  //   .then(() => {
  //     AsyncStorage.clear();
  //   })
  //   .then(() =>
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: 'Login'}],
  //     }),
  //   );
};
