import axios from 'axios';
import { GET_ERRORS, GET_USERS, GET_CURRENT_USER, FIND_USERS } from './types';
import { handleError } from '../utils/errorUtils.js';

export const getUsers = (user) => (dispatch) => {
  axios
    .get(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/users/find?visibility=visible`,
      user
    )
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const findUsers = (query, history) => (dispatch) => {
  axios
    .get(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/users/find?search=${query}`
    )
    .then((res) => {
      dispatch({
        type: FIND_USERS,
        payload: res.data,
      });
      history.push('/search');
    })
    .catch((error) => {
      // TODO: refactor to use shared error handling?
      dispatch({
        type: FIND_USERS,
        payload: [],
      });
      dispatch({
        type: GET_ERRORS,
        error: error.response.data,
      });
      history.push('/search');
    });
};

export const getCurrentUser = (user) => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/users/me`, user)
    .then((res) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const patchUser = (user, history) => (dispatch) => {
  axios
    .patch(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/users/update`,
      user
    )
    .then((res) => {
      history.push('/userupdated');
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};

export const patchPassword = (data, history) => (dispatch) => {
  axios
    .patch(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/users/changepass`,
      data
    )
    .then((res) => {
      history.push('/userupdated');
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};

export const patchProfileImage = (image, history) => (dispatch) => {
  console.log('patchProfileImage image', image);
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/users/profileimage`,
      image,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      history.push('/userupdated');
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};
