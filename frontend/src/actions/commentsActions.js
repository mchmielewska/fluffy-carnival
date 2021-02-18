import axios from 'axios';
import {
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from './types';

import { handleError } from '../utils/errorUtils';

export const addComment = (id, comment, history) => (dispatch) => {
  axios
    .post(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/posts/addcomment?id=${id}`,
      comment
    )
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/posts/deletecomment?postId=${postId}&id=${commentId}`
    )
    .then((res) => {
      dispatch({
        type: REMOVE_COMMENT,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const likeComment = (postId, commentId) => (dispatch) => {
  axios
    .post(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/posts/likecomment?postId=${postId}&id=${commentId}`
    )
    .then((res) => {
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const unlikeComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/posts/unlikecomment?postId=${postId}&id=${commentId}`
    )
    .then((res) => {
      dispatch({
        type: UNLIKE_COMMENT,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const getComments = (id) => (dispatch) => {
  axios
    .get(
      `${
        process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'
      }/posts/comments?id=${id}`
    )
    .then((res) => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};
