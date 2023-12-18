export const SET_CURRENT_UUID = 'SET_CURRENT_UUID';

export function setCurrentUser(uuid = '') {
    return {
      type: SET_CURRENT_UUID,
      payload: uuid,
    };
  }
  