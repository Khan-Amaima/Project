import { produce } from "immer";
import { SET_ITEM_DETAIL } from "../actions/itemDetailActions";

const INITIAL_STATE = {
  itemDetail: {},
};

const itemDetailReducer = produce((state, action) => {
  switch (action.type) {
    case SET_ITEM_DETAIL:
      state.itemDetail = action.payload;
      break;
  }
}, INITIAL_STATE);

export default itemDetailReducer;
