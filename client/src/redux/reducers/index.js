import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userRed : userReducer,
});

export default rootReducer;
