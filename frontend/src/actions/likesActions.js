import axios from 'axios';
import { ADD_LIKE, REMOVE_LIKE, GET_LIKES, GET_USER_FAVOURITES } from './types';

import { handleError } from '../utils/errorUtils';

export const addLike = (id) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/posts/like?id=${id}`
    )
    .then((res) => {
      dispatch({
        type: ADD_LIKE,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const removeLike = (id) => (dispatch) => {
  axios
    .delete(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/posts/unlike?id=${id}`
    )
    .then((res) => {
      dispatch({
        type: REMOVE_LIKE,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const getLikes = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/posts/likes`)
    .then((res) => {
      dispatch({
        type: GET_LIKES,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const getUserFavourites = () => (dispatch) => {
  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/posts/likedbyuser`
    )
    .then((res) => {
      dispatch({
        type: GET_USER_FAVOURITES,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};
