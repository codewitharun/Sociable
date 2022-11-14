import {POST_USER} from '../type/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getASync = () => {
  //   console.log('allKey', value);

  try {
    return async dispatch => {
      const getKey = await AsyncStorage.getItem('LoggedUser');
      if (getKey) {
        dispatch({
          type: POST_USER,
          payload: getKey,
        });
        console.log('value in async storage', getKey);
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};
