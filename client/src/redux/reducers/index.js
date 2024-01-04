import { combineReducers } from 'redux';
import userReducer from './userReducer';
import itemDetailReducer from './itemDetailReducer';

const rootReducer = combineReducers({
  userRed : userReducer,
  itemDetailRed : itemDetailReducer,
});

export default rootReducer;
