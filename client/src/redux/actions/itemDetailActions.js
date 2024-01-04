export const SET_ITEM_DETAIL = "SET_ITEM_DETAIL";

export function setItemDetail(itemDetail = {}) {
  return {
    type: SET_ITEM_DETAIL,
    payload: itemDetail,
  };
}

