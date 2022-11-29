import {
  GET_MOVIES,
  GET_USER,
  LOGOUT_USER,
  INCREMENT,
  DECREMENT,
} from '../type/type';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/auth';
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

export const increment = (like, dispatch) => {
  // console.log(like);
  if (like) {
    try {
      const arr = [];
      arr.push(like);

      dispatch({
        type: INCREMENT,
        payload: like,
      });
      console.log('dghjkfsdjkf', arr);
    } catch (error) {
      // Add custom logic to handle errors
    }
  }
};

export const decrement = dislike => ({
  type: DECREMENT,
  payload: dislike,
});
