import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import fromReducer from './reducer/reducer';

const rootReducer = combineReducers({
  fromReducer,
});

// Using createStore from the redux library, not @reduxjs/toolkit
export const store = createStore(rootReducer, applyMiddleware(thunk));
