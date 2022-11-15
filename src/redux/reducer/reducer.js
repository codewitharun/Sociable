import {
  GET_POSTS,
  GET_USER,
  LOGOUT_USER,
  CURRENT_USER,
  POST_USER,
  GET_CURRENT_UPOSTS,
} from '../type/type';

const initialState = {
  posts: [],
  currentUserPosts: [],
  user: [],
  logout: [],
  currentUser: [],
  postUser: [],
  post: [653],
};
function fromReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {...state, posts: action.payload};
    case GET_USER:
      return {...state, user: action.payload};
    case LOGOUT_USER:
      return {...state, logout: action.payload};
    case CURRENT_USER:
      return {...state, currentUser: action.payload};
    case LOGOUT_USER:
      return {...state, logout: action.payload};
    case POST_USER:
      return {...state, postUser: action.payload};
    case GET_CURRENT_UPOSTS:
      return {...state, currentUserPosts: action.payload};
    default:
      return state;
  }
}

export default fromReducer;
