import { produce } from "immer";
import { SET_AUTH_TOKEN, SET_USER_DETAIL } from "../actions/userActions";

const INITIAL_STATE = {
  authToken: "",
  userDetail: {},
};

const userReducer = produce((state, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      state.authToken = action.payload;
      break;
    case SET_USER_DETAIL:
      state.userDetail = action.payload;
      break;
  }
}, INITIAL_STATE);

export default userReducer;
