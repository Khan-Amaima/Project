import { produce } from 'immer';
import { SET_CURRENT_UUID} from '../actions/userActions';

const INITIAL_STATE = {
  uuid: '',
};

const userReducer = produce((state, action) => {
  switch (action.type) {
    case SET_CURRENT_UUID:
      state.uuid = action.payload;
      break;
  }
}, INITIAL_STATE);

export default userReducer;
