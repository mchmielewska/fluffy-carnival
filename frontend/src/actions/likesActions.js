import axios from 'axios';
import {
  ADD_LIKE,
  REMOVE_LIKE,
  GET_LIKES,
  GET_ERRORS,
  GET_USER_FAVOURITES,
} from './types';

export const addLike = (id) => (dispatch) => {
  axios
    .post(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/posts/like?id=${id}`
    )
    .then((res) => {
      dispatch({
        type: ADD_LIKE,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        error: error.response.data,
      });
    });
};

export const removeLike = (id) => (dispatch) => {
  axios
    .delete(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/unlike?id=${id}`
    )
    .then((res) => {
      dispatch({
        type: REMOVE_LIKE,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        error: error.response.data,
      });
    });
};

export const getLikes = () => (dispatch) => {
  axios
    .get(`${process.env.SERVER_URL || 'http://localhost:9090'}/posts/likes`)
    .then((res) => {
      dispatch({
        type: GET_LIKES,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error.response.status !== 500) {
        dispatch({
          type: GET_ERRORS,
          error: error.response.data,
        });
      } else {
        localStorage.removeItem('jwtToken');
      }
    });
};

export const getUserFavourites = () => (dispatch) => {
  axios
    .get(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/posts/likedbyuser`
    )
    .then((res) => {
      dispatch({
        type: GET_USER_FAVOURITES,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error.response.status !== 500) {
        dispatch({
          type: GET_ERRORS,
          error: error.response.data,
        });
      } else {
        localStorage.removeItem('jwtToken');
      }
    });
};
