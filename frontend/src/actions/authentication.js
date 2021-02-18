import axios from 'axios';
import { GET_ERRORS, LOGOUT_USER, SET_CURRENT_USER, SET_PATH } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import history from '../history';

export const registerUser = (user, history) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/users/register/`,
      user
    )
    .then((res) => history.push('/usercreated'))
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        error: error.response.data,
      });
    });
};

export const loginUser = (user, previousLocation) => (dispatch) => {
  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL || 'http://localhost:9090'}/users/authenticate`,
      user
    )
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(setPath(previousLocation));
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        error: error.response?.data || error,
      });
    });
};

export const setPath = (previousLocation) => {
  if (previousLocation) history.push(previousLocation);
  return {
    type: SET_PATH,
    payload: previousLocation,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({
    type: LOGOUT_USER,
  });
  history.push('/login');
};
