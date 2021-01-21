import axios from 'axios';
import {
  GET_ERRORS,
  GET_POSTS,
  DELETE_POST,
  FIND_POSTS,
  GET_POSTS_BY_TAG,
} from './types';
import { handleError } from '../utils/errorUtils';

export const getPosts = (history, user) => (dispatch) => {
  axios
    .get(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/find?privacy=all`,
      user
    )
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};

export const getPostsByTag = (tag) => (dispatch) => {
  axios
    .get(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/find?tags=${tag}`
    )
    .then((res) => {
      dispatch({
        type: GET_POSTS_BY_TAG,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const findPosts = (query, history) => (dispatch) => {
  axios
    .get(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/find?search=${query}`
    )
    .then((res) => {
      dispatch({
        type: FIND_POSTS,
        payload: res.data,
      });
      history.push('/search');
    })
    .catch((error) => {
      dispatch({
        type: FIND_POSTS,
        payload: [],
      });
      dispatch({
        type: GET_ERRORS,
        error: error.response.data,
      });
      history.push('/search');
    });
};

export const addPost = (post, history) => (dispatch) => {
  axios
    .post(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/posts/add`,
      post,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      history.push('/postadded');
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(
      `${process.env.SERVER_URL || 'http://localhost:9090'}/posts/delete`,
      { data: { id: id } }
    )
    .then((res) => {
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      });
    })
    .catch((error) => {
      handleError(error, dispatch);
    });
};

export const patchPost = (id, post, history) => (dispatch) => {
  axios
    .patch(
      `${
        process.env.SERVER_URL || 'http://localhost:9090'
      }/posts/update?id=${id}`,
      post,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    .then((res) => {
      history.push('/postupdated');
    })
    .catch((error) => {
      handleError(error, dispatch, history);
    });
};
