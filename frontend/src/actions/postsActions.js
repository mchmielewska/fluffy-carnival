import axios from 'axios';
import { GET_ERRORS, GET_POSTS, DELETE_POST, FIND_POSTS } from './types';

export const getPosts = (user) => (dispatch) => {
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
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
    .catch((err) => {
      if (err.response.status === 400) {
        dispatch({
          type: FIND_POSTS,
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
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
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};
