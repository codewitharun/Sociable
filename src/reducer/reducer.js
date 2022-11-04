import {GET_MOVIES, GET_USER, LOGOUT_USER} from './type';

const initialState = {
  movies: [],
  favorites: [],
  users: [],
  logout: [],
};
function fromReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {...state, movies: action.payload};
    case GET_USER:
      return {...state, users: action.payload};
    case LOGOUT_USER:
      return {...state, logout: action.payload};
    default:
      return state;
  }
}

export default fromReducer;
