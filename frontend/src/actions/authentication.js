import axios from 'axios';
import { GET_ERRORS, LOGOUT_USER, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (user, history) => (dispatch) => {
  axios
    .post(`${process.env.SERVER_URL || 'http://localhost:9090' }/users/register/`, user)
    .then((res) => history.push('/usercreated'))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (user) => (dispatch) => {
  axios
    .post(`${process.env.SERVER_URL || 'http://localhost:9090' }/users/authenticate`, user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
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
