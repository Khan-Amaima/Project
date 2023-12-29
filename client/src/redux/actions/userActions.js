export const SET_AUTH_TOKEN = "SET_AUTH_TOKEN";
export const SET_USER_DETAIL = "SET_USER_DETAIL";

export function setCurrentUserAuthToken(authToken = "") {
  return {
    type: SET_AUTH_TOKEN,
    payload: authToken,
  };
}

export function setCurrentUserDetail(userData = {}) {
  return {
    type: SET_USER_DETAIL,
    payload: userData,
  };
}
