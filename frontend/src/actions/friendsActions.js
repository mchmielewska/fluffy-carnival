import axios from 'axios';
import {
  GET_ERRORS,
  GET_FRIENDS,
  GET_PENDING_INVITES,
  ACCEPT_INVITE,
  DECLINE_INVITE,
  REMOVE_FRIEND,
  SEND_INVITE,
} from './types';

export const getFriendsList = (user) => (dispatch) => {
  axios
    .get(`${process.env.SERVER_URL || 'http://localhost:9090' }/friends/all`, user)
    .then((res) => {
      dispatch({
        type: GET_FRIENDS,
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

export const getPendingInvites = (user) => (dispatch) => {
  axios
    .get(`${process.env.SERVER_URL || 'http://localhost:9090' }/friends/pending`, user)
    .then((res) => {
      dispatch({
        type: GET_PENDING_INVITES,
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

export const acceptInvite = (token) => (dispatch) => {
  console.log(token);
  axios
    .get(`${process.env.SERVER_URL || 'http://localhost:9090' }/friends/accept?inviteToken=${token}`)
    .then((res) => {
      dispatch({
        type: ACCEPT_INVITE,
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

export const declineInvite = (user, token) => (dispatch) => {
  axios
    .get(`${process.env.SERVER_URL || 'http://localhost:9090' }/friends/decline?inviteToken=${token}`, user)
    .then((res) => {
      dispatch({
        type: DECLINE_INVITE,
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

export const removeFriend = (id, user) => (dispatch) => {
  axios
    .delete(`${process.env.SERVER_URL || 'http://localhost:9090' }/friends/remove`, { data: { id: id } }, user)
    .then((res) => {
      dispatch({
        type: REMOVE_FRIEND,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};

export const inviteFriend = (id, user) => (dispatch) => {
  axios
    .post(`${process.env.SERVER_URL || 'http://localhost:9090' }/friends/invite?id=${id}`, user)
    .then((res) => {
      dispatch({
        type: SEND_INVITE,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.res,
      });
    });
};
