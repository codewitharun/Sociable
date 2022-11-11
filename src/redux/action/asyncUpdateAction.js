import {POST_USER} from '../type/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getASync(value) {
  //   console.log('allKey', value);
  const allKey = await AsyncStorage.setItem('named', value);

  try {
    return async dispatch => {
      const getKey = await AsyncStorage.getItem('named');
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
}
