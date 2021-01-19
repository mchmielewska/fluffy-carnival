import axios from 'axios';
import { ADD_COMMENT, REMOVE_COMMENT, GET_COMMENTS, GET_ERRORS } from './types';

export const addComment = (id, comment, history) => (dispatch) => {
  axios
    .post(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
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
      dispatch({
        type: GET_ERRORS,
        error: error.response.data,
      });
    });
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/deletecomment?postId=${postId}&id=${commentId}`
    )
    .then((res) => {
      dispatch({
        type: REMOVE_COMMENT,
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

export const getComments = (id) => (dispatch) => {
  axios
    .get(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/comments?id=${id}`
    )
    .then((res) => {
      dispatch({
        type: GET_COMMENTS,
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
