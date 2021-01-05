import axios from 'axios';
import { GET_ERRORS, GET_USERS, GET_CURRENT_USER, FIND_USERS } from './types';

export const getUsers = (user) => (dispatch) => {
  axios
    .get(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/users/find?visibility=visible`,
      user
    )
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};

export const findUsers = (query, history) => (dispatch) => {
  axios
    .get(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/users/find?search=${query}`
    )
    .then((res) => {
      dispatch({
        type: FIND_USERS,
        payload: res.data,
      });
      history.push('/search');
    })
    .catch((err) => {
      if (err.response.status === 400) {
        dispatch({
          type: FIND_USERS,
          payload: [],
        });
        history.push('/search');
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};

export const getCurrentUser = (user) => (dispatch) => {
  axios
    .get(`${process.env.SERVER_URL || 'http://localhost:9090'}/users/me`, user)
    .then((res) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};

export const patchUser = (user, history) => (dispatch) => {
  axios
    .patch(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/users/update`,
      user
    )
    .then((res) => {
      history.push('/userupdated');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};

export const patchPassword = (data, history) => (dispatch) => {
  axios
    .patch(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/users/changepass`,
      data
    )
    .then((res) => {
      history.push('/userupdated');
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};

export const patchProfileImage = (image, history) => (dispatch) => {
  console.log('patchProfileImage image', image);
  axios
    .post(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/users/profileimage`,
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};
