import store from '../store';

export const getAllUsers = (data) => {
  store.dispatch({
    type: "GET_ALL_USERS",
    payload: data,
  })
};

export const getUserId = (data) => {
  store.dispatch({
    type: "GET_USER_ID",
    payload: data,
  })
};

export const getUserName = (data) => {
  store.dispatch({
    type: "GET_USER_NAME",
    payload: data,
  })
};

export const getUserEmail = (data) => {
  store.dispatch({
    type: "GET_USER_EMAIL",
    payload: data,
  })
};

export const getUserPhone = (data) => {
  store.dispatch({
    type: "GET_USER_PHONE",
    payload: data,
  })
};

export const getUserDetail = (data) => {
  store.dispatch({
    type: "GET_USER_DETAIL",
    payload: data,
  })
};



