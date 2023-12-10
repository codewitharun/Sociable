import {
  GET_POSTS,
  GET_USER,
  LOGOUT_USER,
  CURRENT_USER,
  POST_USER,
  GET_CURRENT_POSTS,
  GET_FRIENDS,
  LIKE,
  GET_LIKES,
  SET_MODAL,
  GET_ADDED_FRIENDS,
  GET_POST_DETAILS,
} from '../type/type';

const initialState = {
  posts: [],
  currentUserPosts: [],
  user: [],
  logout: [],
  currentUser: [],
  postUser: [],
  post: [653],
  allUsersOnApp: [],
  likeButton: [],
  likesOnpost: [],
  usersForModal: [],
  friendsAdded: [],
  postDetails: [],
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
    case GET_CURRENT_POSTS:
      return {...state, currentUserPosts: action.payload};
    case GET_FRIENDS:
      return {...state, allUsersOnApp: action.payload};
    case GET_ADDED_FRIENDS:
      return {...state, friendsAdded: action.payload};
    case LIKE:
      return {
        ...state,
        likeButton: action.payload,
      };
    case GET_LIKES:
      return {
        ...state,
        likesOnpost: action.payload,
      };
    case SET_MODAL:
      return {...state, usersForModal: action.payload};
    case GET_POST_DETAILS:
      return {...state, postDetails: action.payload};
    default:
      return state;
  }
}

export default fromReducer;
