import { produce } from 'immer';
import { SET_AUTH_TOKEN} from '../actions/userActions';

const INITIAL_STATE = {
  authToken: '',
};

const userReducer = produce((state, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      state.authToken = action.payload;
      break;
  }
}, INITIAL_STATE);

export default userReducer;
