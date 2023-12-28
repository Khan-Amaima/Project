export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export function setCurrentUserAuthToken(authToken = '') {
    return {
      type: SET_AUTH_TOKEN,
      payload: authToken,
    };
  }
  