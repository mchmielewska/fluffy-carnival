import { GET_ERRORS, LOGOUT_USER } from '../actions/types';
import setAuthToken from '../setAuthToken';
import history from '../history';

export const handleError = (
  error,
  dispatch,
  history = 'unused, to be removed if this works'
) => {
  if (error.response?.status === 401 || error.response?.status === 403) {
    return handleInvalidSessionError(error, dispatch);
  }

  dispatch({
    type: GET_ERRORS,
    error: error.response?.data,
  });
};

const handleInvalidSessionError = (error, dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);

  dispatch({
    type: GET_ERRORS,
    error: error.response?.data,
  });

  dispatch({
    type: LOGOUT_USER,
  });

  history.push('/login');
};
